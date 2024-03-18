import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../../shared/SharedComponents";
import useWindowDimensions from "../../shared/Hooks/useWindowDimensions";
import { ProductDetails, ProductFacts, ProductImages, ProductOptions, ProductSelection } from "./components";
import { GLButton } from "../../shared/GlowLEDsComponents";
import ProductSlideshow from "../../shared/GlowLEDsComponents/GLCarousel/ProductSlideshow copy";
import PictureChooser from "./components/PictureChooser";
import RelatedProductsSlideshow from "../../shared/GlowLEDsComponents/GLCarousel/RelatedProductsSlideshow";
import { openEditProductModal } from "../ProductsPage/productsPageSlice";
import * as API from "../../api";
import { set_image, unset_state } from "./productPageSlice";
import ProductPageHead from "./components/ProductPageHead";
import { normalizeProductPage, updateRecentlyViewed } from "./productHelpers";
import ProductPageSkeleton from "./components/ProductPageSkeleton";
import { EditProductModal } from "../ProductsPage/components";

const ProductPage = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const productPage = useSelector(state => state.products.productPage);
  const { name, images, image, secondary_image, secondary_images } = productPage;
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const cartPage = useSelector(state => state.carts.cartPage);
  const { loadingAddToCart } = cartPage;

  const productsPage = useSelector(state => state.products.productsPage);
  const { product, loading, error } = productsPage;

  const { width } = useWindowDimensions();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.detailsProduct({ pathname: params.pathname }));
    }
    return () => {
      dispatch(unset_state());
      clean = false;
    };
  }, [dispatch, params.pathname]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (product) {
        normalizeProductPage({ product, dispatch, current_user });
      }
    }
    return () => {
      clean = false;
    };
  }, [dispatch, product]);

  useEffect(() => {
    let clean = true;
    if (clean) {
      updateRecentlyViewed(product);
    }
    return () => (clean = false);
  }, [product]);

  return (
    product?.hasOwnProperty("name") && (
      <div className="">
        <div className="p-1rem">
          <div className="jc-b">
            <div className="mb-10px">
              <Link to={location.state?.prevPath || "/collections/all/products"} className="m-auto">
                <GLButton variant="secondary">Back to Products</GLButton>
              </Link>
            </div>
            {current_user?.isAdmin && (
              <div className="br-10px">
                <GLButton variant="secondary" className=" w-300px" onClick={e => dispatch(openEditProductModal())}>
                  Edit Product
                </GLButton>
              </div>
            )}
          </div>
        </div>

        <Loading loading={loading} error={error} />
        <Loading loading={loadingAddToCart} />
        <EditProductModal />
        {loading && <ProductPageSkeleton />}
        {!loading && product && (
          <div className="">
            <ProductPageHead />
            {!secondary_image && width <= 819 && (
              <div>
                <h1 className="product_title_side ta-c lh-50px fs-25px mv-0px">{name}</h1>
                <div className=" w-100per h-auto m-auto br-20px pos-rel" style={{ overflowX: "hidden" }}>
                  {images && (
                    <ProductSlideshow
                      product={product}
                      images={images}
                      secondary_images={secondary_images}
                      className=""
                      set_image={set_image}
                      interval={6000}
                      transitionTime={200}
                    />
                  )}
                </div>
              </div>
            )}
            <div className="details">
              <div className="">
                {(secondary_image || width > 819) && (
                  <div>
                    <label
                      className="product_title_top fs-25px title_font mb-2rem ta-c lh-50px"
                      style={{ display: width < 819 ? "block" : "none" }}
                    >
                      {name}
                    </label>
                    <div className="details-image">
                      <ProductImages secondary_image={secondary_image} name={name} image={image} />
                      {!secondary_image && width > 819 && (
                        <div>
                          <PictureChooser
                            product={product}
                            images={images}
                            secondary_images={secondary_images}
                            className="w-100per jc-c max-w-400px m-auto"
                            set_image={set_image}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {width < 500 &&
                product &&
                (product.category === "diffusers" ||
                  product.category === "diffuser_caps" ||
                  product.category === "exo_diffusers") && (
                  <div className=" w-100per m-auto">
                    <RelatedProductsSlideshow
                      product_category={"glowskinz"}
                      product_subcategory={"opyn"}
                      product={product}
                      random={false}
                      className=""
                      product_pathname={product.pathname}
                      title="Pairs great with OPYN Glowskinz"
                      category="opyn"
                    />
                  </div>
                )}
              <div className="details-info desktop_product_view" style={{ display: width > 819 ? "block" : "none" }}>
                <ProductSelection />
              </div>
              <div className="details-action desktop_product_view" style={{ display: width > 819 ? "block" : "none" }}>
                <ProductOptions />
              </div>

              <div className="w-100per">
                <div
                  className="details-action mobile_product_view"
                  style={{ display: width <= 819 ? "block" : "none" }}
                >
                  <ProductOptions />
                </div>
                <div className="details-info mobile_product_view" style={{ display: width <= 819 ? "block" : "none" }}>
                  <ProductFacts />
                </div>
              </div>
            </div>

            <ProductDetails />
          </div>
        )}
        {/* {!loading && product && product.name !== "Glowstringz V2" && product.name !== "Nova Clip" && (
          <div className=" w-100per m-auto">
            <RelatedProductsSlideshow
              product_category={product.category}
              product={product}
              random={false}
              className=""
              product_pathname={params.pathname}
              title="Fits the Same Microlight"
              category="chips"
            />
          </div>
        )}
        {!loading && product && product.name !== "Glowstringz V2" && product.name !== "Nova Clip" && (
          <div className=" w-100per m-auto">
            <RelatedProductsSlideshow
              product_category={product.category}
              random={false}
              className=""
              product_pathname={params.pathname}
              title="Related Products"
              category="related"
            />
          </div>
        )}
        {!loading &&
          product &&
          product.category !== "batteries" &&
          product.name !== "Glowstringz V2" &&
          product.name !== "Nova Clip" && (
            <div className=" w-100per m-auto">
              <RelatedProductsSlideshow
                product_category={product.category}
                random={false}
                className=""
                product_pathname={params.pathname}
                title="Accessories You May Need"
                category="batteries"
              />
            </div>
          )}

        {!loading && product && (
          <div className=" w-100per m-auto">
            <RelatedProductsSlideshow
              product_category={product.category}
              random={true}
              className=""
              product_pathname={params.pathname}
              title="Suggested Products"
              category="all"
            />
          </div>
        )} */}
      </div>
    )
  );
};
export default ProductPage;
