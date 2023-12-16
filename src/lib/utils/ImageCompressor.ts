import Compressor from "compressorjs";
export const ImageCompressor = async (
  image: File
): Promise<File | Blob | null> => {
  const data = new Promise<Blob | null | File>((resolve, reject) => {
    new Compressor(image, {
      quality: 0.8, 
      convertSize: 1000000 / 5,
      success: (compressedResult) => {
        resolve(compressedResult);
      },
      error: () => {
        reject(null);
      },
    });
  });

  return data;
};
