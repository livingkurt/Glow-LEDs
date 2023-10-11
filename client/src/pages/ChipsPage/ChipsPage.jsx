import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Loading, Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import Search from "../../shared/GlowLEDsComponents/GLTable/Search";
import Sort from "../../shared/GlowLEDsComponents/GLTable/Sort";
import { GLButton } from "../../shared/GlowLEDsComponents";
import * as API from "../../api";

const ChipsPage = () => {
  const params = useParams();
  const [search, set_search] = useState("");
  const [sort, setSortOrder] = useState("");
  const category = params.category ? params.category : "";
  const chipPage = useSelector(state => state.chips);
  const { loading, chips, message, error, success } = chipPage;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listChips({}));
    }
    return () => (clean = false);
  }, [success, dispatch]);
  const handleListItems = e => {
    e.preventDefault();
    dispatch(API.listChips({ category, search, sort }));
  };

  const sortHandler = e => {
    setSortOrder(e.target.value);
    dispatch(API.listChips({ category, search, sort: e.target.value }));
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listChips({ category, search, sort }));
    }
    return () => (clean = false);
  }, [dispatch, category, search, sort]);
  const deleteHandler = chip => {
    dispatch(API.deleteChip(chip._id));
  };

  const sort_options = ["Newest", "Artist Name", "Facebook Name", "Instagram Handle", "Sponsor", "Promoter"];

  const colors = [
    { name: "EL Nano", color: "#3e4c6d" },
    { name: "LG Nano", color: "#3e4c6d" },
    { name: "FL Nano", color: "#3e4c6d" },
    { name: "QT Nano", color: "#3e4c6d" },
    { name: "EL Coin", color: "#4b7188" },
    { name: "LG Coin", color: "#4b7188" },
    { name: "FL Coin", color: "#4b7188" },
    { name: "Apollo", color: "#6f5f7d" },
    { name: "Coffin", color: "#636363" },
    { name: "Inova", color: "#333333" },
  ];

  const determineColor = chip => {
    let result = "";
    if (chip.category === "el_nano") {
      result = colors[1].color;
    }
    if (chip.category === "lg_nano") {
      result = colors[1].color;
    }
    if (chip.category === "fl_nano") {
      result = colors[1].color;
    }
    if (chip.category === "qt_nano") {
      result = colors[1].color;
    }
    if (chip.category === "el_coin") {
      result = colors[2].color;
    }
    if (chip.category === "lg_coin") {
      result = colors[2].color;
    }
    if (chip.category === "fl_coin") {
      result = colors[2].color;
    }
    if (chip.category === "apollo") {
      result = colors[3].color;
    }
    if (chip.category === "coffin") {
      result = colors[4].color;
    }
    if (chip.category === "emissive") {
      result = colors[5].color;
    }
    return result;
  };

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Chips | Glow LEDs</title>
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
        <Link to="/secure/glow/editchip">
          <GLButton variant="primary" style={{ width: "160px" }}>
            Create Chip
          </GLButton>
        </Link>
      </div>
      <div className="jc-c">
        <h1 style={{ textAlign: "center" }}>Chips</h1>
      </div>
      <div className="search_and_sort row jc-c ai-c" style={{ overflowX: "scroll" }}>
        <Search search={search} set_search={set_search} handleListItems={handleListItems} category={category} />
        <Sort sortHandler={sortHandler} sort_options={sort_options} />
      </div>

      <Loading loading={loading} error={error}>
        {chips && (
          <div className="chip-list responsive_table">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Chip Name</th>
                  <th>Company</th>
                  <th>Category</th>
                  <th>Programmmable</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {chips.map((chip, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: determineColor(chip),
                      fontSize: "16px",
                    }}
                  >
                    <td className="p-10px">{chip._id}</td>
                    <td className="p-10px">{chip.name}</td>
                    <td className="p-10px">{chip.company}</td>
                    <td className="p-10px">{chip.category}</td>
                    <td className="p-10px">
                      {chip.programmmable ? (
                        <i className="fas fa-check-circle" />
                      ) : (
                        <i className="fas fa-times-circle" />
                      )}
                    </td>
                    <td className="p-10px">
                      <div className="jc-b">
                        <Link to={"/secure/glow/editchip/" + chip._id}>
                          <GLButton variant="icon" aria-label="Edit">
                            <i className="fas fa-edit" />
                          </GLButton>
                        </Link>
                        <GLButton ariant="icon" onClick={() => deleteHandler(chip)} aria-label="Delete">
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
export default ChipsPage;
