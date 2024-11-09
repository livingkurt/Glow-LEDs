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
      { text: "All Categories", url: "/menu/shop" },
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
      { text: "Learn More", url: "/learn" },
      { text: "Tutorials", url: "/tutorials" },
      { text: "Space City Gloving Competition", url: "/events/space_city_gloving_competition" },
      { text: "Sponsored Glovers", url: "/sponsors" },
    ],
  },
  {
    title: "SUPPORT",
    links: [
      { text: "Support Center", url: "/support_center" },
      { text: "About", url: "/about" },
      { text: "Shop by Microlight", url: "/products?filter=All%20Microlights?limit=0" },
    ],
  },
];
