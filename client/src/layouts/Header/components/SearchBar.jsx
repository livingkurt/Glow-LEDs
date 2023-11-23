import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDisplay, set_options, set_search } from "../../../slices/settingSlice";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import { Search } from "@mui/icons-material";
import { API_Products } from "../../../utils";
import { set_loading } from "../../../slices/affiliateSlice";
import { humanize } from "../../../utils/helper_functions";
import { categories, subcategories } from "../../../utils/helper_functions";
import useWindowDimensions from "../../../shared/Hooks/useWindowDimensions";

const SearchBar = () => {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const settingPage = useSelector(state => state.settings);
  const { show_search_bar, options, pathname, search, display } = settingPage;

  const { width } = useWindowDimensions();

  useEffect(() => {
    let clean = true;
    if (clean) {
      findAllGrid_products_a();
    }
    return () => (clean = false);
  }, []);

  const submitHandler = e => {
    e.preventDefault();

    navigate("/collections/all/products?search=" + search);
  };

  const update_list = product => {
    dispatch(set_search(product));
    dispatch(setDisplay(false));
    navigate("/collections/all/products?search=" + product);
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      dispatch(setDisplay(false));
    }
  };

  const findAllGrid_products_a = async () => {
    dispatch(set_loading(true));
    const { data } = await API_Products.findAllGrid_products_a();

    const newOptions = [
      ...options,
      ...categories.map(category => {
        return { name: humanize(category) };
      }),
      ...subcategories.map(category => {
        return { name: humanize(category) };
      }),
      ...data.products.filter(product => !product.option).filter(product => !product.hidden),
    ];
    dispatch(set_options(newOptions));
    dispatch(set_loading(false));
  };

  return (
    <div>
      {show_search_bar && (
        <form
          onSubmit={submitHandler}
          className={`max-w-900px m-auto p-10px ph-20px br-10px w-100per mt-${width < 1107 ? "15px" : "5px"} jc-c`}
          style={{ display: pathname === "/" ? "none" : "flex" }}
        >
          <div className="jc-b ai-c search_container w-100per max-w-600px">
            <div ref={wrapperRef} className="flex-container flex-column pos-rel w-100per max-w-600px">
              <input
                id="auto"
                autoComplete="off"
                onClick={() => dispatch(setDisplay(true))}
                className="form_input search mv-0px w-100per fs-16px"
                placeholder="Find Your Glow Here"
                value={search}
                onChange={e => dispatch(set_search(e.target.value))}
              />
              {display && (
                <div className="pos-abs bg-primary br-10px z-pos-10 w-100per max-w-600px">
                  {options
                    .filter(({ name }) => name.toLowerCase().indexOf(search.toLowerCase()) > -1)
                    .slice(0, 20)
                    .map((value, i) => {
                      return (
                        <div
                          onClick={() => update_list(value.name)}
                          className="auto-option ai-c jc-b  p-5px z-pos-10"
                          key={i}
                          tabIndex="0"
                        >
                          <span className="fs-16px " style={{ color: "white" }}>
                            {value.name}
                          </span>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            <GLButton type="submit" variant="primary" className="w-50px mb-0px">
              <Search />
            </GLButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default SearchBar;
