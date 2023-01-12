import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { detailsTeam } from "../../../actions/teamActions";
import { useHistory } from "react-router-dom";
import { LazyImage } from "../../../components/SharedComponents";
import { GLButton } from "../../../components/GlowLEDsComponents";
import { isAdmin } from "../../utils/helpers/user_helpers";

const TeamPage = props => {
  const history = useHistory();
  const teamDetails = useSelector(state => state.teamDetails);
  const { team } = teamDetails;
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(detailsTeam(props.match.params.pathname));
    }
    return () => (clean = false);
  }, []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Team | Glow LEDs</title>
        <meta property="og:title" content="Team" />
        <meta name="twitter:title" content="Team" />
        <link rel="canonical" href="https://www.glow-leds.com/pages/teamd" />
        <meta property="og:url" content="https://www.glow-leds.com/pages/teamd" />
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

      {team && (
        <div className="">
          <div className="jc-b">
            <GLButton variant="secondary" onClick={() => history.goBack()}>
              Back
            </GLButton>
            {/* <Link to="/collections/all/teams">
							<GLButton variant="secondary">Back to Teams</GLButton>
						</Link> */}
            {isAdmin(userInfo) && (
              <Link to={"/secure/glow/editteam/" + props.match.params.pathname}>
                <GLButton variant="secondary" style={{ width: "156px" }}>
                  Edit Team
                </GLButton>
              </Link>
            )}
          </div>
          <div className="column jc-c">
            <h2 style={{ textAlign: "center" }}>{team.team_name}</h2>
          </div>
          <div className="">
            <LazyImage
              className="sponsor-image sponsor_image_small"
              alt={team.team_name}
              title="Sponsor Image"
              size={{
                height: "auto",
                width: "100%",
                display: "none",
                maxWidth: "unset",
                maxHeight: "unset"
              }}
              effect="blur"
              src={team.picture}
            />
          </div>
          {team.video && (
            <div className="jc-c pos-rel">
              <div className="iframe-container">
                <iframe
                  width="996"
                  height="560"
                  title="Team Video"
                  style={{ borderRadius: "20px" }}
                  src={`https://www.youtube.com/embed/${team.video}?mute=0&showinfo=0&rel=0&autoplay=1&loop=1`}
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen="1"
                />
              </div>
            </div>
          )}

          {/* <p className="p_descriptions" style={{ textAlign: 'center', marginBottom: 0 }}>
						Check out {team.team_name} with the {team.product && humanize(team.product)}!
					</p> */}
          {/* <div className="mt-2rem">
						<LazyImage
							className="sponsor-image"
							alt={team.name}
							title="Sponsor Image"
							size={{ height: 'auto', width: '100%' }}
							effect="blur"
							src={team.picture}
						/>
					</div> */}
          <div className="jc-b ">
            <div className="" style={{ flex: "1 1 70%" }}>
              <h3 className="">Bio</h3>
              <pre className="p_descriptions ">{team.bio}</pre>
              {(team.facebook_name || team.instagram_handle) && (
                <div>
                  <h3 className="">Follow {team.team_name} </h3>
                  <div className="mt-2rem wrap  ">
                    <div className="fs-25px jc-fs w-100per max-w-500px ai-c">
                      <div className="fs-40px">
                        {team.facebook_name && (
                          <a
                            href={"https://www.facebook.com/" + team.facebook_name}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                          >
                            <i className="fab fa-facebook zoom" />
                          </a>
                        )}
                      </div>
                      <div className="ml-10px fs-40px">
                        {team.instagram_handle && (
                          <a
                            href={"https://www.instagram.com/" + team.instagram_handle}
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
              )}
            </div>
            <div className="mt-2rem">
              <LazyImage
                className="sponsor-image sponsor_image_big"
                alt={team.name}
                title="Sponsor Image"
                size={{ height: "auto", width: "100%" }}
                effect="blur"
                src={team.picture}
              />
            </div>
          </div>
          <h3 className=""> {team.team_name} Team Members</h3>
          <div className="products">
            {team.affiliates &&
              team.affiliates.map((affiliate, index) => {
                return (
                  <div className="pos-rel">
                    {affiliate.sponsor && (
                      <Link to={"/collections/all/sponsors/" + affiliate.pathname} key={index}>
                        <img
                          className="m-1rem br-10px h-auto max-h-200px max-w-200px ta-c responsive_img "
                          alt="Team Mate"
                          src={affiliate.picture}
                        />
                        <h3
                          className="pos-abs fs-25px"
                          style={{
                            top: "40%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                          }}
                        >
                          {affiliate.artist_name}
                        </h3>
                        <h4
                          className="pos-abs fs-16px title_font"
                          style={{
                            top: "70%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                          }}
                        >
                          Sponsored
                        </h4>
                      </Link>
                    )}
                    {!affiliate.sponsor && (
                      <a
                        href={
                          affiliate.instagram_handle
                            ? "https://www.instagram.com/" + affiliate.instagram_handle
                            : affiliate.facebook
                            ? affiliate.facebook
                            : ""
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                      >
                        <img
                          className="m-1rem br-10px h-auto max-h-200px max-w-200px ta-c responsive_img "
                          alt="Team Mate"
                          src={affiliate.picture}
                        />
                        <h3
                          className="pos-abs fs-25px"
                          style={{
                            top: "40%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                          }}
                        >
                          {affiliate.artist_name}
                        </h3>
                      </a>
                    )}
                  </div>
                );
              })}
          </div>
          {team.rave_mob && (
            <div>
              <h3 className="ta-c"> {team.team_name} Meetup Map</h3>
              <div className="mt-2rem jc-c">
                <LazyImage
                  className="sponsor-image sponsor_image_big "
                  alt={team.name}
                  title="Sponsor Image"
                  size={{ height: "auto", width: "100%" }}
                  effect="blur"
                  src={team.map}
                />
              </div>
              <h3 className="ta-c"> {team.team_name} Moments in Time</h3>
              <div className="mt-2rem ta-c jc-a wrap">
                {team.images.map(image => (
                  <LazyImage
                    className="sponsor-image sponsor_image_big"
                    alt={team.name}
                    title="Sponsor Image"
                    size={{ height: "auto", width: "100%" }}
                    effect="blur"
                    src={image}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default TeamPage;
