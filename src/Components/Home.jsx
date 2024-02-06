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
  const { isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0();

  //States
  const [userEmail, setUserEmail] = useState("");
  // const [authToken, setAuthToken] = useState("");

  //Arrays
  const categories = ["electronics", "household", "books", "repair", "chores", "tuition"];

  useEffect(() => {
    if (isAuthenticated) {
      setUserEmail(user.email);
      getAccessTokenSilently()
        .then((res) =>
          axios.post(
            `${BACKEND_URL}/users`,
            { email: userEmail },
            {
              headers: {
                Authorization: `Bearer ${res}`,
              },
            }
          )
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
  }, [getAccessTokenSilently, isAuthenticated, user, userEmail]);

  //To get the user's email AFTER they first sign up and log in.
  //   const checkUserEmail = async () => {
  //   try {
  //     const res = await axios.post(, { email: userEmail }, {
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     });
  //     // Handle the response if needed
  //     console.log("API Response:", res.data);
  //   } catch (error) {
  //     // Handle errors here
  //     console.error("API Error:", error);
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (isAuthenticated) {
  //       setUserEmail(user.email);
  //       const fetchToken = await getAccessTokenSilently();
  //       setAuthToken(fetchToken);
  //       console.log("Current userEmail:", userEmail);
  //       checkUserEmail();
  //     }
  //   };

  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isAuthenticated, userEmail]);

  return (
    <>
      <h1>Home Page (this is a placeholder) </h1>
      {/* Displays Loading when the page is loading */}
      <br />
      {isAuthenticated && <p> Welcome, {user.name} </p>}
      <br />
      <div>
        {categories.map((category, index) => (
          <div key={index}>
            <Link to={`/categories/${category.toLowerCase()}`}>{category}</Link>
          </div>
        ))}
      </div>
      <br />
      {/* Once user is logged in. Hide LogIn and Sign Up buttons.  */}
      {isLoading
        ? null
        : !isAuthenticated && (
            <>
              <h2>Log in here: </h2>
              <AuthenticationButton />
              <br />
              <br />
              <h3>No Account? Sign up here:</h3>
              <SignUpButton />
              <br />
            </>
          )}
    </>
  );
}
