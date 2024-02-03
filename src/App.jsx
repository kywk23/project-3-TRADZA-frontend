import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./Components/Signup";
import ListingsPage from "./Components/Listings/ListingsPage";
import IndividualListing from "./Components/Listings/IndividualListing";
import AddListings from "./Components/Listings/AddListings";

function App() {
  const router = createBrowserRouter([
    {
      path: "/categories",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
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
