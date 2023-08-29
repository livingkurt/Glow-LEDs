import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import { SponsorItemD, SponsorItemM } from "./components";
import * as API from "../../api";

const AllSponsorsPage = () => {
  const params = useParams();
  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { affiliates, loading, error } = affiliatePage;
  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listAffiliates({ sponsor: true }));
    }
    return () => (clean = false);
  }, [dispatch]);

  return (
    <div>
      <Helmet>
        <title>Sponsors| Glow LEDs</title>
        <meta property="og:title" content="Affiliated" />
        <meta name="twitter:title" content="Affiliated" />
        <link rel="canonical" href="https://www.glow-leds.com/collections/affiliates" />
        <meta property="og:url" content="https://www.glow-leds.com/collections/affiliates" />
        <meta name="description" content={"Glow LEDs Sponsored Glovers"} />
        <meta property="og:description" content={"Glow LEDs Sponsored Glovers"} />
        <meta name="twitter:description" content={"Glow LEDs Sponsored Glovers"} />
      </Helmet>

      <div className="jc-fe">
        <Link to="/collections/all/teams">
          <GLButton variant="secondary" className="">
            Sponsored Teams
          </GLButton>
        </Link>
      </div>
      <div className="jc-c">
        <div className="row">
          <h1>Sponsored Glovers</h1>
        </div>
      </div>

      {affiliates && (
        <Loading loading={loading} error={error}>
          <div>
            <div className="product_big_screen">
              {affiliates && (
                <ul className="products" style={{ marginTop: 0, textDecoration: "none" }}>
                  {affiliates.map(
                    (affiliate, index) =>
                      !affiliate.hidden && (
                        <SponsorItemD size="300px" key={index} affiliate={affiliate} category={params.category} />
                      )
                  )}
                </ul>
              )}
            </div>

            <div className="product_small_screen none">
              {affiliates && (
                <ul className="products" style={{ marginTop: 0, textDecoration: "none" }}>
                  {affiliates.map(
                    (affiliate, index) =>
                      !affiliate.hidden && (
                        <SponsorItemM size="300px" key={index} affiliate={affiliate} category={params.category} />
                      )
                  )}
                </ul>
              )}
            </div>
          </div>
          {affiliates.length === 0 && (
            <h2 style={{ textAlign: "center" }}>Sorry we can't find anything with that name</h2>
          )}
        </Loading>
      )}
    </div>
  );
};
export default AllSponsorsPage;
