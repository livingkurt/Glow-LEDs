import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// Set up custom styles for the Paper component
const StyledBox = styled(Box)({
  padding: "16px",
  textAlign: "center"
});

const ImageUploader = ({ onUpload }) => {
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [albumName, setAlbumName] = useState("");

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
    <StyledBox sx={{ marginTop: 4 }}>
      <Container maxWidth="sm">
        {/* <Typography variant="h5" component="h1" gutterBottom>
          Image Uploader
        </Typography> */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                size="small"
                id="album-name"
                label="Album Name"
                variant="outlined"
                fullWidth
                value={albumName}
                onChange={handleAlbumNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <input type="file" hidden onChange={handleFileChange} id="upload-input" multiple />
              <label htmlFor="upload-input">
                <Button variant="contained" component="span">
                  Select Files
                </Button>
              </label>
            </Grid>
            {previewUrls.map((url, index) => (
              <Grid item xs={12} key={index}>
                <img src={url} alt="Preview" style={{ maxWidth: "100%" }} />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button variant="contained" type="submit" disabled={files.length === 0}>
                Upload
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </StyledBox>
  );
};

export default ImageUploader;
