import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { Link } from "react-router-dom";
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
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Link to={`/collections/all/sponsors/${selectedTutorial?.affiliate.pathname}`}>
            <Button variant="contained" color="primary">
              Learn more about {selectedTutorial?.affiliate.artist_name}
            </Button>
          </Link>
        </Box>
      </GLDisplayModal>
    </div>
  );
};

export default TutorialModal;
