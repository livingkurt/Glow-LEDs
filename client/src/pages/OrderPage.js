import React, { useEffect, useState } from 'react';
import { removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder, shipOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';
import { Title, ButtonWord, Label, ButtonSymbol } from '../components/UtilityComponents';
import { format_date_display } from "../utils/helper_functions"
import { FlexContainer } from '../components/ContainerComponents';
function OrderPage(props) {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
  const dispatch = useDispatch();

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;

  useEffect(() => {
    if (successPay) {
      // props.history.push("/profile");
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
  }, [successPay]);

  useEffect(() => {
    empty_cart();
  }, [])

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  }

  const empty_cart = () => {
    console.log(cartItems)
    for (let item of cartItems) {
      dispatch(removeFromCart(item.product));
    }
  }

  const [shipping_state, set_shipping_state] = useState({ state: false, text: "Mark As Shipped" })


  const update_shipping_state = () => {
    if (shipping_state.state) {
      set_shipping_state({ ...shipping_state, state: false, text: "Mark As Shipped" })
      dispatch(shipOrder(order, false));
    }
    else {
      set_shipping_state({ ...shipping_state, state: true, text: "Mark As Not Shipped" })
      dispatch(shipOrder(order, true));
    }

  }

  return loading ? <Title styles={{ fontSize: 20, fontFamily: "logo_font" }} >Loading...</Title> : error ? <div>{error}</div> :

    <div>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <Title styles={{ fontSize: 30, fontFamily: "logo_font" }} >Shipping</Title>
            <div>
              <div>{order.shipping.address}</div>
              <div>{order.shipping.city}, {order.shipping.state} {order.shipping.postalCode} {order.shipping.country}</div>
            </div>
            <FlexContainer styles={{ alignItems: "center" }}>
              <Label styles={{ marginRight: "10px" }}>{order.isShipped ? "Shipped at " + format_date_display(order.shippedAt) : "Not Shipped"}</Label>
              {/* <ButtonSymbol on_click_function={update_shipping_state} styles={{ backgroundColor: "#9e9e9e" }}>Mark As shipping</ButtonSymbol> */}
              <button className="button primary" onClick={update_shipping_state} >{shipping_state.text}</button>
            </FlexContainer>
          </div>
          <div>
            <Title styles={{ fontSize: 30, fontFamily: "logo_font" }} >Payment</Title>
            <div>
              Payment Method: {order.payment.paymentMethod}
            </div>
            <div>
              {order.isPaid ? "Paid at " + format_date_display(order.paidAt) : "Not Paid"}
            </div>
          </div>
          <div>
            <ul style={{ marginTop: 0 }} className="cart-list-container">
              <li >
                <Title styles={{ fontSize: 30, fontFamily: "logo_font" }} >Shopping Cart</Title>
                <div>
                  Price
          </div>
              </li>
              {
                order.orderItems.length === 0 ?
                  <div>
                    Cart is empty
          </div>
                  :
                  order.orderItems.map(item =>
                    <li key={item._id}>
                      <div className="cart-image">
                        <img src={item.image_1} alt="product" />
                      </div>
                      <div className="cart-name">
                        <div>
                          <Link to={"/product/" + item.product}>
                            {item.name}
                          </Link>

                        </div>
                        <div>
                          Qty: {item.qty}
                        </div>
                      </div>
                      <div className="cart-price">
                        ${item.price}
                      </div>
                    </li>
                  )
              }
            </ul>
          </div>


        </div>
        <div className="placeorder-action">
          <ul>
            <li className="placeorder-actions-payment">
              {loadingPay && <div>Finishing Payment...</div>}
              {!order.isPaid &&
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment} />
              }
            </li>
            <li>
              <Title styles={{ fontSize: 30, fontFamily: "logo_font", margin: 0 }} >Order Summary</Title>
            </li>
            <li>
              <div>Items</div>
              <div>${order.itemsPrice ? order.itemsPrice.toFixed(2) : order.itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${order.shippingPrice ? order.shippingPrice.toFixed(2) : order.shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${order.taxPrice ? order.taxPrice.toFixed(2) : order.taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${order.totalPrice ? order.totalPrice.toFixed(2) : order.totalPrice}</div>
            </li>
          </ul>



        </div>

      </div>
    </div>

}

export default OrderPage;