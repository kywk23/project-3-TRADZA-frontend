import ListingCard from "./ListingCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../../constants.jsx";
import { useParams } from "react-router-dom";

export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  let { category } = useParams();

  const fetchAllListings = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/listings`);
      setListings(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAllListings();
  }, []);

  //API CALL: Function to fetch listings based on category

  return (
    <div className="flex flex-col items-center py-1 text-3xl">
      <Link
        to="/home"
        className="inline-block text-blue-700 hover:text-blue-300 transition duration-300 ease-in-out py-4"
      >
        Back to Home
      </Link>
      <h1>Showing the category: {category}</h1>
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
