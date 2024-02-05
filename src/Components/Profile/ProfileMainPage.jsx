import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

//Component imports
import LogOutButton from "./LogInSignUp/Buttons/LogOutButton";

function ProfileMainPage() {
  const { isAuthenticated, user } = useAuth0();

  return (
    <div>
      <h1>Profile - Main Page</h1>
      <br />
      {isAuthenticated && <p> Hello! {user.name}</p>}
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
