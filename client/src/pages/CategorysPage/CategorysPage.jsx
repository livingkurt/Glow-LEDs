import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Loading, Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { categories, snake_case, subcategories } from "../../utils/helper_functions";
import { GLButton } from "../../shared/GlowLEDsComponents";
import Search from "../../shared/GlowLEDsComponents/GLTable/Search";
import Sort from "../../shared/GlowLEDsComponents/GLTable/Sort";
import * as API from "../../api";

const fetch = require("node-fetch");

const CategorysPage = props => {
  const [search, set_search] = useState("");
  const [sort, setSortOrder] = useState("");
  const [loading_checkboxes, set_loading_checkboxes] = useState(false);
  const [loading_categorys, set_loading_categorys] = useState(false);
  const category = props.match.params.category ? props.match.params.category : "";
  const categorySlice = useSelector(state => state.categorySlice);
  const { loading, categorys, message, error, success } = categorySlice;

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
      dispatch(API.listCategorys({}));
    }
    return () => (clean = false);
  }, [success, dispatch]);

  const handleListItems = e => {
    e.preventDefault();
    dispatch(API.listCategorys({ category, search, sort }));
  };

  const sortHandler = e => {
    setSortOrder(e.target.value);
    dispatch(API.listCategorys({ category, search, sort: e.target.value }));
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listCategorys({ category, search, sort }));
    }
    return () => (clean = false);
  }, [dispatch, category, search, sort]);
  const deleteHandler = category => {
    dispatch(API.deleteCategory(category._id));
    dispatch(API.listCategorys({ category, search, sort }));
  };

  const sort_options = ["Newest", "Artist Name", "Facebook Name", "Instagram Handle", "Sponsor", "Promoter"];

  const colors = [
    { name: "Nest Level 1", color: "#8a2e2e" },
    { name: "Nest Level 2", color: "#8a502e" },
    { name: "Nest Level 3", color: "#898a2e" },
    { name: "Nest Level 4", color: "#2e8a42" },
    { name: "Nest Level 5", color: "#2e578a" }
  ];

  const determine_color = category => {
    let result = "";
    if (category.nest_level === 1) {
      result = colors[0].color;
    }
    if (!category.nest_level === 2) {
      result = colors[1].color;
    }
    if (category.nest_level === 3) {
      result = colors[2].color;
    }
    if (category.nest_level === 4) {
      result = colors[3].color;
    }
    if (category.nest_level === 5) {
      result = colors[4].color;
    }

    return result;
  };

  const create_categories = async () => {
    categories
      .filter(category => category !== null)
      .forEach(category => {
        dispatch(
          API.createCategory({
            name: category,
            pathname: snake_case(category),
            nest_level: 1,
            display: true,
            meta_title: `${category} | Glow LEDs`
          })
        );
      });
    dispatch(API.listCategorys({}));
  };

  const create_subcategories = async () => {
    subcategories
      .filter(category => category !== null)
      .forEach(category => {
        dispatch(
          API.createCategory({
            name: category,
            pathname: snake_case(category),
            nest_level: 1,
            display: true,
            meta_title: `${category} | Glow LEDs`
          })
        );
      });
    dispatch(API.listCategorys({}));
  };

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Categorys | Glow LEDs</title>
      </Helmet>
      <Notification message={message} />
      <Loading loading={loading_categorys} error={error} />
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

        <GLButton variant="primary" onClick={() => create_categories()}>
          Generate Categorys
        </GLButton>
        <GLButton variant="primary" onClick={() => create_subcategories()}>
          Generate Subcategorys
        </GLButton>
        <Link to="/secure/glow/editcategory">
          <GLButton variant="primary">Create Category</GLButton>
        </Link>
      </div>
      <div className="jc-c">
        <h1 style={{ textAlign: "center" }}>Categorys</h1>
      </div>
      <div className="search_and_sort row jc-c ai-c" style={{ overflowX: "scroll" }}>
        <Search search={search} set_search={set_search} handleListItems={handleListItems} category={category} />
        <Sort sortHandler={sortHandler} sort_options={sort_options} />
      </div>
      <Loading loading={loading} error={error}>
        {categorys && (
          <div className="category-list responsive_table">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Pathname</th>
                  <th>Nest Level</th>
                  <th>Display Order</th>
                  <th>Display</th>
                  <th>Meta Title</th>
                  <th>Meta Description</th>
                  <th>Meta_Keywords</th>
                  <th>Masthead</th>
                </tr>
              </thead>
              <tbody>
                {categorys.map((category, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: determine_color(category),
                      fontSize: "16px"
                    }}
                  >
                    <td className="p-10px" style={{ minWidth: "15rem" }}>
                      {category.name}
                    </td>
                    <td className="p-10px" style={{ minWidth: "15rem" }}>
                      {category.pathname}
                    </td>
                    <td className="p-10px" style={{ minWidth: "15rem" }}>
                      {category.nest_level}
                    </td>
                    <td className="p-10px" style={{ minWidth: "15rem" }}>
                      {category.display_order}
                    </td>
                    <td className="p-10px">
                      {category.display ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                    </td>
                    <td className="p-10px">{category.meta_title}</td>
                    <td className="p-10px">{category.meta_description}</td>
                    <td className="p-10px">{category.meta_keywords}</td>
                    <td className="p-10px">
                      {category.masthead ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                    </td>
                    <td className="p-10px">
                      <div className="jc-b">
                        <Link to={"/secure/glow/editcategory/" + category._id}>
                          <GLButton variant="icon" aria-label="Edit">
                            <i className="fas fa-edit" />
                          </GLButton>
                        </Link>
                        <GLButton variant="icon" onClick={() => deleteHandler(category)} aria-label="Delete">
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
export default CategorysPage;
