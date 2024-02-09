import UserTradeList from "./UserTradeList";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../../constants";
import { Button } from "react-bootstrap";

export default function TradeRoom() {
  const [tradeDetails, setTradeDetails] = useState({});
  const [user, setUser] = useState({});
  const [partner, setPartner] = useState({});
  const [userListings, setUserListings] = useState([]);
  const [partnerListings, setPartnerListings] = useState([]);
  const [userTradeListings, setUserTradeListings] = useState([]);
  const [partnerTradeListings, setPartnerTradeListings] = useState([]);
  let { tradeId } = useParams();

  const userId = 4;

  useEffect(() => {
    const fetchTradeDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/trades/${tradeId}`);
        setTradeDetails(response.data);
        const currentUserId = response.data.listingInitiator;
        const currentPartnerId = response.data.listingAcceptor;

        const currentUserListingsPromise = getListingsByUserId(currentUserId);
        const currentPartnerListingsPromise =
          getListingsByUserId(currentPartnerId);

        const [currentUserListings, currentPartnerListings] = await Promise.all(
          [currentUserListingsPromise, currentPartnerListingsPromise]
        );

        const currentUserPromise = getUserDetails(currentUserId);
        const currentPartnerPromise = getUserDetails(currentPartnerId);
        const [currentUser, currentPartner] = await Promise.all([
          currentUserPromise,
          currentPartnerPromise,
        ]);

        if (currentUserId == userId) {
          setUserListings(currentUserListings);
          setPartnerListings(currentPartnerListings);
          setUser(currentUser);
          setPartner(currentPartner);
        } else {
          setUserListings(currentPartnerListings);
          setPartnerListings(currentUserListings);
          setUser(currentPartner);
          setPartner(currentUser);
        }
      } catch (error) {
        console.error("Failed to fetch trade details:", error);
      }
    };

    if (tradeId) {
      fetchTradeDetails();
    }
  }, []);

  const getListingsByUserId = async (userId) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/listings/user-listings`,
        {
          params: {
            userId: userId,
            listingStatus: true,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching listings:", error);
      throw error;
    }
  };

  const getUserDetails = async (userId) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  };

  return (
    <div className="flex flex-col items-center mx-auto max-w-6xl p-5 bg-gray-200 my-4 rounded-lg shadow">
      <h1 className="text-3xl">Trade Room</h1>
      <div className="flex justify-between w-full p-2 my-4">
        <div className="flex flex-col justify-center items-center border-black border-2 p-3 h-96 w-56">
          <UserTradeList user={user} userListings={userListings} />
          {console.log(user)}
        </div>
        <div className="flex flex-col justify-center items-center border-black border-2 p-3 h-96 w-96">
          ChatRoom
        </div>
        <div className="flex flex-col justify-center items-center border-black border-2 p-3 h-96 w-56">
          <UserTradeList user={partner} userListings={partnerListings} />
          {console.log(partner)}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center border-black border-2 w-full h-72 my-4">
        Trading Space
      </div>
    </div>
  );
}
