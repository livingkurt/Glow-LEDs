import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { format_date } from "../../utils/helper_functions";
import { Loading, Notification } from "../../shared/SharedComponents";
import { listUsers, deleteUser } from "../../actions/userActions";
import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import Search from "../../shared/GlowLEDsComponents/GLTable/Search";
import Sort from "../../shared/GlowLEDsComponents/GLTable/Sort";

const UsersPage = props => {
  const [search, set_search] = useState("");
  const [sort, setSortOrder] = useState("");
  const category = props.match.params.category ? props.match.params.category : "";
  const userList = useSelector(state => state.userList);
  const { loading, users, message, error } = userList;

  const userDelete = useSelector(state => state.userDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = userDelete;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(listUsers({}));
    }
    return () => (clean = false);
  }, [successDelete]);

  const deleteHandler = user => {
    dispatch(deleteUser(user._id));
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(listUsers({ category, search, sort }));
  };

  const sortHandler = e => {
    setSortOrder(e.target.value);
    dispatch(listUsers({ category, search, sort: e.target.value }));
  };

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(listUsers({ category, search, sort }));
    }
    return () => (clean = false);
  }, [sort]);

  const colors = [
    { name: "Not Verified", color: "#333333" },
    { name: "Verified", color: "#3e4c6d" },
    { name: "Admin", color: "#525252" },
    { name: "Affiliated", color: "#7d5555" },
    { name: "Guest", color: "#3e6d6b" },
    { name: "Employee", color: "#557d68" }
  ];

  const determine_color = user => {
    let result = "";
    if (!user.isVerified) {
      result = colors[0].color;
    }
    if (user.isVerified) {
      result = colors[1].color;
    }
    if (user.guest) {
      result = colors[4].color;
    }
    if (user.is_affiliated) {
      result = colors[3].color;
    }
    if (user.is_employee) {
      result = colors[5].color;
    }
    if (user.isAdmin) {
      result = colors[2].color;
    }
    //
    return result;
  };

  const sort_options = ["Date", "First Name", "Last Name"];

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Users | Glow LEDs</title>
      </Helmet>
      <Notification message={message} />
      <div className="wrap jc-b">
        {colors.map((color, index) => {
          return (
            <div className="wrap jc-b w-20rem m-1rem" key={index}>
              <label style={{ marginRight: "1rem" }}>{color.name}</label>
              <div
                style={{
                  backgroundColor: color.color,
                  height: "20px",
                  width: "60px",
                  borderRadius: "5px"
                }}
              />
            </div>
          );
        })}
        <Link to="/secure/glow/edituser">
          <GLButton variant="primary" style={{ width: "160px" }}>
            Create User
          </GLButton>
        </Link>
      </div>
      <div className="order-header">
        <h1
          style={{
            textAlign: "center",
            width: "100%",
            margin: "20px auto",
            justifyContent: "center"
          }}
        >
          Users
        </h1>
      </div>

      <div className="search_and_sort row jc-c ai-c" style={{ overflowX: "scroll" }}>
        <Search search={search} set_search={set_search} submitHandler={submitHandler} category={category} />
        <Sort sortHandler={sortHandler} sort_options={sort_options} />
      </div>
      <Loading loading={loading} error={error}>
        {users && (
          <div className="order-list responsive_table">
            <table className="table">
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th>DATE</th>
                  <th>FIRST</th>
                  <th>LAST</th>
                  <th>EMAIL</th>
                  <th>Guest</th>
                  <th>Affiliated</th>
                  {/* <th>VERIFIED</th> */}
                  {/* <th>ADMIN</th> */}
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: determine_color(user)
                    }}
                  >
                    {/* <td className="p-10px">{user._id}</td> */}
                    <td className="p-10px">{format_date(user.createdAt)}</td>
                    <td className="p-10px">{user.first_name}</td>
                    <td className="p-10px">{user.last_name}</td>
                    <td className="p-10px">{user.email}</td>
                    {/* <td className="p-10px">{user.affiliate}</td> */}
                    <td className="p-10px">{user.guest ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}</td>
                    <td className="p-10px">
                      {user.is_affiliated ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                    </td>
                    <td className="p-10px">
                      {user.is_affiliated ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                    </td>
                    {/* <td className="p-10px">
                      {user.isVerified ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                    </td>
                    <td className="p-10px">
                      {user.isAdmin ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                    </td> */}
                    <td className="p-10px">
                      <div className="jc-b">
                        <Link to={"/secure/glow/edituser/" + user._id}>
                          <GLButton variant="icon" aria-label="Edit">
                            <i className="fas fa-info-circle" />
                          </GLButton>
                        </Link>
                        <Link to={"/secure/glow/userprofile/" + user._id}>
                          <GLButton variant="icon" aria-label="view">
                            <i className="fas fa-mountain" />
                          </GLButton>
                        </Link>
                        <GLButton variant="icon" onClick={() => deleteHandler(user)} aria-label="Delete">
                          <i className="fas fa-trash-alt" />
                        </GLButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Loading>
    </div>
  );
};
export default UsersPage;
