import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

//Component imports
import LogOutButton from "./LogInSignUp/Buttons/LogOutButton";
import { useUserId } from "../Users/GetCurrentUser";

function ProfileMainPage() {
  const { isAuthenticated } = useAuth0();
  const { currentUser } = useUserId();

  return (
    <div className="flex flex-col justify-center items-center">
      <br />
      {currentUser && (
        <h2 className="text-xl">
          {" "}
          Hello! <span className="font-semibold"> {currentUser.firstName} </span>{" "}
        </h2>
      )}
      <br />
      <div>
        <li className="link link-hover">
          <Link to="/profile/edit">Edit Profile</Link>
        </li>
      </div>
      <br />
      <br />
      {isAuthenticated && (
        <div className="btn btn-error ">
          <LogOutButton />
        </div>
      )}
    </div>
  );
}

export default ProfileMainPage;
