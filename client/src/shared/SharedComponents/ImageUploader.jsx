import React, { useRef, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Button, Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import { clear_image } from "../../slices/imageSlice";
import { useDispatch } from "react-redux";
import { Loading } from ".";

const ImageUploader = ({ onChange, album, type, isMultiple }) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [albumName, setAlbumName] = useState(album);
  const [compressImages, setCompressImages] = useState(false);

  const handleFileChange = event => {
    const selectedFiles = Array.from(event.target.files);
    // If not multiple, only take the first file
    const filesToUse = isMultiple ? selectedFiles : selectedFiles.slice(0, 1);

    const selectedPreviewUrls = filesToUse.map(file => URL.createObjectURL(file));

    setFiles(filesToUse);
    setPreviewUrls(selectedPreviewUrls);
  };

  const handleAlbumNameChange = event => {
    setAlbumName(event.target.value);
  };

  const fileInputRef = useRef(null);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();

    files.forEach(file => {
      formData.append("images", file);
    });

    formData.append("albumName", albumName);
    formData.append("compress", compressImages);

    try {
      const response = await axios.post(`/api/images/upload/${type}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the response based on whether it's multiple or single
      const uploadedImages = response.data;
      onChange(uploadedImages); // Pass the entire array, let ImageWizard handle single/multiple

      setLoading(false);
      dispatch(clear_image({}));

      // Reset the form
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setFiles([]);
      setPreviewUrls([]);
    } catch (error) {
      setLoading(false);
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
                multiple={isMultiple}
                accept="image/*"
                ref={fileInputRef}
              />
              <label htmlFor={`${album}-upload-input`}>
                <Button variant="contained" component="span">
                  {"Select"}
                </Button>
              </label>
            </div>
            <div>
              <Button variant="contained" type="submit" disabled={files.length === 0}>
                {"Upload"}
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

ImageUploader.propTypes = {
  onChange: PropTypes.func.isRequired,
  album: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isMultiple: PropTypes.bool.isRequired,
};

export default ImageUploader;
