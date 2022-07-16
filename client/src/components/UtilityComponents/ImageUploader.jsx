import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { GLButton } from "../GlowLEDsComponents";

const ImageUploader = () => {
  const [ images, setImages ] = useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div className="">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <GLButton
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </GLButton>
            &nbsp;
            <GLButton onClick={onImageRemoveAll}>Remove all images</GLButton>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image["data_url"]} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <GLButton onClick={() => onImageUpdate(index)}>
                    Update
                  </GLButton>
                  <GLButton onClick={() => onImageRemove(index)}>
                    Remove
                  </GLButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImageUploader;
