import "./App.css";
import Landing from "./Components/Landing";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./Components/Signup";
import Products from "./Components/Products";
import Services from "./Components/Services";

function App() {
  const router = createBrowserRouter([
    {
      path: "/landing",
      element: <Landing />,
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
      path: "/products",
      element: <Products />,
    },
    {
      path: "/services",
      element: <Services />,
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
