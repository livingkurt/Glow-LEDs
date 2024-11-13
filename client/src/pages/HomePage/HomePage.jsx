import { Box, Container } from "@mui/material";
import HomePageHead from "./components/HomePageHead";
import { HOME_PAGE_COMPONENTS } from "./homePageComponents";
import useHomePage from "./useHomePage";

const HomePage = () => {
  const { modules, isLoading } = useHomePage();

  return (
    <Box>
      {!isLoading && (
        <>
          <HomePageHead />
          {modules.map((module, index) => {
            const Component = HOME_PAGE_COMPONENTS[module.type];
            if (!Component || module.hidden) return null;
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
