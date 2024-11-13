import HeroHeader from "./components/HeroHeader";
import FeaturedProducts from "./components/FeaturedProducts";
import FeaturedBundles from "./components/FeaturedBundles";
import LearnMoreProducts from "./components/LearnMoreProducts";
import LearnHighlights from "./components/LearnHighlights";
import DiscoverMoreHero from "./components/DiscoverMoreHero";
import GetTheMost from "./components/GetTheMost";
import HeroVideo from "./components/HeroVideo";
import ProductProtectionDetails from "../../shared/ProductProtectionDetails/ProductProtectionDetails";
import SupportBanner from "../../shared/SupportBanner/SupportBanner";
import SponsorsBanner from "./components/SponsorsBanner";

export const HOME_PAGE_COMPONENTS = {
  slideshow: HeroHeader,
  featured_products: FeaturedProducts,
  featured_bundles: FeaturedBundles,
  learn_more_products: LearnMoreProducts,
  learn_highlights: LearnHighlights,
  discover_more: DiscoverMoreHero,
  get_more_out_of: GetTheMost,
  hero_video: HeroVideo,
  sponsors: SponsorsBanner,
  product_protection: ProductProtectionDetails,
  support_banner: SupportBanner,
};

export const MODULE_TYPES = [
  { value: "slideshow", label: "Hero Header" },
  { value: "featured_products", label: "Featured Products" },
  { value: "featured_bundles", label: "Featured Bundles" },
  { value: "learn_more_products", label: "Learn More Products" },
  { value: "learn_highlights", label: "Learn Highlights" },
  { value: "discover_more", label: "Discover More" },
  { value: "get_more_out_of", label: "Get More Out Of" },
  { value: "hero_video", label: "Hero Video" },
  { value: "sponsors", label: "Sponsors Banner" },
  { value: "product_protection", label: "Product Protection" },
  { value: "support_banner", label: "Support Banner" },
];
