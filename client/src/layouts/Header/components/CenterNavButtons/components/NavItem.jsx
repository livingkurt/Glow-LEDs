import { Link } from "react-router-dom";
import { GLButton } from "../../../../../shared/GlowLEDsComponents";

const NavItem = ({ item, children }) => (
  <div className="dropdown-nav">
    <Link to={item.path} aria-label={item.ariaLabel}>
      <GLButton variant="nav" classNameclassName="ta-l" data-testid={item.dataTestId}>
        {item.name}
      </GLButton>
    </Link>
    {children}
  </div>
);

export default NavItem;
