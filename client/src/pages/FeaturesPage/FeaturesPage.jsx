import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Loading, Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { format_date } from "../../utils/helper_functions";
import { GLButton } from "../../shared/GlowLEDsComponents";
import Search from "../../shared/GlowLEDsComponents/GLTable/Search";
import Sort from "../../shared/GlowLEDsComponents/GLTable/Sort";
import * as API from "../../api";

const FeaturesPage = props => {
  const [search, set_search] = useState("");
  const [sort, setSortOrder] = useState("");
  const category = props.match.params.category ? props.match.params.category : "";
  const featurePage = useSelector(state => state.features);
  const { loading, features, message, error, success } = featurePage;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listFeatures({}));
    }
    return () => (clean = false);
  }, [success, dispatch]);
  const handleListItems = e => {
    e.preventDefault();
    dispatch(API.listFeatures({ category, search, sort }));
  };

  const sortHandler = e => {
    setSortOrder(e.target.value);
    dispatch(API.listFeatures({ category, search, sort: e.target.value }));
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listFeatures({ category, search, sort }));
    }
    return () => (clean = false);
  }, [category, search, sort, dispatch]);
  const deleteHandler = feature => {
    dispatch(API.deleteFeature(feature._id));
  };

  const sort_options = [
    "Release Date",
    "Glover Name",
    "Facebook Name",
    "Instagram Handle",
    "Product",
    "Song ID",
    "Newest",
  ];
  const colors = [
    { name: "Glovers", color: "#3e4c6d" },
    { name: "Producers", color: "#4b7188" },
    { name: "Artists", color: "#6f5f7d" },
    { name: "VFX", color: "#408184" },
    { name: "Unreleased", color: "#636363" },
    // { name: 'Refunded', color: '#a9a9a9' }
  ];

  const determine_color = feature => {
    let result = "";
    if (feature.category === "glovers") {
      result = colors[0].color;
    }
    if (feature.category === "producers") {
      result = colors[1].color;
    }
    if (feature.category === "artists") {
      result = colors[2].color;
    }

    if (feature.category === "vfx") {
      result = colors[3].color;
    }
    if (!feature.release_date) {
      result = colors[4].color;
    }
    return result;
  };

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Features | Glow LEDs</title>
      </Helmet>

      <div className="wrap jc-b">
        <Link to="/secure/glow/editfeature">
          <GLButton variant="primary" style={{ width: "160px" }}>
            Create Feature
          </GLButton>
        </Link>
      </div>
      <div className="wrap jc-b">
        {colors.map((color, index) => {
          return (
            <div className="wrap jc-b w-18rem m-1rem" key={index}>
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
      <div className="jc-c">
        <h1 style={{ textAlign: "center" }}>Features</h1>
      </div>
      <div className="search_and_sort row jc-c ai-c" style={{ overflowX: "scroll" }}>
        <Search search={search} set_search={set_search} handleListItems={handleListItems} category={category} />
        <Sort sortHandler={sortHandler} sort_options={sort_options} />
      </div>
      <Loading loading={loading} error={error}>
        {features && (
          <div className="feature-list responsive_table">
            <table className="table">
              <thead>
                <tr>
                  <th>Release Date</th>
                  <th>Category</th>
                  <th>Artist Name</th>
                  <th>Instagram handle</th>
                  <th>Facebook name</th>
                  <th>video</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: determine_color(feature),
                      fontSize: "16px",
                    }}
                  >
                    <td className="p-10px" style={{ minWidth: "15rem" }}>
                      {feature.release_date && format_date(feature.release_date)}
                    </td>
                    <td className="p-10px" style={{ minWidth: "15rem" }}>
                      {feature.category}
                    </td>
                    <td className="p-10px" style={{ minWidth: "15rem" }}>
                      {feature.artist_name}
                    </td>
                    <td className="p-10px" style={{ minWidth: "10rem" }}>
                      {feature.instagram_handle}
                    </td>
                    <td className="p-10px" style={{ minWidth: "15rem" }}>
                      {feature.facebook_name}
                    </td>
                    <td className="p-10px" style={{ minWidth: "10rem" }}>
                      {feature.video}
                    </td>
                    <td className="p-10px">
                      <div className="jc-b">
                        <Link to={"/secure/glow/editfeature/" + feature.pathname}>
                          <GLButton variant="icon" aria-label="Edit">
                            <i className="fas fa-edit" />
                          </GLButton>
                        </Link>
                        <GLButton variant="icon" onClick={() => deleteHandler(feature)} aria-label="Delete">
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
export default FeaturesPage;
