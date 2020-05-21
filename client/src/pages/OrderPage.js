import React, { useEffect, useState } from 'react';
import { removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder, shipOrder, deliverOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';
import { Title, ButtonWord, Label, ButtonSymbol } from '../components/UtilityComponents';
import { format_date_display } from "../utils/helper_functions"
import { FlexContainer } from '../components/ContainerComponents';
import { email_delivery, email_shipping } from '../actions/emailActions';
function OrderPage(props) {

  console.log(props.userInfo)
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
    // dispatch(email_order(order))
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

  const [shipping_state, set_shipping_state] = useState()


  const update_shipping_state = () => {
    if (shipping_state) {
      set_shipping_state(false)
      dispatch(shipOrder(order, false));
      dispatch(email_shipping(order));
    }
    else {
      set_shipping_state(true)
      dispatch(shipOrder(order, true));
      dispatch(email_shipping(order));
    }

  }

  const [delivered_state, set_delivered_state] = useState()


  const update_delivered_state = () => {
    if (delivered_state) {
      set_delivered_state(false)
      dispatch(deliverOrder(order, false));
      dispatch(email_delivery(order));
    }
    else {
      set_delivered_state(true)
      dispatch(deliverOrder(order, true));
      dispatch(email_delivery(order));
    }

  }

  return loading ? <Title styles={{ fontSize: 20 }} >Loading...</Title> : error ? <div>{error}</div> :

    <div>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <FlexContainer h_between wrap>
              <FlexContainer column>
                <Title styles={{ fontSize: 30 }} >Shipping</Title>
                <div>
                  <div>{order.shipping.address}</div>
                  <div>{order.shipping.city}, {order.shipping.state} {order.shipping.postalCode} {order.shipping.country}</div>
                </div>
              </FlexContainer>
              <FlexContainer column styles={{ marginTop: "auto", width: "373px" }} class="ship_deliver">
                <FlexContainer row v_i_center h_between >
                  <Label styles={{ marginTop: "5px" }} >{order.isShipped ? "Shipped at " + format_date_display(order.shippedAt) : "Not Shipped"}</Label>
                  {props.userInfo && props.userInfo.isAdmin && (<div>
                    <button style={{ width: "176px" }} className="button primary" onClick={update_shipping_state} >{order.isShipped ? "Mark As Not Shipped" : "Mark As Shipped"}</button>
                  </div>
                  )}
                </FlexContainer>
                <FlexContainer row v_i_center h_between >
                  <Label styles={{ marginTop: "5px" }}>{order.isDelivered ? "Delivered at " + format_date_display(order.deliveredAt) : "Not Delivered"}</Label>
                  {props.userInfo && props.userInfo.isAdmin && (<div>
                    <button style={{ width: "176px" }} className="button primary" onClick={update_delivered_state} >{order.isDelivered ? "Mark As Not Delivered" : "Mark As Delivered"}</button>
                  </div>
                  )}
                </FlexContainer>
              </FlexContainer>
            </FlexContainer>
          </div>
          <div>
            <Title styles={{ fontSize: 30 }} >Payment</Title>
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
                <Title styles={{ fontSize: 30 }} >Shopping Cart</Title>
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

            <li>
              <Title styles={{ fontSize: 30, marginTop: 0 }} >Order Summary</Title>
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
            <li className="placeorder-actions-payment">
              {loadingPay && <div>Finishing Payment...</div>}
              {!order.isPaid &&
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment} />
              }
            </li>
          </ul>
        </div>
      </div>
    </div >

}

export default OrderPage;