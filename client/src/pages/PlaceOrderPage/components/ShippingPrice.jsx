import PropTypes from "prop-types";
const ShippingPrice = ({ originalPrice, newPrice, label, showDiscount = true }) => {
  const isDiscounted = newPrice === 0 && originalPrice > 0;

  return (
    <>
      <li className="pos-rel">
        <div>{label}</div>
        <div>
          {isDiscounted ? (
            <del style={{ color: "red" }}>
              <div style={{ color: "white" }}>{"$" + originalPrice.toFixed(2)}</div>
            </del>
          ) : (
            "$" + newPrice.toFixed(2)
          )}
        </div>
      </li>
      {isDiscounted && showDiscount && (
        <>
          <li className="pos-rel">
            <div>{`Discounted ${label}`}</div>
            <div>
              <div style={{ color: "white" }}>{"-$" + originalPrice.toFixed(2)}</div>
            </div>
          </li>
          <li className="pos-rel">
            <div>{`New ${label}`}</div>
            <div>{"$0.00"}</div>
          </li>
        </>
      )}
    </>
  );
};

ShippingPrice.propTypes = {
  originalPrice: PropTypes.number.isRequired,
  newPrice: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  showDiscount: PropTypes.bool,
};

ShippingPrice.defaultProps = {
  showDiscount: true,
};

export default ShippingPrice;
