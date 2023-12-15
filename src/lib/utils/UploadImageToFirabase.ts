import {
  getDownloadURL,
  ref,
  uploadBytes,
  getMetadata,
} from "firebase/storage";
import { imageDb } from "./FirebaseConfig";

type FilesData = {
  field: string;
  image: string;
  name: string;
};

export const uploadImageToFirabase = async (filesData: FilesData) => {
  try {
    const { name, field, image } = filesData;
    const imgRef = ref(imageDb, `${field}/${name}`);

    try {
      const existingMetadata = await getMetadata(imgRef);

      if (existingMetadata) {
        const existingUrl = await getDownloadURL(imgRef);
        return existingUrl;
      }
    } catch (error) {
      console.log(error);
    }

    const blob = new Blob([image]);
    await uploadBytes(imgRef, blob);

    const url = await getDownloadURL(imgRef);

    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      status: 500,
      message: error,
    };
  }
};
