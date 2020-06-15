import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { Title, ButtonSymbol, ButtonWord, Label } from '../components/UtilityComponents';
import { format_date_display } from '../utils/helper_functions';
import { FlexContainer, BlockContainer } from '../components/ContainerComponents';

function ProfilePage(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  console.log({ "Profile": userInfo })

  const userUpdate = useSelector(state => state.userUpdate);
  const { loading, success, error } = userUpdate;

  const myOrderList = useSelector(state => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo.name)
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
    }
    dispatch(listMyOrders());
    return () => {

    };
  }, [userInfo])

  const container_styles = {
    marginBottom: "20px"
  }


  return <FlexContainer column styles={{ padding: "20px" }}>
    <FlexContainer>
      <Title styles={{ fontSize: 30, textAlign: "center", width: "100%", justifyContent: "center" }} >User Profile</Title>
    </FlexContainer>
    <FlexContainer class="profile_container" row h_between wrap >
      <FlexContainer column>
        <FlexContainer h_center>
          {loading && <Title styles={{ fontSize: 20 }} >Loading...</Title>}
          {error && <Title styles={{ fontSize: 20 }} >{error}</Title>}
          {success && <Title styles={{ fontSize: 20 }} >Profile Saved Successfully</Title>}
        </FlexContainer>
        <FlexContainer column styles={container_styles}>
          <Title styles={{ fontSize: 20 }}>Name</Title>
          <Label>{name}</Label>
        </FlexContainer >
        <FlexContainer column styles={container_styles}>
          <Title styles={{ fontSize: 20 }}>Email</Title>
          <Label >{email}</Label>
        </FlexContainer >
        <FlexContainer column styles={container_styles}>
          <Title styles={{ fontSize: 20 }}>Password</Title>
          <Label>**********</Label>
        </FlexContainer >
      </FlexContainer>
      <FlexContainer>
        <Link to={"/editprofile"}><button style={{ marginRight: "10px", width: "110px" }} className="button primary">Edit Profile</button></Link>
        <Link to={"/userorders"}><button style={{ width: "110px" }} className="button primary">View Orders</button></Link>
      </FlexContainer>
    </FlexContainer>

    {/* </div> */}
    {/* </div> */}
    {/* <div className="profile-orders content-margined profile_orders_container" style={{ overflowX: "auto" }} >
      <Title styles={{ fontSize: 30, textAlign: "center", width: "100%", justifyContent: "center" }} >Orders</Title>
      {
        loadingOrders ? <Title styles={{ fontSize: 20 }} >Loading...</Title> :
          errorOrders ? <div>{errorOrders} </div> :
            <BlockContainer class="table_container" styles={{ padding: "0" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{format_date_display(order.createdAt)}</td>
                    <td>${order.totalPrice.toFixed(2)}</td>
                    <td>{order.isPaid ? <i className="fas fa-check-circle"></i> : <i className="fas fa-times-circle"></i>}</td>
                    <td>
                      <Link to={"/order/" + order._id}  ><ButtonSymbol ><i className="fas fa-info-circle"></i></ButtonSymbol></Link>
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </BlockContainer>
      }
    </div> */}
  </FlexContainer >

}

export default ProfilePage;