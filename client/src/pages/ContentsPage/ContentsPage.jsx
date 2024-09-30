import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { Container, Button, Box, AppBar, Tabs, Tab, Paper } from "@mui/material";
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
import { useCategorysQuery, useProductsQuery } from "../../api/allRecordsApi";
import GLArray from "../../shared/GlowLEDsComponents/GLForm/components/GLArray";
import GLTabPanel from "../../shared/GlowLEDsComponents/GLTabPanel/GLTabPanel";
import { debounce } from "lodash";
import { set_content } from "../../slices/contentSlice";

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

  const [saveStatus, setSaveStatus] = useState(null);

  // Debounced save function
  const debouncedSave = useCallback(
    debounce(updatedContent => {
      setSaveStatus("Autosaving...");
      dispatch(API.saveContent(updatedContent))
        .then(() => {
          dispatch(set_content(updatedContent));
          setSaveStatus("Save Complete");
          setTimeout(() => setSaveStatus(null), 2000); // Clear the message after 2 seconds
        })
        .catch(() => {
          setSaveStatus("Save Failed");
          setTimeout(() => setSaveStatus(null), 4000); // Clear the message after 2 seconds
        });
    }, 1000),
    [dispatch]
  );

  const handleContentChange = updatedContent => {
    console.log({ updatedContent });
    debouncedSave(updatedContent);
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
        <Box display="flex" gap={2} alignItems="center">
          {saveStatus && <span>{saveStatus}</span>}

          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              const newContent = { ...content, _id: null, name: `${content.name} - New Version`, active: true };
              dispatch(API.saveContent(newContent));
            }}
          >
            Create New Version
          </Button>
        </Box>
      </Box>

      <Paper>
        <Box p={2}>
          <GLForm
            formData={mainFormFields(formFieldsData)}
            state={content}
            onChange={updated => handleContentChange({ ...content, ...updated })}
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
              onChange={updated => handleContentChange({ ...content, home_page: { ...content.home_page, ...updated } })}
              loading={loading}
            />
          </GLTabPanel>
          <GLTabPanel value={tabValue} index={1}>
            <GLForm
              formData={bannerFields().fields}
              state={content?.banner}
              onChange={updated => handleContentChange({ ...content, banner: { ...content.banner, ...updated } })}
              loading={loading}
            />
          </GLTabPanel>
          <GLTabPanel value={tabValue} index={2}>
            <GLForm
              formData={aboutPageFields(formFieldsData).fields}
              state={content?.about_page}
              onChange={updated =>
                handleContentChange({ ...content, about_page: { ...content.about_page, ...updated } })
              }
              loading={loading}
            />
          </GLTabPanel>
          <GLTabPanel value={tabValue} index={3}>
            <GLForm
              formData={productsGridPageFields(formFieldsData).fields}
              state={content?.products_grid_page}
              onChange={updated =>
                handleContentChange({ ...content, products_grid_page: { ...content.products_grid_page, ...updated } })
              }
              loading={loading}
            />
          </GLTabPanel>
          <GLTabPanel value={tabValue} index={4}>
            <GLForm
              formData={faqPageFields(formFieldsData).fields}
              state={content?.faq_page}
              onChange={updated => handleContentChange({ ...content, faq_page: { ...content.faq_page, ...updated } })}
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
                handleContentChange({ ...content, menus: { ...content.menus, ...updatedMenus } });
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
              onChange={updatedFeatureFlags =>
                handleContentChange({ ...content, feature_flags: { ...content.feature_flags, ...updatedFeatureFlags } })
              }
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
