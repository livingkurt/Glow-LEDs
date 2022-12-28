export interface IContent {
  home_page: {
    h1: string;
    image: string;
    images: string[];
    slideshow: {
      label: string;
      image: string;
      link: string;
    }[];
    video: string;
    banner_image: string;
    show_image: boolean;
    show_video: boolean;
    h2: string;
    p: string;
    button: string;
    link: string;
  };
  banner: {
    label: string;
    button: string;
    link: string;
  };
  links: {
    label: string;
    link: string;
    icon: string;
  }[];
  active: boolean;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
