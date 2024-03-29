import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components Import
import LandingPage from "./Components/LandingPage";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
//Listing Pages
import ListingsPage from "./Components/Listing/ListingsPage";
import IndividualListing from "./Components/Listing/IndividualListing";
import AddListings from "./Components/Listing/AddListings";
import UserListings from "./Components/Listing/UserListings";
//Profile Pages
import ProfileMainPage from "./Components/Profile/ProfileMainPage";
import ProfileEdit from "./Components/Profile/ProfileEdit";
import ProfileFirstTimeUpdate from "./Components/Profile/ProfileFirstTimeUpdate";
//Trade Pages
import TradeRoom from "./Components/Trade/TradeRoom";
import InitiateTrade from "./Components/Trade/InitiateTrade";
import AllUserTrades from "./Components/Trade/AllUserTrades";
import InitiatorPendingTrade from "./Components/Trade/InitiatorPendingTrade";
import AcceptorPendingTrade from "./Components/Trade/AcceptorPendingTrade";
import BrowseListings from "./Components/Listing/BrowseListings";
import ChatRoom from "./Components/Trade/ChatRoom";
import { useUserId } from "./Components/Users/GetCurrentUser";

function App() {
  const { currentUser } = useUserId();
  const userId = currentUser.id;

  const router = createBrowserRouter([
    //LandingPage - Solely for user flow/aestheic purposes
    {
      path: "/",
      element: <LandingPage />,
    },
    //Home is Main page after Landing Page
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/firstsignup",
      element: <ProfileFirstTimeUpdate />,
    },
    //Profile Pages
    {
      path: "/profile",
      element: <ProfileMainPage />,
    },
    {
      path: "/profile/edit",
      element: <ProfileEdit />,
    },
    //Listing Pages
    {
      path: "/browse-listings",
      element: <BrowseListings />,
    },
    {
      path: "/mylistings",
      element: <UserListings />,
    },
    {
      path: "/categories/:category",
      element: <ListingsPage />,
    },
    {
      path: "/listings/:listingId",
      element: <IndividualListing />,
    },
    {
      path: "/add-listing",
      element: <AddListings />,
    },

    //Trade Room
    {
      path: "/traderoom/:tradeId",
      element: <TradeRoom />,
    },
    {
      path: "/initiate-trade",
      element: <InitiateTrade />,
    },
    {
      path: "/user-trades",
      element: <AllUserTrades />,
    },
    {
      path: "/user-trades/pending/initiator",
      element: <InitiatorPendingTrade />,
    },
    {
      path: "/user-trades/pending/acceptor",
      element: <AcceptorPendingTrade />,
    },
    {
      path: "/chat-test",
      element: <ChatRoom />,
    },
  ]);
  return (
    <>
      <div>
        <Navbar />
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
