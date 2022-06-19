import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../../actions/productActions";
import {
  PictureChooser,
  ProductSlideshow,
} from "../../components/SpecialtyComponents";
import { Loading } from "../../components/UtilityComponents";
import { Helmet } from "react-helmet";
import { addToCart } from "../../actions/cartActions";
import useWindowDimensions from "../../components/Hooks/windowDimensions";
import { getUrlParameter, manuals } from "../../utils/helper_functions";
import RelatedProductsSlideshow from "../../components/SpecialtyComponents/RelatedProductsSlideshow";
import {
  ProductDetails,
  ProductFacts,
  ProductImages,
  ProductOptions,
  ProductSelection,
} from "../../components/SpecialtyComponents/ProductPageComponents";

const ProductPage = props => {
  const userLogin = useSelector(state => state.userLogin);
  let { userInfo } = userLogin;
  const cart = useSelector(state => state.cart);
  let { cartItems } = cart;

  const [ name, set_name ] = useState("");
  const [ description, set_description ] = useState("");
  const [ facts, set_facts ] = useState("");
  const [ included_items, set_included_items ] = useState("");
  const [ qty, setQty ] = useState(1);
  const [ images, set_images ] = useState([]);
  const [ price, set_price ] = useState();

  const [ previous_price, set_previous_price ] = useState(0);
  const [ sale_price, set_sale_price ] = useState(0);
  const [ size, set_size ] = useState();
  const [ quantity, set_quantity ] = useState();
  const [ count_in_stock, set_count_in_stock ] = useState();
  const [ image, set_image ] = useState("");
  const [ secondary_image, set_secondary_image ] = useState("");
  const [ secondary_images, set_secondary_images ] = useState([]);

  const [ dimensions, set_dimensions ] = useState({});

  const [ color, set_color ] = useState("");
  const [ secondary_color, set_secondary_color ] = useState("");

  const [ color_code, set_color_code ] = useState("");
  const [ secondary_color_code, set_secondary_color_code ] = useState("");

  const [ color_product, set_color_product ] = useState(null);
  const [ color_products, set_color_products ] = useState([]);
  const [ secondary_color_product, set_secondary_color_product ] = useState(
    null
  );
  const [ secondary_color_products, set_secondary_color_products ] = useState(
    []
  );
  const [ option_product, set_option_product ] = useState(null);
  const [ option_products, set_option_products ] = useState([]);
  const [ secondary_product, set_secondary_product ] = useState(null);
  const [ secondary_products, set_secondary_products ] = useState([]);
  const [ preorder, set_preorder ] = useState(false);

  const [ secondary_product_name, set_secondary_product_name ] = useState("");
  const [ option_product_name, set_option_product_name ] = useState("");

  const [ color_product_object, set_color_product_object ] = useState({});
  const [
    secondary_color_product_object,
    set_secondary_color_product_object,
  ] = useState({});
  const [ option_product_object, set_option_product_object ] = useState({});
  const [ secondary_product_object, set_secondary_product_object ] = useState(
    {}
  );

  const [ show_add_on, set_show_add_on ] = useState(false);
  const [ add_on_price, set_add_on_price ] = useState(0);
  const [ has_add_on, set_has_add_on ] = useState(false);
  // const [ color_group_name, set_color_group_name ] = useState('');
  // const [ secondary_color_group_name, set_secondary_color_group_name ] = useState('');
  // const [ option_group_name, set_option_group_name ] = useState('');
  // const [ secondary_group_name, set_secondary_group_name ] = useState('');

  const productDetails = useSelector(state => state.productDetails);
  const { product, loading, error } = productDetails;

  // const productDetails = useSelector((state) => state.productDetails);
  // const { product, loading, error } = productDetails;

  const { width, height } = useWindowDimensions();

  const history = useHistory();

  const dispatch = useDispatch();

  const open_cart = () => {
    const cart = document.querySelector(".cart_sidebar");
    console.log(cart.classList.value);
    if (cart.classList.value === "cart_sidebar open") {
      document.querySelector(".cart_sidebar").classList.remove("open");
    } else if (cart.classList.value === "cart_sidebar") {
      document.querySelector(".cart_sidebar").classList.add("open");
    }
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(detailsProduct(props.match.params.pathname));
      const video = document.getElementsByClassName("product_video");
      video.muted = true;
      video.autoplay = true;
      const query = getUrlParameter(props.location);
    }
    return () => (clean = false);
  }, []);

  useEffect(
    () => {
      let clean = true;
      if (clean) {
        dispatch(detailsProduct(props.match.params.pathname));
      }
      return () => (clean = false);
    },
    [ props.match.params.pathname ]
  );

  const update_universal_state = item => {
    set_previous_price(0);
    if (item) {
      set_image(item.images && item.images[0]);
      set_images(item.images);

      if (item.price > 0) {
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
      console.log({ option_products: item.option_products });
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

  useEffect(
    () => {
      let clean = true;
      if (clean) {
        if (product) {
          determine_options(product);
        } else {
          console.log("UnSet");
          unset_state();
        }
      }
      return () => (clean = false);
    },
    [ product ]
  );

  const determine_options = product => {
    console.log({ product });
    update_universal_state(product);
    const query = getUrlParameter(props.location);
    if (props.location.search.length === 0) {
      // console.log({ message: 'Query Does Not Exist' });
      if (product.color_products) {
        set_color_products(product.color_products);

        const color = product.color_products.find(
          color => color.default_option === true
        );
        // console.log({ color });
        if (color) {
          update_color_product_state(color);
        }
      }
      if (product.secondary_color_products) {
        set_secondary_color_products(product.secondary_color_products);

        const secondary_color = product.secondary_color_products.find(
          secondary_color => secondary_color.default_option === true
        );
        // console.log({ secondary_color });
        if (secondary_color) {
          update_secondary_color_product_state(secondary_color);
          if (product.has_add_on) {
            set_show_add_on(false);
          }
          //   if (product.name !== "CLOZD Omniskinz Sleds") {
          //     set_add_on_price(secondary_color.price);
          //     set_price(secondary_color.price + product.price);
          //   }
          // } else {
          //   set_show_add_on(true);
          // }
        }
      }
      if (product.option_products) {
        set_option_products(product.option_products);

        const option = product.option_products.find(
          option => option.default_option === true
        );
        if (option) {
          update_option_product_state(option);
        }
      }
      if (product.secondary_products && product.secondary_products.length > 0) {
        // update_secondary_product_state(product.secondary_products[0]);
      }
    } else if (props.location.search.length > 0) {
      // console.log({ message: 'Query Does Exist' });
      if (product.color_products) {
        const color = product.color_products.find(
          color => color.color === query.color
        );
        // console.log({ query_color: color });
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

        const option = product.option_products.find(
          option => option.size === query_option.split("%20").join(" ")
        );
        if (option) {
          update_option_product_state(option);
        }
      }
      if (product.secondary_products && product.secondary_products.length > 0) {
        console.log({ query_secondary: query.secondary });
        set_secondary_products(product.secondary_products);
        let query_secondary = query.secondary;
        if (query.secondary && query.secondary.indexOf("%20") > -1) {
          query_secondary = query.secondary.split("%20").join(" ");
        }
        const secondary =
          query.secondary &&
          product.secondary_products.find(
            secondary =>
              secondary.name === query_secondary.split("%20").join(" ")
          );
        if (secondary) {
          update_secondary_product_state(secondary);
        }
      }
    }
  };

  const update_color_product_state = color => {
    // console.log({ color });
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
    // console.log({ secondary });
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
      if (secondary.images.length > 0) {
        set_images(secondary.images);
        set_image(secondary.images && secondary.images[0]);
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

  const update_url = (
    color = "",
    secondary_color = "",
    option = "",
    secondary_product = ""
  ) => {
    history.push({
      search: `${color ? "?color=" + color : ""}${show_add_on && secondary_color
        ? "?secondary_color=" + secondary_color
        : ""}${option ? "?option=" + option : ""}${secondary_product
        ? "?secondary=" + secondary_product
        : ""}`,
    });
  };

  useEffect(
    () => {
      let clean = true;
      if (clean) {
        if (error) {
          props.history.push("/collections/all/products");
        }
      }
      return () => (clean = false);
    },
    [ error ]
  );

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (process.env.NODE_ENV === "production") {
        const recently_viewed = sessionStorage.getItem("recently_viewed");
        const products = JSON.parse(recently_viewed);
        // console.log({ product });
        if (recently_viewed) {
          if (product && product.hasOwnProperty("name")) {
            sessionStorage.setItem(
              "recently_viewed",
              JSON.stringify([ product, ...products ])
            );
          }
        } else {
          if (product && product.hasOwnProperty("name")) {
            sessionStorage.setItem(
              "recently_viewed",
              JSON.stringify([ product ])
            );
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
      secondary_color_code: determine_addon_color()
        ? secondary_color_code
        : null,
      secondary_color_product: determine_addon_color()
        ? secondary_color_product
        : null,
      secondary_color_group_name: determine_addon_color()
        ? product.secondary_color_group_name
        : null,
      secondary_color: determine_addon_color() ? secondary_color : null,
      secondary_color_product_name: determine_addon_color()
        ? product.secondary_color_product_name
        : null,
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
      display_image: image ? image : images[0],
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
    };
    if (preorder) {
      const confirm = window.confirm(
        `${name} are out of stock in your selected size.\n\nBy clicking OK you agree that you are preordering ${name} which will not ship within the usual time.\n\nIt is HIGHLY RECOMMENDED that you order ${name} separately from any in-stock items so we can ship you your in-stock products without needing to wait for your out-of-stock products.\n\nThank you for your support!\n\nYou will be notified when ${name} are restocked. We anticipate they will be restocked by the end of January.`
      );
      if (confirm) {
        dispatch(addToCart(cart_item));
      }
    } else {
      dispatch(addToCart(cart_item));
    }
    // if (userInfo) {
    // 	dispatch(saveCart(cart_item));
    // }

    open_cart();
  };

  // export const decide_warning = (preorder) => {
  // 	if (new Date() > new Date(date_1) && new Date() < new Date(date_2)) {
  // 		const confirm = window.confirm(
  // 			`Glow LEDs will be out of office from ${format_date(date_1)} - ${format_date(
  // 				date_2
  // 			)}. \n\nYou may still place orders in this time, but orders will not be shipped until after ${format_date(
  // 				date_2
  // 			)} \n\nThank you so much for your support! 💙`
  // 		);
  // 		console.log({ confirm });
  // 		return confirm;
  // 	} else {
  // 		return true;
  // 	}
  // };

  const update_color = e => {
    const option = JSON.parse(e.target.value);
    // console.log({ option });
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
    if (option.images && option.images[0]) {
      set_images(option.images);
      set_image(option.images[0]);
    }
    set_color_product(option._id);
    set_color_product_object(option);
    if (option.quantity) {
      set_quantity(option.quantity);
    }
    if (option.count_in_stock) {
      set_count_in_stock(option.count_in_stock);
    }
    update_url(
      option.color,
      secondary_color,
      option_product_name,
      secondary_product_name
    );
  };

  const update_secondary_color = e => {
    const option = JSON.parse(e.target.value);
    // console.log({ option });

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
    if (option.images && option.images[0]) {
      if (product.name === "CLOZD Omniskinz Sleds") {
        set_image(option.images[0]);
        set_images(option.images);
      } else {
        set_secondary_image(option.images[0]);
        set_secondary_images(option.images);
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
    update_url(
      color,
      option.color,
      option_product_name,
      secondary_product_name
    );
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
      console.log({ has_add_on, price: option.price + add_on_price });
      if (has_add_on && show_add_on) {
        set_price(option.price + add_on_price);
        set_sale_price(option.sale_price + add_on_price);
      } else {
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

    if (option.subcategory !== "whites") {
      if (option.images && option.images[0]) {
        set_images(option.images);
        set_image(option.images[0]);
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
      if (secondary.images && secondary.images[0]) {
        set_images(secondary.images);
        set_image(secondary.images[0]);
      }
      if (
        product.name !== "Diffuser Caps + Adapters Starter Kit V4" &&
        product.name !== "CLOZD Omniskinz Sleds"
      ) {
        set_option_products(secondary.option_products);
      }
    }
    if (secondary.quantity) {
      set_quantity(secondary.quantity);
    }
    if (secondary.count_in_stock) {
      set_count_in_stock(secondary.count_in_stock);
    }

    console.log({ secondary });
    console.log({ name: product.name });
    console.log({ color_products: secondary.color_products });
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
      set_price(secondary.price);
      set_sale_price(secondary.sale_price);
    }
    set_secondary_product(secondary._id);
    set_secondary_product_name(secondary.name);
    set_secondary_product_object(secondary);
    update_url(color, secondary_color, option_product_name, secondary.name);
  };

  const [ out_of_stock, set_out_of_stock ] = useState();
  const [ show_product_options, set_show_product_options ] = useState();

  return (
    <div className="">
      <div className="p-1rem">
        <div className="jc-b">
          <div className="mb-10px">
            <Link
              to={props.location.previous_path || "/collections/all/products"}
              className="m-auto"
            >
              <button className="btn secondary">Back to Products</button>
            </Link>
          </div>
          {userInfo &&
          userInfo.isAdmin && (
            <div className=" pos-rel z-pos-1 br-10px">
              <button
                className="btn secondary  w-300px"
                onClick={e =>
                  set_show_product_options(show => (show ? false : true))}
              >
                Edit Product
              </button>
              {show_product_options && (
                <div className="pos-abs bg-secondary br-10px">
                  <div className="column bg-secondary br-10px">
                    <Link
                      to={
                        "/secure/glow/editproduct/" +
                        props.match.params.pathname +
                        "/false"
                      }
                      className="btn nav p-10px w-100per  br-10px"
                    >
                      Edit Macro
                    </Link>

                    {product &&
                      product.option_products.map(option => (
                        <Link
                          to={
                            "/secure/glow/editproduct/" +
                            option.pathname +
                            "/false"
                          }
                          className="btn nav p-10px w-100per  br-10px"
                        >
                          Edit {option.name}
                        </Link>
                      ))}
                  </div>
                </div>
              )}
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
              <link
                rel="canonical"
                href={`https://www.glow-leds.com/collections/all/products/${product.pathname}`}
              />
              <meta
                property="og:url"
                content={`https://www.glow-leds.com/collections/all/products/${product.pathname}`}
              />
              {product.images && (
                <div>
                  <meta
                    property="og:image"
                    content={"https://www.glow-leds.com/" + product.images[0]}
                  />

                  <meta
                    property="og:image:secure_url"
                    content={"https://www.glow-leds.com/" + product.images[0]}
                  />
                  <meta
                    name="twitter:image"
                    content={"https://www.glow-leds.com/" + product.images[0]}
                  />
                </div>
              )}
              <meta
                name="description"
                content={
                  product.meta_description ? (
                    product.meta_description
                  ) : (
                    "Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskinz, and Glowstringz."
                  )
                }
              />

              <meta
                property="og:description"
                content={
                  product.meta_description ? (
                    product.meta_description
                  ) : (
                    "Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskinz, and Glowstringz."
                  )
                }
              />

              <meta
                name="twitter:description"
                content={
                  product.meta_description ? (
                    product.meta_description
                  ) : (
                    "Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskinz, and Glowstringz."
                  )
                }
              />
            </Helmet>
            {!secondary_image &&
            width <= 819 && (
              <div>
                <h1 className="product_title_side ta-c lh-50px fs-25px mv-0px">
                  {name}
                </h1>
                <div
                  className=" w-100per h-auto m-auto br-20px pos-rel"
                  style={{ overflowX: "hidden" }}
                >
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
                      <ProductImages
                        secondary_image={secondary_image}
                        name={name}
                        image={image}
                      />
                      {!secondary_image &&
                      width > 819 && (
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
              <div
                className="details-info desktop_product_view"
                style={{ display: width > 819 ? "block" : "none" }}
              >
                <ProductSelection
                  product={product}
                  name={name}
                  price={price}
                  sale_price={sale_price}
                  previous_price={previous_price}
                  facts={facts}
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
                  secondary_color_product_object={
                    secondary_color_product_object
                  }
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
                  set_secondary_color_product_object={
                    set_secondary_color_product_object
                  }
                  set_secondary_color_product={set_secondary_color_product}
                  set_secondary_color_products={set_secondary_color_products}
                  set_secondary_color={set_secondary_color}
                  set_secondary_color_code={set_secondary_color_code}
                  set_secondary_image={set_secondary_image}
                  has_add_on={has_add_on}
                  set_sale_price={set_sale_price}
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
                    secondary_color_product_object={
                      secondary_color_product_object
                    }
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
                    set_secondary_color_product_object={
                      set_secondary_color_product_object
                    }
                    set_secondary_color_product={set_secondary_color_product}
                    set_secondary_color_products={set_secondary_color_products}
                    set_secondary_color={set_secondary_color}
                    set_secondary_color_code={set_secondary_color_code}
                    set_secondary_image={set_secondary_image}
                    has_add_on={has_add_on}
                    set_sale_price={set_sale_price}
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
      {product &&
      product.name !== "Glowstringz V2" &&
      product.name !== "Nova Clip" && (
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
      {product &&
      product.name !== "Glowstringz V2" &&
      product.name !== "Nova Clip" && (
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
  );
};
export default ProductPage;
