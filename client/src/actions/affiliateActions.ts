import {
	AFFILIATE_LIST_REQUEST,
	AFFILIATE_LIST_SUCCESS,
	AFFILIATE_LIST_FAIL,
	AFFILIATE_DETAILS_REQUEST,
	AFFILIATE_DETAILS_SUCCESS,
	AFFILIATE_DETAILS_FAIL,
	AFFILIATE_SAVE_REQUEST,
	AFFILIATE_SAVE_SUCCESS,
	AFFILIATE_SAVE_FAIL,
	AFFILIATE_DELETE_SUCCESS,
	AFFILIATE_DELETE_FAIL,
	AFFILIATE_DELETE_REQUEST,
	AFFILIATE_REMOVE_STATE
} from '../constants/affiliateConstants';
import axios from 'axios';
import { setCurrentUser, update } from './userActions';
import { USER_UPDATE_SUCCESS } from '../constants/userConstants';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const listAffiliates = (category = '', searchKeyword = '', sortOrder = '') => async (
	dispatch: (arg0: { type: string; payload?: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: AFFILIATE_LIST_REQUEST });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.get(
			'/api/affiliates?category=' +
				category +
				'&searchKeyword=' +
				searchKeyword +
				'&sortOrder=' +
				sortOrder.toLowerCase(),
			{
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			}
		);
		dispatch({ type: AFFILIATE_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: AFFILIATE_LIST_FAIL, payload: error.response.data.message });
	}
};

export const saveAffiliate = (affiliate: any) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	// console.log({ affiliateActions: affiliate });
	try {
		dispatch({ type: AFFILIATE_SAVE_REQUEST, payload: affiliate });
		const { userLogin: { userInfo } } = getState();
		if (!affiliate._id) {
			const { data } = await axios.post('/api/affiliates', affiliate, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: AFFILIATE_SAVE_SUCCESS, payload: data });
			console.log({ data: data.data });
			const { data: user } = await axios.put(
				'/api/users/update/' + userInfo._id,
				{
					first_name: userInfo.first_name,
					last_name: userInfo.last_name,
					email: userInfo.email,
					password: userInfo.password,
					is_affiliated: true,
					email_subscription: userInfo.email_subscription,
					affiliate: data.data._id,
					shipping: userInfo.shipping,
					isVerified: userInfo.isVerified,
					isAdmin: userInfo.isAdmin
				},
				{
					headers: {
						Authorization: 'Bearer ' + userInfo.token
					}
				}
			);

			dispatch({ type: USER_UPDATE_SUCCESS, payload: user });

			const { token } = user;
			setAuthToken(token);
			const decoded = jwt_decode(token);
			console.log({ decoded });
			// Set current user
			localStorage.setItem('jwtToken', token);
			dispatch(setCurrentUser(decoded));
		} else {
			const { data } = await axios.put('/api/affiliates/' + affiliate.pathname, affiliate, {
				headers: {
					Authorization: 'Bearer ' + userInfo.token
				}
			});
			dispatch({ type: AFFILIATE_SAVE_SUCCESS, payload: data });
			dispatch({ type: AFFILIATE_REMOVE_STATE, payload: {} });
		}
	} catch (error) {
		dispatch({ type: AFFILIATE_SAVE_FAIL, payload: error.response.data.message });
	}
};

export const detailsAffiliate = (pathname: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void
) => {
	try {
		dispatch({ type: AFFILIATE_DETAILS_REQUEST, payload: pathname });
		const { data } = await axios.get('/api/affiliates/' + pathname);
		dispatch({ type: AFFILIATE_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: AFFILIATE_DETAILS_FAIL, payload: error.response.data.message });
	}
};

export const deleteAffiliate = (pathname: string) => async (
	dispatch: (arg0: { type: string; payload: any; success?: boolean }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		const { userLogin: { userInfo } } = getState();
		dispatch({ type: AFFILIATE_DELETE_REQUEST, payload: pathname });
		const { data } = await axios.delete('/api/affiliates/' + pathname, {
			headers: {
				Authorization: 'Bearer ' + userInfo.token
			}
		});
		dispatch({ type: AFFILIATE_DELETE_SUCCESS, payload: data, success: true });
	} catch (error) {
		dispatch({ type: AFFILIATE_DELETE_FAIL, payload: error.response.data.message });
	}
};
