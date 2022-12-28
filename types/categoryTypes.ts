export interface ICategory {
  name: string;
  pathname: string;
  nest_level: number;
  display_order: number;
  subcategorys: ICategory[];
  display: boolean;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  deleted: boolean;
  masthead: boolean;
  createdAt: Date;
  updatedAt: Date;
}
