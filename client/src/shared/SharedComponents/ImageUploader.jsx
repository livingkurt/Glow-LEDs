// import React, { useState } from "react";
// import ImageUploading from "react-images-uploading";
// import { GLButton } from "../GlowLEDsComponents";

// const ImageUploader = () => {
//   const [images, setImages] = useState([]);
//   const maxNumber = 69;

//   const onChange = (imageList, addUpdateIndex) => {
//     // data for submit

//     setImages(imageList);
//   };

//   return (
//     <div className="">
//       <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
//         {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
//           // write your building UI
//           <div className="upload__image-wrapper">
//             <GLButton style={isDragging ? { color: "red" } : undefined} onClick={onImageUpload} {...dragProps}>
//               Click or Drop here
//             </GLButton>
//             &nbsp;
//             <GLButton onClick={onImageRemoveAll}>Remove all images</GLButton>
//             {imageList.map((image, index) => (
//               <div key={index} className="image-item">
//                 <img src={image["data_url"]} alt="" width="100" />
//                 <div className="image-item__btn-wrapper">
//                   <GLButton onClick={() => onImageUpdate(index)}>Update</GLButton>
//                   <GLButton onClick={() => onImageRemove(index)}>Remove</GLButton>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </ImageUploading>
//     </div>
//   );
// };

// export default ImageUploader;

import { API_Products } from "../../utils";
import { useRef } from "react";
import useImageUpload from "../Hooks/useImageUpload";

const ImageUploader = () => {
  const { images, albumTitle, handleImageChange, handleAlbumTitleChange } = useImageUpload();
  const fileInputRef = useRef(null);

  const handleUpload = () => {
    const formData = new FormData();
    for (let image of images) {
      formData.append("images", image);
    }
    formData.append("album_title", albumTitle);
    API_Products.image_upload_products_a(formData);
  };

  return (
    <div>
      <input type="file" multiple style={{ display: "none" }} ref={fileInputRef} onChange={handleImageChange} />
      <button onClick={() => fileInputRef.current.click()}>Select Images</button>
      <input type="text" value={albumTitle} onChange={handleAlbumTitleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};
export default ImageUploader;
