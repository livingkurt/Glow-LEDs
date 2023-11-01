import { Link, useNavigate } from "react-router-dom";

import { GLButton } from "../../../../../shared/GlowLEDsComponents";
import DropdownButton from "./DropdownButton";
import Filter from "../../../../../shared/GlowLEDsComponents/GLTable/Filter";
import { setOpenDrawerColumnId, set_chip_name } from "../../../../../slices/settingSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as API from "../../../../../api";
import { update_products_url } from "../../../../../utils/helper_functions";

const NavColumn = ({ columns }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const settingPage = useSelector(state => state.settings);
  const { drawerColumnId, chip_name } = settingPage;

  const chipPage = useSelector(state => state.chips);
  const { chips } = chipPage;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listChips({}));
    }
    return () => (clean = false);
  }, [dispatch]);

  const updateDrawerColumnId = newId => {
    if (drawerColumnId === newId) {
      dispatch(setOpenDrawerColumnId(null));
      return;
    }
    dispatch(setOpenDrawerColumnId(null));
    setTimeout(() => {
      dispatch(setOpenDrawerColumnId(newId));
    }, 300);
  };
  const filterHandler = e => {
    const chip_selected = JSON.parse(e.target.value);
    update_products_url(navigate, "", "", chip_selected.name, "", "0", "/collections/all/products");
    dispatch(
      API.listProducts({
        chip: chip_selected._id,
        hidden: false,
      })
    );
    dispatch(set_chip_name({}));
  };

  return (
    <>
      {columns?.map((column, index) => (
        <div key={column._id} className="nav-column">
          <Link to={column.path}>
            <GLButton variant="nav" className="ta-l title_font w-100per fs-18px">
              {column.name}
            </GLButton>
          </Link>
          <hr className="w-95per m-0px" />
          {chips && column.name === "Featured" && (
            <Filter
              title="Shop By Chip"
              width="100per"
              state={chip_name}
              filterHandler={filterHandler}
              filter_options={chips}
            />
          )}
          {column.rows.map(row => (
            <DropdownButton {...row} key={row._id} updateDrawerColumnId={updateDrawerColumnId} />
          ))}
        </div>
      ))}
    </>
  );
};

export default NavColumn;
