import { GLButton } from "../../../shared/GlowLEDsComponents";
import { useSelector } from "react-redux";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ColumnItemButton from "./ColumnItemButton";
import { toggleDropdown } from "../navbarHelpers";
import useFeatureFlags from "../../../shared/Hooks/useFeatureFlags";

const NavbarDrawerButton = ({ path, name, id, permissions, extraContent, from, feature }) => {
  const users = useSelector(state => state.users.userPage);
  const { current_user } = users;
  const activeFlags = useFeatureFlags();

  if (permissions && !permissions(current_user)) {
    return null;
  }
  if (feature && !activeFlags.includes(feature)) {
    return null;
  }
  return (
    <div className="navbar-drawer-button-container">
      <ColumnItemButton to={path} hasColumnRows={id}>
        {name} {extraContent}
      </ColumnItemButton>
      {id && (
        <GLButton
          className="navbar-drawer-button"
          onClick={() => {
            if (from === "navbarColumn") {
              toggleDropdown({
                id,
                dropdownClass: `navbar-drawer`,
                toggleClass: `show-navbar-drawer`,
              });
            }
            if (from === "navbarDrawer" || from === "navbarSubDrawer") {
              toggleDropdown({
                id,
                dropdownClass: `navbar-subdrawer`,
                toggleClass: `show-navbar-subdrawer`,
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

export default NavbarDrawerButton;
