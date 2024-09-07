import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { detailsEventPage, selectOption, setCustomizedEvent, setIsAddonChecked } from "./eventPageSlice";
import { updateRecentlyViewed } from "./eventHelpers";

const useEventPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const urlParamsApplied = useRef(false);

  useEffect(() => {
    dispatch(detailsEventPage({ pathname: params.pathname }));
  }, [dispatch, params.pathname]);

  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;
  const eventPage = useSelector(state => state.events.eventPage);
  const { customizedEvent, eventPageLoading, event, isAddonChecked } = eventPage;

  useEffect(() => {
    updateRecentlyViewed(event);
  }, [event]);

  useEffect(() => {
    if (customizedEvent.currentOptions && !urlParamsApplied.current && !eventPageLoading) {
      const newSelectedOptions = [...customizedEvent.selectedOptions];
      let optionsChanged = false;
      let hasAddonSelected = false;

      customizedEvent.currentOptions.forEach((option, index) => {
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
        dispatch(setCustomizedEvent({ selectedOptions: newSelectedOptions }));

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
                option: customizedEvent.currentOptions[index],
                fromUrlParams: true,
              })
            );
          }
        });
      }

      urlParamsApplied.current = true;
    }
  }, [searchParams, customizedEvent.currentOptions, customizedEvent.selectedOptions, dispatch, eventPageLoading]);

  useEffect(() => {
    if (urlParamsApplied.current) {
      const newParams = new URLSearchParams();
      customizedEvent.selectedOptions?.forEach((selectedOption, index) => {
        if (selectedOption && selectedOption.name) {
          newParams.set(customizedEvent.currentOptions[index].name, selectedOption.name);
        }
      });

      const newSearch = newParams.toString();
      if (newSearch !== searchParams.toString()) {
        window.history.replaceState(null, "", `${window.location.pathname}?${newSearch}`);
      }
    }
  }, [customizedEvent.selectedOptions, customizedEvent.currentOptions, searchParams]);

  return { customizedEvent, current_user, my_cart, eventPageLoading, event, isAddonChecked };
};

export default useEventPage;
