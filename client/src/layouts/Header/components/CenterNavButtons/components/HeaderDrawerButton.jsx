import { Link } from "react-router-dom";
import { GLButton } from "../../../../../shared/GlowLEDsComponents";
import { HashLink } from "react-router-hash-link";
import { useDispatch, useSelector } from "react-redux";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { toggleDropdown } from "../../../headerHelpers";

const HeaderDrawerButton = ({ path, name, id, permissions, extraContent, from }) => {
  const users = useSelector(state => state.users.userPage);
  const { current_user } = users;

  if (permissions && !permissions(current_user)) {
    return null;
  }
  return (
    <div className="nav-btn-container">
      {path.includes("#") ? (
        <HashLink to={path} className="w-100per">
          <GLButton variant="nav" className="ta-l" fullWidth>
            {name} {extraContent}
          </GLButton>
        </HashLink>
      ) : (
        <Link to={path} className="w-100per">
          <GLButton variant="nav" className="ta-l" fullWidth>
            {name} {extraContent}
          </GLButton>
        </Link>
      )}
      {id && (
        <GLButton
          className="nav-btn-dropdown"
          onClick={() => {
            if (from === "navColumn") {
              toggleDropdown({
                id,
                dropdownClass: `nav-dropdown-subcategory-content`,
                toggleClass: `show-dropdown`,
              });
            }
            if (from === "drawerItem" || from === "subHeaderDrawer") {
              toggleDropdown({
                id,
                dropdownClass: `nav-dropdown-nested-content`,
                toggleClass: `show-dropdown-nested`,
              });
            }
          }}
          aria-label="Show"
        >
          <PlayArrowIcon color="white" />
        </GLButton>
      )}
    </div>
  );
};

export default HeaderDrawerButton;
