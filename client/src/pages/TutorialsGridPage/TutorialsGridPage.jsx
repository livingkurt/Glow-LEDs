import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LazyImage } from "../../shared/SharedComponents";
import * as API from "../../api";
import "./TutorialsGridPage.scss";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const TutorialsGridPage = () => {
  const dispatch = useDispatch();
  const tutorialSlice = useSelector(state => state.tutorialSlice);
  const { tutorials, loading, error } = tutorialSlice;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listTutorials());
    }
    return () => (clean = false);
  }, [dispatch]);

  return (
    <div>
      <h1 className="ta-c">Learn Gloving</h1>
      <h2 className="ta-c">You're Journey Starts Here</h2>
      <p>
        Welcome to our our gloving dojo! Learn the art of gloving with our collection of videos, from the basics to melting serious face.
        Our talented glovers will guide you step by step, providing tips and tricks to help you improve your skills and create your own
        unique light shows. Get ready to leave your audiance speechless with your mesmorizing moves!
      </p>
      <Grid container spacing={2}>
        {tutorials.map(item => (
          <Grid item xs={12} md={4} key={item.video}>
            <Link to={`/collections/all/tutorials/${item.pathname}`}>
              <CardMedia
                component="img"
                image={`http://img.youtube.com/vi/${item.video}/hqdefault.jpg`}
                alt={item.title}
                loading="lazy"
                className="br-20px"
              />
              <h3 style={{ color: "white" }} className="ta-c">
                {item.title} by {item.affiliate.artist_name}
              </h3>
            </Link>
          </Grid>
        ))}
      </Grid>
      <h2 className="ta-c">More to Come!</h2>
    </div>
  );
};

export default TutorialsGridPage;
