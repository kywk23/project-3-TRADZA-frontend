import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constants";

//Components import
import AuthenticationButton from "./Profile/LogInSignUp/Buttons/AuthenticationButton";
import SignUpButton from "./Profile/LogInSignUp/Buttons/SignUpButton";

export default function Home() {
  //Auth0

  const { isAuthenticated, isLoading } = useAuth0();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllCategories();
  }, []);

  return (
    <>
      <div className=" flex flex-col justify-center items-center">
        {/* Displays Loading when the page is loading */}
        <br />
        <div>
          {categories.map((category, index) => (
            <div key={index}>
              <Link to={`/categories/${category.name.toLowerCase()}`}>{category.name}</Link>
            </div>
          ))}
        </div>

        <br />
        {/* Once user is logged in. Hide LogIn and Sign Up buttons.  */}
        {/* NEEDS TO FIX */}
        {isLoading
          ? null
          : !isAuthenticated && (
              <div className="flex m-5 gap-8 items-center max-w-screen-xl ">
                <div className="flex-1 btn btn-black">
                  <AuthenticationButton />
                </div>
                <div className="flex-1 ">
                  <p className="text-xs italic ">No Account?</p>
                  <SignUpButton />
                </div>
              </div>
            )}
      </div>
    </>
  );
}
