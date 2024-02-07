import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { BACKEND_URL } from "../../../constants";
import { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

function GetCurrentUser({ children }) {
  //States
  const [currentUser, setCurrentUser] = useState({});
  const { isAuthenticated, user } = useAuth0();

  //get email from auth0
  const checkCurrentUser = async () => {
    if (isAuthenticated) {
      try {
        const res = await axios.get(`${BACKEND_URL}/users/email/${user.email}`);
        console.log(res.data);
        const PgObject = res.data;
        setCurrentUser(PgObject);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      checkCurrentUser();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    console.log("DB Current User obj:", currentUser);
  }, [currentUser]);

  return <UserContext.Provider value={{ currentUser }}>{children}</UserContext.Provider>;
}

export const useUserId = () => {
  return useContext(UserContext);
};

export default GetCurrentUser;

//Usage for other components
// import { useUserId } from "./Users/GetCurrentUser";
//Decon
//  const { userId OR userFirstName } = useUserId(); (depends which is needed or both)
//Render as needed
// <p>User ID: {userID}</p>
// <p>User First Name: {userFirstName}</p>
