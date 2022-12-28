import { IOrder } from "./orderTypes";
import { IUser } from "./userTypes";

export interface IQuestionAnswer {
  question: string;
  answer: string;
}

export interface ISurvey {
  user?: IUser;
  order?: IOrder;
  survey?: ISurvey;
  question_1?: string;
  question_2?: string;
  question_3?: string;
  question_4?: string;
  question_5?: string;
  answer_1?: string;
  answer_2?: string;
  answer_3?: string;
  answer_4?: string;
  answer_5?: string;
  question_answer?: IQuestionAnswer[];
  rating?: number;
  is_survey?: boolean;
  active?: boolean;
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
