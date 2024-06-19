import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, Box, Button, Divider } from "@mui/material";
import Filter from "../../shared/GlowLEDsComponents/GLTable/Filter";
import * as API from "../../api";
import { update_products_url } from "../../utils/helper_functions";
import HeroVideo from "../HomePage/components/HeroVideo";
import FAQPageHead from "./components/FAQPageHead";

const FAQPage = () => {
  const { data: currentContent } = API.useCurrentContentQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [chip_name, set_chip_name] = useState();

  const faqPage = currentContent?.faq_page;

  const chipPage = useSelector(state => state.chips.chipPage);
  const { chips: chips_list } = chipPage;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listChips({}));
    }
    return () => (clean = false);
  }, []);

  const filterHandler = e => {
    const chip_selected = JSON.parse(e.target.value);
    update_products_url(navigate, "", "", chip_selected.name, "", "0", "/collections/all/products");
    dispatch(
      API.listProducts({
        chip: chip_selected._id,
        hidden: false,
      })
    );
    set_chip_name({});
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <FAQPageHead />
      <Typography gutterBottom variant="h2" align="center">
        {faqPage?.title}
      </Typography>
      <Box>
        <Box>
          {faqPage?.sections.map((section, index) => (
            <>
              <Box key={index} sx={{ margin: "10px 0" }}>
                <Typography gutterBottom variant="h4" align="center">
                  {section.title}
                </Typography>
                {section.video && <HeroVideo video={section.video} />}
                {section.subsections.map((subsection, subIndex) => (
                  <Box key={subIndex}>
                    <Typography gutterBottom variant="h5">
                      {subsection.title}
                    </Typography>
                    <Typography gutterBottom variant="body3" paragraph>
                      {subsection.description}
                    </Typography>
                    {subsection.video && <HeroVideo video={subsection.video} />}
                  </Box>
                ))}
                {section.button_text && section.button_link && (
                  <Link to={section.button_link}>
                    <Box className="jc-c">
                      <Button variant="contained" color="primary" style={{ margin: "auto" }}>
                        {section.button_text}
                      </Button>
                    </Box>
                  </Link>
                )}
              </Box>
              <Divider sx={{ backgroundColor: "white", my: 3 }} />
            </>
          ))}
        </Box>
      </Box>
      <Box sx={{ margin: "10px 0" }}>
        <Typography gutterBottom variant="h4" align="center">
          Chip Compatibility
        </Typography>
        <Typography gutterBottom variant="body3" paragraph>
          Select your chip from the dropdown below to see what products are compatible!
        </Typography>
        <Box sx={{ marginLeft: "-5px" }}>
          <Filter
            title="Shop By Chip"
            width="100per"
            state={chip_name}
            filterHandler={filterHandler}
            filter_options={chips_list}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default FAQPage;
