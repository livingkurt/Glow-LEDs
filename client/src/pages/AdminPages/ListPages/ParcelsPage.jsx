import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  listParcels,
  deleteParcel,
  saveParcel,
} from "../../../actions/parcelActions";
import { Link } from "react-router-dom";
import { Loading, Notification } from "../../../components/UtilityComponents";
import { Helmet } from "react-helmet";
import { Search, Sort } from "../../../components/SpecialtyComponents";
import { format_date } from "../../../utils/helper_functions";
import { GLButton } from "../../../components/GlowLEDsComponents";

const ParcelsPage = props => {
  const [ search, set_search ] = useState("");
  const [ sort, setSortOrder ] = useState("");
  const [ loading_parcels, set_loading_parcels ] = useState(false);
  const category = props.match.params.category
    ? props.match.params.category
    : "";
  const parcelList = useSelector(state => state.parcelList);
  const { loading, parcels, message, error } = parcelList;

  const parcelSave = useSelector(state => state.parcelSave);
  const { success: successSave } = parcelSave;

  const parcelDelete = useSelector(state => state.parcelDelete);
  const { success: successDelete } = parcelDelete;
  const dispatch = useDispatch();

  useEffect(
    () => {
      let clean = true;
      if (clean) {
        dispatch(listParcels({}));
      }
      return () => (clean = false);
    },
    [ successSave, successDelete, dispatch ]
  );

  const submitHandler = e => {
    e.preventDefault();
    dispatch(listParcels({ category, search, sort }));
  };

  const sortHandler = e => {
    setSortOrder(e.target.value);
    dispatch(listParcels({ category, search, sort: e.target.value }));
  };

  useEffect(
    () => {
      let clean = true;
      if (clean) {
        dispatch(listParcels({ category, search, sort }));
      }
      return () => (clean = false);
    },
    [ dispatch, category, search, sort ]
  );

  const deleteHandler = parcel => {
    dispatch(deleteParcel(parcel._id));
  };

  const date = new Date();

  const sort_options = [
    "Newest",
    "Artist Name",
    "Facebook Name",
    "Instagram Handle",
    "Sponsor",
    "Promoter",
  ];

  const colors = [
    { name: "Box", color: "#44648c" },
    { name: "Bubble Mailer", color: "#448c89" },
  ];

  const determine_color = parcel => {
    let result = "";
    if (parcel.type === "bubble_mailer") {
      result = colors[0].color;
    }
    if (parcel.type === "box") {
      result = colors[1].color;
    }
    return result;
  };

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Parcels | Glow LEDs</title>
      </Helmet>
      <Notification message={message} />
      <Loading loading={loading_parcels} error={error} />
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
        <Link to="/secure/glow/editparcel">
          <GLButton variant="primary">Create Parcel</GLButton>
        </Link>
      </div>
      <div className="jc-c">
        <h1 style={{ textAlign: "center" }}>Parcels</h1>
      </div>
      <div
        className="search_and_sort row jc-c ai-c"
        style={{ overflowX: "scroll" }}
      >
        <Search
          search={search}
          set_search={set_search}
          submitHandler={submitHandler}
          category={category}
        />
        <Sort sortHandler={sortHandler} sort_options={sort_options} />
      </div>
      <Loading loading={loading} error={error}>
        {parcels && (
          <div className="parcel-list responsive_table">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Length</th>
                  <th>Width</th>
                  <th>Height</th>
                  <th>Volume</th>
                  <th>Count In Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {parcels.map((parcel, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: determine_color(parcel),
                      fontSize: "16px",
                    }}
                  >
                    <td className="p-10px" style={{ minWidth: "15rem" }}>
                      {parcel.type === "bubble_mailer" ? (
                        `${parcel.length} X ${parcel.width}`
                      ) : (
                        `${parcel.length} X ${parcel.width} X ${parcel.height}`
                      )}
                    </td>
                    <td className="p-10px" style={{ minWidth: "15rem" }}>
                      {parcel.type}
                    </td>
                    <td className="p-10px">{parcel.length}</td>
                    <td className="p-10px">{parcel.width}</td>
                    <td className="p-10px">{parcel.height}</td>
                    <td className="p-10px">{parcel.volume}</td>
                    <td className="p-10px">{parcel.quantity_state}</td>
                    <td className="p-10px">
                      <div className="jc-b">
                        <Link to={"/secure/glow/editparcel/" + parcel._id}>
                          <GLButton variant="icon" aria-label="Edit">
                            <i className="fas fa-edit" />
                          </GLButton>
                        </Link>
                        <GLButton
                          variant="icon"
                          onClick={() => deleteHandler(parcel)}
                          aria-label="Delete"
                        >
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
export default ParcelsPage;
