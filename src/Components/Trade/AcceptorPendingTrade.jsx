import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "../../../constants";
import { Button } from "react-bootstrap";

export default function AcceptorPendingTrade() {
  const [tradeDetails, setTradeDetails] = useState({});
  const [initiatorListing, setInitiatorListing] = useState({});
  const [acceptorListing, setAcceptorListing] = useState({});
  const [searchParams] = useSearchParams();
  const newTradeId = searchParams.get("trade");

  useEffect(() => {
    const fetchTradeDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/trades/${newTradeId}`);
        setTradeDetails(response.data);
        const initiatorId = response.data.listingInitiator;
        const acceptorId = response.data.listingAcceptor;
        const listingsByTrade = await axios.get(
          `${BACKEND_URL}/listingsTrades/${newTradeId}`
        );
        
        const listingId1 = listingsByTrade.data[0].listingId;
        const initiatorListingsPromise = getListingsByUserId(initiatorId);
        const acceptorListingsPromise = getListingsByUserId(acceptorId);

        const [initiatorListings, acceptorListings] = await Promise.all([
          initiatorListingsPromise,
          acceptorListingsPromise,
        ]);

        initiatorListings.forEach((listing) => {
          listing.id == listingId1
            ? setInitiatorListing(listing)
            : setAcceptorListing(listing);
        });

        acceptorListings.forEach((listing) => {
          listing.id == listingId1
            ? setInitiatorListing(listing)
            : setAcceptorListing(listing);
        });
      } catch (error) {
        console.error("Failed to fetch trade details:", error);
      }
    };

    if (newTradeId) {
      fetchTradeDetails();
    }
  }, [newTradeId]);

  const getListingsByUserId = async (userId) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/listings/user-listings`,
        {
          params: {
            userId: userId,
            listingStatus: true,
          },
        }
      );
      return response.data; // Assuming this is the structure you want
    } catch (error) {
      console.error("Error fetching listings:", error);
      throw error; // Or handle it as needed
    }
  };

  const handleClick = () => {};

  return (
    <div className="flex flex-col items-center py-1">
      <h1 className="text-3xl my-4">Pending Trade</h1>
      <div className="flex flex-col items-center max-w-4xl mx-auto p-5 bg-gray-200 rounded-lg shadow">
        <div className="text-3xl p-2 my-4">Trade ID: </div>
        <div>{tradeDetails.id}</div>
        <div className="text-3xl p-2 my-4">
          Status: Waiting for you to accept...
        </div>
        <div className="text-3xl p-2 my-4">You have this: </div>
        <div>{acceptorListing.name}</div>
        <div className="text-3xl p-2 my-4">
          {" "}
          User {tradeDetails.listingInitiator} is offering this:{" "}
        </div>
        <div>{initiatorListing.name}</div>
        <div className="flex my-2">
          <Button
            style={{ margin: "1rem", backgroundColor: "darkcyan" }}
            onClick={handleClick}
          >
            Accept Trade
          </Button>
          <Button
            style={{ margin: "1rem", backgroundColor: "darkcyan" }}
            onClick={handleClick}
          >
            Reject Trade
          </Button>
        </div>
      </div>
    </div>
  );
}
