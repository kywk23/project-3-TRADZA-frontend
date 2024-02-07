import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


export default function AddListings() {
  const [newListing, setNewListing] = useState({
    name: "",
    description: "",
    userId: 1,
    numberOfLikes: 0,
    condition: "New",
    listingStatus: false,
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setNewListing((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_SOME_BACKEND_URL}/listings`, newListing)
      .then((response) => {
        console.log(response);
      });

    setNewListing({
      name: "",
      description: "",
      userId: "",
      numberOfLikes: 0,
      condition: "New",
      listingStatus: false,
    });
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setDisplayPicture(file);
  // };

  return (
    <div className="flex flex-col items-center py-1">
      <Link
        to="/categories"
        className="inline-block text-blue-700 hover:text-blue-300 transition duration-300 ease-in-out py-4 text-3xl"
      >
        Back to Home
      </Link>
      <form
        onSubmit={handleSubmit}
        className="mt-8 p-4 bg-gray-300 rounded-md text-2xl"
      >
        <label className="block mb-2">
          Listing Name:
          <input
            type="text"
            name="name"
            value={newListing.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </label>
        <label className="block mb-2">
          Description:
          <textarea
            name="description"
            value={newListing.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          ></textarea>
        </label>
        <label className="block mb-2">
          Condition:
          <input
            type="text"
            name="condition"
            value={newListing.condition}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </label>
        {/* <label className="block mb-2">
          Display Picture:
          <input
            type="file"
            onChange={(e) => handleFileChange(e)}
            className="w-full p-2 border rounded-md"
          />
        </label> */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-700 text-white p-2 my-4 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
