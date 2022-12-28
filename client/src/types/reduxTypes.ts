export interface IDispatch {
  type: string;
  payload?: any;
}

export interface IDispatchSuccess {
  type: string;
  payload?: any;
  success?: boolean;
}

export interface IGetState {
  userLogin: { userInfo: any };
}
