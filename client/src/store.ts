import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import {
	productListReducer,
	productDetailsReducer,
	productSaveReducer,
	productDeleteReducer,
	productImagesReducer,
	productReviewSaveReducer
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
	userLoginReducer,
	userRegisterReducer,
	userUpdateReducer,
	userContactReducer,
	userPasswordResetReducer,
	userResetPasswordReducer,
	userVerifyReducer
} from './reducers/userReducers';
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	myOrderListReducer,
	orderListReducer,
	orderDeleteReducer,
	orderShippingReducer,
	orderDeliveryReducer
} from './reducers/orderReducers';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState: any = { cart: { cartItems, shipping: {}, payment: {} }, userLogin: { userInfo } };
const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	productSave: productSaveReducer,
	productImages: productImagesReducer,
	productDelete: productDeleteReducer,
	productReviewSave: productReviewSaveReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	userUpdate: userUpdateReducer,
	myOrderList: myOrderListReducer,
	orderList: orderListReducer,
	orderDelete: orderDeleteReducer,
	orderShipping: orderShippingReducer,
	orderDelivery: orderDeliveryReducer,
	userContact: userContactReducer,
	userPasswordReset: userPasswordResetReducer,
	userResetPassword: userResetPasswordReducer,
	userVerify: userVerifyReducer
});

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;
