import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Loading, Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import Search from "../../shared/GlowLEDsComponents/GLTable/Search";
import Sort from "../../shared/GlowLEDsComponents/GLTable/Sort";
import * as API from "../../api";

const SettingsPage = props => {
  const [search, set_search] = useState("");
  const [sort, setSortOrder] = useState("");
  const [loading_settings, set_loading_settings] = useState(false);
  const [loading_checkboxes, set_loading_checkboxes] = useState(false);
  const category = props.match.params.category ? props.match.params.category : "";

  const settingPage = useSelector(state => state.settings);
  const { loading, settings, message, error, success } = settingPage;

  const dispatch = useDispatch();

  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listSettings({}));
      dispatch(API.listAffiliates({ active: true }));
      dispatch(API.listTeams({}));
      dispatch(API.listOrders({}));
    }
    return () => (clean = false);
  }, [success, dispatch]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(API.listSettings({ category, search, sort }));
  };

  const sortHandler = e => {
    setSortOrder(e.target.value);
    dispatch(API.listSettings({ category, search, sort: e.target.value }));
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listSettings({ category, search, sort }));
    }
    return () => (clean = false);
  }, [dispatch, category, search, sort]);
  const deleteHandler = setting => {
    dispatch(API.deleteSetting(setting._id));
  };

  const sort_options = ["Newest", "Artist Name", "Facebook Name", "Instagram Handle", "Sponsor", "Promoter"];

  const colors = [
    { name: "Paid", color: "#3e4c6d" },
    { name: "Not Paid", color: "#6f3c3c" },
  ];

  const determine_color = setting => {
    let result = "";
    if (setting.paid) {
      result = colors[0].color;
    }
    if (!setting.paid) {
      result = colors[1].color;
    }
    return result;
  };

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Settings | Glow LEDs</title>
      </Helmet>

      <Loading loading={loading_settings} error={error} />
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
        <Link to="/secure/glow/editsetting">
          <GLButton variant="primary">Create Setting</GLButton>
        </Link>
      </div>
      <div className="jc-c">
        <h1 style={{ textAlign: "center" }}>Settings</h1>
      </div>
      <div className="search_and_sort row jc-c ai-c" style={{ overflowX: "scroll" }}>
        <Search search={search} set_search={set_search} handleListItems={submitHandler} category={category} />
        <Sort sortHandler={sortHandler} sort_options={sort_options} />
      </div>
      <Loading loading={loading} error={error}>
        {settings && (
          <div className="setting-list responsive_table">
            <table className="table">
              <thead>
                <tr>
                  <th>Active</th>
                  {/* <th>Settings</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {settings.map((setting, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: determine_color(setting),
                      fontSize: "16px",
                    }}
                  >
                    <td className="p-10px">
                      {setting.active ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                    </td>

                    {/* <td className="p-10px">{setting.settings}</td> */}

                    <td className="p-10px">
                      <div className="jc-b">
                        <Link to={"/secure/glow/editsetting/" + setting._id}>
                          <GLButton variant="icon" aria-label="Edit">
                            <i className="fas fa-edit" />
                          </GLButton>
                        </Link>
                        <GLButton variant="icon" onClick={() => deleteHandler(setting)} aria-label="Delete">
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
export default SettingsPage;
