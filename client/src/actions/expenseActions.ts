import {
	EXPENSE_LIST_REQUEST,
	EXPENSE_LIST_SUCCESS,
	EXPENSE_LIST_FAIL,
	EXPENSE_DETAILS_REQUEST,
	EXPENSE_DETAILS_SUCCESS,
	EXPENSE_DETAILS_FAIL,
	EXPENSE_SAVE_REQUEST,
	EXPENSE_SAVE_SUCCESS,
	EXPENSE_SAVE_FAIL,
	EXPENSE_DELETE_SUCCESS,
	EXPENSE_DELETE_FAIL,
	EXPENSE_DELETE_REQUEST
} from '../constants/expenseConstants';
import axios from 'axios';
import { create_query } from '../utils/helper_functions';

export const listExpenses = (query: any) => async (
	dispatch: (arg0: { type: string; payload?: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: EXPENSE_LIST_REQUEST });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.get('/api/expenses?' + create_query(query), {
			headers: {
				Authorization: 'Bearer ' + userInfo.access_token
			}
		});
		dispatch({ type: EXPENSE_LIST_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: EXPENSE_LIST_FAIL, payload: error });
	}
};

export const saveExpense = (expense: {
	_id: string;
	expense_name?: string;
	application?: number;
	url?: string;
	place_of_purchase?: string;
	date_of_purchase?: string;
	category?: string;
	card?: number;
	amount?: string;
}) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	console.log({ expenseActions: expense });
	try {
		dispatch({ type: EXPENSE_SAVE_REQUEST, payload: expense });
		const { userLogin: { userInfo } } = getState();
		if (!expense._id) {
			const { data } = await axios.post('/api/expenses', expense, {
				headers: {
					Authorization: 'Bearer ' + userInfo.access_token
				}
			});
			dispatch({ type: EXPENSE_SAVE_SUCCESS, payload: data });
		} else {
			const { data } = await axios.put('/api/expenses/' + expense._id, expense, {
				headers: {
					Authorization: 'Bearer ' + userInfo.access_token
				}
			});
			dispatch({ type: EXPENSE_SAVE_SUCCESS, payload: data });
		}
	} catch (error) {
		console.log({ error });
		dispatch({ type: EXPENSE_SAVE_FAIL, payload: error });
	}
};

export const detailsExpense = (pathname: string) => async (
	dispatch: (arg0: { type: string; payload: any }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		dispatch({ type: EXPENSE_DETAILS_REQUEST, payload: pathname });
		const { userLogin: { userInfo } } = getState();
		const { data } = await axios.get('/api/expenses/' + pathname, {
			headers: {
				Authorization: 'Bearer ' + userInfo.access_token
			}
		});
		dispatch({ type: EXPENSE_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		console.log({ error });
		dispatch({ type: EXPENSE_DETAILS_FAIL, payload: error });
	}
};

export const deleteExpense = (expenseId: string) => async (
	dispatch: (arg0: { type: string; payload: any; success?: boolean }) => void,
	getState: () => { userLogin: { userInfo: any } }
) => {
	try {
		const { userLogin: { userInfo } } = getState();
		dispatch({ type: EXPENSE_DELETE_REQUEST, payload: expenseId });
		const { data } = await axios.delete('/api/expenses/' + expenseId, {
			headers: {
				Authorization: 'Bearer ' + userInfo.access_token
			}
		});
		dispatch({ type: EXPENSE_DELETE_SUCCESS, payload: data, success: true });
	} catch (error) {
		console.log({ error });
		dispatch({ type: EXPENSE_DELETE_FAIL, payload: error });
	}
};
