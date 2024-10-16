import { useState } from "react";

const useImageUpload = () => {
  const [images, setImages] = useState([]);
  const [albumTitle, setAlbumTitle] = useState("");

  const handleImageChange = event => {
    setImages(event.target.files);
  };

  const handleAlbumTitleChange = event => {
    setAlbumTitle(event.target.value);
  };

  return {
    images,
    albumTitle,
    handleImageChange,
    handleAlbumTitleChange,
  };
};

export default useImageUpload;
