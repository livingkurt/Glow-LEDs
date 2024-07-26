import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import TikTokIcon from "./TikTokIcon";

export const socialIcons = [
  { Icon: InstagramIcon, url: "https://www.instagram.com/glow_leds/" },
  { Icon: FacebookIcon, url: "https://www.facebook.com/Glow-LEDscom-100365571740684" },
  { Icon: YouTubeIcon, url: "https://www.youtube.com/channel/UCm_gDyTIy7d0oR9LeowPkYw" },
  { Icon: CloudQueueIcon, url: "https://soundcloud.com/ntre/tracks" },
  { Icon: TikTokIcon, url: "https://www.tiktok.com/@glow_leds" },
];

export const footerSections = [
  {
    title: "SHOP",
    links: [
      { text: "All Categories", url: "/pages/menu/gloving" },
      { text: "New Releases", url: "/collections/all/products/new_releases" },
      { text: "Best Sellers", url: "/collections/all/products/best_sellers" },
      { text: "Our Picks", url: "/collections/all/products/our_picks" },
      { text: "On Sale", url: "/collections/all/products/on_sale" },
    ],
  },
  {
    title: "LEARN",
    links: [
      { text: "About Us", url: "/pages/about" },
      { text: "Tutorials", url: "/collections/all/tutorials" },
      { text: "Sponsored Glovers", url: "/collections/all/sponsors" },
    ],
  },
  {
    title: "SUPPORT",
    links: [
      { text: "Support Center", url: "/pages/support_center" },
      { text: "Shop by Chip", url: "/collections/all/products?filter=All%20Chips?limit=0" },
    ],
  },
];
