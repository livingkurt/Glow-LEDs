import { useNavigate } from "react-router-dom";

import HeaderDrawerButton from "./HeaderDrawerButton";
import Filter from "../../../../../shared/GlowLEDsComponents/GLTable/Filter";
import { useDispatch, useSelector } from "react-redux";
import { set_chip_name } from "../../../../../slices/glowLedsSlice";
import { update_products_url } from "../../../../../utils/helper_functions";
import * as API from "../../../../../api";
import ColumnTitle from "./ColumnTitle";

const HeaderColumn = ({ columns }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const glowLeds = useSelector(state => state.glowLeds);
  const { chip_name } = glowLeds;

  const chipPage = useSelector(state => state.chips.chipPage);
  const { chips } = chipPage;

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
      {columns?.map(column => (
        <div key={column._id} className="header-column">
          <ColumnTitle>{column.name.toUpperCase()}</ColumnTitle>
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
            <HeaderDrawerButton {...row} key={row._id} from="headerColumn" />
          ))}
        </div>
      ))}
    </>
  );
};

export default HeaderColumn;
