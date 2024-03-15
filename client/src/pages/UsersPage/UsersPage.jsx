import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_combine_users_modal, open_create_user_modal, open_edit_user_modal } from "../../slices/userSlice";
import { CombineUsersModal, EditUserModal } from "./components";
import * as API from "../../api";
import { Button, IconButton } from "@mui/material";
import { determineColor, duplicateUser, fullName } from "./usersHelpers";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CloneIcon from "@mui/icons-material/Layers";
import MountainIcon from "@mui/icons-material/Landscape";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EmailIcon from "@mui/icons-material/Email";
import { Loading } from "../../shared/SharedComponents";

const UsersPage = () => {
  const userPage = useSelector(state => state.users.userPage);
  const { loading, remoteVersionRequirement, loadingAffiliateOnboardSend } = userPage;

  const userTable = useSelector(state => state.users.userTable);
  const { selectedRows, rows } = userTable;

  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
      { title: "Date", display: row => new Date(row.createdAt).toLocaleDateString() },
      { title: "Name", display: user => fullName(user) },
      { title: "Email", display: "email" },
      {
        title: "Guest",
        display: user => (user.guest ? <CheckCircleIcon color="white" /> : <CancelIcon color="white" />),
      },
      {
        title: "Affiliated",
        display: user => (user.is_affiliated ? <CheckCircleIcon color="white" /> : <CancelIcon color="white" />),
      },
      {
        title: "Subscribed",
        display: user => (user.email_subscription ? <CheckCircleIcon color="white" /> : <CancelIcon color="white" />),
      },
      {
        title: "Actions",
        nonSelectable: true,
        display: user => (
          <div className="jc-b">
            <IconButton
              aria-label="Edit"
              onClick={() => {
                dispatch(open_edit_user_modal(user));
              }}
            >
              <EditIcon color="white" />
            </IconButton>
            <IconButton
              aria-label="Duplicate"
              onClick={() => {
                const newDuplicateUser = duplicateUser(user);
                dispatch(API.saveUser({ user: newDuplicateUser, profile: false }));
              }}
            >
              <CloneIcon color="white" />
            </IconButton>
            <Link to={"/secure/glow/userprofile/" + user._id}>
              <IconButton aria-label="view">
                <MountainIcon color="white" />
              </IconButton>
            </Link>
            <IconButton
              aria-label="Email"
              onClick={() => {
                dispatch(API.sendAffiliateOnboardEmail({ userIds: [user._id] }));
              }}
            >
              <EmailIcon color="white" />
            </IconButton>
            <IconButton aria-label="Delete" onClick={() => dispatch(API.deleteUser(user._id))}>
              <DeleteIcon color="white" />
            </IconButton>
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
      <Loading loading={loadingAffiliateOnboardSend} />
      <GLTableV2
        remoteApi={remoteApi}
        remoteFiltersApi={remoteFiltersApi}
        remoteVersionRequirement={remoteVersionRequirement}
        determineColor={determineColor}
        tableName={"Users"}
        namespaceScope="users"
        namespace="userTable"
        columnDefs={columnDefs}
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
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    const confirm = window.confirm(
                      `Are you sure you want to send an email to ${selectedRows.length} Users?`
                    );
                    if (confirm) {
                      dispatch(API.sendAffiliateOnboardEmail({ userIds: selectedRows }));
                    }
                  }}
                >
                  Send Affiliate Onboard Email
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
