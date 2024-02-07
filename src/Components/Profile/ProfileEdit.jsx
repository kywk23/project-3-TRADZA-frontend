import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

//Components import
import { BACKEND_URL } from "../../../constants";
import { useUserId } from "../Users/GetCurrentUser";

function ProfileEdit() {
  //states
  const [mobileNumber, setMobileNumber] = useState("");
  const [displayPicture, setDisplayPicture] = useState("");
  const [area, setArea] = useState("");
  const [zipCode, setZipCode] = useState("");
  //
  const { currentUser } = useUserId();
  const userId = currentUser.id;
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    setMobileNumber(currentUser.mobileNumber);
    //setArea incomplete. needs .get from address model
    setArea();
  }, [currentUser]);

  const handleChange = (event) => {
    switch (event.target.name) {
      case "mobileNumber":
        setMobileNumber(event.target.value);
        break;
      case "displayPicture":
        setDisplayPicture(event.target.value);
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
    console.log(token);
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
    console.log(response);
  };

  // const updateArea = async () => {
  //   const token = await getAccessTokenSilently();
  //   const response = await axios.put(
  //     `${BACKEND_URL}/users/edit/address/area/${userId}`,
  //     {
  //       area: area,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   console.log(response);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    updateMobileNumber(mobileNumber);
    // updateArea(area);
    // updateDisplayPicture
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <br />
      {currentUser && <h2> Hello ! {currentUser.firstName} </h2>}
      <form onSubmit={handleSubmit}>
        <br />
        <label>
          Mobile Number:
          <input name="mobileNumber" type="number" value={mobileNumber} onChange={handleChange} />
        </label>
        <br />
        <label>
          Display Picture:
          <input name="displayPicture" type="url" value={displayPicture} onChange={handleChange} />
        </label>
        <br />
        <br />
        {/* Address Edits */}
        <h2>Address</h2>
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
        <input type="submit" value="Edit Profile BUTTON" />
      </form>
    </div>
  );
}

export default ProfileEdit;
