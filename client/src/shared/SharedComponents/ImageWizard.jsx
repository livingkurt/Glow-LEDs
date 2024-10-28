import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import ImageUploader from "./ImageUploader";
import ImageDisplay from "./ImageDisplay";
import * as API from "../../api";
import { useDispatch } from "react-redux";

const ImageWizard = ({ fieldData, fieldState, onChange, fieldName }) => {
  const dispatch = useDispatch();
  const [link, setLink] = useState("");

  const extractImageLinks = text => {
    const thumbs2Regex = /https:\/\/thumbs2\.imgbox\.com\/[a-zA-Z0-9\/]+_t\.(jpeg|png|jpg)/g;
    const imgurRegex = /https:\/\/i\.imgur\.com\/[a-zA-Z0-9]+\.(jpeg|png|jpg)/g;
    const images2Regex = /https:\/\/images2\.imgbox\.com\/[a-zA-Z0-9\/]+_o\.(jpeg|png|jpg)/g;

    const thumbs2Links = text.match(thumbs2Regex) || [];
    const imgurLinks = text.match(imgurRegex) || [];
    const images2Links = text.match(images2Regex) || [];

    return [...thumbs2Links, ...imgurLinks, ...images2Links];
  };

  const handleSaveId = async () => {
    const foundLinks = extractImageLinks(link);

    if (foundLinks) {
      const fetchedImages = await Promise.all(
        foundLinks.map(singleLink => dispatch(API.getImagesByLink({ album: fieldData.album, link: singleLink })))
      );

      const newImages = fetchedImages.map(({ payload }) => payload);

      if (Array.isArray(fieldState) || fieldData.forceArray) {
        onChange([...fieldState, ...newImages]);
      } else if (typeof fieldState === "object") {
        onChange(newImages[0]); // Only use the first image for single image fields
      } else {
        onChange(newImages);
      }
    }
    setLink("");
  };

  const handleImageUpload = uploadedImages => {
    if (Array.isArray(fieldState) || fieldData.forceArray) {
      onChange([...fieldState, ...uploadedImages]);
    } else if (typeof fieldState === "object") {
      onChange(uploadedImages[0]); // Only use the first image for single image fields
    } else {
      onChange(uploadedImages);
    }
  };

  const images = Array.isArray(fieldState)
    ? fieldState
    : fieldState && Object.keys(fieldState).length > 0
      ? [fieldState]
      : [];

  return (
    <div>
      <Typography className="title_font mt-10px ta-c">{fieldData.label}</Typography>
      <ImageUploader onChange={handleImageUpload} album={fieldData.album} fieldName={fieldName} type="image" />
      <div className="ai-c g-10px">
        <TextField
          label="Enter an Image Link"
          multiline={Array.isArray(fieldState)}
          fullWidth
          margin="normal"
          size="small"
          onChange={e => setLink(e.target.value)}
        />
        <Button variant="contained" sx={{ height: "40px" }} onClick={handleSaveId}>
          {"Save"}
        </Button>
      </div>
      <ImageDisplay
        images={images}
        fieldName={fieldName}
        onChange={value => {
          if (Array.isArray(fieldState)) {
            onChange(value);
          } else {
            onChange(value[0]); // Only use the first image for single image fields
          }
        }}
      />
    </div>
  );
};

export default ImageWizard;
