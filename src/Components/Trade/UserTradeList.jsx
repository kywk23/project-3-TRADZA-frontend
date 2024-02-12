import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../constants";

export default function UserTradeList({
  tradeStateChanged,
  setTradeStateChanged,
  tradeId,
  user,
  userListings,
  acceptorState
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
      .then((response) => {
        console.log(response);
        setTradeStateChanged(!tradeStateChanged);
      });
  };

  return (
    <div>
      <h1>
        <strong>Name:</strong> {user.firstName}
      </h1>
      <div className="my-2">
        <div className="mb-2">
          <strong>Unsold Items: </strong>
        </div>
        {userListings.map((listing, index) => (
          <div
            className={`bg-blue-500 ${
              selectedListingIndex === index
                ? "bg-blue-700"
                : "hover:bg-blue-700"
            }`}
            key={index}
            onClick={() => handleClick(index)}
          >
            {listing.name}
          </div>
        ))}
      </div>
      {
        acceptorState? null: 
        <div
        className="border-black border-1 mx-2 p-1 mt-5 cursor-pointer"
        onClick={handleAddToBucketClick}
        >
        Add to Bucket
        </div>
      }
      
    </div>
  );
}
