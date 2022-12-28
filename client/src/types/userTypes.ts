interface IShipping {
  first_name?: string;
  last_name?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  international?: boolean;
  country?: string;
}

export interface IUser {
  _id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  shipping?: IShipping;
  password?: string;
  isAdmin?: boolean;
  isVerified?: boolean;
  is_affiliated?: boolean;
  is_employee?: boolean;
  palettes?: string[];
  cart?: string;
  affiliate?: string;
  email_subscription?: boolean;
  guest?: boolean;
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  access_token?: string;
  refresh_token?: string;
}
