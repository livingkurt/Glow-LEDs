import { GLButton } from "../../../shared/GlowLEDsComponents";
import { useSelector } from "react-redux";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ColumnItemButton from "./ColumnItemButton";
import { toggleDropdown } from "../headerHelpers";
import useFeatureFlags from "../../../shared/Hooks/useFeatureFlags";

const HeaderDrawerButton = ({ path, name, id, permissions, extraContent, from, feature }) => {
  const users = useSelector(state => state.users.userPage);
  const { current_user } = users;
  const activeFlags = useFeatureFlags();

  if (permissions && !permissions(current_user)) {
    return null;
  }
  console.log({ activeFlags, feature });
  if (feature && !activeFlags.includes(feature)) {
    return null;
  }
  return (
    <div className="header-drawer-button-container">
      <ColumnItemButton to={path} hasColumnRows={id}>
        {name} {extraContent}
      </ColumnItemButton>
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
