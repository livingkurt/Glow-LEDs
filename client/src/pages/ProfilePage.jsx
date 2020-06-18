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

  const userUpdate = useSelector(state => state.userUpdate);

  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
    }
    dispatch(listMyOrders());
    return () => {

    };
  }, [userInfo])

  useEffect(() => {
    if (userUpdate.userInfo) {
      setEmail(userUpdate.userInfo.email);
      setName(userUpdate.userInfo.name);
      setPassword(userUpdate.userInfo.password);
    }
    return () => {

    };
  }, [userUpdate.userInfo])

  const container_styles = {
    marginBottom: "20px"
  }


  return <FlexContainer column styles={{ padding: "20px" }}>
    <FlexContainer>
      <Title styles={{ fontSize: 30, textAlign: "center", width: "100%", justifyContent: "center" }} >User Profile</Title>
    </FlexContainer>
    <FlexContainer class="profile_container" row h_between wrap >
      <FlexContainer column>
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
        <div style={{ height: 50 }}>
          <Link to={"/editprofile"}><button style={{ marginRight: "10px", width: "110px" }} className="button primary">Edit Profile</button></Link>
        </div>
        <div style={{ height: 50 }}>
          <Link to={"/userorders"}><button style={{ width: "110px" }} className="button primary">View Orders</button></Link>
        </div>
      </FlexContainer>
    </FlexContainer>
  </FlexContainer >

}

export default ProfilePage;