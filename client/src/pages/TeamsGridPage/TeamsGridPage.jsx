import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Loading } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import { TeamItemD, TeamItemM } from "./components";
import * as API from "../../api";

const AllTeamsPage = props => {
  const teamSlice = useSelector(state => state.teamSlice);
  const { teams, loading, error } = teamSlice;
  const dispatch = useDispatch();
  const category = props.match.params.category ? props.match.params.category : "";

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (category === "rave_mob") {
        dispatch(API.listTeams({ rave_mob: true }));
      } else {
        dispatch(API.listTeams({}));
      }
    }
    return () => (clean = false);
  }, [category]);

  return (
    <div>
      <Helmet>
        <title>Team | Glow LEDs</title>
        <meta property="og:title" content="Teamd" />
        <meta name="twitter:title" content="Teamd" />
        <link rel="canonical" href="https://www.glow-leds.com/collections/all/teams" />
        <meta property="og:url" content="https://www.glow-leds.com/collections/all/teams" />
        <meta name="description" content={"Glow LEDs Glover Teams"} />
        <meta property="og:description" content={"Glow LEDs Glover Teams"} />
        <meta name="twitter:description" content={"Glow LEDs Glover Teams"} />
      </Helmet>

      <div className="jc-fe">
        <Link to="/collections/all/sponsors">
          <GLButton variant="secondary" className="">
            Sponsored Artists
          </GLButton>
        </Link>
      </div>
      <div className="jc-c">
        <div className="row">
          <h1>{props.match.params.category === "rave_mob" ? "Glow LEDs Rave Mobs" : "Sponsored Teams"}</h1>
        </div>
      </div>

      {teams && (
        <Loading loading={loading} error={error}>
          <div>
            <div className="product_big_screen">
              {teams && (
                <ul className="products" style={{ marginTop: 0, textDecoration: "none" }}>
                  {teams.map(
                    (team, index) =>
                      !team.hidden && <TeamItemD size="300px" key={index} team={team} category={props.match.params.category} />
                  )}
                </ul>
              )}
            </div>

            <div className="product_small_screen none">
              {teams && (
                <ul className="products" style={{ marginTop: 0, textDecoration: "none" }}>
                  {teams.map(
                    (team, index) =>
                      !team.hidden && <TeamItemM size="300px" key={index} team={team} category={props.match.params.category} />
                  )}
                </ul>
              )}
            </div>
          </div>
          {teams.length === 0 && <h2 style={{ textAlign: "center" }}>Sorry we can't find anything with that name</h2>}
        </Loading>
      )}
    </div>
  );
};
export default AllTeamsPage;
