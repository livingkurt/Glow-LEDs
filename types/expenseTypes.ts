export interface IExpense {
  expense_name: string;
  application: string;
  url: string;
  place_of_purchase: string;
  date_of_purchase: Date;
  category: string;
  card: string;
  amount: number;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
