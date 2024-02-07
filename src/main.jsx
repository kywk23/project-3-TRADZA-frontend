import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import GetCurrentUser from "./Components/Users/GetCurrentUser.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={import.meta.env.VITE_SOME_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_SOME_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: import.meta.env.VITE_SOME_AUTH0_AUDIENCE,
      scope: "read:current_user update:current_user_metadata openid profile email",
    }}
  >
    <GetCurrentUser>
      <App />
    </GetCurrentUser>
  </Auth0Provider>
);
