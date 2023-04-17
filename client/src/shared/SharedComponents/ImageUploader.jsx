import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)({
  // padding: "16px",
  // textAlign: "center"
});

const ImageUploader = ({ onUpload, album }) => {
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [albumName, setAlbumName] = useState(album);

  const handleFileChange = event => {
    const selectedFiles = event.target.files;
    const selectedPreviewUrls = [];

    // Loop through the selected files and create preview URLs
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const previewUrl = URL.createObjectURL(file);
      selectedPreviewUrls.push(previewUrl);
    }

    setFiles(Array.from(selectedFiles));
    setPreviewUrls(selectedPreviewUrls);
  };

  const handleAlbumNameChange = event => {
    setAlbumName(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    formData.append("albumName", albumName);

    try {
      const response = await axios.post("/api/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      onUpload(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pv-20px">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={9}>
            <TextField
              size="small"
              id="album-name"
              label="Album Name"
              variant="outlined"
              value={albumName}
              onChange={handleAlbumNameChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3} container justifyContent="space-around">
            <div>
              <input type="file" hidden onChange={handleFileChange} id="upload-input" multiple />
              <label htmlFor="upload-input">
                <Button variant="contained" component="span">
                  Select
                </Button>
              </label>
            </div>
            <div>
              <Button variant="contained" type="submit" disabled={files.length === 0}>
                Upload
              </Button>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="flex-end">
          {previewUrls.map((url, index) => (
            <Grid item xs={4} key={index}>
              <img src={url} alt="Preview" style={{ maxWidth: "100%" }} />
            </Grid>
          ))}
        </Grid>
      </form>
    </div>
  );
};

export default ImageUploader;
