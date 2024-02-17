import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { BACKEND_URL } from "../../../constants";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useUserId } from "../Users/GetCurrentUser";

export default function InitiateTrade() {
  const [wantedListing, setWantedListing] = useState([]);
  const [offeredListings, setOfferedListings] = useState([]);
  const [chosenListing, setChosenListing] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeIndex, setActiveIndex] = useState(null);
  const listingId = searchParams.get("listingId");
  const { currentUser } = useUserId();
  const userId = currentUser.id;

  useEffect(() => {
    axios.get(`${BACKEND_URL}/listings/${listingId}`).then((response) => {
      setWantedListing(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/listings/user-listings`, {
        params: {
          userId: userId,
          listingStatus: true,
        },
      })
      .then((response) => {
        setOfferedListings(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.error("Error fetching listings:", error);
      });
  }, [userId]);

  const navigate = useNavigate();

  const handleInitiateTrade = () => {
    axios
      .post(`${BACKEND_URL}/trades`, {
        listingInitiator: userId,
        listingAcceptor: wantedListing.userId,
        tradeStatus: "Pending",
      })
      .then((response) => {
        const newTradeId = response.data.id;

        const linkListingsPromises = [
          axios.post(`${BACKEND_URL}/listingsTrades`, {
            tradeId: newTradeId,
            listingId: wantedListing.id,
          }),
          axios.post(`${BACKEND_URL}/listingsTrades`, {
            tradeId: newTradeId,
            listingId: chosenListing.id,
          }),
        ];

        Promise.all(linkListingsPromises)
          .then((responses) => {
            console.log("Both listings linked successfully:", responses);
            navigate(`/user-trades/pending/initiator?trade=${newTradeId}`);
          })
          .catch((error) => {
            console.error("An error occurred linking listings:", error);
          });

        axios
          .put(`${BACKEND_URL}/listings/change-reserved-status`, {
            newListingReservedStatus: true,
            listingId: chosenListing.id,
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  const handleChooseTradeClick = (index) => {
    offeredListings.forEach((listing, i) => {
      if (i === index) {
        setChosenListing(listing);
      }
    });
    setActiveIndex(index);
  };

  const handleCancelTrade = async () => {
    navigate("/browse-listings");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col justify-center items-center max-w-4xl bg-black text-white p-4 my-4 rounded-lg shadow">
        <h1 className="text-xl my-4">TRADE INITIATION</h1>
        <div className="text-sm p-2 my-4">You want: </div>
        <div className="text-2xl text-orange-500">{wantedListing.name}</div>
        <div className="text-sm p-2 my-4">What will you offer?</div>
        <div className="flex flex-col">
          {offeredListings.map((listing, index) => (
            <button
              className={`text-xl my-2 p-3 rounded-md ${
                activeIndex === index ? "bg-orange-500" : "bg-gray-400"
              }`}
              key={index}
              onClick={() => handleChooseTradeClick(index)}
            >
              {listing.name}
            </button>
          ))}
        </div>
        <div className="flex my-2">
          <button
            className="btn btn-success"
            style={{ margin: "1rem" }}
            onClick={handleInitiateTrade}
          >
            Initiate Trade
          </button>
          <button className="btn btn-error" style={{ margin: "1rem" }} onClick={handleCancelTrade}>
            Cancel Trade
          </button>
        </div>
      </div>
    </div>
  );
}
