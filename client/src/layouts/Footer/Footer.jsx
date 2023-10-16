import React from "react";
import { Link } from "react-router-dom";
import useWindowDimensions from "../../shared/Hooks/useWindowDimensions";
import { footerLinks, socialMediaLinks } from "./footerHelpers";

const Footer = () => {
  const { width } = useWindowDimensions();

  return (
    <footer className="ta-c w-100per mt-5rem h-450px">
      <div className="footer-image">
        <Link to="/" aria-label="Home Page">
          <div className="">
            <img
              className=""
              src="/images/optimized_images/logo_images/glow_logo_optimized.png"
              alt="Glow LEDs Logo"
              title="Big Logo"
            />
          </div>
        </Link>
        <div className="mt-2rem wrap jc-c">
          <div className="ml-10px fs-25px jc-b w-100per max-w-500px">
            {socialMediaLinks.map((link, idx) => (
              <div className="ml-10px fs-40px" key={idx}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                  <i className={link.icon + " zoom"} />
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="jc-b ai-c w-100per p-10px">
          <div className="jc-a w-100per">
            {footerLinks.map((section, idx) => (
              <div key={idx} style={{ display: width < section.minWidth ? "none" : "block" }}>
                <h2 className="ta-l">
                  <Link to={section.titleUrl}>{section.title}</Link>
                </h2>
                <div className="lst-none">
                  {section.links.map((link, linkIdx) => (
                    <div className="ta-l mv-2rem" key={linkIdx}>
                      <Link to={link.url}>{link.text}</Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
