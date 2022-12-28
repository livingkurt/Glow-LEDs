export interface IEmail {
  email_type?: string;
  header_footer_color?: string;
  background_color?: string;
  module_color?: string;
  button_color?: string;
  text_color?: string;
  title_color?: string;
  subject?: string;
  h1?: string;
  image?: string;
  images?: string[];
  show_image?: boolean;
  h2?: string;
  p?: string;
  button?: string;
  link?: string;
  html?: string;
  scheduled_at?: Date;
  status?: string;
  active?: boolean;
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
