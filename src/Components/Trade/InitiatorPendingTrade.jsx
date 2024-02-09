import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "../../../constants";

export default function InitiatorPendingTrade() {
  const [tradeDetails, setTradeDetails] = useState(null);
  const [initiatorListing, setInitiatorListing] = useState({});
  const [acceptorListing, setAcceptorListing] = useState({});
  const [searchParams] = useSearchParams();
  const newTradeId = searchParams.get("newTrade");

  useEffect(() => {
    const fetchTradeDetails = async () => {
      console.log(newTradeId);
      try {
        const response = await axios.get(`${BACKEND_URL}/trades/${newTradeId}`);
        setTradeDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch trade details:", error);
      }
    };

    if (newTradeId) {
      fetchTradeDetails();
    }
  }, [newTradeId]);

  return (
    <div className="flex flex-col items-center py-1">
      <h1 className="text-3xl my-4">Pending Trade</h1>
      <div className="flex flex-col items-center max-w-4xl mx-auto p-5 bg-gray-200 rounded-lg shadow">
        <div className="text-3xl p-2 my-4">
          Pending Status: Waiting for Other Party...
        </div>
        <div className="text-3xl p-2 my-4">You want this: </div>
        <div>{acceptorListing.name}</div>
        <div className="text-3xl p-2 my-4">You are offering this: </div>
        <div>{initiatorListing.name}</div>
      </div>
    </div>
  );
}
