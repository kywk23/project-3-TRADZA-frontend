import { DB_STORAGE_PP_KEY } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUserId } from "../Users/GetCurrentUser";
import { useState, useEffect } from "react";

function ImageUpload() {
  const storage = getStorage();
  const { currentUser } = useUserId();
  const [displayPictureUrl, setDisplayPictureUrl] = useState("");
  const [fileValue, setFileValue] = useState(null);

  // upload image to firebase
  // take url (downloadUrl) => .post to postgre (display pic model)
  //.get from postgre; tracking where user_id == user_id .
  //render all
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

  const uploadImage = async () => {
    try {
      const storageRefInstance = ref(storage, DB_STORAGE_PP_KEY + currentUser.id);
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

  return (
    <div>
      {displayPictureUrl && (
        <img src={displayPictureUrl} alt="Uploaded" style={{ maxWidth: "25%", maxHeight: "25%" }} />
      )}
      <input
        className="bg-blue-500"
        type="file"
        onChange={(e) => setFileValue(e.target.files[0])}
      />
      <button className="bg-red-500" onClick={uploadImage}>
        {" "}
        upload image{" "}
      </button>
    </div>
  );
}

export default ImageUpload;
