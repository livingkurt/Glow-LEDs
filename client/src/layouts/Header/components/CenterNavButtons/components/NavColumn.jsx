import { Link } from "react-router-dom";

import { GLButton } from "../../../../../shared/GlowLEDsComponents";
import DropdownButton from "./DropdownButton";
import Filter from "../../../../../shared/GlowLEDsComponents/GLTable/Filter";

const NavColumn = ({ columns, show_hide, chip_name, filterHandler, chips_list }) => {
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
          {chips_list && column.name === "Featured" && (
            <Filter
              title="Shop By Chip"
              width="100per"
              state={chip_name}
              filterHandler={filterHandler}
              filter_options={chips_list}
            />
          )}
          {column.rows.map(row => (
            <DropdownButton {...row} key={row._id} show_hide={show_hide} />
          ))}
        </div>
      ))}
    </>
  );
};

export default NavColumn;
