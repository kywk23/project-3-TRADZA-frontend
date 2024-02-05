import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components Import
import LandingPage from "./Components/LandingPage";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import ProfileMainPage from "./Components/Profile/ProfileMainPage";
import ListingsPage from "./Components/Listings/ListingsPage";
import IndividualListing from "./Components/Listings/IndividualListing";
import AddListings from "./Components/Listings/AddListings";
import ProfileEdit from "./Components/Profile/ProfileEdit";

function App() {
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
      path: "/categories/electronics",
      element: <ListingsPage />,
    },
    {
      path: "/listings/index",
      element: <IndividualListing />,
    },
    {
      path: "/add-listing",
      element: <AddListings />,
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
