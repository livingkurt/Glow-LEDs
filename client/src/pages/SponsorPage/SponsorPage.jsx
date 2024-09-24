import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { LazyImage } from "../../shared/SharedComponents";
import { API_Users } from "../../utils";
import { GLButton } from "../../shared/GlowLEDsComponents";
import * as API from "../../api";

const SponsorPage = () => {
  const params = useParams();
  const [teams, set_teams] = useState([]);
  const navigate = useNavigate();
  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { affiliate } = affiliatePage;
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.detailsAffiliate({ pathname: params.promo_code }));
    }
    return () => (clean = false);
  }, []);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (affiliate && affiliate._id) {
        find_team();
      }
    }
    return () => (clean = false);
  }, [affiliate]);

  const find_team = async () => {
    try {
      const { data } = await API_Users.get_teams(affiliate._id);
      set_teams(data);
    } catch (error) {}
  };

  const date = new Date();

  const today = date.toISOString();
  return (
    <div className="main_container p-20px">
      {affiliate && (
        <Helmet>
          <title>{affiliate.artist_name + " | Glow LEDs"}</title>
          <meta property="og:title" content={affiliate.artist_name + " | Glow LEDs"} />
          <meta name="twitter:title" content={affiliate.artist_name + " | Glow LEDs"} />
          <link rel="canonical" href={"https://www.glow-leds.com/sponsors/" + affiliate.pathname} />
          <meta property="og:url" content={"https://www.glow-leds.com/sponsors/" + affiliate.pathname} />
          <meta name="description" content={affiliate.bio} />
          <meta property="og:description" content={affiliate.bio} />
          <meta name="twitter:description" content={affiliate.bio} />
        </Helmet>
      )}

      {affiliate && (
        <div className="">
          <div className="jc-b">
            <GLButton variant="secondary" onClick={() => navigate(-1)}>
              Back
            </GLButton>
            {/* {current_user?.isAdmin && (
              <Link to={"/secure/glow/editaffiliate/" + params.pathname}>
                <GLButton variant="secondary" style={{ width: "156px" }}>
                  Edit Affiliate
                </GLButton>
              </Link>
            )} */}
          </div>

          <div className="column jc-c">
            <h2 style={{ textAlign: "center" }}>{affiliate.artist_name}</h2>
          </div>
          <div className="">
            <LazyImage
              className="sponsor-image sponsor_image_small"
              alt={affiliate.artist_name}
              title="Sponsor Image"
              size={{
                height: "auto",
                width: "100%",
                display: "none",
                maxWidth: "unset",
                maxHeight: "unset",
              }}
              effect="blur"
              src={affiliate.picture}
            />
          </div>
          <div className="jc-b">
            <div className="" style={{ flex: "1 1 70%" }}>
              <div>
                <h3 className="">Who be this</h3>
                <p className="p_descriptions">
                  {affiliate.user && affiliate.user.first_name} {affiliate.user && affiliate.user.last_name}
                </p>
              </div>
              <div>
                <h3 className="">Gloving for</h3>
                <p className="p_descriptions">{affiliate.years} Years</p>
              </div>
              <div>
                <h3 className="">Chillin in </h3>
                <p className="p_descriptions">{affiliate.location}</p>
              </div>
              <div>
                <h3 className="">Bio</h3>
                <p className="p_descriptions">{affiliate.bio}</p>
              </div>
              {affiliate.inspiration && (
                <div>
                  <h3 className="">Inspired by</h3>
                  <p className="p_descriptions">{affiliate.inspiration}</p>
                </div>
              )}
              <div>
                <h3 className="">Follow {affiliate.artist_name} </h3>
                <div className="mt-2rem wrap  ">
                  <div className="fs-25px jc-fs w-100per max-w-500px ai-c">
                    <div className="fs-40px">
                      {affiliate.facebook_name && (
                        <a
                          href={affiliate.facebook_name}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Facebook"
                        >
                          <i className="fab fa-facebook zoom" />
                        </a>
                      )}
                    </div>
                    <div className="ml-10px fs-40px">
                      {affiliate.instagram_handle && (
                        <a
                          href={"https://www.instagram.com/" + affiliate.instagram_handle}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                        >
                          <i className="fab fa-instagram zoom" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <LazyImage
                className="sponsor-image sponsor_image_big"
                alt={affiliate.name}
                title="Sponsor Image"
                size={{ height: "auto", width: "100%" }}
                effect="blur"
                src={affiliate.picture}
              />
            </div>
          </div>
          <div className="column jc-c">
            <h3 style={{ textAlign: "center" }}>Watch {affiliate.artist_name} Throw Down</h3>
          </div>
          {affiliate.video && (
            <div className="jc-c pos-rel mt-2rem max-w-75rem m-auto">
              <div className="iframe-container">
                <iframe
                  width="996"
                  height="560"
                  title="sponsor"
                  style={{ borderRadius: "20px" }}
                  src={`https://www.youtube.com/embed/${affiliate.video}`}
                  frameborder="0"
                  allowfullscreen
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default SponsorPage;
