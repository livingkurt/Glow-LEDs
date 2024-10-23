import React, { useRef, useState } from "react";
import axios from "axios";
import { Button, Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import { clear_image } from "../../slices/imageSlice";
import { useDispatch } from "react-redux";
import { Loading } from ".";

const ImageUploader = ({ onChange, album, type, fieldName }) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [albumName, setAlbumName] = useState(album);
  const [compressImages, setCompressImages] = useState(false);

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

  // At the top of your component
  const fileInputRef = useRef(null);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    formData.append("albumName", albumName);
    formData.append("compress", compressImages);

    try {
      const response = await axios.post(`/api/images/upload/${type}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onChange(response.data);
      setLoading(false);
      dispatch(clear_image({}));

      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setFiles([]);
      setPreviewUrls([]);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  return (
    <div className="pv-20px">
      <Loading loading={loading} />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={compressImages}
                  onChange={e => setCompressImages(e.target.checked)}
                  color="primary"
                />
              }
              label="Compress images"
            />
          </Grid>
          <Grid item xs={12} sm={3} container justifyContent="space-around">
            <div>
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                id={`${album}-upload-input`}
                multiple
                ref={fileInputRef}
              />
              <label htmlFor={`${album}-upload-input`}>
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
