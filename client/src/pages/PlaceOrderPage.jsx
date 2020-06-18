import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { Title } from '../components/UtilityComponents';
// import { email_order } from '../actions/emailActions';
function PlaceOrderPage(props) {

  const user_data = props.userInfo
  const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const { cartItems, shipping, payment } = cart;

  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 5;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // create an order
    dispatch(createOrder({
      orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
      taxPrice, totalPrice, user_data
    }));
    // dispatch(email_order({
    //   orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
    //   taxPrice, totalPrice, user_data
    // }));

    // empty_cart();
  }

  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order._id);
    }

  }, [success]);

  const checkoutHandler = () => {
    props.history.push("/login?redirect=shipping");
  }

  return <div>
    <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <Title class="h2_title" styles={{ fontSize: 30 }} >Shipping</Title>
          <div className="label">
            <div>{shipping.address}</div>
            <div>{shipping.city}, {shipping.state} {shipping.postalCode} {shipping.country}</div>
          </div>
        </div>
        <div>
          <Title class="h2_title" styles={{ fontSize: 30 }} >Payment</Title>
          <div className="label">
            Payment Method: {cart.payment.paymentMethod}
          </div>
        </div>
        <div>
          <ul className="cart-list-container">
            <li>
              <Title class="h2_title" styles={{ fontSize: 30 }} >Shopping Cart</Title>
              <div>
                Price
          </div>
            </li>
            {
              cartItems.length === 0 ?
                <div>
                  Cart is empty
          </div>
                :
                cartItems.map((item, index) =>
                  <li key={index} >
                    <div className="cart-image">
                      <img src={item.image_1} alt="product" />
                    </div>
                    <div className=" label cart-name">
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
                      ${item.price.toFixed(2)}
                    </div>
                  </li>
                )
            }
          </ul>
        </div>


      </div>
      <div className="placeorder-action" >
        <ul>
          {/* <li> */}
          {/* <button className="button primary full-width nav_buttons" onClick={placeOrderHandler} >Place Order</button> */}
          {/* </li> */}
          <li>
            <Title class="h2_title" styles={{ fontSize: 30 }} >Order Summary</Title>
          </li>
          <li>
            <div>Items</div>
            <div>${itemsPrice.toFixed(2)}</div>
          </li>
          <li>
            <div>Shipping</div>
            <div>${shippingPrice.toFixed(2)}</div>
          </li>
          <li>
            <div>Tax</div>
            <div>${taxPrice.toFixed(2)}</div>
          </li>
          <li>
            <div>Order Total</div>
            <div>${totalPrice.toFixed(2)}</div>
          </li>
          <li>
            <button className="button primary full-width" onClick={placeOrderHandler} >Place Order</button>
          </li>
        </ul>



      </div>

    </div>
  </div>

}

export default PlaceOrderPage;