import { DB_STORAGE_PP_KEY } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUserId } from "../Users/GetCurrentUser";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";

function ImageUpload() {
  const storage = getStorage();
  const { currentUser } = useUserId();
  const [displayPictureUrl, setDisplayPictureUrl] = useState("");
  const [fileValue, setFileValue] = useState(null);

  const uploadImage = async () => {
    try {
      const storageRefInstance = ref(storage, fileValue.name);
      console.log(storageRefInstance);
      const url = await uploadBytes(storageRefInstance, fileValue).then(() =>
        getDownloadURL(storageRefInstance)
      );
      console.log(fileValue);
      console.log(`getDownloadurl`, getDownloadURL);
      setDisplayPictureUrl(url);
      console.log(`url`, url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    const fetchDisplayPicture = async () => {
      try {
        if (currentUser) {
          const storageRefInstance = ref(storage, DB_STORAGE_PP_KEY + currentUser.id);
          const url = await getDownloadURL(storageRefInstance);
          setDisplayPictureUrl(url);
        }
      } catch (error) {
        console.error("Error fetching display picture:", error);
      }
    };

    fetchDisplayPicture();
  }, [currentUser, storage]);

  return (
    <div>
      {displayPictureUrl && (
        <img src={displayPictureUrl} alt="Uploaded" className="avatar w-24 rounded-full" />
      )}
      <br />
      <label className="bg-white px-4 py-2 rounded-md cursor-pointer">
        <FontAwesomeIcon icon={faCameraRetro} />
        <input type="file" onChange={(e) => setFileValue(e.target.files[0])} className="hidden" />
        <br />
      </label>
      <button className="btn btn-outline btn-success" onClick={uploadImage}>
        {" "}
        Change my Display{" "}
      </button>
    </div>
  );
}

export default ImageUpload;
