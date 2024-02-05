import { useState } from "react";

function ProfileEdit() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [displayPicture, setDisplayPicture] = useState("");
  const [area, setArea] = useState("");
  const [zipCode, setZipCode] = useState("");

  return (
    <div>
      <h1>Edit Profile:</h1>
      <form>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <br />
        <label>
          Mobile Number:
          <input
            type="number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </label>
        <br />
        <label>
          Display Picture:
          <input
            type="url"
            value={displayPicture}
            onChange={(e) => setDisplayPicture(e.target.value)}
          />
        </label>
        <br />
        <label>
          Area:
          <input type="text" value={area} onChange={(e) => setArea(e.target.value)} />
        </label>
        <br />
        <label>
          Zip Code:
          <input type="number" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default ProfileEdit;
