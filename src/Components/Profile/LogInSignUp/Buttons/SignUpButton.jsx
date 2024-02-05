import { useAuth0 } from "@auth0/auth0-react";

const SignUpButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="btn btn-primary btn-block"
      onClick={() =>
        loginWithRedirect({
          authorizationParams: {
            screen_hint: "signup",
          },
        })
      }
    >
      Sign Up
    </button>
  );
};

export default SignUpButton;
