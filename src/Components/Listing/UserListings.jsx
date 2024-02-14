import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../constants";

//Component imports
import { useUserId } from "../Users/GetCurrentUser";

function UserListings() {
  const [listing, setListing] = useState([]);
  const [listingAndImages, setListingAndImages] = useState([]);
  const { currentUser } = useUserId();
  const currentUserId = currentUser.id;

  const getListingsByUserId = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/listings/user-listings`, {
        params: {
          userId: currentUserId,
          listingStatus: true,
        },
      });
      setListing(response.data);
      console.log(`res data`, response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching listings:", error);
      throw error;
    }
  };

  const getListingImages = async (listingId) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/listingImages`, {
        params: {
          listingId: listingId,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching images for listingId ${listingId}:`, error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const listingsData = await getListingsByUserId();

      const listingsWithImages = await Promise.all(
        listingsData.map(async (listing) => {
          const images = await getListingImages(listing.id);
          return { ...listing, images };
        })
      );
      setListingAndImages(listingsWithImages);
    };

    fetchData();
  }, [currentUserId]);

  useEffect(() => {
    console.log(listingAndImages);
  });

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
        {listingAndImages.map((outerListing) => (
          <div
            key={outerListing.id}
            className="card w-96 bg-base-100 shadow-xl image-full border-2 border-black first-line:"
          >
            {outerListing.images.map((url, index) => (
              <figure key={index}>
                <img className="object-cover w-full h-full" src={url.url} />
              </figure>
            ))}
            {/* CARD BODY */}
            <div className="card-body">
              <h2 className="card-title text-white">{outerListing.name}</h2>
              <p>{outerListing.description}</p>
              <br />
              <div className="card-actions justify-end">
                {outerListing.categories.map((category) => (
                  <div className="m-2 badge badge-outline text-white" key={category.id}>
                    {category.name}
                  </div>
                ))}
              </div>
              <br />
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
