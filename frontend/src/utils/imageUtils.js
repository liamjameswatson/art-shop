import toast from "react-hot-toast";
import {
  uploadProductImage,
  uploadOtherImages,
} from "../productHooks/useImages";

export const uploadImage = async function (imageFile) {
  const formData = new FormData();
  formData.append("image", imageFile);
  try {
    const res = await uploadProductImage(formData);
    toast.success("uploaded image successfully");
    return res.image;
  } catch (error) {
    toast.error(error?.data?.message || error.error);
    console.log(error);
    throw error;
  }
};

export const uploadImages = async function (imageArray) {
  const formData = new FormData();
  const newOtherImages = [];

  for (let i = 0; i < imageArray.length; i++) {
    formData.append("otherImages", imageArray[i]);
    newOtherImages.push(imageArray[i].name); // Store file names
  }

  try {
    const res = await uploadOtherImages(formData);
    toast.success("uploaded other images successfully");
    return res.images;
  } catch (error) {
    toast.error(error?.data?.message || error.error);
    console.log(error);
    throw error;
  }
};
