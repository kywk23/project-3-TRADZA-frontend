import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../constants";
import { Button, Modal } from "react-bootstrap";

export default function InitiatorPendingTrade() {
  const [tradeDetails, setTradeDetails] = useState({});
  const [initiatorListing, setInitiatorListing] = useState({});
  const [acceptorListing, setAcceptorListing] = useState({});
  const [searchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const newTradeId = searchParams.get("trade");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTradeDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/trades/${newTradeId}`);
        setTradeDetails(response.data);

        const initiatorId = response.data.listingInitiator;
        const acceptorId = response.data.listingAcceptor;

        const listingsByTrade = await axios.get(`${BACKEND_URL}/listingsTrades/${newTradeId}`);

        const listingId1 = listingsByTrade.data[0].listingId;
        const listingId2 = listingsByTrade.data[1].listingId;

        const initiatorListingsPromise = getListingsByUserId(initiatorId);
        const acceptorListingsPromise = getListingsByUserId(acceptorId);

        const [initiatorListings, acceptorListings] = await Promise.all([
          initiatorListingsPromise,
          acceptorListingsPromise,
        ]);

        initiatorListings.forEach((listing) => {
          console.log("Comparing:", listing.id, listingId1);
          console.log("Comparing:", listing.id, listingId2);
          listing.id == listingId1 ? setInitiatorListing(listing) : null;
          listing.id == listingId2 ? setInitiatorListing(listing) : null;
        });

        acceptorListings.forEach((listing) => {
          listing.id == listingId1 ? setAcceptorListing(listing) : null;
          listing.id == listingId2 ? setAcceptorListing(listing) : null;
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
      const response = await axios.get(`${BACKEND_URL}/listings/user-listings`, {
        params: {
          userId: userId,
          listingStatus: true,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching listings:", error);
      throw error;
    }
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleCancelTrade = async () => {
    const response = await axios.delete(`${BACKEND_URL}/trades/delete-trade`, {
      data: { tradeId: newTradeId },
    });

    if (response.data.success) {
      console.log(response.data.msg);
    } else {
      console.error(response.data.msg);
    }

    axios
      .put(`${BACKEND_URL}/listings/change-reserved-status`, {
        newListingReservedStatus: false,
        listingId: initiatorListing.id,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    handleCloseModal();
    navigate("/user-trades");
  };

  return (
    <div className="flex flex-col items-center py-1">
      <div className="flex flex-col items-center max-w-4xl mx-auto p-5 bg-black text-white rounded-lg shadow">
        <div className=" text-xl my-4">
          STATUS: Waiting for
          <span className="text-orange-500"> User {tradeDetails.listingAcceptor}</span> to accept .
          .
        </div>
        <div className="text-sm p-2 my-4">You want: </div>
        {console.log(acceptorListing)}
        <div className="text-2xl text-orange-500">{acceptorListing.name}</div>
        <div className="text-sm p-2 my-4">You are offering: </div>
        {console.log(initiatorListing)}
        <div className="text-2xl text-orange-500">{initiatorListing.name}</div>
      </div>
      <Button style={{ margin: "1rem", backgroundColor: "darkcyan" }} onClick={handleShowModal}>
        Cancel Trade
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to cancel trade?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCancelTrade}>
            Cancel Trade
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
