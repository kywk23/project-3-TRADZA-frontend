import UserTradeList from "./UserTradeList";
import TradingFloor from "./TradingFloor";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../constants";
import { Button, Modal } from "react-bootstrap";
import { useUserId } from "../Users/GetCurrentUser";
import ChatRoom from "./ChatRoom";

export default function TradeRoom() {
  const [tradeStatus, setTradeStatus] = useState("Ongoing");
  const [user, setUser] = useState({});
  const [partner, setPartner] = useState({});
  const [userListings, setUserListings] = useState([]);
  const [partnerListings, setPartnerListings] = useState([]);
  const [userTradeBucket, setUserTradeBucket] = useState([]);
  const [partnerTradeBucket, setPartnerTradeBucket] = useState([]);
  const [tradeStateChanged, setTradeStateChanged] = useState(false);
  const [showModal, setShowModal] = useState(false);
  let { tradeId } = useParams();
  const { currentUser } = useUserId();
  const userId = currentUser.id;

  useEffect(() => {
    const fetchTradeDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/trades/${tradeId}`);
        if (response.data.tradeStatus === "Ongoing") {
          setTradeStatus("Ongoing");
          const listingInitiatorId = response.data.listingInitiator;
          const listingAcceptorId = response.data.listingAcceptor;

          const listingsInitiatorPromise =
            getListingsByUserId(listingInitiatorId);
          const listingsAcceptorPromise =
            getListingsByUserId(listingAcceptorId);

          const [initiatorListings, acceptorListings] = await Promise.all([
            listingsInitiatorPromise,
            listingsAcceptorPromise,
          ]);

          const initiatorDetailsPromise = getUserDetails(listingInitiatorId);
          const acceptorDetailsPromise = getUserDetails(listingAcceptorId);
          const [initiatorDetails, acceptorDetails] = await Promise.all([
            initiatorDetailsPromise,
            acceptorDetailsPromise,
          ]);

          const listingsByTrade = await axios.get(
            `${BACKEND_URL}/listingsTrades/${tradeId}`
          );
          const tradeBucket = listingsByTrade.data;
          const initiatorTrades = [];
          const acceptorTrades = [];
          tradeBucket.forEach((tradeListing) => {
            initiatorListings.forEach((listing) => {
              if (listing.id == tradeListing.listingId) {
                initiatorTrades.push(listing);
              }
            });
            acceptorListings.forEach((listing) => {
              if (listing.id == tradeListing.listingId) {
                acceptorTrades.push(listing);
              }
            });
          });

          if (listingInitiatorId == userId) {
            setUserListings(initiatorListings);
            setPartnerListings(acceptorListings);
            setUser(initiatorDetails);
            setPartner(acceptorDetails);
            setUserTradeBucket(initiatorTrades);
            setPartnerTradeBucket(acceptorTrades);
          } else {
            setUserListings(acceptorListings);
            setPartnerListings(initiatorListings);
            setUser(acceptorDetails);
            setPartner(initiatorDetails);
            setUserTradeBucket(acceptorTrades);
            setPartnerTradeBucket(initiatorTrades);
          }
        } else if (response.data.tradeStatus == "Completed") {
          setTradeStatus("Completed");
        }
      } catch (error) {
        console.error("Failed to fetch trade details:", error);
      }
    };

    if (tradeId) {
      fetchTradeDetails();
    }
  }, [tradeStateChanged]);

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
      return response.data;
    } catch (error) {
      console.error("Error fetching listings:", error);
      throw error;
    }
  };

  const getUserDetails = async (userId) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleCancelTrade = async () => {
    const response = await axios.delete(`${BACKEND_URL}/trades/delete-trade`, {
      data: { tradeId: tradeId },
    });

    if (response.data.success) {
      console.log(response.data.msg);
    } else {
      console.error(response.data.msg);
    }
    handleCloseModal();
  };

  return (
    <div className="flex flex-col items-center mx-auto max-w-6xl p-5 bg-gray-200 my-4 rounded-lg shadow">
      <h1 className="text-3xl">Trade Room</h1>
      {tradeStatus == "Ongoing" ? (
        <>
          <div className="flex justify-between w-full p-2 my-4">
            <div className="flex flex-col justify-center items-center border-black border-2 p-3 h-96 w-56">
              <UserTradeList
                tradeStateChanged={tradeStateChanged}
                setTradeStateChanged={setTradeStateChanged}
                tradeId={tradeId}
                user={user}
                userListings={userListings}
              />
            </div>
            <div className="flex flex-col justify-center items-center border-black border-2 p-3 h-96 w-96">
              <ChatRoom/>
            </div>
            <div className="flex flex-col justify-center items-center border-black border-2 p-3 h-96 w-56">
              <UserTradeList
                acceptorState={true}
                tradeId={tradeId}
                user={partner}
                userListings={partnerListings}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center border-black border-2 w-full h-72 my-4">
            <TradingFloor
              tradeStateChanged={tradeStateChanged}
              setTradeStateChanged={setTradeStateChanged}
              tradeId={tradeId}
              user={user}
              partner={partner}
              userTradeBucket={userTradeBucket}
              partnerTradeBucket={partnerTradeBucket}
            />
          </div>
          <div
            className="border-black border-1 mx-2 p-3 cursor-pointer"
            onClick={handleShowModal}
          >
            Cancel Trade
          </div>
        </>
      ) : null}
      {tradeStatus == "Completed" ? (
        <div className="my-4 text-2xl">Trade Completed!</div>
      ) : null}

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
