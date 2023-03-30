import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../../api";
import { useHistory, useLocation } from "react-router-dom";
import "./TutorialsGridPage.scss";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";

const TutorialsGridPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const tutorialSlice = useSelector(state => state.tutorialSlice);
  const { tutorials, loading, error } = tutorialSlice;

  const [open, setOpen] = useState(false);
  const [selectedTutorial, setSelectedTutorial] = useState(null);

  useEffect(() => {
    let clean = true;
    if (clean) {
      const params = new URLSearchParams(location.search);
      const tutorialParam = params.get("tutorial");
      if (tutorialParam && tutorials.length > 0) {
        const tutorial = tutorials.find(t => t.pathname === tutorialParam);
        if (tutorial) {
          setSelectedTutorial(tutorial);
          setOpen(true);
        }
      }
    }
    return () => (clean = false);
  }, [dispatch, location.search, tutorials]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listTutorials());
    }
    return () => (clean = false);
  }, [dispatch]);

  const handleOpen = tutorial => {
    setSelectedTutorial(tutorial);
    const newPath = `/collections/all/tutorials?tutorial=${tutorial.pathname}`;
    history.push(newPath);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTutorial(null);
    const newPath = "/collections/all/tutorials";
    history.push(newPath);
  };

  const tutorialModal = (
    <Modal open={open} onClose={handleClose} aria-labelledby="tutorial-modal" aria-describedby="tutorial-modal-description">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80vw",
          maxWidth: "800px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "10px",
          color: "#333333"
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "text.primary"
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" component="h2" align="center" mb={2} color="inherit">
          {selectedTutorial?.title}
        </Typography>
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${selectedTutorial?.video}`}
          title={selectedTutorial?.title}
          frameBorder="0"
          style={{ borderRadius: "20px" }}
          allowFullScreen
        ></iframe>
        <Typography variant="body1" align="left" mt={2} color="inherit">
          {selectedTutorial?.description}
        </Typography>
        <Typography variant="h5" align="center" mt={2} color="inherit">
          Learn more about {selectedTutorial?.affiliate.artist_name}
        </Typography>
      </Box>
    </Modal>
  );

  return (
    <div>
      <h1 className="ta-c">Learn Gloving</h1>
      <h2 className="ta-c">You're Journey Starts Here</h2>
      <p>
        Welcome to our our gloving dojo! Learn the art of gloving with our collection of videos, from the basics to melting serious face.
        Our talented glovers will guide you step by step, providing tips and tricks to help you improve your skills and create your own
        unique light shows. Get ready to leave your audiance speechless with your mesmorizing moves!
      </p>
      <h2 className="ta-c">Beginner</h2>
      <Grid container spacing={2}>
        {tutorials.map(item => (
          <Grid item xs={12} md={4} key={item.video}>
            <CardMedia
              component="img"
              image={`http://img.youtube.com/vi/${item.video}/hqdefault.jpg`}
              alt={item.title}
              loading="lazy"
              className="br-20px"
              onClick={() => handleOpen(item)}
              style={{ cursor: "pointer" }}
            />
            <h3 style={{ color: "white" }} className="ta-c">
              {item.title} by {item?.affiliate.artist_name}
            </h3>
          </Grid>
        ))}
      </Grid>
      <h2 className="ta-c">More to Come!</h2>
      <p className="ta-c">We will release videos on a regular basis, so be sure to check back often for new tutorials!</p>
      {tutorialModal}
    </div>
  );
};

export default TutorialsGridPage;
