import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Container, Button, Box, Grid, AppBar, Tabs, Tab, Paper } from "@mui/material";
import * as API from "../../api";
import { GLForm } from "../../shared/GlowLEDsComponents/GLForm";
import {
  mainFormFields,
  homePageFields,
  bannerFields,
  aboutPageFields,
  productsGridPageFields,
  faqPageFields,
  menusFields,
  featureFlagsFields,
} from "./components/contentFormFields";
import { set_content } from "../../slices/contentSlice";
import { useCategorysQuery, useProductsQuery } from "../../api/allRecordsApi";
import GLArray from "../../shared/GlowLEDsComponents/GLForm/components/GLArray";
import GLTabPanel from "../../shared/GlowLEDsComponents/GLTabPanel/GLTabPanel";

const ContentsPage = () => {
  const dispatch = useDispatch();
  const contentPage = useSelector(state => state.contents.contentPage);
  const { content, loading } = contentPage;

  const { data: products, isLoading: productsLoading } = useProductsQuery();
  const { data: categorys, isLoading: categorysLoading } = useCategorysQuery();

  const [tabValue, setTabValue] = useState(0);
  const [menusTabIndex, setMenusTabIndex] = useState(0);
  const [featureFlagsTabIndex, setFeatureFlagsTabIndex] = useState(0);
  useEffect(() => {
    dispatch(API.getActiveContent());
  }, [dispatch]);

  const handleContentChange = updatedContent => {
    dispatch(set_content(updatedContent));
    dispatch(API.saveContent(updatedContent));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  console.log({ content });

  const formFieldsData = {
    content,
    products: productsLoading ? [] : products,
    categorys: categorysLoading ? [] : categorys,
  };

  const getEmptyObjectFromSchema = schema => {
    const emptyObject = {};
    Object.keys(schema).forEach(key => {
      if (schema[key].type === "array") {
        emptyObject[key] = [];
      } else if (schema[key].type === "object") {
        emptyObject[key] = getEmptyObjectFromSchema(schema[key].fields);
      } else {
        emptyObject[key] = "";
      }
    });
    return emptyObject;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Helmet>
        <title>Admin Contents | Glow LEDs</title>
      </Helmet>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h1>Content Management</h1>
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              const newContent = { ...content, _id: null, name: `${content.name} - New Version` };
              dispatch(API.saveContent(newContent));
            }}
          >
            Create New Version
          </Button>
          <Button variant="contained" color="primary" onClick={() => dispatch(API.saveContent(content))}>
            Update Content
          </Button>
        </Box>
      </Box>

      <Paper>
        <Box p={2}>
          <GLForm
            formData={mainFormFields(formFieldsData)}
            state={content}
            onChange={handleContentChange}
            loading={loading}
          />
        </Box>
        <Box m={2}>
          <AppBar position="static">
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="content tabs"
              TabIndicatorProps={{ style: { backgroundColor: "white" } }}
            >
              <Tab label="Home Page" style={{ color: tabValue === 0 ? "white" : "lightgray" }} />
              <Tab label="Banner" style={{ color: tabValue === 1 ? "white" : "lightgray" }} />
              <Tab label="About Page" style={{ color: tabValue === 2 ? "white" : "lightgray" }} />
              <Tab label="Products Grid" style={{ color: tabValue === 3 ? "white" : "lightgray" }} />
              <Tab label="FAQ Page" style={{ color: tabValue === 4 ? "white" : "lightgray" }} />
              <Tab label="Menus" style={{ color: tabValue === 5 ? "white" : "lightgray" }} />
              <Tab label="Feature Flags" style={{ color: tabValue === 6 ? "white" : "lightgray" }} />
            </Tabs>
          </AppBar>
          <GLTabPanel value={tabValue} index={0}>
            <GLForm
              formData={homePageFields(formFieldsData).fields}
              state={content?.home_page}
              onChange={updated => handleContentChange({ ...content, home_page: updated })}
              loading={loading}
            />
          </GLTabPanel>
          <GLTabPanel value={tabValue} index={1}>
            <GLForm
              formData={bannerFields().fields}
              state={content?.banner}
              onChange={updated => handleContentChange({ ...content, banner: updated })}
              loading={loading}
            />
          </GLTabPanel>
          <GLTabPanel value={tabValue} index={2}>
            <GLForm
              formData={aboutPageFields(formFieldsData).fields}
              state={content?.about_page}
              onChange={updated => handleContentChange({ ...content, about_page: updated })}
              loading={loading}
            />
          </GLTabPanel>
          <GLTabPanel value={tabValue} index={3}>
            <GLForm
              formData={productsGridPageFields(formFieldsData).fields}
              state={content?.products_grid_page}
              onChange={updated => handleContentChange({ ...content, products_grid_page: updated })}
              loading={loading}
            />
          </GLTabPanel>
          <GLTabPanel value={tabValue} index={4}>
            <GLForm
              formData={faqPageFields(formFieldsData).fields}
              state={content?.faq_page}
              onChange={updated => handleContentChange({ ...content, faq_page: updated })}
              loading={loading}
            />
          </GLTabPanel>
          <GLTabPanel value={tabValue} index={5}>
            <GLArray
              fieldName="menus"
              fieldState={content?.menus}
              fieldData={menusFields(formFieldsData)}
              tabIndex={menusTabIndex}
              setTabIndex={setMenusTabIndex}
              onChange={(updatedMenus, action, index) => {
                const newContent = { ...content, menus: updatedMenus.menus };
                handleContentChange(newContent);
              }}
              loading={loading}
              getEmptyObjectFromSchema={getEmptyObjectFromSchema}
            />
          </GLTabPanel>
          <GLTabPanel value={tabValue} index={6}>
            <GLArray
              fieldName="feature_flags"
              fieldState={content?.feature_flags}
              fieldData={featureFlagsFields()}
              tabIndex={featureFlagsTabIndex}
              setTabIndex={setFeatureFlagsTabIndex}
              onChange={updatedFeatureFlags => handleContentChange({ ...content, feature_flags: updatedFeatureFlags })}
              loading={loading}
              getEmptyObjectFromSchema={getEmptyObjectFromSchema}
            />
          </GLTabPanel>
        </Box>
      </Paper>
    </Container>
  );
};

export default ContentsPage;
