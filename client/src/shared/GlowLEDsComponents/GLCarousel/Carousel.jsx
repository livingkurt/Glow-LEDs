import React, { useEffect, useState } from "react";
import CarouselItem from "./CarouselItem";
import { Loading } from "../../SharedComponents";
import useWindowDimensions from "../../Hooks/windowDimensions";
import { API_Products } from "../../../utils";
import { shuffle } from "../../../utils/helper_functions";
import { browser_check, mobile_check } from "../../../utils/react_helper_functions";
import Overflow from "react-overflow-indicator";
import { GLButton } from "..";
import { ProductItemD } from "../../../pages/ProductsGridPage/components";

const Carousel = ({ title, category, random, add_to_cart, product_pathname }) => {
  const { height, width } = useWindowDimensions();

  const [products, set_products] = useState([]);
  const [loading, set_loading] = useState(false);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (category) {
        get_products(category);
      } else {
        get_products("all");
      }
    }
    return () => (clean = false);
  }, [category]);

  const get_products = async category => {
    set_loading(true);
    const { data } = await API_Products.findAllGrid_products_a({ category });

    set_products(typeof data === "object" && data.products.filter(product => product.pathname !== product_pathname));
    if (random) {
      set_products(
        typeof data === "object" && shuffle(data.products.filter(product => product.pathname !== product_pathname))
      );
    }
    set_loading(false);
  };

  const [product_number, set_product_number] = useState(0);
  const [number_of_items, set_number_of_items] = useState(5);

  const move_left = () => {
    if (product_number !== 0) {
      set_product_number(product_number => {
        return product_number - 1;
      });
    }
  };
  const move_right = () => {
    if (product_number !== products.filter(product => product.hidden === false).length - 5) {
      set_product_number(product_number => {
        return product_number + 1;
      });
    }
  };

  const handleWindowResize = () => {
    if (width > 1530) {
      set_number_of_items(5);
    } else if (width > 1137 && width < 1529) {
      set_number_of_items(4);
    } else if (width > 911 && width < 1136) {
      set_number_of_items(3);
    } else if (width > 646 && width < 910) {
      set_number_of_items(2);
    } else if (width < 645) {
      set_number_of_items(1);
    }
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      handleWindowResize();
    }
    return () => (clean = false);
  }, [width]);

  const [canScroll, setCanScroll] = useState(false);

  return (
    <div className="mh-10px">
      {products.length > 0 && (
        <div>
          <h2 className="jc-c w-100per ta-c">{title}</h2>

          <Loading loading={loading}>
            {products &&
              (browser_check() !== "safari" ? (
                <div className="row p-10px" style={{ overflowX: "scroll" }}>
                  <div className="row jc-b w-100per">
                    <div className="ai-c">
                      <GLButton
                        style={{ borderRadius: "50%" }}
                        variant="icon"
                        className="h-59px"
                        onClick={() => move_left()}
                        aria-label="Previous"
                      >
                        <i className="fas fa-arrow-circle-left fs-40px" />
                      </GLButton>
                    </div>
                    {[...Array(number_of_items).keys()].map(x => (
                      <div className="w-259px" key={product_number + x}>
                        <CarouselItem
                          key={product_number + x}
                          size="175px"
                          add_to_cart={add_to_cart}
                          product={
                            products &&
                            products.filter(product => !product.option).filter(product => product.hidden === false)[
                              product_number + x
                            ]
                          }
                          style={{ listStyleType: "none" }}
                        />
                      </div>
                    ))}
                    <div className="ai-c">
                      <GLButton
                        style={{ borderRadius: "50%" }}
                        variant="icon"
                        className="h-59px"
                        onClick={() => move_right()}
                        aria-label="Next"
                      >
                        <i className="fas fa-arrow-circle-right fs-40px" />
                      </GLButton>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="pos-rel">
                  <Overflow onStateChange={state => setCanScroll(state.canScroll.right)}>
                    <Overflow.Content>
                      <div className="row p-10px overflow-s">
                        {products.map((item, index) => (
                          <ProductItemD
                            key={index}
                            size="175px"
                            product={item}
                            style={{ marginRight: 20, listStyleType: "none" }}
                          />
                        ))}
                      </div>
                    </Overflow.Content>
                  </Overflow>
                  {canScroll && (
                    <div className="pos-abs right-0px top-80px bob br-5px ta-c ai-c bg-primary h-25per w-23px box-s-d b-1px">
                      <i className="fas fa-sort-up fs-20px" style={{ WebkitTransform: "rotate(90deg)" }} />
                    </div>
                  )}
                </div>
              ))}
          </Loading>
        </div>
      )}
    </div>
  );
};

export default Carousel;
