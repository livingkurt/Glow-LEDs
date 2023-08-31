import { Link } from "react-router-dom";

import { GLButton } from "../../../GlowLEDsComponents";
import DropdownButton from "./DropdownButton";
import Filter from "../../../GlowLEDsComponents/GLTable/Filter";

const NavColumn = ({ columns, show_hide, chip_name, filterHandler, chips_list }) => {
  return (
    <>
      {columns?.map(column => (
        <div key={column._id} className="nav-column">
          <Link to={column.path}>
            <GLButton variant={column.variant} className={column.className}>
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
            <DropdownButton {...row} show_hide={show_hide} />
          ))}
        </div>
      ))}
    </>
  );
};

export default NavColumn;
