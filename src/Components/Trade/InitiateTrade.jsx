import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { BACKEND_URL } from "../../../constants";
import { useSearchParams } from "react-router-dom";

export default function InitiateTrade() {
  const [wantedListing, setWantedListing] = useState([]);
  const [offeredListing, setOfferedListing] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const listingId = searchParams.get("listingId");

  useEffect(() => {
    axios.get(`${BACKEND_URL}/listings/${listingId}`).then((response) => {
      console.log(response.data);
      setWantedListing(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/listings/user-listings`, {
        params: {
          userId: 4,
          listingStatus: true,
        },
      })
      .then((response) => {
        console.log("Listings:", response.data);
        setOfferedListing(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.error("Error fetching listings:", error);
      });
  }, []);

  const handleClick = () => {
    //API Call: post request to trade table
  };
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col justify-center items-center max-w-4xl bg-gray-200 p-4 my-4 rounded-lg shadow">
        <h1 className="text-3xl my-4">Trade Initiation</h1>
        <div className="text-3xl p-2 my-4">You want this: </div>
        <div>{wantedListing.name}</div>
        <div className="text-3xl p-2 my-4">What would you offer in return?</div>
        <div className="flex flex-col">
          {offeredListing.map((listing, index) => (
            <button className="text-xl my-2" key={index} onClick={handleClick}>
              {listing.name}
            </button>
          ))}
        </div>
        <Button
          style={{ margin: "1rem", backgroundColor: "darkcyan" }}
          onClick={handleClick}
        >
          Initiate Trade
        </Button>
      </div>
    </div>
  );
}
