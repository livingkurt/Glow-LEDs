import React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { HomePage, AllProductsPage, ProductPage, CartPage, SignInPage, RegisterPage, ProductsPage, ShippingPage, PaymentPage, PlaceOrderPage, OrderPage, ProfilePage, OrdersPage, ContactPage } from './pages/index'
import { Header, Container, Content, Footer, Sidebar } from './components/ContainerComponents/index'
import { useSelector } from 'react-redux';



function App() {

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <Router>
      <Container>
        <Header userInfo={userInfo} />
        <Sidebar userInfo={userInfo} />
        <Content>
          <Route path="/orders" component={OrdersPage} />
          <Route path="/profile" component={ProfilePage} />
          {/* <Route path="/profile/orders" component={UserOrdersPage} /> */}
          {/* <Route path="/profile/account" component={UserAccountPage} /> */}
          <Route path="/order/:id" component={props => <OrderPage userInfo={userInfo}  {...props} />} />
          <Route path="/products" component={ProductsPage} />
          <Route path="/shipping" component={ShippingPage} />
          <Route path="/payment" component={PaymentPage} />
          <Route path="/placeorder" component={props => <PlaceOrderPage userInfo={userInfo}  {...props} />} />
          <Route path="/signin" component={SignInPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/category/:id?" component={AllProductsPage} />
          <Route path="/allproducts/:id?" exact={true} component={AllProductsPage} />
          <Route path="/" exact={true} component={HomePage} />
          <Route path="/contact" exact={true} component={ContactPage} />
        </Content>
        <Footer />
      </Container>
    </Router>
  );
}

export default App; 
