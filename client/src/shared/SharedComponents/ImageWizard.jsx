import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import ImageDisplay from "./ImageDisplay";
import * as API from "../../api";
import { useDispatch } from "react-redux";

const ImageWizard = ({ fieldData, fieldState, onChange, fieldName }) => {
  const dispatch = useDispatch();
  const [link, setLink] = useState("");

  const extractThumbs2Links = text => {
    const thumbs2Regex = /https:\/\/thumbs2\.imgbox\.com\/[a-zA-Z0-9\/]+_t\.(jpeg|png|jpg)/g;
    const imgurRegex = /https:\/\/i\.imgur\.com\/[a-zA-Z0-9]+\.(jpeg|png|jpg)/g;
    const thumbs2Links = text.match(thumbs2Regex) || [];
    const imgurLinks = text.match(imgurRegex) || [];
    return [...thumbs2Links, ...imgurLinks];
  };

  const handleSaveId = async () => {
    const foundLinks = extractThumbs2Links(link);

    if (foundLinks) {
      const fetchedImages = await Promise.all(
        foundLinks.map(singleLink => dispatch(API.getImagesByLink({ album: fieldData.album, link: singleLink })))
      );
      console.log({ fetchedImages, fieldState, fieldData, fieldName });

      if (Array.isArray(fieldState)) {
        onChange([...fieldState, ...fetchedImages.map(({ payload }) => payload)]);
      } else if (typeof fieldState === "object") {
        // Merge object properties if fieldState is an object
        // Note: This would overwrite properties if they have the same key
        onChange({ ...fieldState, ...Object.assign({}, ...fetchedImages.map(({ payload }) => payload)) });
      } else {
        onChange(fetchedImages.map(({ payload }) => payload));
      }
    }
    setLink("");
  };

  const images = [fieldState].flat();

  return (
    <div>
      <Typography className="title_font mt-10px ta-c">{fieldData.label}</Typography>
      <ImageUploader onChange={onChange} album={fieldData.album} fieldName={fieldName} type="image" />
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
          Save
        </Button>
      </div>
      <ImageDisplay images={images} fieldName={fieldName} onChange={value => onChange(value)} />
    </div>
  );
};

export default ImageWizard;
