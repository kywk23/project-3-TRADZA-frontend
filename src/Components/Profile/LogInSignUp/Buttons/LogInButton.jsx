import { useAuth0 } from "@auth0/auth0-react";

const LogInButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="btn btn-primary btn-block"
      onClick={() =>
        loginWithRedirect({
          redirectUri: `${window.location.origin}/home`,
        })
      }
    >
      Log In
    </button>
  );
};

export default LogInButton;
