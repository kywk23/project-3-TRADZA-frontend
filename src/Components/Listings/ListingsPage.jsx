import ListingCard from "./ListingCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ListingsPage() {
  const [listings, setListings] = useState([]); // State to hold the fetched data

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SOME_BACKEND_URL}/listings`
      );
      setListings(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center py-1 text-3xl">
      <Link
        to="/home"
        className="inline-block text-blue-700 hover:text-blue-300 transition duration-300 ease-in-out py-4"
      >
        Back to Home
      </Link>
      <div className="flex flex-col items-center py-1 text-3xl">
        {/* Render your UI based on the fetched data */}
        {listings.map((listing, index) => (
          <div key={index}>
            <ListingCard listing={listing}/>
          </div>
        ))}
      </div>
    </div>
  );
}
