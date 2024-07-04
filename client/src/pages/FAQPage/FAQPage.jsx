import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

  const filterHandler = chip_selected => {
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
        {faqPage?.sections.map((section, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h4">{section.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {section.video && <HeroVideo video={section.video} />}
              {section.subsections.map((subsection, subIndex) => (
                <Box key={subIndex}>
                  <Typography gutterBottom variant="h5">
                    {subsection.title}
                  </Typography>
                  <Typography gutterBottom variant="body1" paragraph>
                    {subsection.description}
                  </Typography>
                  {subsection.video && <HeroVideo video={subsection.video} />}
                </Box>
              ))}
              {section.button_text && section.button_link && (
                <Box textAlign="center" mt={2}>
                  <Button variant="contained" color="primary" component={Link} to={section.button_link}>
                    {section.button_text}
                  </Button>
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h4">Chip Compatibility</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography gutterBottom variant="body1" paragraph>
              Select your chip from the dropdown below to see what products are compatible!
            </Typography>
            <Autocomplete
              options={chips_list || []}
              getOptionLabel={option => option.name}
              value={chip_name}
              onChange={(event, newValue) => {
                filterHandler(newValue);
              }}
              renderInput={params => <TextField {...params} label={"Filter By Chip"} variant="outlined" />}
              sx={{ width: 221 }}
            />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
};

export default FAQPage;
