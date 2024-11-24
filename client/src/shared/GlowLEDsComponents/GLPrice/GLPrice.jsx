import React from "react";
import { useSelector } from "react-redux";

const GLPrice = ({ product }) => {
  const today = new Date();

  const { current_user } = useSelector(state => state.users.userPage);

  const formatPrice = price => {
    return typeof price === "number" ? price.toFixed(2) : price;
  };

  const calculateDiscount = (currentPrice, originalPrice) => {
    if (!currentPrice || !originalPrice) return null;
    return (100 * (1 - parseInt(currentPrice, 10) / parseInt(originalPrice, 10))).toFixed(0);
  };

  if (!product) return null;

  // Wholesale price display
  if (current_user.isWholesaler && product.wholesale_price) {
    return (
      <div className="fs-18px" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {"WSP: $"}
        {formatPrice(product.wholesale_price)}
      </div>
    );
  }

  // Sale price display
  if (
    product.sale?.price &&
    product.sale?.start_date &&
    product.sale?.end_date &&
    today >= new Date(product.sale?.start_date) &&
    today <= new Date(product.sale?.end_date)
  ) {
    const discount = calculateDiscount(product.sale?.price, product.price);

    return (
      <div className="fs-18px" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {product.isPreOrder && "Preorder "}
        <span>
          {"$"}
          {formatPrice(product.sale?.price)}
        </span>
        {discount && (
          <span>
            {"("}
            {discount}
            {"% Off)"}
          </span>
        )}
        <del style={{ color: "#ff0000" }}>
          <span style={{ color: "#c5c5c5" }}>
            {"$"}
            {formatPrice(product.price)}
          </span>
        </del>
      </div>
    );
  }

  // Previous price display
  if (product.previous_price) {
    const discount = calculateDiscount(product.price, product.previous_price);

    return (
      <div className="fs-18px" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {product.isPreOrder && "Preorder "}
        <span>
          {"$"}
          {formatPrice(product.price)}
        </span>
        {discount && (
          <span>
            {"("}
            {discount}
            {"% Off)"}
          </span>
        )}
        <del style={{ color: "#ff0000" }}>
          <span style={{ color: "#c5c5c5" }}>
            {"$"}
            {formatPrice(product.previous_price)}
          </span>
        </del>
      </div>
    );
  }

  // Regular price display
  return (
    <div className="fs-18px" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {product.isPreOrder && "Preorder "}
      {"$"}
      {formatPrice(product.price)}
    </div>
  );
};

export default GLPrice;
