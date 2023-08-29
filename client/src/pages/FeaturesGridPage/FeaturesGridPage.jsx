import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../shared/SharedComponents";
import { humanize } from "../../utils/helper_functions";
import { Helmet } from "react-helmet";
import { FeatureItemD, FeatureItemM } from "./components";
import Search from "../../shared/GlowLEDsComponents/GLTable/Search";
import * as API from "../../api";

const FeaturesGridPage = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [search, set_search] = useState(location.search.substring(8) ? location.search.substring(8) : "");
  const [sort, setSortOrder] = useState("");
  const category = params.category ? params.category : "";
  const subcategory = params.subcategory ? params.subcategory : "";

  const featurePage = useSelector(state => state.features);
  const { features, loading, error } = featurePage;
  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listFeatures({ category, subcategory, search }));
    }
    return () => (clean = false);
  }, [search]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (search) {
        navigate({
          search: "?search=" + search,
        });
      }

      dispatch(API.listFeatures({ category, subcategory, search }));
    }
    return () => (clean = false);
  }, [category, subcategory, search]);
  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listFeatures({ category, subcategory, search, sort }));
    }
    return () => (clean = false);
  }, [sort]);

  const handleListItems = e => {
    e.preventDefault();
    // navigate(
    // 	'/collections/all/features/category' + category + '/' + subcategory + '?search=' + search
    // );
    navigate({
      search: "?search=" + search,
    });
    dispatch(API.listFeatures({ category, subcategory, search, sort }));
  };

  const date = new Date();

  const today = date.toISOString();

  return (
    <div>
      <Helmet>
        <title>Featured | Glow LEDs</title>
        <meta property="og:title" content="Featured" />
        <meta name="twitter:title" content="Featured" />
        <link rel="canonical" href="https://www.glow-leds.com/collections/features" />
        <meta property="og:url" content="https://www.glow-leds.com/collections/features" />
      </Helmet>
      <div className="jc-c">
        <div className="row">
          <h1>{"Featured " + humanize(category) || "Featured"}</h1>
        </div>
      </div>

      <div className="search_and_sort row jc-c ai-c" style={{ overflowX: "scroll" }}>
        <Search search={search} set_search={set_search} handleListItems={handleListItems} category={category} />
      </div>
      <Loading loading={loading} error={error}>
        <div>
          <div className="product_big_screen">
            {features && (
              <ul className="products" style={{ marginTop: 0, textDecoration: "none" }}>
                {features
                  .filter(feature => feature.release_date <= today && feature.category === category)
                  .map(
                    (feature, index) =>
                      !feature.hidden && (
                        <FeatureItemD size="300px" key={index} feature={feature} category={params.category} />
                      )
                  )}
              </ul>
            )}
          </div>

          <div className="product_small_screen none">
            {features && (
              <ul className="products" style={{ marginTop: 0, textDecoration: "none" }}>
                {features
                  .filter(feature => feature.release_date <= today && feature.category === category)
                  .map(
                    (feature, index) =>
                      !feature.hidden && (
                        <FeatureItemM size="300px" key={index} feature={feature} category={params.category} />
                      )
                  )}
              </ul>
            )}
          </div>
        </div>
        {features.length === 0 && <h2 style={{ textAlign: "center" }}>Sorry we can't find anything with that name</h2>}
      </Loading>
    </div>
  );
};
export default FeaturesGridPage;
