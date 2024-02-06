import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//components IMPORTS
import { BACKEND_URL } from "../../../constants";

function ProfileFirstTimeUpdate() {
  //States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const navigate = useNavigate();
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleChange = (event) => {
    switch (event.target.name) {
      case "firstName":
        setFirstName(event.target.value);
        break;
      case "lastName":
        setLastName(event.target.value);
        break;
      case "mobileNumber":
        setMobileNumber(event.target.value);
        break;
      default:
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isAuthenticated) {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.post(
          `${BACKEND_URL}/users`,
          {
            email: user.email,
            firstName: firstName,
            lastName: lastName,
            mobileNumber: mobileNumber,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(`Response:`, response.data);
        console.log(firstName, lastName, mobileNumber);
        setFirstName("");
        setLastName("");
        setMobileNumber("");
      } catch (error) {
        console.log(`Error:`, error);
      }
    }
    navigate("/home");
  };

  return (
    <div>
      <h1>Welcome onboard to Barter-Trade!</h1>
      <h2>Let's get you set up!</h2>
      <h2>What's your name?</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          First Name *:
          <input
            type="text"
            required
            name="firstName"
            value={firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </label>
        <br />
        <label>
          Mobile Number *:
          <input
            type="number"
            required
            name="mobileNumber"
            value={mobileNumber}
            onChange={handleChange}
            placeholder="Mobile Number"
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default ProfileFirstTimeUpdate;
