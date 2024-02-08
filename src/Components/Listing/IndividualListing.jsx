import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../../constants";

export default function IndividualListing() {
  const [listing, setListing] = useState({
    name: "Test Name",
    description: "Test Description",
  });
  let { listingId } = useParams();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/listings/${listingId}`).then((response) => {
      console.log(response.data);
      setListing(response.data);
    });
  }, []);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/initiate-trade?listingId=${listingId}`);
  };

  return (
    <div className="flex flex-col items-center py-8 text-3xl">
      <Link
        to="/categories/electronics"
        className="inline-block text-blue-700 hover:text-blue-300 transition duration-300 ease-in-out py-4"
      >
        Back to Listings
      </Link>
      <div className="flex flex-col items-center max-w-4xl mx-auto p-5 bg-gray-200 rounded-lg shadow">
        <h1>Listing: </h1>
        <h1 className="text-xl font-semibold text-gray-700">{listing.name}</h1>
        <h1 className="my-2">Description: </h1>
        <h1 className="text-xl font-semibold text-gray-700">
          {listing.description}
        </h1>
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
