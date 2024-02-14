import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
//Component imports
import { BACKEND_URL } from "../../../constants";
import { useUserId } from "../Users/GetCurrentUser";
//css imports
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";

export default function AddListings() {
  const { currentUser } = useUserId();
  const userId = currentUser.id;
  const storage = getStorage();
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  // ALL STATES
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [listingImage, setListingImage] = useState(null);
  const [listingImageUrl, setListingImageUrl] = useState([]);
  const [newListing, setNewListing] = useState({
    name: "",
    description: "",
    userId: userId,
    numberOfLikes: 0,
    condition: "",
    listingStatus: true,
  });

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
    try {
      e.preventDefault();
      const categoriesToSubmit = selectedCategories.map((category) => category.value);

      const token = await getAccessTokenSilently();
      console.log("Access Token:", token);

      const storageRefInstance = ref(storage, `listingImages/${newListing.name}`);
      const url = await uploadBytes(storageRefInstance, listingImage).then(() =>
        getDownloadURL(storageRefInstance)
      );
      setListingImageUrl(url);

      const response = await axios.post(`${BACKEND_URL}/listings`, newListing);

      const newListingId = response.data.id;
      console.log(`newListingId`, newListingId);

      await axios.post(`${BACKEND_URL}/categories/create-listings-categories`, {
        listingId: newListingId,
        categories: categoriesToSubmit,
      });

      await axios
        .post(
          `${BACKEND_URL}/listingImages/${newListingId}`,
          { url: url },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((postImage) => {
          console.log("Image Post Response:", postImage);
          setNewListing({
            name: "",
            description: "",
            userId: userId,
            numberOfLikes: 0,
            condition: "New",
            listingStatus: false,
          });
        });
    } catch (error) {
      console.error("Error handling the submission:", error);
    }
    navigate(`/mylistings`);
  };

  // useEffect(() => {
  //   console.log(`listid`, listingId);
  // });

  // useEffect(() => {
  //   const uploadImage = async () => {
  //     try {
  //       if (!listingId) {
  //         console.error("Error: Listing ID is null or undefined");
  //         return;
  //       }

  //       const uploadPromises = Array.from(listingImage).map((image) => {
  //         const storageRefInstance = ref(storage, `listingImage/${newListing.name}`);
  //         return uploadBytes(storageRefInstance, image).then(() =>
  //           getDownloadURL(storageRefInstance)
  //         );
  //       });

  //       const urls = await Promise.all(uploadPromises);
  //       setListingImageUrl(urls);

  //       const token = await getAccessTokenSilently();
  //       console.log("Access Token:", token);

  //       const response = await axios.post(
  //         `${BACKEND_URL}/listingImage/${listingId}`,
  //         { url: urls },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       console.log("Upload Response:", response);
  //     } catch (error) {
  //       console.error("Error uploading images:", error);
  //     }
  //   };
  //   if (listingId !== null) {
  //     uploadImage();
  //   }
  // }, [newListing]);

  // useEffect(() => {
  //   const fetchDisplayPicture = async () => {
  //     try {
  //       if (currentUser) {
  //         const storageRefInstance = ref(storage, DB_STORAGE_PP_KEY + currentUser.id);
  //         const url = await getDownloadURL(storageRefInstance);
  //         setDisplayPictureUrl(url);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching display picture:", error);
  //     }
  //   };

  //   fetchDisplayPicture();
  // }, [currentUser, storage]);

  return (
    <div className="flex flex-col justify-center items-center">
      <Link to="/home">
        <FontAwesomeIcon icon={faHouseChimney} className="hover:text-blue-500 text-3xl" />
      </Link>
      <br />
      <h2 className="text-base font-semibold leading-7 text-gray-900">Add a Listing</h2>
      <br />
      {/* START OF FORM */}
      <form
        className="w-full max-w-lg border-4 border-black rounded-xl p-12 shadow-md "
        onSubmit={handleSubmit}
      >
        {/* Display selected images */}
        {/* <div className="flex mt-4">
          {listingImage.map((image, index) => (
            <div key={index}>
              <img src={listingImageUrl} className="rounded-md w-16 h-16 object-cover" />
            </div>
          ))}
        </div> */}

        {/* IMAGE UPLOAD */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="bg-white px-4 py-2 rounded-md cursor-pointer">
              <FontAwesomeIcon icon={faCameraRetro} className="hover:text-blue-500 text-3xl" />
              <input type="file" onChange={(e) => setListingImage(e.target.files[0])} />
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
