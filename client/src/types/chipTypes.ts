export interface IChip {
  name?: string;
  company?: string;
  category?: string;
  programmmable?: boolean;
  number_of_modes?: number;
  characteristics?: string;
  colors_per_mode?: number;
  colors?: {
    name?: string;
    color?: string;
  }[];
  pathname?: string;
  image?: string;
  dimensions?: {
    chip_height?: number;
    chip_width?: number;
    chip_length?: number;
  };
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
