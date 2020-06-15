import React, { useEffect, useState } from 'react';
import { removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder, shipOrder, deliverOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';
import { Title, ButtonWord, Label, ButtonSymbol } from '../components/UtilityComponents';
import { format_date_display } from "../utils/helper_functions"
import { FlexContainer } from '../components/ContainerComponents';
// import { email_delivery, email_shipping } from '../actions/emailActions';
function OrderPage(props) {

  console.log(props.userInfo)
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
  const dispatch = useDispatch();

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;
  console.log({ OrderPage: order })

  const orderShipping = useSelector(state => state.orderShipping);
  const { loading: load_shipping, shipping, error: error_shipping } = orderShipping;
  console.log({ shipping: shipping })

  const orderDelivery = useSelector(state => state.orderDelivery);
  const { loading: load_deliverey, delivery, error: error_deliverey } = orderDelivery;
  console.log({ delivery: delivery })

  const [shipping_state, set_shipping_state] = useState({})
  const [delivery_state, set_delivery_state] = useState({})

  const [shipped_at_state, set_shipped_at_state] = useState({})
  const [delivered_at_state, set_delivered_at_state] = useState({})

  useEffect(() => {
    if (order) {
      set_shipping_state(order.isShipped)
      set_shipped_at_state(order.shippedAt)
      set_shipped_at_state(order.isDelivered)
      set_delivered_at_state(order.deliveredAt)
    }
  }, [])


  useEffect(() => {
    if (shipping) {
      set_shipping_state(shipping.isShipped)
      set_shipped_at_state(shipping.shippedAt)
    }
  }, [shipping])

  useEffect(() => {
    if (delivery) {
      set_delivery_state(delivery.isDelivered)
      set_delivered_at_state(delivery.deliveredAt)
    }
  }, [delivery])


  const update_shipping_state = () => {
    if (shipping_state) {
      set_shipping_state(false)
      // set_shipped_at_state("")
      dispatch(shipOrder(order, false));
    }
    else {
      set_shipping_state(true)
      // set_shipped_at_state(shipping.shippedAt)
      dispatch(shipOrder(order, true));
    }

  }

  const update_delivered_state = () => {
    if (delivery_state) {
      set_delivery_state(false)
      // set_delivered_at_state("")
      dispatch(deliverOrder(order, false));
    }
    else {
      set_delivery_state(true)
      // set_delivered_at_state(shipping.deliveredAt)
      dispatch(deliverOrder(order, true));
    }

  }



  const [paypal_state, set_paypal_state] = useState("block")

  useEffect(() => {
    if (successPay) {
      set_paypal_state("none")
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
                  {console.log({ shipping_state, shipped_at_state })}
                  <Label styles={{ marginTop: "5px" }} >{shipping_state ? "Shipped at " + format_date_display(shipped_at_state) : "Not Shipped"}</Label>
                  {props.userInfo && props.userInfo.isAdmin && (<div>
                    <button style={{ width: "176px" }} className="button primary" onClick={update_shipping_state} >{shipping_state ? "Mark As Not Shipped" : "Mark As Shipped"}</button>
                  </div>
                  )}
                </FlexContainer>
                <FlexContainer row v_i_center h_between >
                  {console.log({ delivery_state, delivered_at_state })}
                  <Label styles={{ marginTop: "5px" }}>{delivery_state ? "Delivered at " + format_date_display(delivered_at_state) : "Not Delivered"}</Label>
                  {props.userInfo && props.userInfo.isAdmin && (<div>
                    <button style={{ width: "176px" }} className="button primary" onClick={update_delivered_state} >{delivery_state ? "Mark As Not Delivered" : "Mark As Delivered"}</button>
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
            <li className="placeorder-actions-payment" style={{ display: "flex", justifyContent: "center" }}>
              {loadingPay &&
                <FlexContainer h_center>
                  <Title styles={{ fontSize: 20 }} >Finishing Payment..</Title>
                </FlexContainer>
              }
              <div style={{ display: paypal_state }}>
                {!order.isPaid &&
                  <PaypalButton
                    amount={order.totalPrice}
                    onSuccess={handleSuccessPayment} />
                }
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div >

}

export default OrderPage;