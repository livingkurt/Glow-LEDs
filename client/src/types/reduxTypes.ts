import { IUser } from "./userTypes";

export interface IDispatch {
  type?: string;
  payload?: any;
  success?: boolean;
}

export interface IGetState {
  userLogin?: { userInfo?: IUser };
}
