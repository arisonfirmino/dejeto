import imageCompression from "browser-image-compression";

export const resizeImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 500,
    useWebWorker: true,
  };

  const compressedFile = await imageCompression(file, options);

  return compressedFile;
};
