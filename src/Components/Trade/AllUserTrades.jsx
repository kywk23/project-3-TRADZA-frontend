import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../constants.jsx";

export default function AllUserTrades() {
  const [pendingTrades, setPendingTrades] = useState([]);
  const [ongoingTrades, setOngoingTrades] = useState([]);
  const [completedTrades, setCompletedTrades] = useState([]);

  useEffect(() => {
    // Fetch Pending Trades
    axios
      .get(`${BACKEND_URL}/trades`, {
        params: {
          status: "pending",
        },
      })
      .then((response) => {
        setPendingTrades(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the pending trades:", error);
      });

    // Fetch Ongoing Trades
    axios
      .get(`${BACKEND_URL}/trades`, {
        params: {
          status: "ongoing",
        },
      })
      .then((response) => {
        setOngoingTrades(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the ongoing trades:", error);
      });

    // Fetch Completed Trades
    axios
      .get(`${BACKEND_URL}/trades`, {
        params: {
          status: "completed",
        },
      })
      .then((response) => {
        setCompletedTrades(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the completed trades:",
          error
        );
      });
  }, []);

  return (
    <div className="flex justify-evenly px-6">
      <div className="flex flex-col justify-center items-center max-w-4xl bg-gray-200 p-4 my-4 rounded-lg shadow">
        <h1 className="text-3xl my-4">Pending Trades</h1>
        <div className="border-black border-2 p-3 h-96 w-96"></div>
      </div>
      <div className="flex flex-col justify-center items-center max-w-4xl bg-gray-200 p-4 my-4 rounded-lg shadow">
        <h1 className="text-3xl my-4">Ongoing Trades</h1>
        <div className="border-black border-2 p-3 h-96 w-96"></div>
      </div>
      <div className="flex flex-col justify-center items-center max-w-4xl bg-gray-200 p-4 my-4 rounded-lg shadow">
        <h1 className="text-3xl my-4">Completed Trades</h1>
        <div className="border-black border-2 p-3 h-96 w-96"></div>
      </div>
    </div>
  );
}
