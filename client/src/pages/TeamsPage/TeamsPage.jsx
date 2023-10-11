import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Loading, Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import Search from "../../shared/GlowLEDsComponents/GLTable/Search";
import Sort from "../../shared/GlowLEDsComponents/GLTable/Sort";
import { GLButton } from "../../shared/GlowLEDsComponents";
import * as API from "../../api";

const TeamsPage = () => {
  const params = useParams();
  const [search, set_search] = useState("");
  const [sort, setSortOrder] = useState("");
  const category = params.category ? params.category : "";
  const teamPage = useSelector(state => state.teams);
  const { loading, teams, message, error, success } = teamPage;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listTeams({}));
    }
    return () => (clean = false);
  }, [success, dispatch]);
  const handleListItems = e => {
    e.preventDefault();
    dispatch(API.listTeams({ category, search, sort }));
  };

  const sortHandler = e => {
    setSortOrder(e.target.value);
    dispatch(API.listTeams({ category, search, sort: e.target.value }));
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listTeams({ category, search, sort }));
    }
    return () => (clean = false);
  }, [dispatch, category, search, sort]);
  const deleteHandler = team => {
    dispatch(API.deleteTeam(team._id));
  };

  const sort_options = ["Newest", "Artist Name", "Facebook Name", "Instagram Handle", "Sponsor", "Promoter"];

  const colors = [
    { name: "Sponsor", color: "#3e4c6d" },
    { name: "Promoter", color: "#7d5555" },
  ];

  const determineColor = team => {
    let result = "";

    if (team.sponsor) {
      result = colors[0].color;
    }
    if (team.promoter) {
      result = colors[1].color;
    }
    return result;
  };

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Teams | Glow LEDs</title>
      </Helmet>

      <div className="wrap jc-b">
        <div className="wrap jc-b">
          {colors.map((color, index) => {
            return (
              <div className="wrap jc-b  m-1rem" key={index}>
                <label style={{ marginRight: "1rem" }}>{color.name}</label>
                <div
                  style={{
                    backgroundColor: color.color,
                    height: "20px",
                    width: "60px",
                    borderRadius: "5px",
                  }}
                />
              </div>
            );
          })}
        </div>
        <Link to="/secure/glow/editteam">
          <GLButton variant="primary" style={{ width: "160px" }}>
            Create Team
          </GLButton>
        </Link>
      </div>
      <div className="jc-c">
        <h1 style={{ textAlign: "center" }}>Teams</h1>
      </div>
      <div className="search_and_sort row jc-c ai-c" style={{ overflowX: "scroll" }}>
        <Search search={search} set_search={set_search} handleListItems={handleListItems} category={category} />
        <Sort sortHandler={sortHandler} sort_options={sort_options} />
      </div>
      <Loading loading={loading} error={error}>
        {teams && (
          <div className="team-list responsive_table">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Team Name</th>
                  <th>Instagram Handle</th>
                  <th>Facebook Name</th>
                  <th>Percentage Off</th>
                  <th>Venmo</th>
                  <th>Promo Code</th>
                  <th>Sponsor</th>
                  <th>Promotor</th>
                  <th>active</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: determineColor(team),
                      fontSize: "16px",
                    }}
                  >
                    <td className="p-10px">{team._id}</td>
                    <td className="p-10px">{team.team_name}</td>
                    <td className="p-10px">{team.instagram_handle}</td>
                    <td className="p-10px">{team.facebook_name}</td>
                    <td className="p-10px">{team.percentage_off}%</td>
                    <td className="p-10px">{team.venmo}</td>
                    <td className="p-10px">{team.promo_code}</td>
                    <td className="p-10px">
                      {team.sponsor ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                    </td>
                    <td className="p-10px">
                      {team.promoter ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                    </td>
                    <td className="p-10px">
                      {team.active ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                    </td>
                    <td className="p-10px">
                      <div className="jc-b">
                        <Link to={"/secure/glow/editteam/" + team.pathname}>
                          <GLButton variant="icon" aria-label="Edit">
                            <i className="fas fa-edit" />
                          </GLButton>
                        </Link>
                        <GLButton variant="icon" onClick={() => deleteHandler(team)} aria-label="Delete">
                          <i className="fas fa-trash-alt" />
                        </GLButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Loading>
    </div>
  );
};
export default TeamsPage;
