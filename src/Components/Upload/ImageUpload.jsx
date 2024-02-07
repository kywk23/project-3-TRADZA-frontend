import { DB_STORAGE_PP_KEY } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUserId } from "../Users/GetCurrentUser";
import { useState, useEffect } from "react";

function ImageUpload(props) {
  const storage = getStorage();
  const { currentUser } = useUserId();
  const [displayPictureUrl, setDisplayPictureUrl] = useState("");
  const [fileValue, setFileValue] = useState(null);
  const { file } = props;

  useEffect(() => {
    const storageRefInstance = ref(storage, DB_STORAGE_PP_KEY + currentUser.id);
    uploadBytes(storageRefInstance, fileValue)
      .then(() => getDownloadURL(storageRefInstance))
      .then((url) => {
        setDisplayPictureUrl(url);
      })
      .catch((error) => {
        console.error("Error upload:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, fileValue]);

  return (
    <div>
      <input className="bg-blue-500" type="file" onChange={setFileValue} />
    </div>
  );
}

export default ImageUpload;
