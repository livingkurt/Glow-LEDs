import React from "react";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import { useSelector } from "react-redux";
import { update_option } from "../productPageSlice";
import { useDispatch } from "react-redux";
import { determine_option_styles, update_url } from "../productHelpers";
import { determine_option_product_name } from "../../../utils/react_helper_functions";
import { useNavigate } from "react-router-dom";

const OptionButtons = ({ index, option }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const productPage = useSelector(state => state.products.productPage);
  const { color, option_product_object, show_add_on, has_add_on, secondary_color, add_on_price } = productPage;

  return (
    <GLButton
      key={index}
      selected={option.default_option}
      id={option.size}
      value={JSON.stringify(option)}
      onClick={e => {
        const option = JSON.parse(e.target.value);
        dispatch(update_option({ option, current_user, has_add_on, show_add_on, add_on_price }));
        update_url({ color, secondary_color, option: option.size, navigate, show_add_on });
      }}
      className={determine_option_styles(option, option_product_object)}
    >
      {determine_option_product_name(option.size)}
    </GLButton>
  );
};

export default OptionButtons;
