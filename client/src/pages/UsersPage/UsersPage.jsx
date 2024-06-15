import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_combine_users_modal, open_create_user_modal, open_edit_user_modal } from "../../slices/userSlice";
import { CombineUsersModal, EditUserModal } from "./components";
import * as API from "../../api";
import { Box, Button, Container } from "@mui/material";
import { determineColor, duplicateUser, fullName } from "./usersHelpers";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CloneIcon from "@mui/icons-material/Layers";
import MountainIcon from "@mui/icons-material/Landscape";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import { Loading } from "../../shared/SharedComponents";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLBoolean from "../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";

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
        display: user => <GLBoolean boolean={user.guest} />,
      },
      {
        title: "Affiliated",
        display: user => <GLBoolean boolean={user.is_affiliated} />,
      },
      {
        title: "Subscribed",
        display: user => <GLBoolean boolean={user.email_subscription} />,
      },
      {
        title: "",
        display: user => (
          <Box display="flex" justifyContent={"flex-end"}>
            <GLIconButton
              tooltip="Edit"
              onClick={() => {
                dispatch(open_edit_user_modal(user));
              }}
            >
              <EditIcon color="white" />
            </GLIconButton>
            <GLIconButton
              tooltip="Duplicate"
              onClick={() => {
                const newDuplicateUser = duplicateUser(user);
                dispatch(API.saveUser({ user: newDuplicateUser, profile: false }));
              }}
            >
              <CloneIcon color="white" />
            </GLIconButton>
            <Link to={"/secure/glow/userprofile/" + user._id}>
              <GLIconButton tooltip="View User Profile">
                <MountainIcon color="white" />
              </GLIconButton>
            </Link>
            <GLIconButton
              tooltip="Send Affiliate Onboard Email"
              onClick={() => {
                dispatch(API.sendAffiliateOnboardEmail({ userIds: [user._id] }));
              }}
            >
              <EmailIcon color="white" />
            </GLIconButton>
            <GLIconButton tooltip="Delete" onClick={() => dispatch(API.deleteUser(user._id))}>
              <DeleteIcon color="white" />
            </GLIconButton>
          </Box>
        ),
      },
    ],
    [dispatch]
  );

  const remoteApi = useCallback(options => API.getUsers(options), []);
  const remoteFiltersApi = useCallback(() => API.getUserFilters(), []);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
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
    </Container>
  );
};
export default UsersPage;
