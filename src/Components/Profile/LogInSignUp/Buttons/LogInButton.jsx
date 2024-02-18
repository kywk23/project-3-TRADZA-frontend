import { useAuth0 } from "@auth0/auth0-react";

const LogInButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="bg-green-500 p-2 px-4 m-2 rounded-xl text-white w-32 h-10"
      onClick={() =>
        loginWithRedirect({
          redirectUri: `${window.location.origin}/home`,
        })
      }
    >
      LOG IN
    </button>
  );
};

export default LogInButton;
