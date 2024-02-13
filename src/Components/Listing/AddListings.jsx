import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { BACKEND_URL } from "../../../constants";
import { useUserId } from "../Users/GetCurrentUser";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";

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
  const [listingImages, setListingImages] = useState([]);

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
    { value: "used_once", label: "Used Once" },
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

    const categoriesToSubmit = selectedCategories.map((category) => category.value);

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

  return (
    <div className="flex flex-col justify-center items-center">
      <Link to="/home">
        <FontAwesomeIcon icon={faHouseChimney} className="hover:text-blue-500 text-3xl" />
      </Link>
      <br />
      <h2 className="text-base font-semibold leading-7 text-gray-900">Add a Listing</h2>
      <br />
      {/* START OF FORM */}
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        {/* Display selected images */}
        <div className="flex mt-4">
          {listingImages.map((image, index) => (
            <div key={index}>
              <img src={image} className="rounded-md w-16 h-16 object-cover" />
            </div>
          ))}
        </div>

        {/* IMAGE UPLOAD */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="bg-white px-4 py-2 rounded-md cursor-pointer">
              <FontAwesomeIcon icon={faCameraRetro} className="hover:text-blue-500 text-3xl" />
              <input
                type="file"
                onChange={(e) => setListingImages(...e.target.files)}
                multiple
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-xs font-bold mb-2">Name</label>
            {/* First Name */}
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border-2 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white border-black "
              name="name"
              value={newListing.name}
              onChange={handleChange}
              type="text"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Description
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-100 text-gray-700 border-2 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white border-black "
              type="text"
              name="description"
              value={newListing.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Condition
            </label>
            <Select
              name="condition"
              options={conditionOptions}
              onChange={handleConditionChange}
              className="w-full p-2 border rounded-md"
              classNamePrefix="select"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Category
            </label>
            <Select
              isMulti
              name="category"
              options={categoryOptions}
              onChange={handleSelectChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>
        <br />
        <div className="flex justify-center">
          <input className="btn btn-wide text-white" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}
