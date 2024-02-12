import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

//Components import
import { BACKEND_URL } from "../../../constants";
import { useUserId } from "../Users/GetCurrentUser";
import ImageUpload from "../Upload/ImageUpload";

function ProfileEdit() {
  //states
  const [mobileNumber, setMobileNumber] = useState("");
  const [area, setArea] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState([]);
  //
  const { currentUser } = useUserId();
  const userId = currentUser.id;
  const { getAccessTokenSilently } = useAuth0();

  //To fetch Address on userid
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const response = await axios.get(`${BACKEND_URL}/users/address/${userId}`);
          setAddress(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userId]);

  //To render in input fields
  useEffect(() => {
    setMobileNumber(currentUser.mobileNumber);
    console.log(`address is`, address);
    if (address.length > 0) {
      setArea(address[0].area);
      setZipCode(address[0].zipCode);
    }
  }, [address, currentUser]);

  const handleChange = (event) => {
    switch (event.target.name) {
      case "mobileNumber":
        setMobileNumber(event.target.value);
        break;
      case "area":
        setArea(event.target.value);
        break;
      case "zipCode":
        setZipCode(event.target.value);
        break;
      default:
    }
  };

  const updateMobileNumber = async () => {
    const token = await getAccessTokenSilently();
    const response = await axios.put(
      `${BACKEND_URL}/users/edit/mobile/${userId}`,
      {
        mobileNumber: mobileNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(token);
    console.log(`phone num updated`, response);
  };

  const updateAddress = async () => {
    const token = await getAccessTokenSilently();
    const response = await axios.put(
      `${BACKEND_URL}/users/edit/address/${userId}`,
      {
        area: area,
        zipCode: zipCode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(`address updated`, response);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    updateMobileNumber(mobileNumber);
    updateAddress(area, zipCode);
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <br />
      {currentUser && <h2> Hello ! {currentUser.firstName} </h2>}
      <form onSubmit={handleSubmit}>
        <br />
        <label>
          <p>
            <strong>Your Mobile Number: </strong>
          </p>
          <input
            name="mobileNumber"
            type="number"
            value={mobileNumber}
            onChange={handleChange}
            placeholder="New number put here ah"
          />
        </label>
        <br />
        <label>
          <p> Display Picture: </p>
          {/* this is a component  */}
          <ImageUpload />
        </label>
        <br />
        <br />
        {/* Address Edits */}
        <h2>
          <strong>Your currrent Address is:</strong>
        </h2>
        {/* <ul>
          {address.map((address) => (
            <li key={address.id}>
              <strong>Area:</strong> {address.area} <br />
              <strong>Zip Code:</strong> {address.zipCode}
            </li>
          ))}
        </ul> */}
        <br />
        <label>
          Area:
          <input name="area" type="text" value={area} onChange={handleChange} />
        </label>
        <br />
        <label>
          Zip Code:
          <input name="zipCode" type="number" value={zipCode} onChange={handleChange} />
        </label>
        <br />
        <br />
        <input type="submit" value="Update Profile BUTTON" />
      </form>
    </div>
  );
}

export default ProfileEdit;
