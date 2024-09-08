import HeaderDrawerButton from "./HeaderDrawerButton";
import ColumnTitle from "./ColumnTitle";

const HeaderColumn = ({ columns }) => {
  return (
    <>
      {columns?.map((column, columnIndex) => (
        <div key={columnIndex} className="header-column">
          <ColumnTitle>{column.name.toUpperCase()}</ColumnTitle>
          <hr className="w-95per m-0px" />
          {column.rows.map((row, rowIndex) => (
            <HeaderDrawerButton {...row} key={rowIndex} from="headerColumn" />
          ))}
        </div>
      ))}
    </>
  );
};

export default HeaderColumn;
