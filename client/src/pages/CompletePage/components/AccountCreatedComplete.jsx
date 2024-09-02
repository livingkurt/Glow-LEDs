import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import config from "../../../config";
import { Link, useParams } from "react-router-dom";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import { MenuItemD, MenuItemM } from "../../MenuPage/components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { openLoginModal } from "../../../slices/userSlice";
import * as API from "../../../api";
import { Loading } from "../../../shared/SharedComponents";
import { Box, Button } from "@mui/material";
import GLLazyImage from "../../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";

const AccountCreatedComplete = ({ current_user }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const contentPage = useSelector(state => state.contents.contentPage);
  const { contents } = contentPage;
  const userPage = useSelector(state => state.users.userPage);
  const { verificationSuccess, verificationLoading } = userPage;

  useEffect(() => {
    dispatch(
      API.verifyUser({
        token: params.id,
      })
    );
  }, []);

  return (
    <div className="column jc-c">
      <Helmet>
        <title>Account Created | Glow LEDs</title>
        <meta property="og:title" content="Account Created" />
        <meta name="twitter:title" content="Account Created" />
        <link rel="canonical" href={"https://www.glow-leds.com/pages/complete/email-verified"} />
        <meta property="og:url" content={"https://www.glow-leds.com/pages/complete/email-verified"} />
      </Helmet>
      <Loading
        loading={verificationLoading}
        message={
          <div className="payment_message">
            <h2 className="ta-c">Wait a moment while your account is verified</h2>
            <p className="ta-c">Please do not refresh page</p>
          </div>
        }
      />
      {verificationSuccess && (
        <>
          <h2 className="ta-c">Your Glow LEDs Account has been created!</h2>
          <h3 className="ta-c max-w-800px lh-30px m-auto">Thank you joining the Glow LEDs family!</h3>
          <Box display="flex" justifyContent="center" mt={1}>
            <Button variant="contained" onClick={() => dispatch(openLoginModal())}>
              Login Here
            </Button>
          </Box>
          <div className="jc-c">
            <GLLazyImage
              src="https://thumbs2.imgbox.com/b1/08/2Dnle6TI_t.jpeg" // Update this URL as needed
              alt="email_verified"
              className="br-20px w-100per max-w-800px m-10px"
            />
          </div>
          <h3 className="ta-c">Checkout our product categories below! Our collection is always growing!</h3>

          <div className="product_big_screen">
            <div className="jc-c">
              <div className="jc-c wrap">
                {contents[0]?.home_page?.slideshow &&
                  contents[0]?.home_page?.slideshow.map((item, index) => {
                    return (
                      <MenuItemD
                        item={item}
                        index={index}
                        decide_url={`/collections/all/products/category/${item.category}`}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="product_small_screen none">
            <div className="jc-c">
              <ul className="jc-c wrap">
                {contents[0]?.home_page?.slideshow &&
                  contents[0]?.home_page?.slideshow.map((item, index) => {
                    return (
                      <MenuItemM
                        item={item}
                        index={index}
                        decide_url={`/collections/all/products/category/${item.category}`}
                      />
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className="jc-c ai-c m-auto wrap">
            <div>
              <h3 className="ta-c">Discover More of Your Glow</h3>
              <div className="jc-c m-auto wrap">
                <Link to="/collections/all/products">
                  <GLButton variant="primary" className="mh-10px">
                    Products
                  </GLButton>
                </Link>

                <Link to="collections/all/features/category/glovers">
                  <GLButton variant="primary" className="mh-10px">
                    Featured Videos
                  </GLButton>
                </Link>
                <Link to="/collections/all/sponsors">
                  <GLButton variant="primary" className="mh-10px">
                    Sponsored Glovers
                  </GLButton>
                </Link>
                <Link to="/collections/all/teams">
                  <GLButton variant="primary" className="mh-10px">
                    Sponsored Teams
                  </GLButton>
                </Link>
                <Link to="/pages/music">
                  <GLButton variant="primary" className="mh-10px">
                    NTRE Music
                  </GLButton>
                </Link>
              </div>
            </div>
          </div>

          <div className="jc-c">
            <p className="max-w-800px mv-2rem lh-30px ta-c">
              If you have any questions or concerns, please reach out to {config.REACT_APP_CONTACT_EMAIL}.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountCreatedComplete;
