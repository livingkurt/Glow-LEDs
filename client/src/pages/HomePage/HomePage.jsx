import { Box, Container } from "@mui/material";
import HomePageHead from "./components/HomePageHead";
import useHomePage from "./useHomePage";
import { HOME_PAGE_COMPONENTS } from "./homePageComponents";
import * as API from "../../api";

const HomePage = () => {
  // const { modules, isLoading } = useHomePage();
  const { data: currentContent, isLoading } = API.useCurrentContentQuery();
  const modules = currentContent?.home_page?.modules;
  console.log({ modules });

  return (
    <Box>
      {!isLoading && (
        <>
          <HomePageHead />
          {modules.map((module, index) => {
            const Component = HOME_PAGE_COMPONENTS[module.type];
            // if (!Component || module.hidden) return null;
            console.log({ [module.type]: module });
            return (
              <Box key={index}>
                {module.type === "featured_products" ||
                module.type === "featured_product_bundles" ||
                module.type === "support_banner" ||
                module.type === "get_more_out_of" ||
                module.type === "sponsors" ||
                module.type === "learn_more_products" ? (
                  <Container maxWidth="xl">
                    <Box pt={{ xs: 2, sm: 4 }} pb={{ xs: 2 }}>
                      <Component {...module.content} />
                    </Box>
                  </Container>
                ) : (
                  <Component {...module.content} />
                )}
              </Box>
            );
          })}
        </>
      )}
    </Box>
  );
};

export default HomePage;

// import { Box, Container } from "@mui/material";
// import HomePageHead from "./components/HomePageHead";
// import ProductProtectionDetails from "../../shared/ProductProtectionDetails/ProductProtectionDetails";
// import LearnHighlights from "./components/LearnHighlights";
// import HeroHeader from "./components/HeroHeader";
// import FeaturedProducts from "./components/FeaturedProducts";
// import FeaturedBundles from "./components/FeaturedBundles";
// import LearnMoreProducts from "./components/LearnMoreProducts";
// import useHomePage from "./useHomePage";
// import DiscoverMoreHero from "./components/DiscoverMoreHero";
// import GetTheMost from "./components/GetTheMost.jsx";
// import HeroVideo from "./components/HeroVideo";
// import SponsorsBanner from "./components/SponsorsBanner";
// import SupportBanner from "../../shared/SupportBanner/SupportBanner";

// const HomePage = () => {
//   const {
//     slideshow,
//     featured_products,
//     featured_product_bundles,
//     learn_more_products,
//     learn_highlights,
//     isLoading,
//     discover_more,
//     get_more_out_of,
//     hero_video,
//     featured_products_hidden,
//     featured_product_bundles_hidden,
//     slideshow_hidden,
//     hero_video_hidden,
//     learn_more_products_hidden,
//     sponsors,
//   } = useHomePage();

//   console.log({ featured_product_bundles });
//   return (
//     <Box>
// {!isLoading && (
//   <>
//     <HomePageHead />
//     {!slideshow_hidden && slideshow?.length > 0 && (
//       <HeroHeader slideshow={slideshow} slideshow_hidden={slideshow_hidden} />
//     )}
//     {!featured_products_hidden && featured_products && (
//       <Container maxWidth="xl">
//         <Box pt={{ xs: 2, sm: 4 }} pb={{ xs: 2 }}>
//           <FeaturedProducts
//             featured_products={featured_products}
//             featured_products_hidden={featured_products_hidden}
//           />
//         </Box>
//       </Container>
//     )}

//     {!hero_video_hidden && hero_video && <HeroVideo video={hero_video} video_hidden={hero_video_hidden} />}
//     {!learn_more_products_hidden && !slideshow_hidden && (
//       <Container maxWidth="xl">
//         <Box pt={{ xs: 2, sm: 2 }} pb={{ xs: 2 }}>
//           <LearnMoreProducts
//             learn_more_products={learn_more_products}
//             learn_more_products_hidden={learn_more_products_hidden}
//           />
//         </Box>
//       </Container>
//     )}
//     {!featured_product_bundles_hidden && featured_product_bundles && (
//       <Container maxWidth="xl">
//         <Box pt={{ xs: 2, sm: 4 }} pb={{ xs: 2 }}>
//           <FeaturedBundles
//             featured_product_bundles={featured_product_bundles}
//             featured_product_bundles_hidden={featured_product_bundles_hidden}
//           />
//         </Box>
//       </Container>
//     )}
//     {learn_highlights && <LearnHighlights learn_highlights={learn_highlights} />}
//     {!discover_more?.hidden && discover_more?.title && <DiscoverMoreHero discover_more={discover_more} />}
//     <Container maxWidth="xl">
//       <Box my={{ xs: 2, sm: 4 }}>
//         {sponsors && <SponsorsBanner sponsors={sponsors} />}
//         {get_more_out_of && <GetTheMost get_more_out_of={get_more_out_of} />}
//         <ProductProtectionDetails transparent />
//         <Box my={2}>
//           <SupportBanner />
//         </Box>
//       </Box>
//     </Container>
//   </>
// )}
// </Box>
//   );
// };

// export default HomePage;
