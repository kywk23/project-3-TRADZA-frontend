import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../constants";

function UserListings() {
  // const [listing, setListing] = useState([]);

  // useEffect to get 2 .get if want both status or single
  // bring in user CONTEXT
  // Image must have own .get

  // const getListingsByUserId = async (userId) => {
  //   try {
  //     const response = await axios.get(`${BACKEND_URL}/listings/user-listings`, {
  //       params: {
  //         userId: userId,
  //         listingStatus: true,
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching listings:", error);
  //     throw error;
  //   }
  // };

  const listing = [
    {
      id: 1,
      title: "Shoes!",
      description: "If a dog chews shoes whose shoes does he choose?",
      imageUrl: "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    },
    {
      id: 2,
      title: "Rice",
      description: "Who wants Crane rice",
      imageUrl:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTzrCyzd7wkPVxNLPhIgncgqF1HM64cbotNw9XeESZv6_KrkIIRC2bQl7ka0aCMWBA2cRiTbPRpDUDVYRI9nGBbkc8kv0KtxqgfaIkL4PspFitD-O4IUiYCUunTkkqEJh6mPpuRMw&usqp=CAc",
    },
    {
      id: 3,
      title: "Game Boy",
      description: "Hope can sell",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1YjOwI7kTf7IMJFUEccTIZFAem-_v9xB25g&usqp=CAU",
    },
  ];

  return (
    <>
      {/* //START OF STATS */}
      <div className="flex flex-col justify-center items-center">
        <div className=" stats shadow bg-black text-white">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">No. of Items listed</div>
            <div className="stat-value">xx</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">No. of Trades Completed</div>
            <div className="stat-value">xx</div>
          </div>
        </div>
      </div>
      {/* //END OF STATS */}
      <div className="divider" />
      {/* START OF LISTINGS */}
      <div className="flex flex-wrap justify-center items-center mt-8 gap-8">
        {listing.map((listing) => (
          <div
            key={listing.id}
            className="card w-96 bg-base-100 shadow-xl image-full border-2 border-black first-line:"
          >
            <figure>
              <img
                src={listing.imageUrl}
                alt={listing.title}
                className="object-cover w-full h-full"
              />
            </figure>
            {/* CARD BODY */}
            <div className="card-body">
              <h2 className="card-title text-gray-100">{listing.title}</h2>
              <p>{listing.description}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-black text-white">Edit Or Delete Or View</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* END OF LISTINGS */}
    </>
  );
}

export default UserListings;
