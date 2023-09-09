import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";
import ImageDisplay from "./ImageDisplay";
import * as API from "../../api";
import { useDispatch, useSelector } from "react-redux";

const ImageWizard = ({ fieldData, fieldState, onChange, fieldName }) => {
  const dispatch = useDispatch();
  const imagePage = useSelector(state => state.images.imagePage);
  const { image } = imagePage;
  const [text, setText] = useState("");

  const handleSaveId = () => {
    dispatch(API.getImagesByLink(text));
  };

  useEffect(() => {
    if (image && text) {
      onChange({ [fieldName]: [...fieldState, image] });
      setText("");
    }
  }, [image]);

  const images = [fieldState].flat();

  return (
    <div>
      <Typography className="title_font mt-10px ta-c">{fieldData.label}</Typography>
      <ImageUploader onUpload={onChange} album={fieldData.album} type="image" />
      <div className="ai-c g-10px">
        <TextField
          label="Enter an Image ID"
          fullWidth
          margin="normal"
          size="small"
          onChange={e => setText(e.target.value)}
        />
        <Button variant="contained" sx={{ height: "40px" }} onClick={handleSaveId}>
          Save
        </Button>
      </div>
      <ImageDisplay images={images} fieldName={fieldName} onChange={value => onChange({ [fieldName]: value })} />
    </div>
  );
};

export default ImageWizard;
