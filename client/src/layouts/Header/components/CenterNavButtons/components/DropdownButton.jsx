import { Link } from "react-router-dom";
import { GLButton } from "../../../../../shared/GlowLEDsComponents";
import { HashLink } from "react-router-hash-link";
import { useDispatch, useSelector } from "react-redux";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const DropdownButton = ({ path, name, id, updateDrawerColumnId, permissions, extraContent }) => {
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
        <GLButton className="nav-btn-dropdown" onClick={() => updateDrawerColumnId(id)} aria-label="Show">
          <PlayArrowIcon color="white" />
        </GLButton>
      )}
    </div>
  );
};

export default DropdownButton;
