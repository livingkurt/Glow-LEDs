import { Link } from "react-router-dom";
import { GLButton } from "../../../../../shared/GlowLEDsComponents";
import { HashLink } from "react-router-hash-link";
import { useSelector } from "react-redux";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { toggleDropdown } from "../../../headerHelpers";

const HeaderDrawerButton = ({ path, name, id, permissions, extraContent, from }) => {
  const users = useSelector(state => state.users.userPage);
  const { current_user } = users;

  if (permissions && !permissions(current_user)) {
    return null;
  }
  return (
    <div className="header-drawer-button-container">
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
          className="header-drawer-button"
          onClick={() => {
            if (from === "headerColumn") {
              toggleDropdown({
                id,
                dropdownClass: `header-drawer`,
                toggleClass: `show-header-drawer`,
              });
            }
            if (from === "headerDrawer" || from === "headerSubDrawer") {
              toggleDropdown({
                id,
                dropdownClass: `header-subdrawer`,
                toggleClass: `show-header-subdrawer`,
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
