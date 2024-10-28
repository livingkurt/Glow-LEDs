import React from "react";
import { Container, Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import { isEvenIndex, isFourthSection, isNotFourthSection, isOddIndex } from "./aboutPageHelpers";

import HeroVideo from "../HomePage/components/HeroVideo";
import AboutPageHeader from "./components/AboutPageHeader";
import * as API from "../../api";
import SectionContent from "./components/SectionContent";
import SectionImage from "./components/SectionImage";

const AboutPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const { data: currentContent } = API.useCurrentContentQuery();

  const about_page = currentContent?.about_page;

  return (
    <>
      <AboutPageHeader />
      <Box py={2}>
        <Container maxWidth="lg">
          <Typography variant="h1" align="center" gutterBottom>
            {about_page?.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom textAlign="center">
            {about_page?.subtitle}
          </Typography>
        </Container>

        <Box mb={2}>
          <HeroVideo video={about_page?.video} video_hidden={false} />
        </Box>
        <Container maxWidth="lg">
          {about_page?.sections.map((section, index) => (
            <Box
              key={section._id}
              display="flex"
              flexDirection={isFourthSection(index) ? "column" : { xs: "column", lg: "row" }}
              alignItems="center"
              mb={2}
            >
              {(isEvenIndex(index) && isNotFourthSection(index)) || (isFourthSection(index) && isMobile) ? (
                <>
                  {(isOddIndex(index) || isMobile) && (
                    <SectionImage section={section} index={index} isMobile={isMobile} />
                  )}
                  <SectionContent section={section} />
                  {isEvenIndex(index) && !isMobile && (
                    <SectionImage section={section} index={index} isMobile={isMobile} />
                  )}
                </>
              ) : (
                <>
                  {(isNotFourthSection(index) || isMobile) && (
                    <SectionImage section={section} index={index} isMobile={isMobile} />
                  )}
                  <SectionContent section={section} />
                  {isFourthSection(index) && !isMobile && (
                    <SectionImage section={section} index={index} isMobile={isMobile} />
                  )}
                </>
              )}
            </Box>
          ))}
          <Typography variant="h2" textAlign="center">
            {about_page?.footer_title}
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default AboutPage;
