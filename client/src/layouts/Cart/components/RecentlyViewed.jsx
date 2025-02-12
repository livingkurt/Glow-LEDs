import { Link } from "react-router-dom";
import GLLazyImage from "../../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";

const RecentlyViewed = ({ closeMenu }) => {
  const recently_viewed_products = JSON.parse(sessionStorage.getItem("recently_viewed")) || [];

  if (recently_viewed_products && Array.isArray(recently_viewed_products) && recently_viewed_products.length !== 0) {
    return (
      <div className="ta-c w-100per" style={{ border: "0px !important" }}>
        <div className="mv-2rem">
          <div className="title_font fs-20px lh-20px">{"Recently Viewed Products"}</div>
        </div>
        <div className="jc-c">
          <div className="jc-c wrap w-100per">
            {recently_viewed_products.map((item, index) => {
              return (
                item &&
                item.name !== "" && (
                  <Link to={`/products/${item.pathname}`} className="w-100per mb-1rem" key={index} onClick={closeMenu}>
                    <li
                      className="ph-1rem w-100per row ai-c"
                      style={{
                        display: "flex",
                        paddingBottom: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <div className="ai-c">
                        <GLLazyImage
                          src={item.image.link}
                          height="60px"
                          width="60px"
                          className="br-10px mr-10px"
                          alt={item.name}
                          title="Product Image"
                        />
                      </div>
                      <div className=" ta-l w-100per">
                        <div>{item.name}</div>
                      </div>
                    </li>
                    <div style={{ borderBottom: "0.1rem #c0c0c0 solid" }}> </div>
                  </Link>
                )
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default RecentlyViewed;
