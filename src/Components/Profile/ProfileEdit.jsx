import { useState } from "react";

function ProfileEdit() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [displayPicture, setDisplayPicture] = useState("");
  const [area, setArea] = useState("");
  const [zipCode, setZipCode] = useState("");

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

  return (
    <div>
      <h1>Edit Profile:</h1>
      <form>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Mobile Number:
          <input type="number" value={mobileNumber} onChange={handleChange} />
        </label>
        <br />
        <label>
          Display Picture:
          <input type="url" value={displayPicture} onChange={handleChange} />
        </label>
        <br />
        <label>
          Area:
          <input type="text" value={area} onChange={handleChange} />
        </label>
        <br />
        <label>
          Zip Code:
          <input type="number" value={zipCode} onChange={handleChange} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default ProfileEdit;
