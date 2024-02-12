import ListingCard from "./ListingCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../../constants.jsx";

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
      <Link
        to="/home"
        className="inline-block text-blue-700 hover:text-blue-300 transition duration-300 ease-in-out py-4"
      >
        Back to Home
      </Link>
      <h1>Browse Listings</h1>
      <div className="flex p-2">
        <div className="p-2 text-2xl bg-blue-200 mx-2">All Listings</div>
        <div className="p-2 text-2xl bg-blue-200 mx-2">By User</div>
      </div>
      <div className="flex flex-col items-center py-1 text-3xl">
        {/* Render your UI based on the fetched data */}
        {listings.map((listing, index) => (
          <div key={index}>
            <Link to={`/listings/${listing.id}`}>
              <ListingCard listing={listing} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
