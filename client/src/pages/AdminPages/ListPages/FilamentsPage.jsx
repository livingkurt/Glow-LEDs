import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  listFilaments,
  deleteFilament,
  saveFilament,
} from "../../../actions/filamentActions";
import { Link } from "react-router-dom";
import { Loading, Notification } from "../../../components/UtilityComponents";
import { Helmet } from "react-helmet";
import { Search, Sort } from "../../../components/SpecialtyComponents";
import { format_date } from "../../../utils/helper_functions";
import { listAffiliates } from "../../../actions/affiliateActions";
import { API_Orders, API_Promos, API_Revenue } from "../../../utils";
import {
  promoter_revenue_upload,
  sponsor_revenue_upload,
  team_revenue_upload,
  top_earner_upload,
} from "../../../utils/google_sheets_upload";
import { listTeams } from "../../../actions/teamActions";
import { listOrders } from "../../../actions/orderActions";

const FilamentsPage = props => {
  const [ search, set_search ] = useState("");
  const [ sort, setSortOrder ] = useState("");
  const [ last_months_orders, set_last_months_orders ] = useState([]);
  const [ total_orders, set_total_orders ] = useState([]);
  const [ loading_filaments, set_loading_filaments ] = useState(false);
  const [ loading_checkboxes, set_loading_checkboxes ] = useState(false);
  const [ create_filaments, set_create_filaments ] = useState(true);
  const category = props.match.params.category
    ? props.match.params.category
    : "";
  const filamentList = useSelector(state => state.filamentList);
  const { loading, filaments, message, error } = filamentList;

  const filamentSave = useSelector(state => state.filamentSave);
  const { success: successSave } = filamentSave;

  const filamentDelete = useSelector(state => state.filamentDelete);
  const { success: successDelete } = filamentDelete;
  const dispatch = useDispatch();

  const affiliateList = useSelector(state => state.affiliateList);
  const { affiliates } = affiliateList;

  const teamList = useSelector(state => state.teamList);
  const { teams } = teamList;

  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);

  useEffect(
    () => {
      let clean = true;
      if (clean) {
        dispatch(listFilaments({}));
        dispatch(listAffiliates({}));
        dispatch(listTeams({}));
        dispatch(listOrders({}));
        get_last_months_orders();
        get_total_orders();
      }
      return () => (clean = false);
    },
    [ successSave, successDelete, dispatch ]
  );

  const get_last_months_orders = async () => {
    const { data } = await API_Orders.last_months_orders();
    console.log({ data });
    set_last_months_orders(data);
  };
  const get_total_orders = async () => {
    const { data } = await API_Orders.findAll_orders_a();
    console.log({ data });
    set_total_orders(data);
  };
  const submitHandler = e => {
    e.preventDefault();
    dispatch(listFilaments({ category, search, sort }));
  };

  const sortHandler = e => {
    setSortOrder(e.target.value);
    dispatch(listFilaments({ category, search, sort: e.target.value }));
  };

  useEffect(
    () => {
      let clean = true;
      if (clean) {
        dispatch(listFilaments({ category, search, sort }));
      }
      return () => (clean = false);
    },
    [ dispatch, category, search, sort ]
  );
  const deleteHandler = filament => {
    dispatch(deleteFilament(filament._id));
  };

  const date = new Date();

  const today = date.toISOString();

  const mark_paid = filament => {
    dispatch(
      saveFilament({
        ...filament,
        paid: true,
        paid_at: format_date(today),
      })
    );
    dispatch(listFilaments({}));
  };

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

  const determine_color = filament => {
    let result = "";
    if (filament.type === "bubble_mailer") {
      result = colors[0].color;
    }
    if (filament.type === "box") {
      result = colors[1].color;
    }
    return result;
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
                    borderRadius: "5px",
                  }}
                />
              </div>
            );
          })}
        </div>
        <Link to="/secure/glow/editfilament">
          <button className="btn primary">Create Filament</button>
        </Link>
      </div>
      <div className="jc-c">
        <h1 style={{ textAlign: "center" }}>Filaments</h1>
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
        {filaments && (
          <div className="filament-list responsive_table">
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
                {filaments.map((filament, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: determine_color(filament),
                      fontSize: "16px",
                    }}
                  >
                    <td className="p-10px" style={{ minWidth: "15rem" }}>
                      {filament.type === "bubble_mailer" ? (
                        `${filament.length} X ${filament.width}`
                      ) : (
                        `${filament.length} X ${filament.width} X ${filament.height}`
                      )}
                    </td>
                    <td className="p-10px" style={{ minWidth: "15rem" }}>
                      {filament.type}
                    </td>
                    <td className="p-10px">{filament.length}</td>
                    <td className="p-10px">{filament.width}</td>
                    <td className="p-10px">{filament.height}</td>
                    <td className="p-10px">{filament.volume}</td>
                    <td className="p-10px">{filament.quantity_state}</td>
                    <td className="p-10px">
                      <div className="jc-b">
                        <Link to={"/secure/glow/editfilament/" + filament._id}>
                          <button className="btn icon" aria-label="Edit">
                            <i className="fas fa-edit" />
                          </button>
                        </Link>
                        <button
                          className="btn icon"
                          onClick={() => deleteHandler(filament)}
                          aria-label="Delete"
                        >
                          <i className="fas fa-trash-alt" />
                        </button>
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
