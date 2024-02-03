import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddListings() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [displayPicture, setDisplayPicture] = useState(null);
  const [tradeLocation, setTradeLocation] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDisplayPicture(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data:", {
      name,
      description,
      condition,
      displayPicture,
      tradeLocation,
    });
    setName("");
    setDescription("");
    setCondition("");
    setDisplayPicture(null);
    setTradeLocation("");
  };

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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </label>
        <label className="block mb-2">
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
          ></textarea>
        </label>
        <label className="block mb-2">
          Condition:
          <input
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </label>
        <label className="block mb-2">
          Display Picture:
          <input
            type="file"
            onChange={(e) => handleFileChange(e)}
            className="w-full p-2 border rounded-md"
          />
        </label>
        <label className="block mb-2">
          Trade at Where:
          <input
            type="text"
            value={tradeLocation}
            onChange={(e) => setTradeLocation(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </label>
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
