import { Outlet, Link } from "react-router-dom";

const Learn = () => {
  return (
    <div>
      <h2>Learn</h2>
      <nav>
        <ul>
          <li>
            <Link to="topic1">Topic 1</Link>
          </li>
          <li>
            <Link to="topic2">Topic 2</Link>
          </li>
        </ul>
      </nav>
      <hr />
      {/* The nested route content will show up here */}
      <Outlet />
    </div>
  );
};

export default Learn;
