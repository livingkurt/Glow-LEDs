import HeaderDrawerButton from "./HeaderDrawerButton";
import ColumnTitle from "./ColumnTitle";

const HeaderColumn = ({ columns }) => {
  return (
    <>
      {columns?.map(column => (
        <div key={column._id} className="header-column">
          <ColumnTitle>{column.name.toUpperCase()}</ColumnTitle>
          <hr className="w-95per m-0px" />
          {column.rows.map(row => (
            <HeaderDrawerButton {...row} key={row._id} from="headerColumn" />
          ))}
        </div>
      ))}
    </>
  );
};

export default HeaderColumn;
