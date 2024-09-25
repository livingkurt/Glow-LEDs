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
      { text: "All Categories", url: "/menu/gloving" },
      { text: "New Releases", url: "/products/new_releases" },
      { text: "Best Sellers", url: "/products/best_sellers" },
      { text: "Our Picks", url: "/products/our_picks" },
      { text: "On Sale", url: "/products/on_sale" },
    ],
  },
  {
    title: "LEARN",
    links: [
      { text: "About Us", url: "/about" },
      { text: "Tutorials", url: "/tutorials" },
      { text: "Sponsored Glovers", url: "/sponsors" },
    ],
  },
  {
    title: "SUPPORT",
    links: [
      { text: "Support Center", url: "/support_center" },
      { text: "Shop by Chip", url: "/products?filter=All%20Chips?limit=0" },
    ],
  },
];
