import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../../shared/SharedComponents";
import useChangedEffect from "../../shared/Hooks/useChangedEffect";
import { Helmet } from "react-helmet";
import useWindowDimensions from "../../shared/Hooks/windowDimensions";
import { getUrlParameter, manuals } from "../../utils/helper_functions";
import { ProductDetails, ProductFacts, ProductImages, ProductOptions, ProductSelection } from "./components";
import { GLButton } from "../../shared/GlowLEDsComponents";
import ProductSlideshow from "../../shared/GlowLEDsComponents/GLCarousel/ProductSlideshow copy";
import PictureChooser from "./components/PictureChooser";
import RelatedProductsSlideshow from "../../shared/GlowLEDsComponents/GLCarousel/RelatedProductsSlideshow";
import * as API from "../../api";
import { open_edit_product_modal } from "../../slices/productSlice";
import { EditProductModal } from "../ProductsPage/components";
import config from "../../config";

const ProductPage = props => {
  const userPage = useSelector(state => state.users.userPage);
  let { current_user } = userPage;

  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart, success } = cartPage;
  const { cartItems } = my_cart;

  const [name, set_name] = useState("");
  const [description, set_description] = useState("");
  const [facts, set_facts] = useState("");
  const [included_items, set_included_items] = useState("");
  const [qty, setQty] = useState(1);
  const [images, set_images] = useState([]);
  const [price, set_price] = useState();
  const [wholesale_price, set_wholesale_price] = useState();

  const [previous_price, set_previous_price] = useState(0);
  const [sale_price, set_sale_price] = useState(0);
  const [size, set_size] = useState();
  const [quantity, set_quantity] = useState();
  const [count_in_stock, set_count_in_stock] = useState();
  const [image, set_image] = useState("");
  const [secondary_image, set_secondary_image] = useState("");
  const [secondary_images, set_secondary_images] = useState([]);

  const [dimensions, set_dimensions] = useState({});

  const [color, set_color] = useState("");
  const [secondary_color, set_secondary_color] = useState("");

  const [color_code, set_color_code] = useState("");
  const [secondary_color_code, set_secondary_color_code] = useState("");

  const [color_product, set_color_product] = useState(null);
  const [color_products, set_color_products] = useState([]);
  const [secondary_color_product, set_secondary_color_product] = useState(null);
  const [secondary_color_products, set_secondary_color_products] = useState([]);
  const [option_product, set_option_product] = useState(null);
  const [option_products, set_option_products] = useState([]);
  const [secondary_product, set_secondary_product] = useState(null);
  const [secondary_products, set_secondary_products] = useState([]);
  const [preorder, set_preorder] = useState(false);

  const [secondary_product_name, set_secondary_product_name] = useState("");
  const [option_product_name, set_option_product_name] = useState("");

  const [color_product_object, set_color_product_object] = useState({});
  const [secondary_color_product_object, set_secondary_color_product_object] = useState({});
  const [option_product_object, set_option_product_object] = useState({});
  const [secondary_product_object, set_secondary_product_object] = useState({});

  const [show_add_on, set_show_add_on] = useState(false);
  const [add_on_price, set_add_on_price] = useState(0);
  const [has_add_on, set_has_add_on] = useState(false);
  // const [ color_group_name, set_color_group_name ] = useState('');
  // const [ secondary_color_group_name, set_secondary_color_group_name ] = useState('');
  // const [ option_group_name, set_option_group_name ] = useState('');
  // const [ secondary_group_name, set_secondary_group_name ] = useState('');

  const productPage = useSelector(state => state.products.productPage);
  const { product, loading, error } = productPage;

  const { width, height } = useWindowDimensions();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const open_cart = () => {
    const cart = document.querySelector(".cart_sidebar");

    if (cart.classList.value === "cart_sidebar open") {
      document.querySelector(".cart_sidebar").classList.remove("open");
    } else if (cart.classList.value === "cart_sidebar") {
      document.querySelector(".cart_sidebar").classList.add("open");
    }
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.detailsProduct(props.match.params.pathname));
      const video = document.getElementsByClassName("product_video");
      video.muted = true;
      video.autoplay = true;
      const query = getUrlParameter(props.location);
    }
    return () => (clean = false);
  }, []);

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.detailsProduct(props.match.params.pathname));
    }
    return () => (clean = false);
  }, [props.match.params.pathname]);

  const update_universal_state = item => {
    set_previous_price(0);
    if (item) {
      set_image(item.images_object && item.images_object[0].link);
      set_images(item.images_object);

      if (item.price > 0) {
        if (current_user?.isWholesaler) {
          set_wholesale_price(item.wholesale_price);
        }
        set_price(item.price);
      }
      if (item.hasOwnProperty("previous_price") && item.previous_price > 0) {
        set_previous_price(item.previous_price);
      }
      if (item.sale_price > 0) {
        set_sale_price(item.sale_price);
      }
      set_quantity(item.quantity);
      set_count_in_stock(item.count_in_stock);
      if (item.count_in_stock === 0) {
        set_preorder(true);
      } else {
        set_preorder(false);
      }
      set_name(item.name);
      set_description(item.description);
      set_facts(item.facts);
      set_color(item.color);
      set_secondary_color(item.secondary_color);
      set_color_products(item.color_products);
      set_secondary_color_products(item.secondary_color_products);
      set_option_products(item.option_products);

      set_secondary_products(item.secondary_products);
      set_included_items(item.included_items);
      set_has_add_on(item.has_add_on);
      set_dimensions({
        weight_pounds: item.weight_pounds,
        weight_ounces: item.weight_ounces,
        package_length: item.package_length,
        package_width: item.package_width,
        package_height: item.package_height,
        package_volume: item.package_volume,
      });
      set_size(item.size);
    }
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (product) {
        determine_options(product);
      } else {
        unset_state();
      }
    }
    return () => (clean = false);
  }, [product]);

  const determine_options = product => {
    update_universal_state(product);
    const query = getUrlParameter(props.location);
    if (props.location.search.length === 0) {
      if (product.color_products) {
        set_color_products(product.color_products);

        const color = product.color_products.find(color => color.default_option === true);
        if (color) {
          update_color_product_state(color);
        }
      }
      if (product.secondary_color_products) {
        set_secondary_color_products(product.secondary_color_products);

        const secondary_color = product.secondary_color_products.find(
          secondary_color => secondary_color.default_option === true
        );
        if (secondary_color) {
          update_secondary_color_product_state(secondary_color);
          if (product.has_add_on) {
            set_show_add_on(false);
          }
          if (product.name !== "CLOZD Omniskinz Sleds") {
            set_add_on_price(secondary_color.price);
            set_price(secondary_color.price + product.price);
          }
        } else {
          set_show_add_on(true);
        }
      }
      if (product.option_products) {
        set_option_products(product.option_products);

        const option = product.option_products.find(option => option.default_option === true);
        if (option) {
          update_option_product_state(option);
        }
      }
      if (product.secondary_products && product.secondary_products.length > 0) {
        // update_secondary_product_state(product.secondary_products[0]);
      }
    } else if (props.location.search.length > 0) {
      //
      if (product.color_products) {
        const color = product.color_products.find(color => color.color === query.color);
        //
        if (color) {
          update_color_product_state(color);
        }
      }
      if (product.secondary_color_products) {
        set_secondary_products(product.secondary_products);
        const secondary_color = product.secondary_color_products.find(
          secondary_color => secondary_color.color === query.secondary_color
        );
        if (secondary_color) {
          update_secondary_color_product_state(secondary_color);
        }
      }
      if (product.option_products) {
        let query_option = query.option;
        if (query.option && query.option.indexOf("%20") > -1) {
          query_option = query.option.split("%20").join(" ");
        }

        const option = product.option_products.find(option => option.size === query_option.split("%20").join(" "));
        if (option) {
          update_option_product_state(option);
        }
      }
      if (product.secondary_products && product.secondary_products.length > 0) {
        set_secondary_products(product.secondary_products);
        let query_secondary = query.secondary;
        if (query.secondary && query.secondary.indexOf("%20") > -1) {
          query_secondary = query.secondary.split("%20").join(" ");
        }
        const secondary =
          query.secondary &&
          product.secondary_products.find(secondary => secondary.name === query_secondary.split("%20").join(" "));
        if (secondary) {
          update_secondary_product_state(secondary);
        }
      }
    }
  };

  const update_color_product_state = color => {
    //
    set_color_product(color._id);
    set_color(color.color);
    set_color_code(color.color_code);
    set_color_product_object(color);
    // if (color.quantity) {
    // 	set_quantity(color.quantity);
    // }
    // if (color.count_in_stock) {
    // 	set_count_in_stock(color.count_in_stock);
    // }
    // update_url(color.color);
  };

  const update_secondary_color_product_state = secondary_color => {
    // if (product.name === "CLOZD Omniskinz Sleds") {
    //   set_color_product(secondary_color._id);
    //   set_color(secondary_color.color);
    //   set_color_code(secondary_color.color_code);
    //   set_color_product_object(secondary_color);
    // } else {
    set_secondary_color_product(secondary_color._id);
    set_secondary_color(secondary_color.color);
    set_secondary_color_code(secondary_color.color_code);
    set_secondary_color_product_object(secondary_color);
    // }

    // if (secondary_color.quantity) {
    // 	set_quantity(secondary_color.quantity);
    // }
    // if (secondary_color.count_in_stock) {
    // 	set_count_in_stock(secondary_color.count_in_stock);
    // }
    // update_url(color, secondary_color.color);
  };

  const update_option_product_state = option => {
    if (option.size) {
      set_size(option.size);
    }
    // else {
    // 	set_size(option.name);
    // }

    if (option.secondary_color) {
      set_secondary_color(option.secondary_color);
    }
    if (option.price > 0) {
      if (current_user?.isWholesaler) {
        set_wholesale_price(option.wholesale_price);
      }
      set_price(option.price);
    }
    if (option.sale_price > 0) {
      set_sale_price(option.sale_price);
    }
    if (option.count_in_stock === 0) {
      set_preorder(true);
    } else {
      set_preorder(false);
    }
    if (option.quantity) {
      set_quantity(option.quantity);
    }
    if (option.count_in_stock) {
      set_count_in_stock(option.count_in_stock);
    }

    set_dimensions({
      weight_pounds: option.weight_pounds,
      weight_ounces: option.weight_ounces,
      package_length: option.package_length,
      package_width: option.package_width,
      package_height: option.package_height,
      package_volume: option.package_volume,
    });
    set_option_product(option._id);
    set_option_product_name(option.name);
    set_option_product_object(option);
  };

  const update_secondary_product_state = secondary => {
    //
    set_secondary_product(secondary._id);
    set_secondary_product_name(secondary.name);
    set_secondary_product_object(secondary);
    if (secondary.quantity) {
      set_quantity(secondary.quantity);
    }
    if (secondary.count_in_stock) {
      set_count_in_stock(secondary.count_in_stock);
    }
    if (secondary.subcategory !== "batteries") {
      if (secondary.images_object.length > 0) {
        set_images(secondary.images_object);
        set_image(secondary.images_object && secondary.images_object[0]?.link);
      }
    }
  };

  const unset_state = () => {
    set_name("");
    set_description("");
    set_facts("");
    set_included_items("");
    setQty(1);
    set_images([]);
    set_price();
    set_previous_price(0);
    set_sale_price(0);
    set_size();
    set_quantity();
    set_count_in_stock();
    set_image("");
    set_secondary_image("");
    set_secondary_images([]);
    set_dimensions({});
    set_color("");
    set_secondary_color("");
    set_color_code("");
    set_secondary_color_code("");
    set_color_product(null);
    set_color_products([]);
    set_secondary_color_product(null);
    set_secondary_color_products([]);
    set_option_product(null);
    set_option_products([]);
    set_secondary_product(null);
    set_secondary_products([]);
    set_preorder(false);
    set_secondary_product_name("");
    set_option_product_name("");
    set_color_product_object({});
    set_secondary_color_product_object({});
    set_option_product_object({});
    set_secondary_product_object({});
    set_show_add_on(true);
    set_add_on_price(0);
    set_has_add_on(false);
  };

  const update_url = (color = "", secondary_color = "", option = "", secondary_product = "") => {
    navigate({
      search: `${color ? "?color=" + color : ""}${
        show_add_on && secondary_color ? "?secondary_color=" + secondary_color : ""
      }${option ? "?option=" + option : ""}${secondary_product ? "?secondary=" + secondary_product : ""}`,
    });
  };

  // useEffect(() => {
  //   let clean = true;
  //   if (clean) {
  //     if (error) {
  //       props.navigate("/collections/all/products");
  //     }
  //   }
  //   return () => (clean = false);
  // }, [error]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (config.NODE_ENV === "production") {
        const recently_viewed = sessionStorage.getItem("recently_viewed");
        const products = JSON.parse(recently_viewed);
        //
        if (recently_viewed) {
          if (product && product.hasOwnProperty("name")) {
            sessionStorage.setItem("recently_viewed", JSON.stringify([product, ...products]));
          }
        } else {
          if (product && product.hasOwnProperty("name")) {
            sessionStorage.setItem("recently_viewed", JSON.stringify([product]));
          }
        }
      }
    }
    return () => (clean = false);
  }, []);

  const determine_addon_color = () => {
    if (has_add_on && show_add_on && secondary_color) {
      return true;
    } else if (!has_add_on && secondary_color) {
      return true;
    }
    return false;
  };

  const handleAddToCart = () => {
    const cart_item = {
      product: product._id,
      color_product,
      color_code,
      secondary_color_code: determine_addon_color() ? secondary_color_code : null,
      secondary_color_product: determine_addon_color() ? secondary_color_product : null,
      secondary_color_group_name: determine_addon_color() ? product.secondary_color_group_name : null,
      secondary_color: determine_addon_color() ? secondary_color : null,
      secondary_color_product_name: determine_addon_color() ? product.secondary_color_product_name : null,
      color_group_name: product.color_group_name,
      option_group_name: product.option_group_name,
      secondary_group_name: product.secondary_group_name,
      option_product,
      option_product_name,
      secondary_product,
      secondary_product_name,
      name,
      size,
      color: size !== "1 Skin" && color,
      display_image: image ? image : images[0]?.link,
      secondary_image: secondary_image ? secondary_image : "",
      price,
      preorder,
      sale_price,
      sale_start_date: product.sale_start_date,
      sale_end_date: product.sale_end_date,
      quantity,
      weight_pounds: dimensions.weight_pounds,
      weight_ounces: dimensions.weight_ounces,
      package_length: dimensions.package_length,
      package_width: dimensions.package_width,
      package_height: dimensions.package_height,
      package_volume: dimensions.package_volume,
      processing_time: product.processing_time,
      pathname: props.match.params.pathname,
      category: product.category,
      subcategory: product.subcategory,
      qty: parseInt(qty),
      finite_stock: product.finite_stock,
      count_in_stock: product.count_in_stock,
      add_on_price,
      show_add_on,
      has_add_on: product.has_add_on,
      wholesale_product: product.wholesale_product,
      wholesale_price: wholesale_price,
    };
    if (preorder) {
      const confirm = window.confirm(
        `${name} are out of stock in your selected size.\n\nBy clicking OK you agree that you are preordering ${name} which will not ship within the usual time.\n\nIt is HIGHLY RECOMMENDED that you order ${name} separately from any in-stock items so we can ship you your in-stock products without needing to wait for your out-of-stock products.\n\nThank you for your support!\n\nYou will be notified when ${name} are restocked. We anticipate they will be restocked by the end of January.`
      );
      if (confirm) {
        dispatch(API.addToCart({ cart: my_cart, cart_item, type: "add_to_cart" }));
      }
    } else {
      dispatch(API.addToCart({ cart: my_cart, cart_item, type: "add_to_cart" }));
    }
    // if (current_user) {
    // 	dispatch(addToCart(cart_item));
    // }
    // open_cart();
  };

  useChangedEffect(() => {
    if (success) {
      open_cart();
    }
  }, [success]);

  // export const decide_warning = (preorder) => {
  // 	if (new Date() > new Date(date_1) && new Date() < new Date(date_2)) {
  // 		const confirm = window.confirm(
  // 			`Glow LEDs will be out of office from ${format_date(date_1)} - ${format_date(
  // 				date_2
  // 			)}. \n\nYou may still place orders in this time, but orders will not be shipped until after ${format_date(
  // 				date_2
  // 			)} \n\nThank you so much for your support! 💙`
  // 		);
  //
  // 		return confirm;
  // 	} else {
  // 		return true;
  // 	}
  // };

  const update_color = e => {
    const option = JSON.parse(e.target.value);
    //
    // if (
    //   option.price !== 0 ||
    //   option.price === null ||
    //   option.price === undefined
    // ) {
    //   set_price(option.price);
    // }
    // if (
    //   option.sale_price !== 0 ||
    //   option.sale_price === null ||
    //   option.sale_price === undefined
    // ) {
    //   set_sale_price(option.sale_price);
    // }
    set_color(option.color);
    set_color_code(option.color_code);
    if (option.images_object && option.images_object[0]) {
      set_images(option.images_object);
      set_image(option.images_object[0].link);
    }
    set_color_product(option._id);
    set_color_product_object(option);
    if (option.quantity) {
      set_quantity(option.quantity);
    }
    if (option.count_in_stock) {
      set_count_in_stock(option.count_in_stock);
    }
    update_url(option.color, secondary_color, option_product_name, secondary_product_name);
  };

  const update_secondary_color = e => {
    const option = JSON.parse(e.target.value);
    //

    // if (
    //   option.price !== 0 ||
    //   option.price === null ||
    //   option.price === undefined
    // ) {
    //   if (product.name === "Capez") {
    //     set_price(option.price);
    //   }
    // }
    // if (
    //   option.sale_price !== 0 ||
    //   option.sale_price === null ||
    //   option.sale_price === undefined
    // ) {
    //   set_sale_price(option.sale_price);
    // }
    set_secondary_color(option.color);
    set_secondary_color_code(option.color_code);
    if (option.images_object && option.images_object[0]) {
      if (product.name === "CLOZD Omniskinz Sleds") {
        set_image(option.images_object[0].link);
        set_images(option.images_object);
      } else {
        set_secondary_image(option.images_object[0].link);
        set_secondary_images(option.images_object);
      }
    }
    set_secondary_color_product(option._id);
    set_secondary_color_product_object(option);
    if (option.quantity) {
      set_quantity(option.quantity);
    }
    if (option.count_in_stock) {
      set_count_in_stock(option.count_in_stock);
    }
    if (has_add_on && show_add_on) {
      if (product.name === "Capez") {
        set_add_on_price(option.price);
        set_price(option.price + product.price);
        set_sale_price(option.sale_price + product.price);
      }
    }
    update_url(color, option.color, option_product_name, secondary_product_name);
  };

  const update_option = e => {
    const option = JSON.parse(e.target.value);
    if (option.size) {
      set_size(option.size);
    }
    if (option.count_in_stock === 0) {
      set_preorder(true);
    } else {
      set_preorder(false);
    }
    if (option.price > 0) {
      if (has_add_on && show_add_on) {
        if (current_user?.isWholesaler) {
          set_wholesale_price(option.wholesale_price);
        }
        set_price(option.price + add_on_price);
        set_sale_price(option.sale_price + add_on_price);
      } else {
        if (current_user?.isWholesaler) {
          set_wholesale_price(option.wholesale_price);
        }
        set_price(option.price);
        set_sale_price(option.sale_price);
      }
    }

    if (option.quantity) {
      set_quantity(option.quantity);
    }
    if (option.count_in_stock) {
      set_count_in_stock(option.count_in_stock);
    }

    if (option.subcategory !== "gloves") {
      if (option.images_object && option.images_object[0]) {
        set_images(option.images_object);
        set_image(option.images_object[0].link);
      }
      if (option.description) {
        set_description(option.description);
      }
      if (option.facts) {
        set_facts(option.facts);
      }
      if (option.included_items) {
        set_included_items(option.included_items);
      }
    }
    set_dimensions({
      weight_pounds: option.weight_pounds,
      weight_ounces: option.weight_ounces,
      package_length: option.package_length,
      package_width: option.package_width,
      package_height: option.package_height,
      package_volume: option.package_volume,
    });
    set_option_product_object(option);
    set_option_product(option._id);
    set_option_product_name(option.name);
    update_url(color, secondary_color, option.size);
  };

  const update_secondary = e => {
    const secondary = JSON.parse(e.target.value);
    if (secondary.subcategory !== "coin") {
      if (secondary.images_object && secondary.images_object[0]) {
        set_images(secondary.images_object);
        set_image(secondary.images_object[0].link);
      }
      if (product.name !== "Diffuser Caps + Adapters Starter Kit V4" && product.name !== "CLOZD Omniskinz Sleds") {
        set_option_products(secondary.option_products);
      }
    }
    if (secondary.quantity) {
      set_quantity(secondary.quantity);
    }
    if (secondary.count_in_stock) {
      set_count_in_stock(secondary.count_in_stock);
    }

    if (
      product.name === "CLOZD Nanoskinz V2" ||
      product.name === "OPYN Nanoskinz V2" ||
      product.name === "Capez" ||
      product.name === "CLOZD Omniskinz" ||
      product.name === "CLOZD Omniskinz Sleds"
    ) {
      if (product.name !== "CLOZD Omniskinz Sleds") {
        set_color_products(secondary.color_products);
      }
      set_secondary_color_products(secondary.secondary_color_products);
      // set_secondary_color_code(
      //   secondary.secondary_color_products[0].color_code
      // );
    }

    // set_secondary_products(secondary.secondary_products);
    if (product.category === "glowstringz") {
      if (current_user?.isWholesaler) {
        set_wholesale_price(secondary.wholesale_price);
      }
      set_price(secondary.price);
      set_sale_price(secondary.sale_price);
    }
    set_secondary_product(secondary._id);
    set_secondary_product_name(secondary.name);
    set_secondary_product_object(secondary);
    update_url(color, secondary_color, option_product_name, secondary.name);
  };

  const [out_of_stock, set_out_of_stock] = useState();
  const [show_product_options, set_show_product_options] = useState();

  return (
    !loading &&
    product?.hasOwnProperty("name") && (
      <div className="">
        <div className="p-1rem">
          <div className="jc-b">
            <div className="mb-10px">
              <Link to={props.location.previous_path || "/collections/all/products"} className="m-auto">
                <GLButton variant="secondary">Back to Products</GLButton>
              </Link>
            </div>
            {current_user?.isAdmin && (
              <div className="br-10px">
                <GLButton
                  variant="secondary"
                  className=" w-300px"
                  onClick={e => dispatch(open_edit_product_modal(product))}
                >
                  Edit Product
                </GLButton>
                {/* <GLButton variant="secondary" className=" w-300px" onClick={e => set_show_product_options(show => (show ? false : true))}>
                  Edit Product
                </GLButton>
                {show_product_options && (
                  <div className="pos-abs bg-secondary br-10px">
                    <div className="column bg-secondary br-10px">
                      <Link
                        to={"/secure/glow/editproduct/" + props.match.params.pathname + "/false"}
                        className="btn nav p-10px w-100per  br-10px"
                      >
                        Edit Macro
                      </Link>

                      {product &&
                        product.option_products.map(option => (
                          <Link to={"/secure/glow/editproduct/" + option.pathname + "/false"} className="btn nav p-10px w-100per  br-10px">
                            Edit {option.name}
                          </Link>
                        ))}
                    </div>
                  </div>
                )} */}
              </div>
            )}
          </div>
        </div>

        <Loading loading={loading} error={error}>
          {product && (
            <div className="">
              <Helmet>
                <title>{product.meta_title + " | Glow LEDs"}</title>
                <meta property="og:title" content={product.meta_title} />
                <meta name="twitter:title" content={product.meta_title} />
                <link rel="canonical" href={`https://www.glow-leds.com/collections/all/products/${product.pathname}`} />
                <meta
                  property="og:url"
                  content={`https://www.glow-leds.com/collections/all/products/${product.pathname}`}
                />
                {product.images_object && (
                  <div>
                    <meta property="og:image" content={"https://www.glow-leds.com/" + product.images_object[0].link} />

                    <meta
                      property="og:image:secure_url"
                      content={"https://www.glow-leds.com/" + product.images_object[0].link}
                    />
                    <meta name="twitter:image" content={"https://www.glow-leds.com/" + product.images_object[0].link} />
                  </div>
                )}
                <meta
                  name="description"
                  content={
                    product.meta_description
                      ? product.meta_description
                      : "Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskinz, and Glowstringz."
                  }
                />

                <meta
                  property="og:description"
                  content={
                    product.meta_description
                      ? product.meta_description
                      : "Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskinz, and Glowstringz."
                  }
                />

                <meta
                  name="twitter:description"
                  content={
                    product.meta_description
                      ? product.meta_description
                      : "Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskinz, and Glowstringz."
                  }
                />
              </Helmet>
              {!secondary_image && width <= 819 && (
                <div>
                  <h1 className="product_title_side ta-c lh-50px fs-25px mv-0px">{name}</h1>
                  <div className=" w-100per h-auto m-auto br-20px pos-rel" style={{ overflowX: "hidden" }}>
                    {images && (
                      <ProductSlideshow
                        product={product}
                        images={images}
                        secondary_images={secondary_images}
                        className=""
                        set_image={set_image}
                        interval={6000}
                        transitionTime={200}
                      />
                    )}
                    {/* {images.length > 4 &&
									width < 1000 && (
										<div className="tab_indicator pos-abs bottom-21px bob br-5px ta-c bg-primary h-30px w-30px p-4px box-s-d b-1px">
											{'>'}
										</div>
									)} */}
                  </div>
                </div>
              )}
              {/* <EditProductModal /> */}
              <div className="details">
                <div className="">
                  {(secondary_image || width > 819) && (
                    <div>
                      <label
                        className="product_title_top fs-25px title_font mb-2rem ta-c lh-50px"
                        style={{ display: width < 819 ? "block" : "none" }}
                      >
                        {name}
                      </label>
                      <div className="details-image">
                        <ProductImages secondary_image={secondary_image} name={name} image={image} />
                        {!secondary_image && width > 819 && (
                          <div>
                            <PictureChooser
                              product={product}
                              images={images}
                              secondary_images={secondary_images}
                              className="w-100per jc-c max-w-400px m-auto"
                              set_image={set_image}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {width < 500 &&
                  product &&
                  (product.category === "diffusers" ||
                    product.category === "diffuser_caps" ||
                    product.category === "exo_diffusers") && (
                    <div className=" w-100per m-auto">
                      <RelatedProductsSlideshow
                        product_category={"glowskinz"}
                        product_subcategory={"opyn"}
                        product={product}
                        random={false}
                        className=""
                        product_pathname={product.pathname}
                        title="Pairs great with OPYN Glowskinz"
                        category="opyn"
                      />
                    </div>
                  )}
                <div className="details-info desktop_product_view" style={{ display: width > 819 ? "block" : "none" }}>
                  <ProductSelection
                    product={product}
                    name={name}
                    price={price}
                    sale_price={sale_price}
                    previous_price={previous_price}
                    facts={facts}
                    wholesale_price={wholesale_price}
                  />
                </div>
                <div
                  className="details-action desktop_product_view"
                  style={{ display: width > 819 ? "block" : "none" }}
                >
                  <ProductOptions
                    product={product}
                    price={price}
                    sale_price={sale_price}
                    previous_price={previous_price}
                    update_secondary={update_secondary}
                    secondary_product_object={secondary_product_object}
                    size={size}
                    color_products={color_products}
                    color_code={color_code}
                    update_color={update_color}
                    color_product_object={color_product_object}
                    secondary_color_products={secondary_color_products}
                    secondary_color_code={secondary_color_code}
                    update_secondary_color={update_secondary_color}
                    secondary_color_product_object={secondary_color_product_object}
                    option_products={option_products}
                    update_option={update_option}
                    option_product_object={option_product_object}
                    qty={qty}
                    setQty={setQty}
                    quantity={quantity}
                    secondary_product={secondary_product}
                    count_in_stock={count_in_stock}
                    handleAddToCart={handleAddToCart}
                    out_of_stock={out_of_stock}
                    set_out_of_stock={set_out_of_stock}
                    preorder={preorder}
                    set_preorder={set_preorder}
                    show_add_on={show_add_on}
                    set_show_add_on={set_show_add_on}
                    set_price={set_price}
                    set_add_on_price={set_add_on_price}
                    set_secondary_color_product_object={set_secondary_color_product_object}
                    set_secondary_color_product={set_secondary_color_product}
                    set_secondary_color_products={set_secondary_color_products}
                    set_secondary_color={set_secondary_color}
                    set_secondary_color_code={set_secondary_color_code}
                    set_secondary_image={set_secondary_image}
                    has_add_on={has_add_on}
                    set_sale_price={set_sale_price}
                    wholesale_price={wholesale_price}
                  />
                </div>

                <div className="w-100per">
                  <div
                    className="details-action mobile_product_view"
                    style={{ display: width <= 819 ? "block" : "none" }}
                  >
                    <ProductOptions
                      product={product}
                      width={width}
                      price={price}
                      sale_price={sale_price}
                      previous_price={previous_price}
                      update_secondary={update_secondary}
                      secondary_product_object={secondary_product_object}
                      size={size}
                      color_products={color_products}
                      color_code={color_code}
                      update_color={update_color}
                      color_product_object={color_product_object}
                      secondary_color_products={secondary_color_products}
                      secondary_color_code={secondary_color_code}
                      update_secondary_color={update_secondary_color}
                      secondary_color_product_object={secondary_color_product_object}
                      option_products={option_products}
                      update_option={update_option}
                      option_product_object={option_product_object}
                      qty={qty}
                      setQty={setQty}
                      quantity={quantity}
                      secondary_product={secondary_product}
                      count_in_stock={count_in_stock}
                      handleAddToCart={handleAddToCart}
                      out_of_stock={out_of_stock}
                      set_out_of_stock={set_out_of_stock}
                      show_add_on={show_add_on}
                      set_show_add_on={set_show_add_on}
                      set_price={set_price}
                      set_add_on_price={set_add_on_price}
                      set_secondary_color_product_object={set_secondary_color_product_object}
                      set_secondary_color_product={set_secondary_color_product}
                      set_secondary_color_products={set_secondary_color_products}
                      set_secondary_color={set_secondary_color}
                      set_secondary_color_code={set_secondary_color_code}
                      set_secondary_image={set_secondary_image}
                      has_add_on={has_add_on}
                      set_sale_price={set_sale_price}
                      wholesale_price={wholesale_price}
                    />
                  </div>
                  <div
                    className="details-info mobile_product_view"
                    style={{ display: width <= 819 ? "block" : "none" }}
                  >
                    <ProductFacts
                      facts={facts}
                      category={product.category}
                      subcategory={product.subcategory}
                      pathname={product.pathname}
                      name={product.name}
                    />
                  </div>
                </div>
              </div>

              <ProductDetails
                product={product}
                manuals={manuals}
                description={description}
                included_items={included_items}
                pathname={props.match.params.pathname}
              />
            </div>
          )}
        </Loading>
        {product && product.name !== "Glowstringz V2" && product.name !== "Nova Clip" && (
          <div className=" w-100per m-auto">
            <RelatedProductsSlideshow
              product_category={product.category}
              product={product}
              random={false}
              className=""
              product_pathname={props.match.params.pathname}
              title="Fits the Same Microlight"
              category="chips"
            />
          </div>
        )}
        {product && product.name !== "Glowstringz V2" && product.name !== "Nova Clip" && (
          <div className=" w-100per m-auto">
            <RelatedProductsSlideshow
              product_category={product.category}
              random={false}
              className=""
              product_pathname={props.match.params.pathname}
              title="Related Products"
              category="related"
            />
          </div>
        )}
        {product &&
          product.category !== "batteries" &&
          product.name !== "Glowstringz V2" &&
          product.name !== "Nova Clip" && (
            <div className=" w-100per m-auto">
              <RelatedProductsSlideshow
                product_category={product.category}
                random={false}
                className=""
                product_pathname={props.match.params.pathname}
                title="Accessories You May Need"
                category="batteries"
              />
            </div>
          )}

        {product && (
          <div className=" w-100per m-auto">
            <RelatedProductsSlideshow
              product_category={product.category}
              random={true}
              className=""
              product_pathname={props.match.params.pathname}
              title="Suggested Products"
              category="all"
            />
          </div>
        )}
      </div>
    )
  );
};
export default ProductPage;
