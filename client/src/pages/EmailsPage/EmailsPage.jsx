import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { EditEmailModal } from "./components";
import * as API from "../../api";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { format_date, humanize } from "../../utils/helper_functions";
import { open_create_email_modal, open_edit_email_modal } from "../../slices/emailSlice";
import DescriptionIcon from "@mui/icons-material/Description";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { BugReport, ContentCopy, Email } from "@mui/icons-material";
import { determineEmailColors, templates } from "./emailsPageHelpers";
import { showConfirm } from "../../slices/snackbarSlice";
import { Loading } from "../../shared/SharedComponents";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";

const EmailsPage = () => {
  const emailPage = useSelector(state => state.emails.emailPage);
  const { loading, remoteVersionRequirement, loadingSendAnnouncment } = emailPage;
  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
      { title: "createdAt", display: email => email.createdAt && format_date(email.createdAt) },
      {
        title: "Status",
        display: email =>
          email.status === "Draft" ? (
            <DescriptionIcon color="white" />
          ) : email.status === "Scheduled" ? (
            <AccessTimeIcon color="white" />
          ) : (
            <SendIcon color="white" />
          ),
      },
      {
        title: "Title",
        display: email => email?.h1,
      },
      {
        title: "Summary",
        display: email => email?.h2,
      },

      {
        title: "",
        display: email => (
          <Box display="flex" justifyContent={"flex-end"}>
            <GLIconButton tooltip="Edit" onClick={() => dispatch(open_edit_email_modal(email))}>
              <EditIcon color="white" />
            </GLIconButton>
            <GLIconButton
              tooltip="Send Test Email"
              onClick={() => {
                dispatch(API.sendAnnouncement({ emailId: email._id, testEmail: true }));
              }}
            >
              <BugReport color="white" />
            </GLIconButton>
            <GLIconButton
              tooltip="Schedule Email"
              onClick={() => {
                dispatch(
                  API.saveEmail({
                    ...email,
                    status: "Scheduled",
                  })
                );
              }}
            >
              <AccessTimeIcon color="white" />
            </GLIconButton>
            <GLIconButton
              tooltip="Send Test Email"
              onClick={() => {
                dispatch(
                  showConfirm({
                    title: "Confirm Email Send",
                    message: `Are you sure you want to Send Official Email?`,
                    onConfirm: () => dispatch(API.sendAnnouncement({ emailId: email._id })),
                  })
                );
              }}
            >
              <Email color="white" />
            </GLIconButton>
            <GLIconButton
              tooltip="Duplicate"
              onClick={() =>
                dispatch(
                  API.saveEmail({
                    ...email,
                    _id: null,
                    home_page: { ...email.home_page, h1: `${email.home_page.h1} Copy` },
                    createdAt: null,
                    updatedAt: null,
                  })
                )
              }
            >
              <ContentCopy color="white" />
            </GLIconButton>

            <GLIconButton onClick={() => dispatch(API.deleteEmail(email._id))} tooltip="Delete">
              <DeleteIcon color="white" />
            </GLIconButton>
          </Box>
        ),
      },
    ],
    []
  );

  const remoteApi = useCallback(options => API.getEmails(options), []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Emails | Glow LEDs</title>
      </Helmet>
      <Loading loading={loadingSendAnnouncment} />
      <GLTableV2
        remoteApi={remoteApi}
        remoteVersionRequirement={remoteVersionRequirement}
        determineColor={determineEmailColors}
        tableName={"Emails"}
        namespaceScope="emails"
        namespace="emailTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Box display="flex" alignItems={"center"} gap={2}>
            <Autocomplete
              options={templates}
              getOptionLabel={option => humanize(option)}
              onChange={(event, newValue) => {
                if (newValue) {
                  window.open("/api/templates/" + newValue, "_blank");
                }
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Choose Email Template"
                  fullWidth
                  style={{ width: 300 }}
                  size="small"
                  ariant="outlined"
                />
              )}
            />
            <div>
              <Button color="primary" variant="contained" onClick={() => dispatch(open_create_email_modal())}>
                Create Email
              </Button>
            </div>
          </Box>
        }
      />
      <EditEmailModal />
    </div>
  );
};
export default EmailsPage;
