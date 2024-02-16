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
        console.log(`Response:`, response.data.id);
        const uploadDefaultDP = await axios.post(
          `${BACKEND_URL}/images/displaypictures/${response.data.id}`,
          {
            userDpUrl:
              "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg",
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
    <div className=" flex flex-col justify-center items-center">
      <h1>
        Welcome onboard <strong>Tradza!</strong>
      </h1>
      <br />
      <h2>Let's get to know you better!</h2>
      <br />
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              First Name<span className="text-red-500"> *</span>
            </label>
            {/* // First Name */}
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              type="text"
              placeholder="Chen"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              placeholder="Dol"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Mobile Number<span className="text-red-500"> *</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="1234 5678"
              type="number"
              required
              name="mobileNumber"
              value={mobileNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <input className="btn btn-wide text-white" type="submit" value="Submit" />
        </div>
      </form>
      <br />
      <p className="text-red-500 text-xs italic">Please fill out this field.</p>
      <br />
    </div>
  );
}

export default ProfileFirstTimeUpdate;
