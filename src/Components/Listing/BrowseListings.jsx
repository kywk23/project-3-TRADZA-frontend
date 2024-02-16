import ListingCard from "./ListingCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../../constants.jsx";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BrowseListings() {
  const [listings, setListings] = useState([]);

  const fetchAllListings = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/listings/available-listings`);
      console.log(`get request res`, response.data);
      setListings(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAllListings();
  }, []);

  return (
    <div className="flex flex-col items-center py-1 text-3xl">
      <Link to="/home">
        <FontAwesomeIcon icon={faHouseChimney} className="hover:text-orange-500 text-3xl" />
      </Link>
      <br />
      <div className="divider divider-neutral">
        <h2 className="font-bold text-lg">BROWSE LISTINGS</h2>
      </div>

      <div className="flex p-2">
        <div className="p-2 text-2xl bg-orange-500 mx-3 rounded hover:text-white cursor-pointer">
          All Listings
        </div>
        <div className="p-2 text-2xl bg-orange-500 mx-3 rounded hover:text-white cursor-pointer">
          By User
        </div>
      </div>
      <br />

      <div className="flex flex-wrap justify-center items-start py-1 text-3xl w-full">
        {listings.map((listing, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/4 xl:w-1/4 px-4 mb-4">
            <Link to={`/listings/${listing.id}`}>
              <ListingCard listing={listing} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
