import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../constants.jsx";
import { Link } from "react-router-dom";
import { useUserId } from "../Users/GetCurrentUser";

export default function AllUserTrades() {
  const [pendingInitiatorTrades, setPendingInitiatorTrades] = useState([]);
  const [pendingAcceptorTrades, setPendingAcceptorTrades] = useState([]);
  const [ongoingTrades, setOngoingTrades] = useState([]);
  const [pendingCompletedTrades, setPendingCompletedTrades] = useState([]);
  const [completedTrades, setCompletedTrades] = useState([]);

  const { currentUser } = useUserId();
  const userId = currentUser.id;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/trades/pending/initiator`, {
        params: {
          userId: userId,
          tradeStatus: "Pending",
        },
      })
      .then((response) => {
        console.log(response.data);
        setPendingInitiatorTrades(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the pending trades:", error);
      });

    axios
      .get(`${BACKEND_URL}/trades/pending/acceptor`, {
        params: {
          userId: userId,
          tradeStatus: "Pending",
        },
      })
      .then((response) => {
        console.log(response.data);
        setPendingAcceptorTrades(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the pending trades:", error);
      });

    axios
      .get(`${BACKEND_URL}/trades/ongoing`, {
        params: {
          userId: userId,
          tradeStatus: "Ongoing",
        },
      })
      .then((response) => {
        console.log(response.data);
        setOngoingTrades(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the pending trades:", error);
      });

    axios
      .get(`${BACKEND_URL}/trades/completed`, {
        params: {
          userId: userId,
          tradeStatus: "Completed",
        },
      })
      .then((response) => {
        console.log(response.data);
        setCompletedTrades(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the pending trades:", error);
      });
  }, [userId]);

  return (
    <div className="flex justify-evenly px-6">
      <div className="flex flex-col justify-center items-center max-w-4xl bg-gray-200 p-4 my-4 rounded-lg shadow">
        <h1 className="text-3xl my-4">Pending Trades</h1>
        <div className="border-black border-2 p-3 h-96 w-96">
          {pendingInitiatorTrades.map((trade, index) => (
            <div key={index}>
              <Link to={`/user-trades/pending/initiator?trade=${trade.id}`}>
                {trade.id} - Waiting for {trade.listingAcceptor} to accept!
              </Link>
            </div>
          ))}
          {pendingAcceptorTrades.map((trade, index) => (
            <div key={index}>
              <Link to={`/user-trades/pending/acceptor?trade=${trade.id}`}>
                {trade.id} - Waiting for you to accept!
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center max-w-4xl bg-gray-200 p-4 my-4 rounded-lg shadow">
        <h1 className="text-3xl my-4">Ongoing Trades</h1>
        <div className="border-black border-2 p-3 h-96 w-96">
          {ongoingTrades.map((trade, index) => (
            <div key={index}>
              <Link to={`/traderoom/${trade.id}`}>{trade.id}</Link>
            </div>
          ))}
          {pendingCompletedTrades.map((trade, index) => (
            <div key={index}>
              <Link to={`/traderoom/${trade.id}`}>{trade.id}</Link>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center max-w-4xl bg-gray-200 p-4 my-4 rounded-lg shadow">
        <h1 className="text-3xl my-4">Completed Trades</h1>
        <div className="border-black border-2 p-3 h-96 w-96">
          {completedTrades.map((trade, index) => (
            <div key={index}>
              <Link to={`/traderoom/${trade.id}`}>{trade.id}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
