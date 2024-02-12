import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { BACKEND_URL } from "../../../constants";
import { useUserId } from "../Users/GetCurrentUser";

export default function AddListings() {
  const { currentUser } = useUserId();
  const userId = currentUser.id;

  const [newListing, setNewListing] = useState({
    name: "",
    description: "",
    userId: userId,
    numberOfLikes: 0,
    condition: "",
    listingStatus: true,
  });
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/categories`).then((response) => {
      setAllCategories(response.data);
    });
  }, []);

  useEffect(() => {
    setNewListing((prevState) => ({
      ...prevState,
      userId: userId,
    }));
  }, [userId]);
  const categoryOptions = allCategories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const conditionOptions = [
    { value: "new", label: "New" },
    { value: "used", label: "Used" },
    { value: "used_once", label: "Used_once" },
  ];

  const handleSelectChange = (selected) => {
    setSelectedCategories(selected);
  };

  function handleConditionChange(selectedOption) {
    setNewListing((prevState) => ({
      ...prevState,
      conditions: selectedOption ? selectedOption.value : "",
    }));
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setNewListing((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoriesToSubmit = selectedCategories.map(
      (category) => category.value
    );

    axios.post(`${BACKEND_URL}/listings`, newListing).then((response) => {
      const listingId = response.data.id;
      return axios
        .post(`${BACKEND_URL}/categories/create-listings-categories`, {
          listingId: listingId,
          categories: categoriesToSubmit,
        })
        .then((response) => {
          console.log(response);
        });
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
        to="/home"
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
          <Select
            name="condition"
            options={conditionOptions}
            onChange={handleConditionChange}
            className="w-full p-2 border rounded-md"
            classNamePrefix="select"
          />
        </label>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <Select
            isMulti
            options={categoryOptions}
            onChange={handleSelectChange}
          />
        </div>
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
