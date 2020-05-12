import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';
import { saveOrder, listOrders, deleteOrder } from '../actions/orderActions';
import { Title, ButtonWord } from '../components/UtilityComponents';
import { format_date_display } from '../utils/helper_functions';

function OrdersPage(props) {
  console.log("dd")
  const orderList = useSelector(state => state.orderList);
  const { loading, orders, error } = orderList;

  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
  }, [successDelete]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  }
  return loading ? <Title styles={{ fontSize: 20, fontFamily: "logo_font" }} >Loading...</Title> :
    <div className="content-margined">

      <div className="order-header">
        <Title styles={{ fontSize: 30, fontFamily: "logo_font", textAlign: "center", width: "100%" }} >Orders</Title>
      </div>
      <div className="order-list">

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (<tr key={order._id}>
              <td>{order._id}</td>
              <td>{format_date_display(order.createdAt)}</td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>{order.user.name}</td>
              <td>{order.isPaid.toString()}</td>
              <td>{!order.paidAt ? "" : format_date_display(order.paidAt)}</td>
              <td>{order.isDelivered.toString()}</td>
              <td>{!order.deliveredAt ? "" : format_date_display(order.deliveredAt)}</td>
              <td>
                <Link to={"/order/" + order._id} className="button secondary" >Details</Link>
                {' '}
                <button type="button" onClick={() => deleteHandler(order)} className="button secondary">Delete</button>
                {/* <ButtonWord on_click_function={deleteHandler}>Delete</ButtonWord> */}
              </td>
            </tr>))}
          </tbody>
        </table>

      </div>
    </div>
}
export default OrdersPage;