import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as API from "../../api";
import { useHistory, useLocation } from "react-router-dom";
import "./TutorialsGridPage.scss";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import TutorialModal from "./component/TutorialModal";
import { close_tutorial_modal, open_tutorial_modal } from "../../slices/tutorialSlice";
import { Loading } from "../../shared/SharedComponents";

const TutorialsGridPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const tutorialSlice = useSelector(state => state.tutorialSlice);
  const { tutorials, loading, error, tutorial_modal, tutorial } = tutorialSlice;

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
      dispatch(API.listTutorials());
    }
    return () => (clean = false);
  }, [dispatch]);

  const handleOpen = tutorial => {
    dispatch(open_tutorial_modal(tutorial));
    const newPath = `/collections/all/tutorials?tutorial=${tutorial.pathname}`;
    history.push(newPath);
  };

  const handleClose = () => {
    dispatch(close_tutorial_modal(tutorial));
    const newPath = "/collections/all/tutorials";
    history.push(newPath);
  };

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
      <Loading loading={loading}>
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
      </Loading>
      <h2 className="ta-c">More to Come!</h2>
      <p className="ta-c">We will release videos on a regular basis, so be sure to check back often for new tutorials!</p>
      <TutorialModal selectedTutorial={tutorial} handleClose={handleClose} open={tutorial_modal} />
    </div>
  );
};

export default TutorialsGridPage;
