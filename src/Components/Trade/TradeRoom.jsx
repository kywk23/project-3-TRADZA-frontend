import UserTradeList from "./UserTradeList";
import TradingFloor from "./TradingFloor";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../constants";
import { Button, Modal } from "react-bootstrap";
import ChatRoom from "./ChatRoom";
import { useUserId } from "../Users/GetCurrentUser";

export default function TradeRoom() {
  const [tradeStatus, setTradeStatus] = useState("Ongoing");
  const [initiatorId, setInitiatorId] = useState(0);
  const [acceptorId, setAcceptorId] = useState(0);
  const [initiatorAgreed, setInitiatorAgreed] = useState(false);
  const [acceptorAgreed, setAcceptorAgreed] = useState(false);
  const [currUser, setCurrUser] = useState("");
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTradeDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/trades/${tradeId}`);
        if (response.data.tradeStatus === "Ongoing") {
          setInitiatorAgreed(response.data.initiatorAgreed);
          setAcceptorAgreed(response.data.acceptorAgreed);
          const listingInitiatorId = response.data.listingInitiator;
          const listingAcceptorId = response.data.listingAcceptor;
          setInitiatorId(listingInitiatorId);
          setAcceptorId(listingAcceptorId);

          if (listingInitiatorId == userId) {
            setCurrUser("initiator");
          } else {
            setCurrUser("acceptor");
          }

          const listingsInitiatorPromise = getListingsByUserId(listingInitiatorId);
          const listingsAcceptorPromise = getListingsByUserId(listingAcceptorId);

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
          // WORKS TILL HERE
          const getInitiatorDP = await axios.get(
            `${BACKEND_URL}/images/displaypictures/${listingInitiatorId}`
          );
          const getAcceptorDP = await axios.get(
            `${BACKEND_URL}/images/displaypictures/${listingAcceptorId}`
          );
          initiatorDetails.displayPicture = getInitiatorDP.data[0].userDpUrl;
          acceptorDetails.displayPicture = getAcceptorDP.data[0].userDpUrl;

          const listingsByTrade = await axios.get(`${BACKEND_URL}/listingsTrades/${tradeId}`);
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
  }, [tradeStateChanged, userId]);

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

  const renderBasedOnTradeStatus = (tradeStatus) => {
    if (tradeStatus === "Ongoing") {
      return (
        <>
          <div className="flex justify-between w-full p-2 my-4">
            <div
              className={`flex flex-col justify-center items-center border-white rounded-xl  border-3 p-3 h-96 w-72 ${
                (currUser === "initiator" && (initiatorAgreed || acceptorAgreed)) ||
                (currUser === "acceptor" && (acceptorAgreed || initiatorAgreed))
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            >
              <UserTradeList
                tradeStateChanged={tradeStateChanged}
                setTradeStateChanged={setTradeStateChanged}
                tradeId={tradeId}
                user={user}
                userListings={userListings}
              />
            </div>
            <div className="flex flex-col bg-white justify-center items-center rounded-xl border-white border-3 p-3 h-96 w-96">
              <h2 className="text-xl font-bold mb-2">Chatroom</h2>
              <ChatRoom tradeId={tradeId} currUser={user} currPartner={partner} />
            </div>
            <div
              className={`flex flex-col justify-center items-center border-white rounded-xl  border-3 p-3 h-96 w-72 ${
                (currUser === "initiator" && (initiatorAgreed || acceptorAgreed)) ||
                (currUser === "acceptor" && (acceptorAgreed || initiatorAgreed))
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            >
              <UserTradeList
                acceptorState={true}
                tradeId={tradeId}
                user={partner}
                userListings={partnerListings}
              />
            </div>
          </div>
          {currUser == "initiator" && initiatorAgreed ? (
            <div className="flex flex-col justify-center items-center bg-white text-black p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold">Trade Room is Locked!</h2>
              <p>Awaiting User {acceptorId} to accept...</p>
            </div>
          ) : null}
          {currUser == "initiator" && acceptorAgreed ? (
            <div className="flex flex-col justify-center items-center bg-white  text-black p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold">Trade Room is Locked!</h2>
              <p>Waiting for you to accept...</p>
              <button
                className="mt-4  bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAcceptTrade}
              >
                Accept Trade
              </button>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleUnlockAndEdit}
              >
                Unlock Trade and Edit
              </button>
            </div>
          ) : null}
          {currUser == "acceptor" && acceptorAgreed ? (
            <div className="flex flex-col justify-center items-center bg-whitep-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold  text-black ">Trade Room is Locked!</h2>
              <p>Awaiting User {initiatorId} to accept...</p>
            </div>
          ) : null}
          {currUser == "acceptor" && initiatorAgreed ? (
            <div className="flex flex-col justify-center items-center bg-white text-black p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold">Trade Room is Locked!</h2>
              <p>Waiting for you to accept...</p>
              <button
                className="mt-4 bg-green-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
                onClick={handleAcceptTrade}
              >
                Accept Trade
              </button>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
                onClick={handleUnlockAndEdit}
              >
                Unlock Trade and Edit
              </button>
            </div>
          ) : null}
          <div
            className={`flex flex-col justify-center items-center bg-black rounded-xl border-white border-2 w-full h-72 my-4 ${
              (currUser === "initiator" && (initiatorAgreed || acceptorAgreed)) ||
              (currUser === "acceptor" && (acceptorAgreed || initiatorAgreed))
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          >
            <TradingFloor
              tradeStateChanged={tradeStateChanged}
              initiatorAgreed={initiatorAgreed}
              acceptorAgreed={acceptorAgreed}
              setTradeStateChanged={setTradeStateChanged}
              tradeId={tradeId}
              user={user}
              partner={partner}
              userTradeBucket={userTradeBucket}
              partnerTradeBucket={partnerTradeBucket}
              currentTradeStatus={tradeStatus}
            />
          </div>

          <div className="border-black border-1 mx-2 p-3 cursor-pointer" onClick={handleShowModal}>
            Cancel Trade
          </div>
        </>
      );
    } else if (tradeStatus === "Completed") {
      return <div className="my-4 text-2xl">Trade Completed!</div>;
    }
  };

  const handleUnlockAndEdit = async () => {
    try {
      await axios.put(`${BACKEND_URL}/trades/reverse-update-agree-status`, {
        tradeId: tradeId,
        whoAgreed: "initiator",
      });
      await axios.put(`${BACKEND_URL}/trades/reverse-update-agree-status`, {
        tradeId: tradeId,
        whoAgreed: "acceptor",
      });
    } catch (err) {
      console.log(err);
    }
    setTradeStateChanged(!tradeStateChanged);
  };

  const handleAcceptTrade = async () => {
    const combinedBucket = [...userTradeBucket, ...partnerTradeBucket];

    const listings = combinedBucket.map((obj) => {
      const newListing = {
        listingId: obj.id,
        listingStatus: false,
      };
      return newListing;
    });

    console.log(listings);

    const updateState = await axios.put(`${BACKEND_URL}/trades/update-status`, {
      tradeId: tradeId,
      newTradeStatus: "Completed",
    });

    await axios
      .put(`${BACKEND_URL}/listings/update-listing-statuses`, listings)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    setTradeStateChanged(!tradeStateChanged);
  };

  const handleCancelTrade = async () => {
    const combinedBucket = [...userTradeBucket, ...partnerTradeBucket];

    const listings = combinedBucket.map((obj) => {
      const newListing = {
        listingId: obj.id,
        newListingReservedStatus: false,
      };
      return newListing;
    });

    axios
      .delete(`${BACKEND_URL}/messages/deleteTradeRoom`, {
        data: {
          tradeId: tradeId,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    const response = await axios.delete(`${BACKEND_URL}/trades/delete-trade`, {
      data: { tradeId: tradeId },
    });

    if (response.data.success) {
      console.log(response.data.msg);
    } else {
      console.error(response.data.msg);
    }

    axios
      .put(`${BACKEND_URL}/listings/change-reserved-statuses`, listings)
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
    <div className="flex flex-col items-center mx-auto max-w-7xl p-5 bg-black text-white my-4 rounded-lg shadow">
      <h1 className="text-3xl">
        <sTRONG>TRADE ROOM</sTRONG>
      </h1>

      {renderBasedOnTradeStatus(tradeStatus)}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to cancel trade?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="error" onClick={handleCancelTrade}>
            Cancel Trade
          </Button>
          <Button onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
