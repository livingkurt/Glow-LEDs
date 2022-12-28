export interface ISettings {
  load_orders?: boolean;
}

export interface ISetting {
  settings?: ISettings;
  active?: boolean;
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
