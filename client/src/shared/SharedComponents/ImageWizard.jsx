import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import ImageUploader from "./ImageUploader";
import ImageDisplay from "./ImageDisplay";
import PropTypes from "prop-types";
import * as API from "../../api";
import { useDispatch } from "react-redux";

const ImageWizard = ({ fieldData, fieldState, onChange, fieldName, isMultiple }) => {
  console.log({ fieldData, fieldState, onChange, fieldName, isMultiple });
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
  // Initialize fieldState as an array if it's empty and isMultiple is true
  const initializedFieldState = isMultiple && !Array.isArray(fieldState) ? [] : fieldState;

  const handleSaveId = async () => {
    const foundLinks = extractImageLinks(link);

    if (foundLinks) {
      const fetchedImages = await Promise.all(
        foundLinks.map(singleLink => dispatch(API.getImagesByLink({ album: fieldData.album, link: singleLink })))
      );

      const newImages = fetchedImages.map(({ payload }) => payload);

      if (isMultiple) {
        onChange([...(Array.isArray(initializedFieldState) ? initializedFieldState : []), ...newImages]);
      } else {
        onChange(newImages[0]); // Only use the first image for single image fields
      }
    }
    setLink("");
  };

  const handleImageUpload = uploadedImages => {
    if (isMultiple) {
      onChange([...(Array.isArray(initializedFieldState) ? initializedFieldState : []), ...uploadedImages]);
    } else {
      onChange(uploadedImages[0]); // Only use the first image for single image fields
    }
  };

  const images = isMultiple
    ? Array.isArray(initializedFieldState)
      ? initializedFieldState
      : []
    : initializedFieldState && Object.keys(initializedFieldState).length > 0
      ? [initializedFieldState]
      : [];

  return (
    <div>
      <Typography className="title_font mt-10px ta-c">{fieldData.label}</Typography>
      <ImageUploader
        onChange={handleImageUpload}
        album={fieldData.album}
        fieldName={fieldName}
        type="image"
        isMultiple={isMultiple}
      />
      <div className="ai-c g-10px">
        <TextField
          label="Enter an Image Link"
          multiline={isMultiple}
          fullWidth
          margin="normal"
          size="small"
          value={link}
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
          if (isMultiple) {
            onChange(value);
          } else {
            onChange(value[0]); // Only use the first image for single image fields
          }
        }}
      />
    </div>
  );
};

ImageWizard.propTypes = {
  fieldData: PropTypes.object.isRequired,
  fieldState: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  isMultiple: PropTypes.bool.isRequired,
};

export default ImageWizard;
