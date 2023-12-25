import { ImageCompressor, imageDb } from "@utils";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  getMetadata,
} from "firebase/storage";
import toast from "react-hot-toast";

type FilesData = {
  path: string;
  image: File;
  name: string;
};

export const uploadImageToFirabase = async (file: FilesData) => {
  try {
    if (!file) {
      throw new Error("Lütfen bir dosya seçin.");
    }

    const { image, path, name } = file;
    let compressedImage = await ImageCompressor(image);

    const imgRef = ref(imageDb, `${path}/${name}`);

    try {
      const existingMetadata = await getMetadata(imgRef);

      if (existingMetadata) {
        const existingUrl = await getDownloadURL(imgRef);
        toast.success("Resim başarıyla yüklendi.");
        return { status: 200, url: existingUrl };
      }
    } catch (error) {
      toast.success("Resim başarıyla yüklendi.");
      console.log("Dosya bulunamadı. Yeni bir dosya yükleniyor.");
    }

    const blob = new Blob([compressedImage as Blob]);
    await uploadBytes(imgRef, blob);

    const url = await getDownloadURL(imgRef);

    return {
      status: 201,
      url: url,
    };
  } catch (error: any) {
    toast.error("Hata:" + error.message);
  }
};
