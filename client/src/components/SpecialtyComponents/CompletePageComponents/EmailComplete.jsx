import React, { useState } from "react";
import { GLButton } from "../../GlowLEDsComponents";
import { Link } from "react-router-dom";
import Survey from "../Survey";

const EmailComplete = ({ userInfo, order_id }) => {
  return (
    <div className="column jc-c">
      <h2 className="ta-c">Thank You for Contacting Glow LEDs!</h2>
      <p className="ta-c max-w-800px lh-30px m-auto">We'll answer your questions or requests as soon as possible.</p>
      <div className="max-w-800px w-100per m-auto column g-20px">
        <p className="ta-c max-w-800px lh-30px m-auto">In the meantime, check out these pages for answers to frequently asked questions.</p>
        <Link to="/pages/faq#glowskinz">
          <GLButton variant="primary" className="w-100per">
            Glowskinz FAQ
          </GLButton>
        </Link>
        <Link to="/pages/faq#diffuser_caps">
          <GLButton variant="primary" className="w-100per">
            Diffuser Caps FAQ
          </GLButton>
        </Link>
        <Link to="/pages/faq#custom_products">
          <GLButton variant="primary" className="w-100per">
            Custom Products FAQ
          </GLButton>
        </Link>
        <Link to="/pages/faq#featured_content">
          <GLButton variant="primary" className="w-100per">
            Featured Content FAQ
          </GLButton>
        </Link>
        <Link to="/pages/faq#processing_shipping">
          <GLButton variant="primary" className="w-100per">
            Processing/Shipping FAQ
          </GLButton>
        </Link>
        <Link to="/pages/faq#order_issues">
          <GLButton variant="primary" className="w-100per">
            Order Issues FAQ
          </GLButton>
        </Link>
      </div>

      <div className="jc-c">
        <img src="https://thumbs2.imgbox.com/b1/08/2Dnle6TI_t.jpeg" alt="heart_caps" className="br-20px w-100per max-w-800px m-10px" />
      </div>
      <div className="jc-c">
        <p className="max-w-800px mv-2rem lh-30px ta-c">
          {" "}
          If you have not recieved a confirmation email make sure to check your spam folder for the confirmation email. Please reach out
          with any questions or concerns to {process.env.REACT_APP_CONTACT_EMAIL}.
        </p>
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
    </div>
  );
};

export default EmailComplete;
