import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { BACKEND_URL } from "../../../constants";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function InitiateTrade() {
  const [wantedListing, setWantedListing] = useState([]);
  const [offeredListings, setOfferedListings] = useState([]);
  const [chosenListing, setChosenListing] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const listingId = searchParams.get("listingId");

  useEffect(() => {
    axios.get(`${BACKEND_URL}/listings/${listingId}`).then((response) => {
      setWantedListing(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/listings/user-listings`, {
        params: {
          userId: 4,
          listingStatus: true,
        },
      })
      .then((response) => {
        setOfferedListings(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.error("Error fetching listings:", error);
      });
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    axios
      .post(`${BACKEND_URL}/trades`, {
        listingInitiator: 4,
        listingAcceptor: wantedListing.userId,
        tradeStatus: "Pending",
      })
      .then((response) => {
        const newTradeId = response.data.id;

        const linkListingsPromises = [
          axios.post(`${BACKEND_URL}/listingsTrades`, {
            tradeId: newTradeId,
            listingId: wantedListing.id,
          }),
          axios.post(`${BACKEND_URL}/listingsTrades`, {
            tradeId: newTradeId,
            listingId: chosenListing.id,
          }),
        ];

        Promise.all(linkListingsPromises)
          .then((responses) => {
            console.log("Both listings linked successfully:", responses);
            navigate(`/user-trades/pending/initiator?trade=${newTradeId}`);
          })
          .catch((error) => {
            console.error("An error occurred linking listings:", error);
          });
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  const handleChooseTradeClick = (index) => {
    const updatedListing = offeredListings.map((listing, i) => {
      if (i === index) {
        setChosenListing(listing);
        return { ...listing, isActive: !listing.isActive };
      }
      return listing;
    });
    setOfferedListings(updatedListing);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col justify-center items-center max-w-4xl bg-gray-200 p-4 my-4 rounded-lg shadow">
        <h1 className="text-3xl my-4">Trade Initiation</h1>
        <div className="text-3xl p-2 my-4">You want this: </div>
        <div>{wantedListing.name}</div>
        <div className="text-3xl p-2 my-4">What would you offer in return?</div>
        <div className="flex flex-col">
          {offeredListings.map((listing, index) => (
            <button
              className={`text-xl my-2 p-3 rounded-md ${
                listing.isActive ? "bg-pink-500" : "bg-pink-300"
              }`}
              key={index}
              onClick={() => handleChooseTradeClick(index)}
            >
              {listing.name}
            </button>
          ))}
        </div>
        <Button
          style={{ margin: "1rem", backgroundColor: "darkcyan" }}
          onClick={handleClick}
        >
          Initiate Trade
        </Button>
      </div>
    </div>
  );
}
