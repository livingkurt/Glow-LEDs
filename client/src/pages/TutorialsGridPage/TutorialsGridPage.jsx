import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../../api";
import { useNavigate, useLocation } from "react-router-dom";
import "./TutorialsGridPage.scss";
import TutorialModal from "./component/TutorialModal";
import { close_tutorial_modal, open_tutorial_modal } from "../../slices/tutorialSlice";
import TutorialSection from "./component/TutorialSection";
import { Box, Container, Grid, Typography } from "@mui/material";

const TutorialsGridPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const tutorialPage = useSelector(state => state.tutorials.tutorialPage);
  const { tutorials, loading, tutorial_modal, tutorial } = tutorialPage;

  useEffect(() => {
    let clean = true;
    if (clean) {
      const params = new URLSearchParams(location.search);
      const tutorialParam = params.get("tutorial");
      if (tutorialParam && tutorials.length > 0) {
        const tutorial = tutorials.find(t => t.pathname === tutorialParam);
        if (tutorial) {
          dispatch(open_tutorial_modal(tutorial));
        }
      }
    }
    return () => (clean = false);
  }, [dispatch, location.search, tutorials]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listTutorials({ limit: 0, page: 0, sort: [3, "desc"] }));
    }
    return () => (clean = false);
  }, [dispatch]);

  const handleOpen = tutorial => {
    dispatch(open_tutorial_modal(tutorial));
    const newPath = `/collections/all/tutorials?tutorial=${tutorial.pathname}`;
    navigate(newPath);
  };

  const handleClose = () => {
    dispatch(close_tutorial_modal(tutorial));
    const newPath = "/collections/all/tutorials";
    navigate(newPath);
  };

  const beginnerTutorials = tutorials?.filter(item => item.level === "beginner");
  const intermediateTutorials = tutorials?.filter(item => item.level === "intermediate");
  const advancedTutorials = tutorials?.filter(item => item.level === "advanced");

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Typography variant="h4" textAlign={"center"}>
          Learn Gloving
        </Typography>
        <h2 className="ta-c">Your Journey Starts Here</h2>
        <p>
          Welcome to our Gloving Training Arena! Learn the art of gloving with our collection of videos, from the basics
          to melting serious face. Our talented glovers will guide you step by step, providing tips and tricks to help
          you improve your skills and create your own unique light shows. Get ready to leave your audience speechless
          with your mesmerizing moves!
        </p>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TutorialSection
              title="Beginner"
              defaultOpen
              tutorials={beginnerTutorials}
              handleOpen={handleOpen}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <TutorialSection
              title="Intermediate"
              tutorials={intermediateTutorials}
              handleOpen={handleOpen}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <TutorialSection title="Advanced" tutorials={advancedTutorials} handleOpen={handleOpen} loading={loading} />
          </Grid>
        </Grid>
      </Container>
      <TutorialModal selectedTutorial={tutorial} handleClose={handleClose} open={tutorial_modal} />
    </>
  );
};

export default TutorialsGridPage;
