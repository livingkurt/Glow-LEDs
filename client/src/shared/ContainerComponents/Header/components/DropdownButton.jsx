import { Link } from "react-router-dom";
import { GLButton } from "../../../GlowLEDsComponents";
import { HashLink } from "react-router-hash-link";
import { useSelector } from "react-redux";

const ButtonWithDropdown = ({ path, variant, className, name, id, show_hide, permissions, extraContent }) => {
  const users = useSelector(state => state.users.userPage);
  const { current_user } = users;
  if (permissions && !permissions(current_user)) {
    return null;
  }
  return (
    <div className="nav-btn-container">
      {path.includes("#") ? (
        <HashLink to={path} className="w-100per">
          <GLButton variant={variant} className={className} fullWidth>
            {name} {extraContent}
          </GLButton>
        </HashLink>
      ) : (
        <Link to={path} className="w-100per">
          <GLButton variant={variant} className={className} fullWidth>
            {name} {extraContent}
          </GLButton>
        </Link>
      )}
      {id && (
        <GLButton className="nav-btn-dropdown" onClick={() => show_hide(id)} aria-label="Show">
          <i className="fas fa-sort-up" />
        </GLButton>
      )}
    </div>
  );
};

export default ButtonWithDropdown;
