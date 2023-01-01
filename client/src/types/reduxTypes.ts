import { IUser } from "./userTypes";

export interface IDispatch {
  type?: string;
  payload?: unknown;
  success?: boolean;
}

export interface IGetState {
  userLogin?: { userInfo?: IUser };
}

export interface IAction {
  type?: string;
  payload: { error: unknown; message: string };
}
