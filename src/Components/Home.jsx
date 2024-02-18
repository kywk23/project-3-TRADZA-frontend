import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constants";
import TradizaMarketMap2 from "../Assets/TradizaMarketMap2.png";

//Components import
import AuthenticationButton from "./Profile/LogInSignUp/Buttons/AuthenticationButton";
import SignUpButton from "./Profile/LogInSignUp/Buttons/SignUpButton";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/categories`);
        const categoriesData = response.data;

        // Hardcoded coordinates based on category name
        const hardcodedCoordinates = {
          electronics: { x1: 67.1875, y1: 13.76953125, x2: 91.30859375, y2: 23.6328125 },
          kitchenware: { x1: 71.6796875, y1: 88.0859375, x2: 99.4140625, y2: 93.65234375 },
          toys_games: { x1: 76.7578125, y1: 34.86328125, x2: 99.4140625, y2: 40.13671875 },
          office_products: { x1: 34.66796875, y1: 2.5390625, x2: 63.37890625, y2: 8.59375 },
          healthy_beauty: { x1: 8.10546875, y1: 17.1875, x2: 37.98828125, y2: 25.09765625 },
          clothing_shoes_jewelry: {
            x1: 1.85546875,
            y1: 45.99609375,
            x2: 26.26953125,
            y2: 58.59375,
          },
          musical_instruments: { x1: 15.234375, y1: 75.78125, x2: 36.71875, y2: 83.59375 },
          travel: { x1: 39.16015625, y1: 86.42578125, x2: 52.24609375, y2: 90.625 },
          // Add more categories with their coordinates
        };

        // Map the categories and add hardcoded coordinates
        const categoriesWithCoordinates = categoriesData.map((category) => ({
          ...category,
          ...hardcodedCoordinates[category.name],
        }));

        setCategories(categoriesWithCoordinates);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllCategories();
  }, []);

  const handleImageMapClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const clickX = ((event.clientX - rect.left) / rect.width) * 100;
    const clickY = ((event.clientY - rect.top) / rect.height) * 100;
    console.log(clickX, clickY);

    // Find the first category that matches the click coordinates
    const clickedCategory = categories.find((category) => {
      const area = {
        x1: category.x1,
        y1: category.y1,
        x2: category.x2,
        y2: category.y2,
      };

      return clickX >= area.x1 && clickX <= area.x2 && clickY >= area.y1 && clickY <= area.y2;
    });

    if (clickedCategory) {
      navigate(`/categories/${clickedCategory.name}`);
    }
  };

  return (
    <>
      <div className=" flex flex-col justify-center items-center bg-black">
        <p className="text-white">Welcome! Click on the stall you want to navigate to!</p>
        {/* Displays Loading when the page is loading */}
        {/* <div>
          {categories.map((category, index) => (
            <div key={index}>
              <Link to={`/categories/${category.name.toLowerCase()}`}>{category.name}</Link>
            </div>
          ))}
        </div> */}
        {/* Market image map */}
        <div className="border-5 border-black shadow-lg">
          <img
            src={TradizaMarketMap2}
            useMap="#tradizaMap"
            onClick={(event) => handleImageMapClick(event)}
          />
        </div>

        {/* Once user is logged in. Hide LogIn and Sign Up buttons.  */}
        {/* NEEDS TO FIX */}
        {isLoading
          ? null
          : !isAuthenticated && (
              <div className="flex m-5 gap-8 items-center max-w-screen-xl ">
                <div className="flex-1 ">
                  <AuthenticationButton />
                </div>
                <div className="flex-1 ">
                  <p className="text-xs italic text-orange-500 ">No Account?</p>
                  <SignUpButton />
                </div>
              </div>
            )}
      </div>
    </>
  );
}
