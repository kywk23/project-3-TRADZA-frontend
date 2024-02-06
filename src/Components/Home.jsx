import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

//Components import
import AuthenticationButton from "./Profile/LogInSignUp/Buttons/AuthenticationButton";
import SignUpButton from "./Profile/LogInSignUp/Buttons/SignUpButton";

export default function Home() {
  //Auth0
  const { isAuthenticated, isLoading, user } = useAuth0();

  //Arrays
  const categories = ["electronics", "household", "books", "repair", "chores", "tuition"];

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
