import { Link } from "react-router-dom";

import { GLButton } from "../../../GlowLEDsComponents";
import DropdownButton from "./DropdownButton";

const NavColumn = ({ columns, show_hide }) => {
  return (
    <>
      {columns?.map(column => (
        <div key={column.name} className="nav-column">
          <Link to={column.path}>
            <GLButton variant={column.variant} className={column.className}>
              {column.name}
            </GLButton>
          </Link>
          <hr className="w-95per m-0px" />
          {column.rows.map(row => (
            <DropdownButton {...row} show_hide={show_hide} />
          ))}
        </div>
      ))}
    </>
  );
};

export default NavColumn;
