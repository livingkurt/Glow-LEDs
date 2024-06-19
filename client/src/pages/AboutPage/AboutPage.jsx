import React from "react";
import { Container, Typography, Box, useTheme, useMediaQuery } from "@mui/material";

import HeroVideo from "../HomePage/components/HeroVideo";
import AboutPageHeader from "./components/AboutPageHeader";
import * as API from "../../api";

const AboutPage = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.down("lg"));

  const { data: currentContent, isLoading } = API.useCurrentContentQuery();

  const about_page = currentContent?.about_page;
  console.log({ about_page });

  return (
    <>
      <AboutPageHeader />
      <Box py={2}>
        <Typography variant="h1" align="center" gutterBottom>
          {about_page?.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom textAlign="center">
          {about_page?.subtitle}
        </Typography>

        <Box mb={2}>
          <HeroVideo video={about_page?.video} video_hidden={false} />
        </Box>
        <Container maxWidth="lg">
          {about_page?.sections.map((section, index) => (
            <Box
              key={section._id}
              display="flex"
              flexDirection={index % 4 === 3 ? "column" : { xs: "column", lg: "row" }}
              alignItems="center"
              mb={2}
            >
              {(index % 2 === 0 && index % 4 !== 3) || (index % 4 === 3 && isLarge) ? (
                <>
                  {(index % 2 !== 0 || isLarge) && section.image && (
                    <Box flexShrink={0} ml={{ md: 2 }} mb={{ xs: 2, md: 0 }}>
                      {section.image && (
                        <img
                          alt={section.title}
                          style={{
                            borderRadius: "15px",
                            width: "100%",
                            height: "auto",
                            aspectRatio: index % 4 === 3 ? "16/9" : isLarge ? "16/9" : "9/16",
                            objectFit: "cover",
                            maxWidth: index % 4 === 3 ? "none" : "600px",
                          }}
                          src={section.image.link}
                        />
                      )}
                    </Box>
                  )}

                  <Box flexGrow={1} mr={{ md: 2 }}>
                    <Typography variant="h2" gutterBottom>
                      {section.title}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {section.description}
                    </Typography>
                  </Box>
                  {index % 2 === 0 && !isLarge && section.image && (
                    <Box flexShrink={0} ml={{ md: 2 }} mb={{ xs: 2, md: 0 }}>
                      {section.image && (
                        <img
                          alt={section.title}
                          style={{
                            borderRadius: "15px",
                            width: "100%",
                            height: "auto",
                            aspectRatio: index % 4 === 3 ? "16/9" : isLarge ? "16/9" : "9/16",
                            objectFit: "cover",
                            maxWidth: index % 4 === 3 ? "none" : "600px",
                          }}
                          src={section.image.link}
                        />
                      )}
                    </Box>
                  )}
                </>
              ) : (
                <>
                  {(index % 4 !== 3 || isLarge) && section.image && (
                    <Box flexShrink={0} mr={{ md: 2 }} mb={{ xs: 2, md: 0 }}>
                      <img
                        alt={section.title}
                        style={{
                          borderRadius: "15px",
                          width: "100%",
                          height: "auto",
                          aspectRatio: index % 4 === 3 ? "16/9" : isLarge ? "16/9" : "9/16",
                          objectFit: "cover",
                          maxWidth: index % 4 === 3 ? "none" : "600px",
                        }}
                        src={section.image.link}
                      />
                    </Box>
                  )}
                  <Box flexGrow={1} ml={{ md: 2 }}>
                    <Typography variant="h2" gutterBottom>
                      {section.title}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {section.description}
                    </Typography>
                  </Box>
                  {index % 4 === 3 && !isLarge && section.image && (
                    <Box flexShrink={0} mr={{ md: 2 }} mb={{ xs: 2, md: 0 }}>
                      <img
                        alt={section.title}
                        style={{
                          borderRadius: "15px",
                          width: "100%",
                          height: "auto",
                          aspectRatio: index % 4 === 3 ? "16/9" : isLarge ? "16/9" : "9/16",
                          objectFit: "cover",
                          maxWidth: index % 4 === 3 ? "none" : "600px",
                        }}
                        src={section.image.link}
                      />
                    </Box>
                  )}
                </>
              )}
            </Box>
          ))}
          <Typography variant="h2" textAlign={"center"}>
            {about_page?.footer_title}
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default AboutPage;
