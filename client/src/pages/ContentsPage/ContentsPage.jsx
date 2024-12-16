import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";

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
  academyPageFields,
} from "./components/contentFormFields";
import {
  useAffiliatesQuery,
  useArticlesQuery,
  useCartsQuery,
  useTagsQuery,
  useProductsQuery,
  useTutorialsQuery,
  useModesQuery,
} from "../../api/allRecordsApi";
import GLArray from "../../shared/GlowLEDsComponents/GLForm/components/GLArray";
import GLTabPanel from "../../shared/GlowLEDsComponents/GLTabPanel/GLTabPanel";
import debounce from "lodash/debounce";
import { set_content } from "../../slices/contentSlice";
import HomePageEditor from "./components/HomePageEditor";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

const ContentsPage = () => {
  const dispatch = useDispatch();
  const contentPage = useSelector(state => state.contents.contentPage);
  const { content, loading } = contentPage;
  console.log({ content });

  const { data: products, isLoading: productsLoading } = useProductsQuery();
  const { data: tags, isLoading: tagsLoading } = useTagsQuery();
  const { data: articles, isLoading: articlesLoading } = useArticlesQuery();
  const { data: tutorials, isLoading: tutorialsLoading } = useTutorialsQuery();
  const { data: affiliates, isLoading: affiliatesLoading } = useAffiliatesQuery();
  const { data: carts, isLoading: cartsLoading } = useCartsQuery();
  const { data: modes, isLoading: modesLoading } = useModesQuery();

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
          setSaveStatus("Save Complete");
          setTimeout(() => setSaveStatus(null), 2000);
        })
        .catch(() => {
          setSaveStatus("Save Failed");
          setTimeout(() => setSaveStatus(null), 4000);
        });
    }, 1000),
    [dispatch]
  );

  const handleContentChange = updatedContent => {
    // Update the content in Redux store immediately
    dispatch(set_content(updatedContent));
    // Then, debounce the save API call
    debouncedSave(updatedContent);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const formFieldsData = {
    content,
    products: productsLoading ? [] : products,
    tags: tagsLoading ? [] : tags,
    articles: articlesLoading ? [] : articles,
    tutorials: tutorialsLoading ? [] : tutorials,
    affiliates: affiliatesLoading ? [] : affiliates,
    carts: cartsLoading ? [] : carts,
    modes: modesLoading ? [] : modes,
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
        <title>{"Admin Contents | Glow LEDs"}</title>
      </Helmet>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h1>{"Content Management"}</h1>
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
            {"Create New Version"}
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
        <Box>
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
              <Tab label="Academy Page" style={{ color: tabValue === 6 ? "white" : "lightgray" }} />
              <Tab label="Feature Flags" style={{ color: tabValue === 7 ? "white" : "lightgray" }} />
            </Tabs>
          </AppBar>
          <GLTabPanel value={tabValue} index={0}>
            <HomePageEditor
              initialModules={content?.home_page?.modules || []}
              onChange={modules => {
                console.log({ ContentPageModules: modules });
                handleContentChange({
                  ...content,
                  home_page: {
                    ...content.home_page,
                    modules,
                  },
                });
              }}
              formFieldsData={formFieldsData}
            />
          </GLTabPanel>
          <GLTabPanel value={tabValue} index={1}>
            <GLForm
              formData={bannerFields().fields}
              state={content?.banner || {}}
              onChange={updated => handleContentChange({ ...content, banner: { ...content.banner, ...updated } })}
              loading={loading}
            />
          </GLTabPanel>
          <GLTabPanel value={tabValue} index={2}>
            <GLForm
              formData={aboutPageFields(formFieldsData).fields}
              state={content?.about_page || {}}
              onChange={updated =>
                handleContentChange({ ...content, about_page: { ...content.about_page, ...updated } })
              }
              loading={loading}
            />
          </GLTabPanel>
          <GLTabPanel value={tabValue} index={3}>
            <GLForm
              formData={productsGridPageFields(formFieldsData).fields}
              state={content?.products_grid_page || {}}
              onChange={updated =>
                handleContentChange({ ...content, products_grid_page: { ...content.products_grid_page, ...updated } })
              }
              loading={loading}
            />
          </GLTabPanel>
          <GLTabPanel value={tabValue} index={4}>
            <GLForm
              formData={faqPageFields(formFieldsData).fields}
              state={content?.faq_page || {}}
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
              onChange={updatedMenus => {
                handleContentChange({ ...content, menus: updatedMenus.menus });
              }}
              loading={loading}
              getEmptyObjectFromSchema={getEmptyObjectFromSchema}
            />
          </GLTabPanel>
          <GLTabPanel value={tabValue} index={6}>
            <GLForm
              formData={academyPageFields(formFieldsData).fields}
              state={content?.academy_page || {}}
              onChange={updated => {
                handleContentChange({ ...content, academy_page: { ...content.academy_page, ...updated } });
              }}
              loading={loading}
            />
          </GLTabPanel>
          <GLTabPanel value={tabValue} index={7}>
            <GLArray
              fieldName="feature_flags"
              fieldState={content?.feature_flags}
              fieldData={featureFlagsFields()}
              tabIndex={featureFlagsTabIndex}
              setTabIndex={setFeatureFlagsTabIndex}
              onChange={updatedFeatureFlags =>
                handleContentChange({ ...content, feature_flags: updatedFeatureFlags.feature_flags })
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
