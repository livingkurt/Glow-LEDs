import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { selectOption, setCustomizedProduct, setIsAddonChecked } from "./productPageSlice";
import { scrollToElement, updateRecentlyViewed } from "./productHelpers";
import { showInfo } from "../../slices/snackbarSlice";
import * as API from "../../api";

const useProductPage = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const urlParamsApplied = useRef(false);
  const [scrollTarget, setScrollTarget] = useState(null);

  useEffect(() => {
    // dispatch(detailsProductPage({ pathname: params.pathname }));
    dispatch(API.getBasicProductDetails(params.pathname));
    dispatch(API.getProductOptions(params.pathname));
    dispatch(API.getProductFeatures(params.pathname));
    dispatch(API.getRelatedProducts(params.pathname));
    dispatch(API.getProductReviews(params.pathname));
  }, [dispatch, params.pathname]);

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;
  const productPage = useSelector(state => state.products.productPage);
  const { customizedProduct, productPageLoading, product, isAddonChecked } = productPage;
  console.log({ customizedProduct });

  useEffect(() => {
    updateRecentlyViewed(product);
  }, [product]);

  useEffect(() => {
    if (customizedProduct.currentOptions && !urlParamsApplied.current && !productPageLoading) {
      const searchParams = new URLSearchParams(location.search);
      const newSelectedOptions = [...customizedProduct.selectedOptions];
      let optionsChanged = false;
      let hasAddonSelected = false;

      customizedProduct.currentOptions.forEach((option, index) => {
        const paramValue = searchParams.get(option.name);
        if (paramValue) {
          const selectedOption = option.values.find(value => value.name === paramValue);
          if (selectedOption) {
            newSelectedOptions[index] = selectedOption;
            optionsChanged = true;
            if (option.isAddOn) {
              hasAddonSelected = true;
            }
          }
        }
      });

      if (optionsChanged) {
        dispatch(setCustomizedProduct({ selectedOptions: newSelectedOptions }));

        if (hasAddonSelected) {
          dispatch(setIsAddonChecked(true));
        }

        newSelectedOptions.forEach((selectedOption, index) => {
          if (selectedOption && selectedOption.name) {
            dispatch(
              selectOption({
                index,
                selectedOption,
                option: customizedProduct.currentOptions[index],
                fromUrlParams: true,
              })
            );
          }
        });
      }

      urlParamsApplied.current = true;
    }
  }, [
    location.search,
    customizedProduct.currentOptions,
    customizedProduct.selectedOptions,
    dispatch,
    productPageLoading,
  ]);

  useEffect(() => {
    if (urlParamsApplied.current) {
      const searchParams = new URLSearchParams(location.search);
      customizedProduct.selectedOptions?.forEach((selectedOption, index) => {
        if (selectedOption && selectedOption.name) {
          searchParams.set(customizedProduct.currentOptions[index].name, selectedOption.name);
        }
      });

      const newSearch = searchParams.toString();
      const [pathname, hash] = location.pathname.split("#");
      const newUrl = `${pathname}${newSearch ? `?${newSearch}` : ""}${hash ? `#${hash}` : ""}`;

      if (newUrl !== window.location.pathname + window.location.search + window.location.hash) {
        window.history.replaceState(null, "", newUrl);
      }
    }
  }, [customizedProduct.selectedOptions, customizedProduct.currentOptions, location]);

  useEffect(() => {
    if (location.hash && !productPageLoading) {
      setScrollTarget(location.hash.slice(1));
    }
  }, [location.hash, productPageLoading]);

  useEffect(() => {
    if (scrollTarget && !productPageLoading) {
      setTimeout(() => {
        scrollToElement(scrollTarget);
        setScrollTarget(null);
      }, 500);
    }
  }, [scrollTarget, productPageLoading]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    if (code) {
      sessionStorage.setItem("promo_code", code);
      dispatch(showInfo({ message: `Code ${code.toUpperCase()} Added to Checkout` }));
    }
  }, [dispatch]);

  return { customizedProduct, current_user, my_cart, productPageLoading, product, isAddonChecked };
};

export default useProductPage;
