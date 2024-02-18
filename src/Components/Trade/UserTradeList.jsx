import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../constants";

export default function UserTradeList({
  tradeStateChanged,
  setTradeStateChanged,
  tradeId,
  user,
  userListings,
  acceptorState,
}) {
  const [selectedListingIndex, setSelectedListingIndex] = useState(null);
  const [selectedListing, setSelectedListing] = useState({});

  const handleClick = (index) => {
    setSelectedListingIndex(index);
    setSelectedListing(userListings[index]);
  };

  const handleAddToBucketClick = () => {
    axios
      .post(`${BACKEND_URL}/listingsTrades`, {
        tradeId: tradeId,
        listingId: selectedListing.id,
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .put(`${BACKEND_URL}/listings/change-reserved-status`, {
        newListingReservedStatus: true,
        listingId: selectedListing.id,
      })
      .then((response) => {
        console.log(response);
        setTradeStateChanged(!tradeStateChanged);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col" style={{ maxHeight: "350px" }}>
      {/* DP N NAME */}
      <div className="flex items-center">
        <img
          src={user.displayPicture}
          className="w-20 h-20 mb-4 rounded-full object-cover bg-white"
        />
        <h1 className="text-lg font-bold p-3">{user.firstName}</h1>
      </div>
      <div className="mb-2">
        <strong>Available Items:</strong>
      </div>
      <div style={{ maxHeight: "200px" }} className="my-2 w-full h-30 overflow-y-auto scrollbar ">
        {userListings.map((listing, index) =>
          listing.reserved == false ? (
            <div
              className={`bg-blue-400  ${
                selectedListingIndex === index ? "bg-blue-700" : "hover:bg-blue-600"
              } text-white py-2 px-4 m-1 rounded-lg cursor-pointer transition duration-150 ease-in-out `}
              key={index}
              onClick={() => handleClick(index)}
            >
              {listing.name}
            </div>
          ) : null
        )}
      </div>
      {acceptorState ? null : (
        <div
          className="border border-black bg-white text-black mx-2 p-2 mt-5 cursor-pointer hover:bg-gray-100 transition duration-150 ease-in-out rounded"
          onClick={handleAddToBucketClick}
        >
          Add to Bucket
        </div>
      )}
    </div>
  );
}
