import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function IndividualListing() {
  const [listing, setListing] = useState({
    name: "Test Name",
    description: "Test Description",
  });
  let { listingId } = useParams();

  //API Call: Get listings using listingId
  //setListing

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/initiate-trade`);
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
        <h1 className="text-xl font-semibold text-gray-700">{listing.name}</h1>
        <img src="../src/Assets/Electronics.jpg" className="my-8 w-80 h-60" />
        <h1 className="text-xl font-semibold text-gray-700">{listing.description}</h1>
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
