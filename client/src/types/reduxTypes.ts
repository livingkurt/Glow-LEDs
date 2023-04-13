import { IUser } from "./userTypes";

export interface IDispatch {
  type?: string;
  payload?: unknown;
  success?: boolean;
}

export interface IGetState {
  users?: { userPage: { current_user?: IUser } };
}

export interface IAction {
  type?: string;
  payload: { error: unknown; message: string };
}
