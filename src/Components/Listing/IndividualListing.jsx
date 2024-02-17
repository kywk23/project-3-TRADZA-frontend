import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../../constants";
//css imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faHeart } from "@fortawesome/free-solid-svg-icons";

export default function IndividualListing() {
  const navigate = useNavigate();
  let { listingId } = useParams();

  const [listing, setListing] = useState({});

  const backButton = () => {
    navigate(-1);
  };

  const likesClickButton = () => {
    setListing((prevListing) => ({
      ...prevListing,
      numberOfLikes: prevListing.numberOfLikes + 1,
    }));
  };

  useEffect(() => {
    axios.get(`${BACKEND_URL}/listings/${listingId}`).then((response) => {
      console.log(response.data);
      setListing(response.data);
    });
  }, []);

  const handleClick = () => {
    navigate(`/initiate-trade?listingId=${listingId}`);
  };

  // const userFirstName =  listing.user.firstName ? null
  const displayPictureUrl =
    listing.listing_display_pictures?.[0]?.url || "https://placehold.co/1080x720";

  return (
    <div className="flex flex-col items-center py-8 text-3xl">
      <FontAwesomeIcon
        className="hover:text-orange-500 text-3xl"
        icon={faLeftLong}
        onClick={backButton}
      />
      <br />
      {/* CARD */}
      <div
        className="card lg:card-side bg-black shadow-xl p-1"
        style={{ maxWidth: "70%", maxHeight: "90%" }}
      >
        <figure>
          <img src={displayPictureUrl} style={{ maxWidth: "90%", maxHeight: "90%" }} />
        </figure>
        <div className="card-body text-white">
          <div className="flex justify-between mb-2">
            <h2 className="card-title">{listing.name}</h2>
          </div>
          <div className="flex justify-start">
            <FontAwesomeIcon
              className="m-2"
              style={{ color: "red", fontSize: "1.5rem" }}
              icon={faHeart}
              onClick={likesClickButton}
            />{" "}
            <p className="text-sm p-2">{listing.numberOfLikes} likes</p>
          </div>
          <br />
          <p>{listing.description}.</p>
          <div className="card-actions justify-between">
            <p className="text-sm p-2 rounded text-white">{listing.user?.firstName}</p>
            <button
              className="p-2 rounded text-sm"
              style={{ backgroundColor: "orange" }}
              onClick={handleClick}
            >
              Initiate Trade
            </button>
          </div>
        </div>
      </div>
      {/* card end */}
    </div>
  );
}
