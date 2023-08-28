import React, { useState } from "react";
import { Link } from "react-router-dom";
import { humanize, sizes, toCapitalize } from "../../../utils/helper_functions";
import useWindowDimensions from "../../../shared/Hooks/windowDimensions";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import ReadMore from "../../../shared/GlowLEDsComponents/GLReadMore/ReadMore";
import { Reviews } from ".";
import { Tabs, Tab, Paper, AppBar } from "@mui/material";
import GLTabPanel from "../../../shared/GlowLEDsComponents/GLTabPanel/GLTabPanel";

const ProductDetails = ({ product, manuals, description, included_items, pathname }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const { width } = useWindowDimensions();

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div>
      <Paper style={{ backgroundColor: "#4e5061" }}>
        <AppBar position="sticky" color="transparent">
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            variant="scrollable"
            style={{ color: "lightgray" }} // Default color
            TabIndicatorProps={{ style: { backgroundColor: "white" } }} // Indicator color
          >
            <Tab
              value={0}
              label="Description"
              style={{ color: tabIndex === 0 ? "white" : "lightgray" }} // Color based on selection
            />
            {product?.name?.includes("Supreme") && (
              <Tab
                value={1}
                label="Sizing"
                style={{ color: tabIndex === 1 ? "white" : "lightgray" }} // Color based on selection
              />
            )}
            {product.chips && product.chips.length > 0 && (
              <Tab
                value={2}
                label="Compatible Chips"
                style={{ color: tabIndex === 2 ? "white" : "lightgray" }} // Color based on selection
              />
            )}
            {manuals && manuals[product.category] && (
              <Tab
                value={3}
                label="Manual"
                style={{ color: tabIndex === 3 ? "white" : "lightgray" }} // Color based on selection
              />
            )}
            <Tab value={4} style={{ color: tabIndex === 4 ? "white" : "lightgray" }} label="Media" />
            <Tab value={5} style={{ color: tabIndex === 5 ? "white" : "lightgray" }} label="Reviews" />
            <Tab value={6} style={{ color: tabIndex === 6 ? "white" : "lightgray" }} label="Included Items" />
            {product.contributers && product.contributers.length > 0 && (
              <Tab value={7} style={{ color: tabIndex === 7 ? "white" : "lightgray" }} label="Contributers" />
            )}
            <Tab value={8} style={{ color: tabIndex === 8 ? "white" : "lightgray" }} label="Product Dimensions" />
          </Tabs>
        </AppBar>
      </Paper>
      <GLTabPanel value={tabIndex} index={0} style={{ borderRadius: "0px 10px 10px 10px" }}>
        <div>
          <h2 className="m-0px mr-5px mt-1rem"> Description: </h2>
          <ReadMore width={1000} className="paragraph_font" pre={true} length={100}>
            {description}
          </ReadMore>
        </div>
      </GLTabPanel>
      {product?.name?.includes("Supreme") && (
        <GLTabPanel value={tabIndex} index={1} style={{ borderRadius: "0px 10px 10px 10px" }}>
          <div className="order-list responsive_table">
            <h2 className="ta-c w-100per jc-c">Supreme Sizing</h2>
            <p className="w-100per jc-c">
              {" "}
              <label className="jc-c title_font mr-10px">Hand Length:</label>{" "}
              <label>Measures from Base of Palm to Tip of the Middle Finger</label>
            </p>
            <p className="w-100per jc-c">
              <label className=" jc-c title_font mr-10px">Hand Width:</label>{" "}
              <label>Across the middle of the palm not including Thumb</label>
            </p>
            <p className="w-100per jc-c">
              <label className=" jc-c title_font mr-10px">Note:</label> <label>All Measurments are in inches</label>
            </p>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Hand Length</th>
                  <th>Hand Width</th>
                </tr>
              </thead>
              <tbody>
                {sizes(width, product.name).map(size => (
                  <tr
                    style={{
                      backgroundColor: "#d1d1d1",
                      fontSize: "16px",
                      height: "50px",
                      color: "#4d5061",
                    }}
                    key={size?.size}
                    className=""
                  >
                    <th style={{ width: "10px" }}>{size?.size}</th>
                    <th style={{ width: "10px" }}>{size?.hand_length}"</th>
                    <th style={{ width: "10px" }}>{size?.hand_width}"</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GLTabPanel>
      )}
      {product.chips && product.chips.length > 0 && (
        <GLTabPanel value={tabIndex} index={2}>
          {product.chips && product.chips.length > 0 && (
            <div className="mt-1rem">
              <h2 className="m-0px mr-5px"> Compatible Chips: </h2>
              <div className="h-100per paragraph_font ">
                <ul className="pl-2rem">
                  {product.chips
                    ? product.chips.map((chip, index) => {
                        return (
                          <li key={chip.name} className="paragraph_font" style={{ listStyleType: "disc" }}>
                            {chip.name}
                          </li>
                        );
                      })
                    : product.chips}
                </ul>
              </div>
            </div>
          )}
        </GLTabPanel>
      )}
      {manuals && manuals[product.category] && (
        <GLTabPanel value={tabIndex} index={3}>
          <div className="jc-b">
            <div className="mb-10px">
              <Link to={`/pages/menu/manuals`}>
                <GLButton variant="secondary">View All Manuals</GLButton>
              </Link>
            </div>
            <div className="mb-10px">
              <Link to={`https://www.glow-leds.com/collections/all/products/category${product.category}`}>
                <GLButton variant="secondary">View Available {toCapitalize(humanize(product.category))}</GLButton>
              </Link>
            </div>
            {product.category === "glowstringz" && (
              <div className="mb-10px">
                <a href={manuals[product.category].manual} download="Glowstringz V2 Manual">
                  <GLButton variant="secondary">>Download Manual</GLButton>
                </a>
              </div>
            )}
          </div>
          <h2
            style={{
              textAlign: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            {manuals[product.category].name}
          </h2>
          {manuals[product.category].manual && (
            <img src={manuals[product.category].manual} alt="manual" className="w-100per" />
          )}
          {manuals[product.category].manual && (
            <h2
              style={{
                textAlign: "center",
                width: "100%",
                justifyContent: "center",
              }}
            >
              Watch the Videos below to Learn More
            </h2>
          )}
          <div className="jc-c column m-0px">
            {manuals[product.category].videos.map(video => (
              <div key={video.title}>
                <h2
                  style={{
                    textAlign: "center",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  {video.title}
                </h2>
                <div className="iframe-container">
                  <iframe
                    width="996"
                    height="560"
                    title={video.title}
                    style={{ borderRadius: "20px" }}
                    src={`https://www.youtube.com/embed/${video.video}?mute=1&showinfo=0&rel=0&autoplay=0&loop=1`}
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen="1"
                  />
                </div>
              </div>
            ))}
          </div>
        </GLTabPanel>
      )}
      <GLTabPanel value={tabIndex} index={4} style={{ borderRadius: "10px 0px 10px 10px" }}>
        {!product.video ? (
          <h2
            style={{
              textAlign: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            Video Coming Soon!
          </h2>
        ) : (
          <div className="jc-c column m-0px">
            <h2
              style={{
                textAlign: "center",
                width: "100%",
                justifyContent: "center",
              }}
            >
              Watch the Video Below to Learn More
            </h2>
            <div className="iframe-container">
              <iframe
                width="996"
                height="560"
                title={product.name}
                style={{ borderRadius: "20px" }}
                src={`https://www.youtube.com/embed/${product.video}?mute=1&showinfo=0&rel=0&autoplay=1&loop=1`}
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen="1"
              />
            </div>
          </div>
        )}
        <div className="p-1rem">
          {/* {product.category === "glowskinz" && (
              <img
                className="colored_caps_images"
                src="https://images2.imgbox.com/d2/67/qjRp33SP_o.png"
                alt="Glowskinz Chip Compatibility"
                title="Glowskinz Chip Compatibility"
              />
            )} */}

          {(product.category === "diffuser_caps" || product.category === "mega_diffuser_caps") && (
            <div>
              <h2 className="ta-c">Get your favorite caps in all of these new colors</h2>
              <div className="colored_caps">
                <div className="colored_caps_item m-1rem">
                  <h3 className="colored_caps_images">Colored Caps</h3>
                  <img
                    className="colored_caps_images"
                    src="/images/optimized_images/product_page_images/img_2298_cropped_optimized.jpg"
                    alt="Colored Caps"
                    title="Colored Caps"
                  />
                </div>
                <div className="colored_caps_item m-1rem">
                  <h3 className="colored_caps_images">Colored Caps Under Blacklight</h3>
                  <img
                    className="colored_caps_images"
                    src="/images/optimized_images/product_page_images/img_2331_cropped_optimized.jpg"
                    alt="Colored Caps Under Blacklight"
                    title="Colored Caps Under Blacklight"
                  />
                </div>
              </div>
            </div>
          )}
          {product.category === "diffusers" && (
            <div>
              <h2 className="ta-c">Get your favorite caps in all of these new colors</h2>
              <div className="colored_caps">
                <div className="colored_caps_item m-1rem">
                  <h3 className="colored_caps_images">Colored Diffusers</h3>
                  <img
                    className="colored_caps_images"
                    src="https://thumbs2.imgbox.com/78/e1/DfIDjh1r_t.jpeg"
                    alt="Colored Caps"
                    title="Colored Caps"
                  />
                </div>
                <div className="colored_caps_item m-1rem">
                  <h3 className="colored_caps_images">Colored Diffusers No Light</h3>
                  <img
                    className="colored_caps_images"
                    src="https://thumbs2.imgbox.com/b9/5c/9jcxAh23_t.jpeg"
                    alt="Colored Caps Under Blacklight"
                    title="Colored Caps Under Blacklight"
                  />
                </div>
              </div>
            </div>
          )}
          {/* {(product.category === "diffuser_caps" ||
              product.category === "mega_diffuser_caps") && (
              <div className=" m-2rem  h-auto m-auto jc-c">
                <img
                  className="max-w-819px w-100per h-auto "
                  src="https://images2.imgbox.com/af/ba/QWR9I16I_o.png"
                  alt="Graphic Timeline"
                  title="Diffuser Cap and Mega Diffuser Cap Name Change Timeline"
                />
              </div>
            )} */}
        </div>
      </GLTabPanel>
      <GLTabPanel value={tabIndex} index={5}>
        <div className="content-margined p-10px">
          {!product.reviews.length && <div style={{ marginBottom: "10px" }}>Be the First to Review this Product</div>}
          <Reviews product={product} pathname={pathname} />
        </div>
      </GLTabPanel>

      <GLTabPanel value={tabIndex} index={6}>
        <div className="mt-1rem">
          <h2 className="m-0px mr-5px"> Included Items: </h2>
          <div className="h-100per paragraph_font">
            <ul className="pl-2rem">
              {included_items
                ? included_items.split("\n").map(line => {
                    return (
                      <li key={line} className="paragraph_font" style={{ listStyleType: "disc" }}>
                        {line}
                      </li>
                    );
                  })
                : included_items}
            </ul>
          </div>
        </div>
      </GLTabPanel>
      {product.contributers && product.contributers.length > 0 && (
        <GLTabPanel value={tabIndex} index={6}>
          {product.contributers && product.contributers.length > 0 && (
            <div className="mt-1rem">
              <h2 className="m-0px mr-5px">Contributers</h2>
              <div className="h-100per paragraph_font ">
                <ul className="pl-2rem">
                  {product.contributers
                    ? product.contributers.map((contributer, index) => {
                        return (
                          <li key={contributer.last_name} className="paragraph_font" style={{ listStyleType: "disc" }}>
                            {contributer.first_name} {contributer.last_name}
                          </li>
                        );
                      })
                    : product.contributers}
                </ul>
              </div>
            </div>
          )}
        </GLTabPanel>
      )}
      <GLTabPanel value={tabIndex} index={7}>
        {product.product_length && product.product_length && (
          <div className="mt-1rem">
            <h2 className="m-0px mr-5px"> Product Dimensions: </h2>
            <div className="h-100per paragraph_font">
              {product.name === "Coin Battery Storage"
                ? `${product.product_length} cm x ${product.product_width} cm x
											${product.product_height} cm`
                : product.name === "Glowstringz V2"
                ? `${product.product_length} m x ${product.product_width} m x
											${product.product_height} m`
                : `${product.product_length} mm x ${product.product_width} mm x
											${product.product_height} mm`}
            </div>
          </div>
        )}
      </GLTabPanel>
      {/* Add more tab panels here */}
    </div>
  );
};

export default ProductDetails;
