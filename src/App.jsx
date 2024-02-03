import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Profile/LogInSignUp/LogIn";
import Navbar from "./Components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./Components/Profile/LogInSignUp/SignUp";
import ListingsPage from "./Components/Listings/ListingsPage";
import IndividualListing from "./Components/Listings/IndividualListing";
import AddListings from "./Components/Listings/AddListings";
import ProfileMainPage from "./Components/Profile/ProfileMainPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/profile",
      element: <ProfileMainPage />,
    },
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
