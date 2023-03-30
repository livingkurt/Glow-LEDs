import { Typography } from "@mui/material";
import React from "react";
import GLDisplayModal from "../../../shared/GlowLEDsComponents/GLDisplayModal/GLDisplayModal";

const TutorialModal = ({ selectedTutorial, handleClose, open }) => {
  return (
    <div>
      <GLDisplayModal onClose={handleClose} open={open} title={selectedTutorial?.title}>
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
      </GLDisplayModal>
    </div>
  );
};

export default TutorialModal;
