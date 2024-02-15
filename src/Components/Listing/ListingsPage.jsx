import ListingCard from "./ListingCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../../constants.jsx";
import { useParams } from "react-router-dom";
//css imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";

export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  let { category } = useParams();

  const fetchAllListings = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/categories/${category}`);
      console.log(response.data);
      setListings(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAllListings();
  }, []);

  const formatCategoryName = (category) => {
    return category
      .split("_")
      .map((word) => word.toUpperCase())
      .join(" ");
  };

  return (
    <>
      <div className="flex flex-col items-center  justify-centerpy-1 text-3xl">
        <Link to="/home">
          <FontAwesomeIcon icon={faHouseChimney} className="hover:text-orange-500 text-3xl" />
        </Link>
        <br />

        <div className="divider divider-neutral">
          <h1 className="font-bold text-lg">{formatCategoryName(category)}</h1>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center mt-8 gap-8">
        {listings.map((listing, index) => (
          <div key={index}>
            <Link to={`/listings/${listing.id}`}>
              <ListingCard listing={listing} />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
