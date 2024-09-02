import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { detailsProductPage, selectOption, setCustomizedProduct, setIsAddonChecked } from "./productPageSlice";
import { updateRecentlyViewed } from "./productHelpers";

const useProductPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const urlParamsApplied = useRef(false);

  useEffect(() => {
    dispatch(detailsProductPage({ pathname: params.pathname }));
  }, [dispatch, params.pathname]);

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;
  const productPage = useSelector(state => state.products.productPage);
  const { customizedProduct, productPageLoading, product, isAddonChecked } = productPage;

  useEffect(() => {
    updateRecentlyViewed(product);
  }, [product]);

  useEffect(() => {
    if (customizedProduct.currentOptions && !urlParamsApplied.current && !productPageLoading) {
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

        // Set isAddonChecked if an add-on option is selected
        if (hasAddonSelected) {
          dispatch(setIsAddonChecked(true));
        }

        // Apply each option individually to trigger necessary updates
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
  }, [searchParams, customizedProduct.currentOptions, customizedProduct.selectedOptions, dispatch, productPageLoading]);

  useEffect(() => {
    if (urlParamsApplied.current) {
      const newParams = new URLSearchParams();
      customizedProduct.selectedOptions?.forEach((selectedOption, index) => {
        if (selectedOption && selectedOption.name) {
          newParams.set(customizedProduct.currentOptions[index].name, selectedOption.name);
        }
      });

      const newSearch = newParams.toString();
      if (newSearch !== searchParams.toString()) {
        window.history.replaceState(null, "", `${window.location.pathname}?${newSearch}`);
      }
    }
  }, [customizedProduct.selectedOptions, customizedProduct.currentOptions, searchParams]);

  return { customizedProduct, current_user, my_cart, productPageLoading, product, isAddonChecked };
};

export default useProductPage;
