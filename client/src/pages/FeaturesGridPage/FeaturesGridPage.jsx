import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Loading } from "../../shared/SharedComponents";
import { humanize } from "../../utils/helper_functions";
import { Helmet } from "react-helmet";
import { listFeatures } from "../../actions/featureActions";
import { FeatureItemD, FeatureItemM } from "./components";
import Search from "../../shared/GlowLEDsComponents/GLTable/Search";

const FeaturesGridPage = props => {
  const history = useHistory();
  const [search, set_search] = useState(props.location.search.substring(8) ? props.location.search.substring(8) : "");
  const [sort, setSortOrder] = useState("");
  const category = props.match.params.category ? props.match.params.category : "";
  const subcategory = props.match.params.subcategory ? props.match.params.subcategory : "";

  const featureList = useSelector(state => state.featureList);
  const { features, loading, error } = featureList;
  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(listFeatures({ category, subcategory, search }));
    }
    return () => (clean = false);
  }, [search]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (search) {
        history.push({
          search: "?search=" + search
        });
      }

      dispatch(listFeatures({ category, subcategory, search }));
    }
    return () => (clean = false);
  }, [category, subcategory, search]);
  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(listFeatures({ category, subcategory, search, sort }));
    }
    return () => (clean = false);
  }, [sort]);

  const submitHandler = e => {
    e.preventDefault();
    // history.push(
    // 	'/collections/all/features/category' + category + '/' + subcategory + '?search=' + search
    // );
    history.push({
      search: "?search=" + search
    });
    dispatch(listFeatures({ category, subcategory, search, sort }));
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
      {/* <div className="jc-fe">
        <Link to="/account/login?redirect=/account/submit_feature">
          <GLButton variant="secondary" className="">
            Submit Feature
          </GLButton>
        </Link>
      </div> */}
      <div className="jc-c">
        <div className="row">
          <h1>{"Featured " + humanize(category) || "Featured"}</h1>
        </div>
      </div>

      <div className="search_and_sort row jc-c ai-c" style={{ overflowX: "scroll" }}>
        <Search search={search} set_search={set_search} submitHandler={submitHandler} category={category} />
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
                      !feature.hidden && <FeatureItemD size="300px" key={index} feature={feature} category={props.match.params.category} />
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
                      !feature.hidden && <FeatureItemM size="300px" key={index} feature={feature} category={props.match.params.category} />
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
