import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { DropdownDisplay, ImageDisplay, Loading, Notification } from "../../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { accurate_date, snake_case, unformat_date_and_time } from "../../../utils/helper_functions";
import {
  create_color_products,
  create_secondary_color_products,
  create_option_products,
  create_secondary_products
} from "../../../utils/helpers/product_helpers";
import { API_Products } from "../../../utils";
import useClipboard from "react-hook-clipboard";
import {
  determine_color_modifier,
  determine_secondary_color_modifier,
  determine_option_modifier,
  determine_secondary_modifier
} from "../../../utils/helpers/product_helpers";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import ImageUploader from "../../../shared/SharedComponents/ImageUploader";
import * as API from "../../../api";
import {
  set_color_modifier,
  set_filtered_products,
  set_loading_options,
  set_macro_products_list,
  set_new_index,
  set_option_modifier,
  set_option_products_list,
  set_product,
  set_secondary_color_modifier
} from "../../../slices/productSlice";

const EditProductPage = props => {
  const [loading_checkboxes, set_loading_checkboxes] = useState(true);
  const [clipboard, copyToClipboard] = useClipboard();

  const history = useHistory();

  const productSlice = useSelector(state => state.productSlice);
  const {
    product,
    loading,
    error,
    loadingSave,
    success,
    error: errorSave,
    message,
    color_modifier,
    secondary_color_modifier,
    option_products_list,
    macro_products_list,
    secondary_products_list,
    filtered_products,
    option_modifier,
    secondary_modifier,
    loading_options,
    save,
    sale_start_time,
    sale_end_time,
    image,
    color_image,
    secondary_color_image,
    secondary_color_ids,
    option_image,
    secondary_image,
    sale_start_date,
    sale_end_date
  } = productSlice;

  const {
    _id: id,
    name,
    images,
    color_images,
    secondary_color_images,
    option_images,
    secondary_images,
    video,
    brand,
    price,
    wholesale_price,
    wholesale_product,
    previous_price,
    category,
    product_collection,
    categorys,
    subcategorys,
    subcategory,
    countInStock,
    count_in_stock,
    quantity,
    finite_stock,
    facts,
    included_items,
    contributers,
    description,
    rating,
    numReviews,
    reviews,
    hidden,
    sale_price,
    preorder,
    pathname,
    meta_title,
    meta_description,
    meta_keywords,
    length,
    width,
    height,
    volume,
    package_length,
    package_width,
    package_height,
    package_volume,
    product_length,
    product_width,
    product_height,
    weight_pounds,
    weight_ounces,
    processing_time,
    material_cost,
    filament_used,
    printing_time,
    assembly_time,
    order,
    item_group_id,
    chips,
    product_options,
    group_product,
    group_name,
    products,
    has_add_on,
    color_product_group,
    color_group_name,
    color_products,
    filament,

    secondary_color_product_group,
    secondary_color_group_name,
    secondary_color_products,
    secondary_product_group,
    secondary_group_name,
    secondary_products,

    option_product_group,
    option_group_name,
    option_products,
    color,
    color_code,
    size,
    sizing,
    default_option,
    option,
    macro_product,
    extra_cost
  } = product;

  const chipSlice = useSelector(state => state.chipSlice);
  const { chips: chips_list } = chipSlice;

  const filamentSlice = useSelector(state => state.filamentSlice);
  const { filaments: filaments_list } = filamentSlice;

  console.log({ filaments_list });

  const userSlice = useSelector(state => state.userSlice);
  const { users } = userSlice;

  const categorySlice = useSelector(state => state.categorySlice);
  const { categorys: categorys_list } = categorySlice;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.detailsProduct(props.match.params.pathname));
      get_all_options();
      findAll_products_a();
    }
    return () => (clean = false);
  }, [dispatch, props.match.params.pathname]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listCategorys({}));
      dispatch(API.listUsers({}));
      // dispatch(API.listProducts({ limit: 300 }));
      dispatch(API.listChips({}));
      dispatch(API.listFilaments({}));
    }
    return () => (clean = false);
  }, []);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (product && product.category) {
        dispatch(set_color_modifier(determine_color_modifier(product.category)));
        dispatch(set_secondary_color_modifier(determine_secondary_color_modifier(product.category)));
        dispatch(set_option_modifier(determine_option_modifier(product.category)));
      }
    }
    return () => (clean = false);
  }, [product]);

  const findAll_products_a = async () => {
    const { data } = await API_Products.findAll_products_a({
      // option: false,
      limit: 0
    });

    dispatch(set_macro_products_list(data.products.sort((a, b) => (a.name > b.name ? 1 : -1))));
  };
  const get_all_options = async () => {
    const { data } = await API_Products.findAll_products_a({
      option: true,
      limit: 0
    });

    dispatch(set_option_products_list(data.products.sort((a, b) => (a.name > b.name ? 1 : -1))));
  };

  const use_template = e => {
    dispatch(API.detailsProduct(e.target.value));
  };
  const use_product_options_template = async e => {
    const { data } = await API_Products.get_product(e.target.value);

    const template = {
      group_name: data.group_name,
      color_product_group: data.color_product_group,
      color_group_name: data.color_group_name,
      color_products: data.color_products,
      secondary_color_product_group: data.secondary_color_product_group,
      secondary_color_group_name: data.secondary_color_group_name,
      secondary_color_products: data.secondary_color_products,
      secondary_product_group: data.secondary_product_group,
      secondary_group_name: data.secondary_group_name,
      secondary_products: data.secondary_products,
      option_product_group: data.option_product_group,
      option_group_name: data.option_group_name,
      option_products: data.option_products,
      color: data.color,
      size: data.size,
      default_option: data.default_option,
      option: data.option,
      macro_product: data.macro_product,
      extra_cost: data.extra_cost,
      item_group_id: data.item_group_id
    };

    dispatch(set_product({ ...product, template }));
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (macro_products_list) {
        dispatch(set_filtered_products(macro_products_list.filter(item => !item.option).filter(item => !item.hidden)));
      }
    }
    return () => (clean = false);
  }, [macro_products_list]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (props.match.params.pathname && props.match.params.template === "true") {
        dispatch(set_product({ pathname: "" }));
      }
    }
    return () => (clean = false);
  }, [product, success]);

  setTimeout(() => {
    set_loading_checkboxes(false);
  }, 500);

  const save_product = async () => {
    const start_date = new Date(unformat_date_and_time(sale_start_date, sale_start_time));
    const end_date = new Date(unformat_date_and_time(sale_end_date, sale_end_time));
    dispatch(
      API.saveProduct({
        _id: props.match.params.pathname && props.match.params.template === "false" ? product._id : null,
        // _id: props.match.params.pathname && !props.match.params.template === 'true' ? id : null,
        name,
        price,
        wholesale_product,
        wholesale_price,
        // display_image,
        images,
        color_images,
        secondary_color_images,
        option_images,
        secondary_images,
        chips: chips.map(chip => chip._id),
        categorys: categorys.map(category => category._id),
        subcategorys: subcategorys.map(subcategory => subcategory._id),
        video,
        brand,
        category,
        product_collection,
        quantity,
        count_in_stock,
        facts,
        included_items: included_items.length === 0 ? "" : included_items,
        description,
        hidden,
        sale_price,
        sale_start_date: accurate_date(start_date),
        sale_end_date: accurate_date(end_date),
        package_volume: package_length * package_width * package_height,
        subcategory,
        meta_title: `${name} | Glow LEDs`,
        meta_description,
        meta_keywords,
        package_length,
        package_width,
        package_height,
        product_length,
        product_width,
        product_height,
        weight_pounds,
        weight_ounces,
        preorder,
        contributers: contributers.length === 0 ? [] : contributers,
        pathname: pathname ? pathname : snake_case(name),
        order,
        product_options,
        finite_stock,
        products: products.map(chip => chip._id),
        group_product,
        material_cost,
        filament_used,
        printing_time,
        assembly_time,
        processing_time,
        group_name,
        color_product_group,
        color_group_name,
        color_products,
        secondary_color_product_group,
        secondary_color_group_name,
        secondary_color_products,
        secondary_product_group,
        secondary_group_name,
        secondary_products,
        option_product_group,
        option_group_name,
        option_products,
        color,
        color_code,
        size,
        default_option,
        option,
        macro_product,
        extra_cost,
        item_group_id: props.match.params.item_group_id || item_group_id,
        previous_price,
        has_add_on,
        filament: filament ? filament._id : null
      })
    );
    // if (props.match.params.product_option && props.match.params.item_group_id) {
    //   const {
    //     data: option_product,
    //   } = await API_Products.findByPathname_products_a(
    //     pathname ? pathname : snake_case(name)
    //   );
    //   const { data: macro_product } = await API_Products.findById_products_a(
    //     props.match.params.item_group_id
    //   );
    //   let saved_data = {
    //     _id: macro_product.item_group_id,
    //   };
    //   switch (props.match.params.product_option) {
    //     case "color_product":
    //       saved_data = {
    //         ...saved_data,
    //         color_products: [
    //           ...macro_product.color_products,
    //           option_product._id,
    //         ],
    //       };
    //       break;
    //     case "secondary_color_product":
    //       saved_data = {
    //         ...saved_data,
    //         secondary_color_products: [
    //           ...macro_product.secondary_color_products,
    //           option_product._id,
    //         ],
    //       };
    //       break;
    //     case "option_product":
    //       saved_data = {
    //         ...saved_data,
    //         option_products: [
    //           ...macro_product.option_products,
    //           option_product._id,
    //         ],
    //       };
    //       break;
    //     case "secondary_product":
    //       saved_data = {
    //         ...saved_data,
    //         secondary_products: [
    //           ...macro_product.secondary_products,
    //           option_product._id,
    //         ],
    //       };
    //       break;

    //     default:
    //       break;
    //   }
    //   dispatch(saveProduct(saved_data));
    //   // if (success){

    //   // }
    //   // history.push(
    //   //   `/secure/glow/editproduct/${macro_product.pathname}/false`
    //   // );
    // }
  };

  const sort_filament = filaments_list => {
    return filaments_list;
    // return filaments_list?.sort(function (a, b) {
    //   var textA = a.color.toUpperCase();
    //   var textB = b.color.toUpperCase();
    //   return textA < textB ? -1 : textA > textB ? 1 : 0;
    // });
  };

  let num = 0;

  const save_second_product = async () => {
    if (props.match.params.product_option && props.match.params.item_group_id) {
      const { data: option_product } = await API_Products.findByPathname_products_a(pathname);
      const { data: macro_product } = await API_Products.findById_products_a(props.match.params.item_group_id);
      let saved_data = {
        _id: macro_product.item_group_id
      };
      switch (props.match.params.product_option) {
        case "color_product":
          saved_data = {
            ...macro_product,
            color_products: [...macro_product.color_products, option_product._id]
          };
          break;
        case "secondary_color_product":
          saved_data = {
            ...macro_product,
            secondary_color_products: [...macro_product.secondary_color_products, option_product._id]
          };
          break;
        case "option_product":
          saved_data = {
            ...macro_product,
            option_products: [...macro_product.option_products, option_product._id]
          };
          break;
        case "secondary_product":
          saved_data = {
            ...macro_product,
            secondary_products: [...macro_product.secondary_products, option_product._id]
          };
          break;

        default:
          break;
      }
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    save_product();
    // e.target.reset();
    // unset_state();
    // history.push('/secure/glow/products');
  };

  const move_left = e => {
    e.preventDefault();
    // const current_product = all_products.find(item => item._id ===  product._id)
    // const filtered_products = all_products.filter((item) => !item.option).filter((item) => !item.hidden);

    const current_product_index = filtered_products.map(item => item.pathname).indexOf(product.pathname);

    let left_product_index = current_product_index - 1;
    if (left_product_index === -1) {
      left_product_index = filtered_products.length - 1;
    }

    dispatch(set_new_index(left_product_index));
    if (save) {
      save_product();
    } else {
      history.push("/secure/glow/editproduct/" + filtered_products[left_product_index].pathname);
    }
  };
  const move_right = e => {
    e.preventDefault();
    // const filtered_products = all_products.filter((item) => !item.option).filter((item) => !item.hidden);

    const current_product_index = filtered_products.map(item => item.pathname).indexOf(product.pathname);

    let right_product_index = current_product_index + 1;
    if (right_product_index >= filtered_products.length) {
      right_product_index = 0;
    }

    set_new_index(right_product_index);
    if (save) {
      save_product();
    } else {
      history.push("/secure/glow/editproduct/" + filtered_products[right_product_index].pathname);
    }
  };

  const create_product_options = (e, type) => {
    e.preventDefault();
    dispatch(set_loading_options(true));

    switch (type) {
      case "color":
        create_color_products(
          product,
          value => dispatch(set_product({ color_products: value })),
          color_products,
          color_modifier,
          color_images
        );
        dispatch(set_loading_options(false));
        break;

      case "secondary_color":
        create_secondary_color_products(
          product,

          value => dispatch(set_product({ secondary_color_products: value })),
          secondary_color_products,
          secondary_color_modifier,
          secondary_color_images
        );
        dispatch(set_loading_options(false));
        break;

      case "option":
        create_option_products(
          product,
          value => dispatch(set_product({ option_products: value })),
          option_products,
          option_modifier,
          option_images
        );
        dispatch(set_loading_options(false));
        break;

      case "secondary":
        create_secondary_products(
          product,
          value => dispatch(set_product({ secondaru_products: value })),
          secondary_products,
          secondary_modifier,
          secondary_images
        );
        dispatch(set_loading_options(false));
        break;

      default:
        break;
    }
  };

  const add_product_options = async (option_ids, type) => {
    const { data } = await API_Products.add_product_options(product._id, option_ids, type);
    dispatch(set_product({ secondary_color_products: data }));
  };

  return (
    <div className="main_container p-20px">
      <h1 style={{ textAlign: "center" }}>{props.match.params.pathname ? "Edit Product" : "Create Product"}</h1>
      <Loading loading={loading_options} />
      <Notification message={message} />

      <div className="form">
        <form onSubmit={submitHandler} className="w-100per">
          <Loading loading={loadingSave} error={errorSave} />
          <Loading loading={loading} error={error}>
            {product && (
              <div>
                <Helmet>
                  <title>Edit Product | Glow LEDs</title>
                </Helmet>
                {/* <Prompt
									when={shouldBlockNavigation}
									message="You have unsaved changes, are you sure you want to leave?"
								/> */}
                <ul className="edit-form-container" style={{ maxWidth: "105rem", marginBottom: "20px" }}>
                  {loading_checkboxes ? (
                    <div>Loading...</div>
                  ) : (
                    <li className="w-100per row">
                      <label htmlFor="save">Save Product</label>
                      <input
                        type="checkbox"
                        name="save"
                        defaultChecked={save}
                        id="save"
                        onChange={e => dispatch(set_product({ [e.target.name]: e.target.checked }))}
                      />
                    </li>
                  )}

                  <div className="row">
                    <div className="ai-c">
                      <GLButton
                        style={{ borderRadius: "50%" }}
                        variant="icon"
                        className="h-59px"
                        onClick={e => move_left(e)}
                        aria-label="Previous"
                      >
                        <i className="fas fa-arrow-circle-left fs-40px" />
                      </GLButton>
                    </div>
                    <h2
                      style={{
                        textAlign: "center",
                        width: "100%",
                        marginRight: "auto",
                        justifyContent: "center"
                      }}
                      className="ta-c "
                    >
                      <Link
                        to={{
                          pathname: "/collections/all/products/" + product.pathname,
                          previous_path: history.location.pathname
                        }}
                      >
                        {loading ? "Product" : product.name}
                      </Link>
                    </h2>

                    <div className="ai-c">
                      <GLButton
                        style={{ borderRadius: "50%" }}
                        variant="icon"
                        className="h-59px"
                        onClick={e => move_right(e)}
                        aria-label="Next"
                      >
                        <i className="fas fa-arrow-circle-right fs-40px" />
                      </GLButton>
                    </div>
                  </div>
                  <ImageUploader />
                  <li>
                    <div className="ai-c h-25px mb-15px jc-c">
                      <div className="custom-select">
                        <select className="qty_select_dropdown" onChange={e => use_template(e)}>
                          <option key={1} defaultValue="">
                            ---Choose Product as a Template---
                          </option>
                          {macro_products_list.map((product, index) => (
                            <option key={index} value={product.pathname}>
                              {product.name}
                            </option>
                          ))}
                        </select>
                        <span className="custom-arrow" />
                      </div>
                    </div>
                  </li>
                  <div className="row wrap jc-b">
                    <div className="w-228px m-10px">
                      <li>
                        <label htmlFor="id">ID</label>
                        <input
                          type="text"
                          name="id"
                          value={product._id}
                          id="id"
                          // onChange={(e) => setName(e.target.value)}
                        />
                      </li>

                      <li>
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={name}
                          id="name"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="color">Color</label>
                        <input
                          type="text"
                          name="color"
                          value={color}
                          id="color"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="color_code">Color Code</label>
                        <input
                          type="text"
                          name="color_code"
                          value={color_code}
                          id="color_code"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="size">Size</label>
                        <input
                          type="text"
                          name="size"
                          value={size}
                          id="size"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="price">Price</label>
                        <input
                          type="text"
                          name="price"
                          value={price}
                          id="price"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>

                      <li>
                        <label htmlFor="previous_price">Previous Price</label>
                        <input
                          type="text"
                          name="previous_price"
                          value={previous_price}
                          id="previous_price"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="wholesale_product">Whole Sale Product</label>
                          <input
                            type="checkbox"
                            name="wholesale_product"
                            defaultChecked={wholesale_product}
                            id="wholesale_product"
                            onChange={e => dispatch(set_product({ [e.target.name]: e.target.checked }))}
                          />
                        </li>
                      )}
                      {wholesale_product && (
                        <li>
                          <label htmlFor="wholesale_price">Wholesale Price</label>
                          <input
                            type="text"
                            name="wholesale_price"
                            value={wholesale_price}
                            id="wholesale_price"
                            onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                          />
                        </li>
                      )}

                      <li>
                        <label htmlFor="sale_price">Sale Price</label>
                        <input
                          type="text"
                          name="sale_price"
                          value={sale_price}
                          id="sale_price"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="extra_cost">Extra Cost</label>
                        <input
                          type="text"
                          name="extra_cost"
                          value={extra_cost}
                          id="extra_cost"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      {/* <li>
												<div className="jc-b">
													<div>
														<label htmlFor="sale_start_date">Start Date</label>
														<input
															type="text"
															className="w-100per"
															name="sale_start_date"
															value={sale_start_date}
															id="sale_start_date"
															onChange={(e) => set_sale_start_date(e.target.value)}
														/>
													</div>
													<div className="m-7px pt-22px">
														<i className="fas fa-minus" />
													</div>
													<div>
														<label htmlFor="sale_end_date">End Date</label>
														<input
															type="text"
															className="w-100per"
															name="sale_end_date"
															value={sale_end_date}
															id="sale_end_date"
															onChange={(e) => set_sale_end_date(e.target.value)}
														/>
													</div>
												</div>
											</li> */}
                      <li>
                        <div className="jc-b">
                          <div className="mr-5px">
                            <label htmlFor="sale_start_date">Start Date</label>
                            <input
                              type="text"
                              className="w-100per"
                              name="sale_start_date"
                              value={sale_start_date}
                              id="sale_start_date"
                              onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                            />
                          </div>
                          <div>
                            <label htmlFor="sale_start_time">Start Time</label>
                            <input
                              type="text"
                              className="w-100per"
                              name="sale_start_time"
                              value={sale_start_time}
                              id="sale_start_time"
                              onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                            />
                          </div>
                        </div>
                      </li>
                      <div className="w-100per ta-c fs-20px">
                        <i className="fas fa-arrow-down" />
                      </div>
                      <li>
                        <div className="jc-b">
                          <div className="mr-5px">
                            <label htmlFor="sale_end_date">End Date</label>
                            <input
                              type="text"
                              className="w-100per"
                              name="sale_end_date"
                              value={sale_end_date}
                              id="sale_end_date"
                              onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                            />
                          </div>

                          <div>
                            <label htmlFor="sale_end_time">End Time</label>
                            <input
                              type="text"
                              className="w-100per"
                              name="sale_end_time"
                              value={sale_end_time}
                              id="sale_end_time"
                              onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                            />
                          </div>
                        </div>
                      </li>
                      <li>
                        <label htmlFor="category">Category</label>
                        <input
                          type="text"
                          name="category"
                          value={category}
                          id="category"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="subcategory">Subcategories</label>
                        <input
                          type="text"
                          name="subcategory"
                          value={subcategory}
                          id="subcategory"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="product_collection">Collection</label>
                        <input
                          type="text"
                          name="product_collection"
                          value={product_collection}
                          id="product_collection"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="brand">Brand</label>
                        <input
                          type="text"
                          name="brand"
                          value={brand}
                          id="brand"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      {/* <li>
												<label htmlFor="display_image">Display Image</label>
												<input
													type="text"
													name="display_image"
													value={display_image}
													id="display_image"
													onChange={(e) => setDisplayImage(e.target.value)}
												/>
											</li> */}
                      {/* <li>
												<label htmlFor="display_image">Display Image</label>
												<input
													type="text"
													name="display_image"
													value={display_image}
													id="display_image"
													onChange={(e) => setDisplayImage(e.target.value)}
												/>
											</li> */}
                      <li>
                        <label htmlFor="video">Video</label>
                        <input
                          type="text"
                          name="video"
                          defaultValue={video}
                          id="video"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="hidden">Hide Product</label>
                          <input
                            type="checkbox"
                            name="hidden"
                            defaultChecked={hidden}
                            id="hidden"
                            onChange={e => dispatch(set_product({ [e.target.name]: e.target.checked }))}
                          />
                        </li>
                      )}
                    </div>

                    <div className="w-228px m-10px">
                      <li>
                        <label htmlFor="quantity">Quantity</label>
                        <input
                          type="text"
                          name="quantity"
                          value={quantity}
                          id="quantity"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="count_in_stock">Count In Stock</label>
                        <input
                          type="text"
                          name="count_in_stock"
                          value={count_in_stock}
                          id="count_in_stock"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="has_add_on">Has Add On</label>
                          <input
                            type="checkbox"
                            name="has_add_on"
                            defaultChecked={has_add_on}
                            id="has_add_on"
                            onChange={e => dispatch(set_product({ [e.target.name]: e.target.checked }))}
                          />
                        </li>
                      )}
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="finite_stock">Finite Stock</label>
                          <input
                            type="checkbox"
                            name="finite_stock"
                            defaultChecked={finite_stock}
                            id="finite_stock"
                            onChange={e => dispatch(set_product({ [e.target.name]: e.target.checked }))}
                          />
                        </li>
                      )}
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="preorder">Preorder</label>
                          <input
                            type="checkbox"
                            name="preorder"
                            defaultChecked={preorder}
                            id="preorder"
                            onChange={e => dispatch(set_product({ [e.target.name]: e.target.checked }))}
                          />
                        </li>
                      )}
                      <li>
                        <label htmlFor="facts">Facts</label>
                        <textarea
                          className="edit_product_textarea"
                          name="facts"
                          defaultValue={facts}
                          value={facts}
                          id="facts"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="included_items">Included Items</label>
                        <textarea
                          className="edit_product_textarea"
                          name="included_items"
                          value={included_items}
                          id="included_items"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      {/* <li>
												<label htmlFor="contributers">Contributers</label>
												<textarea
													className="edit_product_textarea"
													name="contributers"
													value={contributers}
													id="contributers"
													onChange={(e) => set_contributers(e.target.value)}
												/>
											</li> */}

                      <li>
                        <label htmlFor="description">Description</label>
                        <textarea
                          className="edit_product_textarea"
                          name="description"
                          value={description}
                          id="description"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                    </div>
                    <div className="" style={{ width: "228px", margin: "10px" }}>
                      <li>
                        <label htmlFor="pathname">Pathname</label>
                        <input
                          type="text"
                          name="pathname"
                          defaultValue={pathname ? pathname : name && snake_case(name)}
                          id="pathname"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="order">Order</label>
                        <input
                          type="text"
                          name="order"
                          defaultValue={order}
                          id="order"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="meta_title">Meta Title</label>
                        <input
                          type="text"
                          name="meta_title"
                          value={name && `${name} | Glow LEDs`}
                          id="meta_title"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="meta_description">Meta Description</label>
                        <textarea
                          className="edit_product_textarea"
                          name="meta_description"
                          value={meta_description}
                          id="meta_description"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="meta_keywords">Meta Keywords</label>
                        <textarea
                          className="edit_product_textarea"
                          name="meta_keywords"
                          value={meta_keywords}
                          id="meta_keywords"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="material_cost">Material Cost</label>
                        <input
                          type="text"
                          name="material_cost"
                          defaultValue={material_cost}
                          id="material_cost"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="filament_used">Filament Used</label>
                        <input
                          type="text"
                          name="filament_used"
                          value={filament_used}
                          id="filament_used"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="printing_time">Printing Time</label>
                        <input
                          type="text"
                          name="printing_time"
                          value={printing_time}
                          id="printing_time"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="assembly_time">Assembly Time</label>
                        <input
                          type="text"
                          name="assembly_time"
                          defaultValue={assembly_time}
                          id="assembly_time"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <div className="jc-b">
                          <div className="mr-5px">
                            <label htmlFor="processing_time">Processing Time Min</label>
                            <input
                              type="text"
                              className="w-100per"
                              name="processing_time"
                              defaultValue={processing_time && processing_time[0]}
                              id="processing_time"
                              onChange={e => dispatch(set_product({ [e.target.name]: [e.target.value, processing_time[1]] }))}
                            />
                          </div>
                          <div>
                            <label htmlFor="processing_time">Processing Time Max</label>
                            <input
                              type="text"
                              className="w-100per"
                              name="processing_time"
                              defaultValue={processing_time && processing_time[1]}
                              id="processing_time"
                              onChange={e => dispatch(set_product({ [e.target.name]: [processing_time[0], e.target.value] }))}
                            />
                          </div>
                        </div>
                      </li>
                    </div>
                    <div className="w-228px m-10px">
                      <h3>Product Dimmensions</h3>
                      <li>
                        <label htmlFor="product_length">Product Length</label>
                        <input
                          type="text"
                          name="product_length"
                          defaultValue={product_length}
                          id="product_length"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="product_width">Product Width</label>
                        <input
                          type="text"
                          name="product_width"
                          value={product_width}
                          id="product_width"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="product_height">Product Height</label>
                        <input
                          type="text"
                          name="product_height"
                          value={product_height}
                          id="product_height"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <h3>Package Dimmensions</h3>
                      <li>
                        <label htmlFor="package_length">Package Length</label>
                        <input
                          type="text"
                          name="package_length"
                          defaultValue={package_length}
                          id="package_length"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="package_width">Package Width</label>
                        <input
                          type="text"
                          name="package_width"
                          value={package_width}
                          id="package_width"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="package_height">Package Height</label>
                        <input
                          type="text"
                          name="package_height"
                          value={package_height}
                          id="package_height"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="package_volume">Package Volume</label>
                        <input
                          type="text"
                          name="package_volume"
                          value={package_length && package_width && package_height && package_length * package_width * package_height}
                          id="package_volume"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      {/* <li>
												<label htmlFor="package_height">
													Calculated Volume {length && length * package_width * package_height}
												</label>
											</li> */}
                      <li>
                        <label htmlFor="weight_pounds">Package lbs</label>
                        <input
                          type="text"
                          name="weight_pounds"
                          value={weight_pounds}
                          id="weight_pounds"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                      <li>
                        <label htmlFor="weight_ounces">Package oz</label>
                        <input
                          type="text"
                          name="weight_ounces"
                          value={weight_ounces}
                          id="weight_ounces"
                          onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                        />
                      </li>
                    </div>
                  </div>
                  <ImageDisplay
                    images={images}
                    set_images={value => dispatch(set_product({ images: value }))}
                    image={image}
                    set_image={value => dispatch(set_product({ image: value }))}
                  />
                  {/* <li>
										<label htmlFor="image">Image</label>
										<input
											type="text"
											name="image"
											value={image}
											id="image"
											onChange={(e) => set_image(e.target.value)}
										/>
										<GLButton variant="primary" onClick={(e) => add_image(e)}>
											Add Image
										</button>
									</li>

									{image_display(images)} */}
                  <DropdownDisplay
                    item_group_id={product._id}
                    item_list={categorys_list}
                    display_key={"name"}
                    list_items={categorys}
                    set_items={value => dispatch(set_product({ categorys: value }))}
                    list_name={"Categorys"}
                  />
                  <DropdownDisplay
                    item_group_id={product._id}
                    item_list={categorys_list}
                    display_key={"name"}
                    list_items={subcategorys}
                    set_items={value => dispatch(set_product({ subcategorys: value }))}
                    list_name={"Subcategorys"}
                  />
                  {/* {option_list(categorys_list, categorys, set_categorys, 'Categorys')}
									{option_list(categorys_list, subcategorys, set_subcategorys, 'Subcategorys')} */}
                  {users && (
                    <DropdownDisplay
                      item_group_id={product._id}
                      item_list={users}
                      display_key={"first_name"}
                      list_items={contributers}
                      set_items={value => dispatch(set_product({ contributers: value }))}
                      list_name={"Contributers"}
                    />
                  )}
                  {loading_checkboxes ? (
                    <div>Loading...</div>
                  ) : (
                    <li>
                      <label htmlFor="macro_product">Macro Product</label>
                      <input
                        type="checkbox"
                        name="macro_product"
                        defaultChecked={macro_product}
                        id="macro_product"
                        onChange={e => dispatch(set_product({ [e.target.name]: e.target.checked }))}
                      />
                    </li>
                  )}
                  {loading_checkboxes ? (
                    <div>Loading...</div>
                  ) : (
                    <li>
                      <label htmlFor="option">Option</label>
                      <input
                        type="checkbox"
                        name="option"
                        defaultChecked={option}
                        id="option"
                        onChange={e => dispatch(set_product({ [e.target.name]: e.target.checked }))}
                      />
                    </li>
                  )}
                  {option && (
                    <div>
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <div>
                          <li>
                            <label htmlFor="default_option">Default Option</label>
                            <input
                              type="checkbox"
                              name="default_option"
                              defaultChecked={default_option}
                              id="default_option"
                              onChange={e => dispatch(set_product({ [e.target.name]: e.target.checked }))}
                            />
                          </li>

                          <li>
                            <label aria-label="Sort" htmlFor="sort" className="select-label mb-15px">
                              Choose Macro Product
                            </label>
                            <div className="ai-c h-25px mb-15px">
                              <div className="custom-select">
                                <select
                                  className="qty_select_dropdown"
                                  name="item_group_id"
                                  onChange={e => dispatch(set_product({ [e.target.name]: JSON.parse(e.target.value) }))}
                                >
                                  <option key={1} defaultValue="">
                                    ---Choose Product---
                                  </option>
                                  {macro_products_list
                                    .filter(product => !product.hidden)
                                    .filter(product => !product.option)
                                    .map((product, index) => (
                                      <option key={index} value={product._id}>
                                        {product.name}
                                      </option>
                                    ))}
                                </select>
                                <span className="custom-arrow" />
                              </div>
                            </div>
                          </li>
                          <li>
                            <label htmlFor="product">Item Group ID</label>
                            <input
                              type="text"
                              name="item_group_id"
                              defaultValue={item_group_id}
                              value={item_group_id}
                              id="product"
                              onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                            />
                          </li>
                        </div>
                      )}
                    </div>
                  )}
                  {option && (
                    <div>
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <div>
                          <li>
                            <label aria-label="Sort" htmlFor="sort" className="select-label mb-15px">
                              Choose Filament
                            </label>
                            <div className="ai-c h-25px mb-15px">
                              <div className="custom-select">
                                <select
                                  className="qty_select_dropdown"
                                  name="filament"
                                  value={JSON.stringify(filament)}
                                  onChange={e => dispatch(set_product({ [e.target.name]: JSON.parse(e.target.value) }))}
                                >
                                  <option key={1} defaultValue="">
                                    ---Choose Filament---
                                  </option>
                                  {filaments_list &&
                                    filaments_list.length > 0 &&
                                    sort_filament(filaments_list).map((filament, index) => (
                                      <option key={index} value={JSON.stringify(filament)}>
                                        {filament.color} {filament.type}
                                      </option>
                                    ))}
                                </select>
                                <span className="custom-arrow" />
                              </div>
                            </div>
                          </li>
                          <li>
                            <label htmlFor="filament">Filament</label>
                            <input
                              type="text"
                              name="filament"
                              // defaultValue={filament._id}
                              value={filament && filament._id}
                              id="filament"
                              onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                            />
                          </li>
                        </div>
                      )}
                    </div>
                  )}

                  {macro_product && (
                    <div>
                      {color_product_group && (
                        <li>
                          <h2 className="ta-c">Color Product Group</h2>
                        </li>
                      )}
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="color_product_group">Color Product Group</label>
                          <input
                            type="checkbox"
                            name="color_product_group"
                            defaultChecked={color_product_group}
                            id="color_product_group"
                            onChange={e => dispatch(set_product({ [e.target.name]: e.target.checked }))}
                          />
                        </li>
                      )}

                      <div>
                        {color_product_group && (
                          <ul>
                            <li>
                              <label htmlFor="color_group_name">Color Product Group Name</label>
                              <input
                                type="text"
                                name="color_group_name"
                                value={color_group_name}
                                id="color_group_name"
                                onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                              />
                            </li>
                            <div>
                              <ImageDisplay
                                images={color_images}
                                set_images={value => dispatch(set_product({ color_images: value }))}
                                image={color_image}
                                set_image={value => dispatch(set_product({ color_image: value }))}
                              />
                              <div className="jc-b">
                                <div>
                                  <input
                                    type="text"
                                    name="color_modifier"
                                    id="color_modifier"
                                    defaultValue={determine_color_modifier(product.category)}
                                    className=""
                                    onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                                  />

                                  <GLButton variant="primary" onClick={e => create_product_options(e, "color")}>
                                    Create Color Products
                                  </GLButton>
                                </div>
                                <Link to={`/secure/glow/editproduct/${props.match.params.pathname}/true/color_product/${product._id}`}>
                                  <GLButton variant="primary">Create Color Product</GLButton>
                                </Link>
                              </div>
                            </div>
                            <DropdownDisplay
                              item_group_id={product._id}
                              item_list={option_products_list}
                              display_key={"name"}
                              list_items={color_products}
                              set_items={value => dispatch(set_product({ color_products: value }))}
                              list_name={"Color Products"}
                            />
                          </ul>
                        )}
                      </div>
                      {secondary_color_product_group && (
                        <li>
                          <h2 className="ta-c">Secondary Color Product Group</h2>
                        </li>
                      )}
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="secondary_color_product_group">Secondary Color Product Group</label>
                          <input
                            type="checkbox"
                            name="secondary_color_product_group"
                            defaultChecked={secondary_color_product_group}
                            id="secondary_color_product_group"
                            onChange={e => dispatch(set_product({ [e.target.name]: e.target.checked }))}
                          />
                        </li>
                      )}

                      <div>
                        {secondary_color_product_group && (
                          <ul>
                            <li>
                              <label htmlFor="secondary_color_group_name">Secondary Color Product Group Name</label>
                              <input
                                type="text"
                                name="secondary_color_group_name"
                                value={secondary_color_group_name}
                                id="secondary_color_group_name"
                                onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                              />
                            </li>
                            <div>
                              <ImageDisplay
                                images={secondary_color_images}
                                set_images={value => dispatch(set_product({ secondary_color_images: value }))}
                                image={secondary_color_image}
                                set_image={value => dispatch(set_product({ secondary_color_image: value }))}
                              />
                              <div className="jc-b">
                                <div>
                                  <input
                                    type="text"
                                    name="secondary_color_modifier"
                                    id="secondary_color_modifier"
                                    defaultValue={determine_secondary_color_modifier(product.category)}
                                    className=""
                                    onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                                  />
                                  <GLButton variant="primary" onClick={e => create_product_options(e, "secondary_color")}>
                                    Create Secondary Color Products
                                  </GLButton>
                                </div>
                                <Link
                                  to={`/secure/glow/editproduct/${props.match.params.pathname}/true/secondary_color_product/${product._id}`}
                                >
                                  <GLButton variant="primary">Create Secondary Color Product</GLButton>
                                </Link>
                              </div>
                            </div>
                            <GLButton
                              variant="secondary"
                              className="mv-10px mr-1rem"
                              onClick={() => copyToClipboard(secondary_color_products.map(product => product._id))}
                            >
                              Copy Secondary Products to Clipboard
                            </GLButton>
                            <div>
                              <label htmlFor="secondary_color_group_name">Paste Copied Secondary Color Product IDs Here</label>
                              <input
                                type="text"
                                name="secondary_color_ids"
                                id="secondary_color_ids"
                                className="w-100per"
                                onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                              />
                            </div>
                            <GLButton
                              variant="primary"
                              className="mv-10px mr-1rem"
                              onClick={() => add_product_options(secondary_color_ids, "secondary_color_products")}
                            >
                              Add Secondary Products
                            </GLButton>
                            <DropdownDisplay
                              item_group_id={product._id}
                              item_list={option_products_list}
                              display_key={"name"}
                              list_items={secondary_color_products}
                              set_items={value => dispatch(set_product({ secondary_color_products: value }))}
                              list_name={"Secondary Color Products"}
                            />
                          </ul>
                        )}
                      </div>
                      {option_product_group && (
                        <li>
                          <h2 className="ta-c">Option Color Product Group</h2>
                        </li>
                      )}

                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="option_product_group">Option Product Group</label>
                          <input
                            type="checkbox"
                            name="option_product_group"
                            defaultChecked={option_product_group}
                            id="option_product_group"
                            onChange={e => dispatch(set_product({ [e.target.name]: e.target.checked }))}
                          />
                        </li>
                      )}

                      <div>
                        {option_product_group && (
                          <ul>
                            <li>
                              <label htmlFor="option_group_name">Option Product Group Name</label>
                              <input
                                type="text"
                                name="option_group_name"
                                value={option_group_name}
                                id="option_group_name"
                                onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                              />
                            </li>
                            <div>
                              <ImageDisplay
                                images={option_images}
                                set_images={value => dispatch(set_product({ option_images: value }))}
                                image={option_image}
                                set_image={value => dispatch(set_product({ option_image: value }))}
                              />
                              <div className="jc-b">
                                <div>
                                  <input
                                    type="text"
                                    name="option_modifier"
                                    id="option_modifier"
                                    defaultValue={determine_option_modifier(product.category)}
                                    className=""
                                    onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                                  />
                                  <GLButton variant="primary" onClick={e => create_product_options(e, "option")}>
                                    Create Option Products
                                  </GLButton>
                                </div>
                                <Link to={`/secure/glow/editproduct/${props.match.params.pathname}/true/option_product/${product._id}`}>
                                  <GLButton variant="primary">Create Option Product</GLButton>
                                </Link>
                              </div>
                            </div>
                            <DropdownDisplay
                              item_group_id={product._id}
                              item_list={option_products_list}
                              display_key={"name"}
                              list_items={option_products}
                              set_items={value => dispatch(set_product({ option_products: value }))}
                              list_name={"Option Products"}
                            />
                          </ul>
                        )}
                      </div>
                      {secondary_product_group && (
                        <li>
                          <h2 className="ta-c">Secondary Product Group</h2>
                        </li>
                      )}
                      {loading_checkboxes ? (
                        <div>Loading...</div>
                      ) : (
                        <li>
                          <label htmlFor="secondary_product_group">Secondary Product Group</label>
                          <input
                            type="checkbox"
                            name="secondary_product_group"
                            defaultChecked={secondary_product_group}
                            id="secondary_product_group"
                            onChange={e => dispatch(set_product({ [e.target.name]: e.target.checked }))}
                          />
                        </li>
                      )}
                      <div>
                        {secondary_product_group && (
                          <ul>
                            <li>
                              <label htmlFor="secondary_group_name">Secondary Product Group Name</label>
                              <input
                                type="text"
                                name="secondary_group_name"
                                value={secondary_group_name}
                                id="secondary_group_name"
                                onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                              />
                            </li>
                            <div>
                              <ImageDisplay
                                images={secondary_images}
                                set_images={value => dispatch(set_product({ secondary_images: value }))}
                                image={secondary_image}
                                set_image={value => dispatch(set_product({ secondary_image: value }))}
                              />
                              <div className="jc-b">
                                <div>
                                  <input
                                    type="text"
                                    name="secondary_modifier"
                                    id="secondary_modifier"
                                    defaultValue={determine_secondary_modifier(product.category)}
                                    className=""
                                    onChange={e => dispatch(set_product({ [e.target.name]: e.target.value }))}
                                  />
                                  <GLButton variant="primary" onClick={e => create_product_options(e, "secondary")}>
                                    Create Secondary Products
                                  </GLButton>
                                </div>
                                <Link to={`/secure/glow/editproduct/${props.match.params.pathname}/true/secondary_product/${product._id}`}>
                                  <GLButton variant="primary">Create Secondary Product</GLButton>
                                </Link>
                              </div>
                            </div>
                            <DropdownDisplay
                              item_group_id={product._id}
                              item_list={macro_products_list}
                              display_key={"name"}
                              placement="top"
                              list_items={secondary_products}
                              set_items={value => dispatch(set_product({ secondary_products: value }))}
                              list_name={"Secondary Products"}
                            />
                          </ul>
                        )}
                      </div>
                    </div>
                  )}
                  {/* {option_list(chips_list, chips, set_chips, 'Chips')} */}

                  <DropdownDisplay
                    item_group_id={product._id}
                    item_list={chips_list}
                    display_key={"name"}
                    list_items={chips}
                    set_items={value => dispatch(set_product({ chips: value }))}
                    list_name={"Chips"}
                  />
                  {/* <div>
										{color_product_group && (
											<ul>
												<li>
													<label htmlFor="color_group_name">Item Group ID</label>
													<input
														type="text"
														name="color_group_name"
														value={color_group_name}
														id="color_group_name"
														onChange={(e) => set_color_group_name(e.target.value)}
													/>
												</li>

												<DropdownDisplay
                          item_group_id={product._id}
													item_list={macro_products_list}
													list_items={color_products}
													set_items={set_color_products}
													list_name={'Color Products'}
												/>
											</ul>
										)}
									</div> */}
                  <li>
                    <div className="ai-c h-25px mb-15px jc-c">
                      <div className="custom-select">
                        <select className="qty_select_dropdown" onChange={e => use_product_options_template(e)}>
                          <option key={1} defaultValue="">
                            ---Choose Product Option Template---
                          </option>
                          {macro_products_list.map((product, index) => (
                            <option key={index} value={product.pathname}>
                              {product.name}
                            </option>
                          ))}
                        </select>
                        <span className="custom-arrow" />
                      </div>
                    </div>
                  </li>
                  <div className="row">
                    <div className="ai-c">
                      <GLButton
                        style={{ borderRadius: "50%" }}
                        variant="icon"
                        className="h-59px"
                        onClick={e => move_left(e)}
                        aria-label="Previous"
                      >
                        <i className="fas fa-arrow-circle-left fs-40px" />
                      </GLButton>
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        width: "100%",
                        marginRight: "auto",
                        justifyContent: "center"
                      }}
                      className="ta-c "
                    />

                    <div className="ai-c">
                      <GLButton
                        style={{ borderRadius: "50%" }}
                        variant="icon"
                        className="h-59px"
                        onClick={e => move_right(e)}
                        aria-label="Next"
                      >
                        <i className="fas fa-arrow-circle-right fs-40px" />
                      </GLButton>
                    </div>
                  </div>

                  {/* <li>
										<GLButton variant="primary" onClick={(e) => add_product_option(e)}>
											Create Product Option
										</button>
									</li> */}

                  <li>
                    <GLButton type="submit" variant="primary">
                      {id ? "Update" : "Create"}
                    </GLButton>
                  </li>
                  <li>
                    <Link
                      to={{
                        pathname: "/collections/all/products/" + product.pathname,
                        previous_path: history.location.pathname
                      }}
                    >
                      <GLButton variant="secondary" className="w-100per">
                        Go to {loading ? "Product" : product.name}
                      </GLButton>
                    </Link>
                  </li>
                  <li>
                    <GLButton variant="secondary" onClick={() => history.goBack()}>
                      Back to Products
                    </GLButton>
                  </li>
                </ul>
              </div>
            )}
          </Loading>
        </form>
      </div>
    </div>
  );
};
export default EditProductPage;
