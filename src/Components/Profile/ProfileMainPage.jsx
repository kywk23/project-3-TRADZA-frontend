import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

//Component imports
import LogOutButton from "./LogInSignUp/Buttons/LogOutButton";
import { useUserId } from "../Users/GetCurrentUser";

function ProfileMainPage() {
  const { isAuthenticated } = useAuth0();
  const { currentUser } = useUserId();

  return (
    <div>
      <h1>Profile - Main Page</h1>
      <br />

      {currentUser && <h2> Hello ! {currentUser.firstName} </h2>}
      <br />
      <div>
        <li>
          <Link to="/profile/edit">Edit Profile</Link>
        </li>
      </div>
      <br />
      <br />
      {isAuthenticated && <LogOutButton />}
    </div>
  );
}

export default ProfileMainPage;
