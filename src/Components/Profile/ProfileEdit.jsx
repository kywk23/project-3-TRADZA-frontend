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
    <div className="flex flex-col justify-center items-center">
      {/* Hello User First Name */}
      <div>
        <br />
        {currentUser && (
          <h2 className="text-xl">
            {" "}
            Hello! <span className="font-semibold"> {currentUser.firstName} </span>{" "}
          </h2>
        )}
      </div>
      <br />
      {/* Start of Form */}
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            <ImageUpload />
          </label>
          <br />
          {/* Mobile Number */}
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
              className="bg-white text-black input input-bordered input-warning w-64 flex items-center"
            />
          </label>
          <br />
          <br />

          {/* Address Edits */}
          <h2>
            <strong>Your Address :</strong>
          </h2>

          <label>
            Area:
            <input
              name="area"
              type="text"
              value={area}
              onChange={handleChange}
              className="bg-white text-black input input-bordered input-warning w-64 flex items-center"
            />
          </label>
          <br />
          <label>
            Zip Code:
            <input
              name="zipCode"
              type="number"
              value={zipCode}
              onChange={handleChange}
              className="bg-white text-black input input-bordered input-warning w-64 flex items-center"
            />
          </label>
          <br />
          <br />
          <input
            type="submit"
            value="Update Profile "
            className="btn btn-primary mt-4 px-6 py-2 rounded-full bg-blue-500 text-white font-semibold"
          />
        </form>
      </div>
    </div>
  );
}

export default ProfileEdit;
