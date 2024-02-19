import { BACKEND_URL } from "../../../constants";
import axios from "axios";

export default function TradingFloor({
  initiatorAgreed,
  acceptorAgreed,
  tradeStateChanged,
  setTradeStateChanged,
  tradeId,
  user,
  partner,
  userTradeBucket,
  partnerTradeBucket,
  currentTradeStatus,
}) {
  const handleDelete = async (listingId) => {
    try {
      const listingsByTrade = await axios.get(`${BACKEND_URL}/listingsTrades/${tradeId}`);
      const currentListings = listingsByTrade.data;
      const listingTradeId = currentListings.find((listing) => listing.listingId === listingId).id;
      const response = await axios.delete(`${BACKEND_URL}/listingsTrades/${listingTradeId}`);

      axios
        .put(`${BACKEND_URL}/listings/change-reserved-status`, {
          newListingReservedStatus: false,
          listingId: listingId,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });

      setTradeStateChanged(!tradeStateChanged);
    } catch (error) {
      console.error("There was an error deleting the listing:", error);
    }
  };

  const handleReadyToTrade = async () => {
    const tradeDetails = await axios.get(`${BACKEND_URL}/trades/${tradeId}`);
    const listingInitiatorId = tradeDetails.data.listingInitiator;
    const listingAcceptorId = tradeDetails.data.listingAcceptor;
    console.log(listingInitiatorId);
    console.log(listingAcceptorId);
    let updateAgreedPerson = "";
    if (listingInitiatorId == user.id) {
      updateAgreedPerson = "initiator";
    } else {
      updateAgreedPerson = "acceptor";
    }

    if (initiatorAgreed == false && acceptorAgreed == false) {
      const response = await axios.put(`${BACKEND_URL}/trades/update-agree-status`, {
        tradeId: tradeId,
        whoAgreed: updateAgreedPerson,
      });
      console.log(response);
      setTradeStateChanged(!tradeStateChanged);
    }
  };

  return (
    <div className="flex w-full items-center">
      <div className="flex-1">
        <h1 className="flex justify-center p-2">{user.firstName}'s Trading Bucket: </h1>
        <div className="flex flex-col justify-center items-center rounded-xl bg-white border-black text-black border-1 mx-2 h-56">
          {userTradeBucket.map((listing, index) => (
            <div key={index} className="font-bold p-2">
              {listing.name}
              <button
                onClick={() => handleDelete(listing.id)}
                className="mx-3 py-1 px-2 bg-red-500 text-white hover:bg-red-700 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <div
        className="flex flex-1 justify-center items-center border-black rounded border-1 mx-2 h-12 bg-slate-100 text-orange-500 cursor-pointer"
        onClick={handleReadyToTrade}
      >
        I'm Ready to Trade!
      </div>
      <div className="flex-1">
        <h1 className="flex justify-center p-2"> {partner.firstName}'s Trading Bucket: </h1>
        <div className="flex flex-col justify-center items-center rounded-xl bg-white border-black border-1 mx-2 h-56 text-black">
          {partnerTradeBucket.map((listing, index) => (
            <div key={index} className="font-bold">
              {listing.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
