import { BACKEND_URL } from "../../../constants";
import axios from "axios";

export default function TradingFloor({
  tradeStateChanged,
  setTradeStateChanged,
  tradeId,
  user,
  partner,
  userTradeBucket,
  partnerTradeBucket
}) {
  const handleDelete = async (listingId) => {
    try {
      const listingsByTrade = await axios.get(
        `${BACKEND_URL}/listingsTrades/${tradeId}`
      );
      const currentListings = listingsByTrade.data;
      const listingTradeId = currentListings.find(
        (listing) => listing.listingId === listingId
      ).id;
      const response = await axios.delete(
        `${BACKEND_URL}/listingsTrades/${listingTradeId}`
      );
      setTradeStateChanged(!tradeStateChanged);
    } catch (error) {
      console.error("There was an error deleting the listing:", error);
    }
  };

  const handleReadyToTrade = async () => {
    const response = await axios.put(`${BACKEND_URL}/trades/update-status`, {
      tradeId: tradeId,
      newTradeStatus: "Completed",
    });
    setTradeStateChanged(!tradeStateChanged);
  };

  return (
    <div className="flex w-full items-center">
      <div className="flex-1">
        <h1 className="flex justify-center p-2">
          {user.firstName}'s' Trading Bucket:{" "}
        </h1>
        <div className="flex flex-col justify-center items-center border-black border-1 mx-2 h-56">
          {userTradeBucket.map((listing, index) => (
            <div key={index}>
              {listing.name}
              <button
                onClick={() => handleDelete(listing.id)}
                className="mx-3 py-1 px-2 bg-red-500 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <div
        className="flex flex-1 justify-center items-center border-black border-1 mx-2 h-12 bg-slate-100 text-blue-500 cursor-pointer"
        onClick={handleReadyToTrade}
      >
        I'm Ready to Trade!
      </div>
      <div className="flex-1">
        <h1 className="flex justify-center p-2">
          {" "}
          {partner.firstName}'s Trading Bucket:{" "}
        </h1>
        <div className="flex justify-center items-center border-black border-1 mx-2 h-56">
          {partnerTradeBucket.map((listing, index) => (
            <div key={index}>{listing.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
