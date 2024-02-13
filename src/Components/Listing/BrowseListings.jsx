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
      const response = await axios.get(`${BACKEND_URL}/listings`);
      console.log(response);
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
        <FontAwesomeIcon icon={faHouseChimney} className="hover:text-blue-500 text-3xl" />
      </Link>
      <br />
      <h2>Browse Listings</h2>
      <div className="flex p-2">
        <div className="p-2 text-2xl bg-blue-500 mx-3 hover:text-white cursor-pointer">
          All Listings
        </div>
        <div className="p-2 text-2xl bg-blue-500 mx-3 rounded hover:text-white cursor-pointer">
          By User
        </div>
      </div>
      <div className="divider" />
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
