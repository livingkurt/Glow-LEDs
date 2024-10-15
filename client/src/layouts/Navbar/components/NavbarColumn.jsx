import NavbarDrawerButton from "./NavbarDrawerButton";
import ColumnTitle from "./ColumnTitle";

const NavbarColumn = ({ columns }) => {
  return (
    <>
      {columns?.map((column, columnIndex) => (
        <div key={columnIndex} className="navbar-column">
          <ColumnTitle>{column.name.toUpperCase()}</ColumnTitle>
          <hr className="w-95per m-0px" />
          {column.rows.map((row, rowIndex) => (
            <NavbarDrawerButton {...row} key={rowIndex} from="navbarColumn" />
          ))}
        </div>
      ))}
    </>
  );
};

export default NavbarColumn;
