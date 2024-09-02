import { Box } from "@mui/material";
import React from "react";
import { isEvenIndex, isFourthSection, isNotFourthSection, isOddIndex } from "../aboutPageHelpers";
import GLLazyImage from "../../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";

const SectionImage = ({ section, index, isMobile }) => (
  <Box
    flexShrink={0}
    ml={isEvenIndex(index) && isNotFourthSection(index) && !isMobile ? { md: 0 } : { md: 2 }}
    mr={isOddIndex(index) && isNotFourthSection(index) && !isMobile ? { md: 2 } : { md: 0 }}
    mb={{ xs: 2, md: 0 }}
  >
    {section.image && (
      <GLLazyImage
        alt={section.title}
        style={{
          borderRadius: "15px",
          width: "100%",
          height: "auto",
          aspectRatio: isFourthSection(index) ? "16/9" : isMobile ? "16/9" : "9/16",
          objectFit: "cover",
          maxWidth: isFourthSection(index) ? "none" : "600px",
        }}
        src={section.image.link}
      />
    )}
  </Box>
);

export default SectionImage;
