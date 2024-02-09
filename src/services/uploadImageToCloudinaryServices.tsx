import axios from "axios";

const uploadImageToCloudinary = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/aiportmissingthings/image/upload",
      formData
    );
    const imageURL = response.data.secure_url;
    return imageURL;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return null;
  }
};

export default uploadImageToCloudinary;
