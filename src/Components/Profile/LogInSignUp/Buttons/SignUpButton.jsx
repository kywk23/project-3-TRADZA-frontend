import { useAuth0 } from "@auth0/auth0-react";

const SignUpButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="bg-orange-500 p-2 px-4 m-2 rounded-xl text-white"
      onClick={() =>
        loginWithRedirect({
          authorizationParams: {
            screen_hint: "signup",
          },
          redirectUri: `${window.location.origin}/firstsignup`,
        })
      }
    >
      SIGN UP
    </button>
  );
};

export default SignUpButton;
