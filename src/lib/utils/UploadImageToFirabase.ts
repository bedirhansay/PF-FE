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
        return { status: 200, url: existingUrl };
      }
    } catch (error) {
      console.log("Dosya bulunamadı. Yeni bir dosya yükleniyor.");
    }

    
    const blob = new Blob([image]);
    await uploadBytes(imgRef, blob);


    const url = await getDownloadURL(imgRef);

    return {
      status: 201,
      url: url,
    };
  } catch (error) {
    return {
      status: 500,
      message: error,
    };
  }
};
