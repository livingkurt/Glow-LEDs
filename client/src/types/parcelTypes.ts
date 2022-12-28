export interface IParcel {
  type: string;
  length: number;
  width: number;
  height: number;
  volume: number;
  quantity_state: number;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
