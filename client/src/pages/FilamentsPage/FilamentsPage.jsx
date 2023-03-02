import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Loading, Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";

import { GLButton } from "../../shared/GlowLEDsComponents";
import * as API from "../../api";

const FilamentsPage = props => {
  const [search, set_search] = useState("");
  const [sort, setSortOrder] = useState("");
  const [last_months_orders, set_last_months_orders] = useState([]);
  const [total_orders, set_total_orders] = useState([]);
  const [loading_filaments, set_loading_filaments] = useState(false);
  const [loading_checkboxes, set_loading_checkboxes] = useState(false);
  const [create_filaments, set_create_filaments] = useState(true);
  const category = props.match.params.category ? props.match.params.category : "";
  const filamentSlice = useSelector(state => state.filamentSlice);
  const { loading, filaments, message, error, success } = filamentSlice;

  const dispatch = useDispatch();

  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listFilaments({}));
    }
    return () => (clean = false);
  }, [success, dispatch]);

  // const submitHandler = e => {
  //   e.preventDefault();
  //   dispatch(API.listFilaments({ category, search, sort }));
  // };

  // const sortHandler = e => {
  //   setSortOrder(e.target.value);
  //   dispatch(API.listFilaments({ category, search, sort: e.target.value }));
  // };

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listFilaments({ category, search, sort }));
    }
    return () => (clean = false);
  }, [dispatch, category, search, sort]);

  const deleteHandler = filament => {
    dispatch(API.deleteFilament(filament._id));
  };

  const date = new Date();

  const today = date.toISOString();

  // const mark_paid = filament => {
  //   dispatch(
  //     saveFilament({
  //       ...filament,
  //       paid: true,
  //       paid_at: format_date(today),
  //     })
  //   );
  //   dispatch(API.listFilaments({}));
  // };

  // const sort_options = [
  //   "Newest",
  //   "Artist Name",
  //   "Facebook Name",
  //   "Instagram Handle",
  //   "Sponsor",
  //   "Promoter",
  // ];

  const colors = [
    { name: "PETG", color: "#44648c" },
    { name: "TPU", color: "#448c89" }
  ];

  const determine_color = filament => {
    let result = "";
    if (filament.type === "PETG") {
      result = colors[0].color;
    }
    if (filament.type === "TPU") {
      result = colors[1].color;
    }
    return result;
  };

  const change_filament_status = filament => {
    dispatch(
      API.updateFilament({
        ...filament,
        active: filament.active ? false : true
      })
    );
    dispatch(API.listFilaments({}));
    dispatch(API.listFilaments({}));
  };

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Filaments | Glow LEDs</title>
      </Helmet>
      <Notification message={message} />
      <Loading loading={loading_filaments} error={error} />
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
                    borderRadius: "5px"
                  }}
                />
              </div>
            );
          })}
        </div>
        <Link to="/secure/glow/editfilament">
          <GLButton variant="primary">Create Filament</GLButton>
        </Link>
      </div>
      <div className="jc-c">
        <h1 style={{ textAlign: "center" }}>Filaments</h1>
      </div>
      <div className="search_and_sort row jc-c ai-c" style={{ overflowX: "scroll" }}>
        {/* <Search
          search={search}
          set_search={set_search}
          handleListItems={handleListItems}
          category={category}
        /> */}
        {/* <Sort sortHandler={sortHandler} sort_options={sort_options} /> */}
      </div>
      <Loading loading={loading} error={error}>
        {filaments && (
          <div className="filament-list responsive_table">
            <table className="table">
              <thead>
                <tr>
                  <th>Active</th>
                  <th>Type</th>
                  <th>Color</th>
                  <th>Color Code</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filaments.map((filament, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: determine_color(filament),
                      fontSize: "16px"
                    }}
                  >
                    <td className="p-10px">
                      <GLButton
                        variant="icon"
                        onClick={() => change_filament_status(filament)}
                        aria-label={filament.active ? "deactive" : "activate"}
                      >
                        {filament.active ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                      </GLButton>
                    </td>
                    <td className="p-10px" style={{ minWidth: "15rem" }}>
                      {filament.type}
                    </td>
                    <td className="p-10px">{filament.color}</td>
                    <td className="p-10px">{filament.color_code}</td>
                    <td className="p-10px">
                      <div className="jc-b">
                        <Link to={"/secure/glow/editfilament/" + filament._id}>
                          <GLButton variant="icon" aria-label="Edit">
                            <i className="fas fa-edit" />
                          </GLButton>
                        </Link>
                        <GLButton variant="icon" onClick={() => deleteHandler(filament)} aria-label="Delete">
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
export default FilamentsPage;
