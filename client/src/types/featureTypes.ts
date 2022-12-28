import { IUser } from "./userTypes";

export interface IFeature {
  user?: IUser;
  artist_name?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  instagram_handle?: string;
  facebook_name?: string;
  product?: string;
  song_id?: string;
  quote?: string;
  video?: string;
  images?: string[];
  link?: string;
  logo?: string;
  category?: string;
  pathname?: string;
  description?: string;
  release_date?: Date;
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
