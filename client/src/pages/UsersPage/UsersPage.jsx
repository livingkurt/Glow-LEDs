import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_combine_users_modal, open_create_user_modal, open_edit_user_modal } from "../../slices/userSlice";
import { CombineUsersModal, EditUserModal } from "./components";
import * as API from "../../api";
import { Button } from "@mui/material";
import { determine_color, duplicateUser, fullName } from "./usersHelpers";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const userPage = useSelector(state => state.users.userPage);
  const { message, loading, remoteVersionRequirement } = userPage;

  const userTable = useSelector(state => state.users.userTable);
  const { selectedRows, rows } = userTable;

  const dispatch = useDispatch();

  const column_defs = useMemo(
    () => [
      { title: "Date", display: row => new Date(row.createdAt).toLocaleDateString() },
      { title: "Name", display: user => fullName(user) },
      { title: "Email", display: "email" },
      {
        title: "Guest",
        display: user => (user.guest ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />),
      },
      {
        title: "Affiliated",
        display: user =>
          user.is_affiliated ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />,
      },
      {
        title: "Actions",
        display: user => (
          <div className="jc-b">
            <GLButton
              variant="icon"
              aria-label="Edit"
              onClick={() => {
                dispatch(open_edit_user_modal(user));
              }}
            >
              <i className="fas fa-edit" />
            </GLButton>
            <GLButton
              variant="icon"
              aria-label="Duplicate"
              onClick={() => {
                const newDuplicateUser = duplicateUser(user);
                dispatch(API.saveUser({ user: newDuplicateUser, profile: false }));
              }}
            >
              <i className="fas fa-clone" />
            </GLButton>
            <Link to={"/secure/glow/userprofile/" + user._id}>
              <GLButton variant="icon" aria-label="view">
                <i className="fas fa-mountain" />
              </GLButton>
            </Link>
            <GLButton variant="icon" onClick={() => dispatch(API.deleteUser(user._id))} aria-label="Delete">
              <i className="fas fa-trash-alt" />
            </GLButton>
          </div>
        ),
      },
    ],
    [dispatch]
  );

  const remoteApi = useCallback(options => API.getUsers(options), []);
  const remoteFiltersApi = useCallback(() => API.getUserFilters(), []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Users | Glow LEDs</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteFiltersApi={remoteFiltersApi}
        remoteVersionRequirement={remoteVersionRequirement}
        determine_color={determine_color}
        tableName={"Users"}
        namespaceScope="users"
        namespace="userTable"
        columnDefs={column_defs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <div className="row g-10px">
            {selectedRows.length > 1 && (
              <>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    const confirm = window.confirm(`Are you sure you want to Delete ${selectedRows.length} Users?`);
                    if (confirm) {
                      // dispatch(API.deleteMultipleUsers(selectedRows));
                    }
                  }}
                >
                  Delete Users
                </Button>
                {selectedRows.length === 2 && (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() =>
                      dispatch(
                        open_combine_users_modal({
                          user1: rows.find(row => row._id === selectedRows[0]),
                          user2: rows.find(row => row._id === selectedRows[1]),
                        })
                      )
                    }
                  >
                    Combine Users
                  </Button>
                )}
              </>
            )}
            <Button color="primary" variant="contained" onClick={() => dispatch(open_create_user_modal())}>
              Create User
            </Button>
          </div>
        }
      />
      <EditUserModal />
      <CombineUsersModal />
    </div>
  );
};
export default UsersPage;
