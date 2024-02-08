import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../constants.jsx";

export default function AllUserTrades() {
  const [pendingTrades, setPendingTrades] = useState([]);
  const [ongoingTrades, setOngoingTrades] = useState([]);
  const [completedTrades, setCompletedTrades] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/trades/pending`, {
        params: {
          userId: 1,
          tradeStatus: "Pending",
        },
      })
      .then((response) => {
        console.log(response.data);
        setPendingTrades(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the pending trades:", error);
      });

    axios
      .get(`${BACKEND_URL}/trades/ongoing`, {
        params: {
          userId: 1,
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
          userId: 1,
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
  }, []);

  return (
    <div className="flex justify-evenly px-6">
      <div className="flex flex-col justify-center items-center max-w-4xl bg-gray-200 p-4 my-4 rounded-lg shadow">
        <h1 className="text-3xl my-4">Pending Trades</h1>
        <div className="border-black border-2 p-3 h-96 w-96">
          {pendingTrades.map((trade, index) => (
            <div key={index}>{trade.id}</div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center max-w-4xl bg-gray-200 p-4 my-4 rounded-lg shadow">
        <h1 className="text-3xl my-4">Ongoing Trades</h1>
        <div className="border-black border-2 p-3 h-96 w-96">
          {ongoingTrades.map((trade, index) => (
            <div key={index}>{trade.id}</div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center max-w-4xl bg-gray-200 p-4 my-4 rounded-lg shadow">
        <h1 className="text-3xl my-4">Completed Trades</h1>
        <div className="border-black border-2 p-3 h-96 w-96">
          {completedTrades.map((trade, index) => (
            <div key={index}>{trade.id}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
