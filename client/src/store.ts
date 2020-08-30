import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import {
	productListReducer,
	productDetailsReducer,
	productSaveReducer,
	productDeleteReducer,
	productImagesReducer,
	productReviewSaveReducer,
	productReviewDeleteReducer
} from './reducers/productReducers';
import {
	expenseListReducer,
	expenseDetailsReducer,
	expenseSaveReducer,
	expenseDeleteReducer
} from './reducers/expenseReducers';
import {
	featureListReducer,
	featureDetailsReducer,
	featureSaveReducer,
	featureDeleteReducer
} from './reducers/featureReducers';
import { cartReducer } from './reducers/cartReducers';
import {
	userLoginReducer,
	userRegisterReducer,
	userUpdateReducer,
	userContactReducer,
	userPasswordResetReducer,
	userResetPasswordReducer,
	userVerifyReducer,
	userDeleteReducer,
	userListReducer,
	userDetailsReducer,
	userUpdateUserReducer
} from './reducers/userReducers';
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	myOrderListReducer,
	orderListReducer,
	orderDeleteReducer,
	orderShippingReducer,
	orderDeliveryReducer,
	orderRefundReducer
} from './reducers/orderReducers';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState: object = { cart: { cartItems, shipping: {}, payment: {} }, userLogin: { userInfo } };
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
	orderRefund: orderRefundReducer,
	orderShipping: orderShippingReducer,
	orderDelivery: orderDeliveryReducer,
	userContact: userContactReducer,
	userPasswordReset: userPasswordResetReducer,
	userResetPassword: userResetPasswordReducer,
	userVerify: userVerifyReducer,
	productReviewDelete: productReviewDeleteReducer,
	userDelete: userDeleteReducer,
	userList: userListReducer,
	userDetails: userDetailsReducer,
	userUpdateUser: userUpdateUserReducer,
	expenseList: expenseListReducer,
	expenseDetails: expenseDetailsReducer,
	expenseSave: expenseSaveReducer,
	expenseDelete: expenseDeleteReducer,
	featureList: featureListReducer,
	featureDetails: featureDetailsReducer,
	featureSave: featureSaveReducer,
	featureDelete: featureDeleteReducer
});

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;
