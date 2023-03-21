import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Loading, Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { format_date } from "../../utils/helper_functions";
import { API_Orders } from "../../utils";
import { GLButton } from "../../shared/GlowLEDsComponents";
import Search from "../../shared/GlowLEDsComponents/GLTable/Search";
import Sort from "../../shared/GlowLEDsComponents/GLTable/Sort";
import * as API from "../../api";

const PalettesPage = props => {
  const [search, set_search] = useState("");
  const [sort, setSortOrder] = useState("");
  const [last_months_orders, set_last_months_orders] = useState([]);
  const [total_orders, set_total_orders] = useState([]);
  const [loading_palettes, set_loading_palettes] = useState(false);
  const [loading_checkboxes, set_loading_checkboxes] = useState(false);
  const [create_palettes, set_create_palettes] = useState(true);
  const category = props.match.params.category ? props.match.params.category : "";
  const paletteSlice = useSelector(state => state.paletteSlice);
  const { loading, palettes, message, error, success } = paletteSlice;

  const dispatch = useDispatch();

  const affiliateSlice = useSelector(state => state.affiliateSlice);
  const { affiliates } = affiliateSlice;

  const teamSlice = useSelector(state => state.teamSlice);
  const { teams } = teamSlice;

  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listPalettes({}));
      dispatch(API.listAffiliates({}));
      dispatch(API.listTeams({}));
      dispatch(API.listOrders({}));
      get_last_months_orders();
      get_total_orders();
    }
    return () => (clean = false);
  }, [success, dispatch]);

  const get_last_months_orders = async () => {
    const { data } = await API_Orders.last_months_orders();

    set_last_months_orders(data);
  };
  const get_total_orders = async () => {
    const { data } = await API_Orders.findAll_orders_a();

    set_total_orders(data);
  };
  const handleListItems = e => {
    e.preventDefault();
    dispatch(API.listPalettes({ category, search, sort }));
  };

  const sortHandler = e => {
    setSortOrder(e.target.value);
    dispatch(API.listPalettes({ category, search, sort: e.target.value }));
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listPalettes({ category, search, sort }));
    }
    return () => (clean = false);
  }, [dispatch, category, search, sort]);
  const deleteHandler = palette => {
    dispatch(API.deletePalette(palette._id));
  };

  const date = new Date();

  const today = date.toISOString();

  const mark_paid = palette => {
    dispatch(
      API.savePalette({
        ...palette,
        paid: true,
        paid_at: format_date(today)
      })
    );
    dispatch(API.listPalettes({}));
  };

  const sort_options = ["Newest", "Artist Name", "Facebook Name", "Instagram Handle", "Sponsor", "Promoter"];

  const colors = [
    { name: "Box", color: "#44648c" },
    { name: "Bubble Mailer", color: "#448c89" }
  ];

  const determine_color = palette => {
    let result = "";
    if (palette.type === "bubble_mailer") {
      result = colors[0].color;
    }
    if (palette.type === "box") {
      result = colors[1].color;
    }
    return result;
  };

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Palettes | Glow LEDs</title>
      </Helmet>
      <Notification message={message} />
      <Loading loading={loading_palettes} error={error} />
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
        <Link to="/secure/glow/editpalette">
          <GLButton variant="primary">Create Palette</GLButton>
        </Link>
      </div>
      <div className="jc-c">
        <h1 style={{ textAlign: "center" }}>Palettes</h1>
      </div>
      <div className="search_and_sort row jc-c ai-c" style={{ overflowX: "scroll" }}>
        <Search search={search} set_search={set_search} handleListItems={handleListItems} category={category} />
        <Sort sortHandler={sortHandler} sort_options={sort_options} />
      </div>
      <Loading loading={loading} error={error}>
        {palettes && (
          <div className="palette-list responsive_table">
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
                {palettes.map((palette, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: determine_color(palette),
                      fontSize: "16px"
                    }}
                  >
                    <td className="p-10px" style={{ minWidth: "15rem" }}>
                      {palette.type === "bubble_mailer"
                        ? `${palette.length} X ${palette.width}`
                        : `${palette.length} X ${palette.width} X ${palette.height}`}
                    </td>
                    <td className="p-10px" style={{ minWidth: "15rem" }}>
                      {palette.type}
                    </td>
                    <td className="p-10px">{palette.length}</td>
                    <td className="p-10px">{palette.width}</td>
                    <td className="p-10px">{palette.height}</td>
                    <td className="p-10px">{palette.volume}</td>
                    <td className="p-10px">{palette.quantity_state}</td>
                    <td className="p-10px">
                      <div className="jc-b">
                        <Link to={"/secure/glow/editpalette/" + palette._id}>
                          <GLButton variant="icon" aria-label="Edit">
                            <i className="fas fa-edit" />
                          </GLButton>
                        </Link>
                        <GLButton variant="icon" onClick={() => deleteHandler(palette)} aria-label="Delete">
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
export default PalettesPage;
