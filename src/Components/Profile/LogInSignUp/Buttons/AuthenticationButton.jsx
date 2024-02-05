import { useAuth0 } from "@auth0/auth0-react";
//Components Import
import LogInButton from "./LogInButton";
import LogOutButton from "./LogOutButton";

const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <LogOutButton /> : <LogInButton />;
};

export default AuthenticationButton;
