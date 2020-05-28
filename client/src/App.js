import React from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import './App.css';
import { HomePage, AllProductsPage, ProductPage, CartPage, LoginPage, RegisterPage, ProductsPage, ShippingPage, PaymentPage, PlaceOrderPage, OrderPage, ProfilePage, OrdersPage, ContactPage, UserOrdersPage, Four04Page, EditProfilePage } from './pages/index'
import { Header, Container, Content, Footer, Sidebar } from './components/ContainerComponents/index'
import { useSelector } from 'react-redux';



function App() {

  const userLogin = useSelector(state => state.userLogin);

  const { userInfo } = userLogin;
  console.log({ "App.js": userInfo })

  return (
    <Router>
      <Container>
        <Header userInfo={userInfo} />
        <Sidebar userInfo={userInfo} />
        <Content>
          <Switch>
            <Route path="/orders" component={OrdersPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/editprofile" component={EditProfilePage} />
            <Route path="/userorders" component={UserOrdersPage} />
            <Route path="/order/:id" component={props => <OrderPage userInfo={userInfo}  {...props} />} />
            <Route path="/products" component={ProductsPage} />
            <Route path="/shipping" component={ShippingPage} />
            <Route path="/payment" component={PaymentPage} />
            <Route path="/placeorder" component={props => <PlaceOrderPage userInfo={userInfo}  {...props} />} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/cart/:id?" component={CartPage} />
            <Route path="/category/:id?" component={AllProductsPage} />
            <Route path="/allproducts/:id?" exact={true} component={AllProductsPage} />
            <Route path="/" exact={true} component={HomePage} />
            <Route path="/contact" exact={true} component={ContactPage} />
            <Route component={Four04Page} />
          </Switch>
        </Content>
        <Footer />
      </Container>
    </Router>
  );
}

export default App; 
