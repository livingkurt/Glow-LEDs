import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { humanize } from "../../utils/helper_functions";
import { useNavigate } from "react-router-dom";
import { GLButton } from "../../shared/GlowLEDsComponents";
import * as API from "../../api";
import Container from "@mui/material/Container";

import GLLazyImage from "../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";

const FeaturedPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const featurePage = useSelector(state => state.features);
  const { feature } = featurePage;
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.detailsFeature(params.pathname));
    }
    return () => (clean = false);
  }, []);

  const date = new Date();

  const today = date.toISOString();
  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Helmet>
        <title>{"Featured | Glow LEDs"}</title>
        <meta property="og:title" content="Featured" />
        <meta name="twitter:title" content="Featured" />
        <link rel="canonical" href="https://www.glow-leds.com/featured" />
        <meta property="og:url" content="https://www.glow-leds.com/featured" />
        <meta
          name="description"
          content="Here at Glow LEDs we want all you glovers, ravers, festival goers, and even home decor peeps to be apart of our community."
        />

        <meta
          property="og:description"
          content="Here at Glow LEDs we want all you glovers, ravers, festival goers, and even home decor peeps to be apart of our community."
        />

        <meta
          name="twitter:description"
          content="Here at Glow LEDs we want all you glovers, ravers, festival goers, and even home decor peeps to be apart of our community."
        />
      </Helmet>

      {feature && (
        <div className="">
          <div className="jc-b">
            <GLButton variant="secondary" onClick={() => navigate(-1)}>
              {"Back to Features"}
            </GLButton>
            {current_user?.isAdmin && (
              <Link to={"/secure/glow/editfeature/" + params.pathname}>
                <GLButton variant="secondary" style={{ width: "156px" }}>
                  {"Edit Feature"}
                </GLButton>
              </Link>
            )}
          </div>
          <div className="column jc-c">
            <h2 style={{ textAlign: "center" }}>{feature.artist_name}</h2>
          </div>
          <p className="p_descriptions" style={{ textAlign: "center" }}>
            {feature.description}
          </p>
          {feature.video && (
            <div className="jc-c pos-rel">
              <div className="iframe-container">
                <iframe
                  title="feature"
                  width="996"
                  height="560"
                  style={{ borderRadius: "20px" }}
                  src={`https://www.youtube.com/embed/${feature.video}`}
                  frameBorder="0"
                  allowfullscreen
                />
              </div>
            </div>
          )}
          <div className="products">
            {feature.images &&
              feature.images.map((image, index) => {
                return (
                  // <Zoom className="m-auto">
                  <div className="m-auto">
                    {/* <div className="responsive_container"> */}
                    <GLLazyImage className="m-1rem br-15px  h-auto ta-c responsive_img" alt="Feature" src={image} />
                    {/* </div> */}
                  </div>
                  // </Zoom>
                );
              })}
          </div>

          {/* <p className="p_descriptions" style={{ textAlign: 'center', marginBottom: 0 }}>
          Check out {feature.artist_name} with the {feature.product && humanize(feature.product)}!
          </p> */}
          <div className="mt-2rem wrap jc-c ">
            <div className="ml-10px fs-25px jc-b w-100per max-w-500px">
              {feature.facebook_name && (
                <div className="ml-10px fs-40px">
                  <a href={feature.facebook_name} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <i className="fab fa-facebook zoom" />
                  </a>
                </div>
              )}
              {feature.instagram_handle && (
                <div className="ml-10px fs-40px">
                  <a
                    href={"https://www.instagram.com/" + feature.instagram_handle}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram zoom" />
                  </a>
                </div>
              )}
            </div>
          </div>
          {feature.song_id && (
            <p className="p_descriptions" style={{ textAlign: "center" }}>
              {"Song ID: "}
              {feature.song_id}
            </p>
          )}

          <div className="p_descriptions" style={{ textAlign: "center" }}>
            <a className="jc-c w-100per" href={feature.link} target="_blank" rel="noopener noreferrer">
              {feature.product && (
                <GLButton variant="primary" className="" style={{ margin: "auto", marginBottom: "10px" }}>
                  {humanize(feature.product)}
                </GLButton>
              )}
            </a>
          </div>
        </div>
      )}
    </Container>
  );
};
export default FeaturedPage;
