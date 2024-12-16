import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { EditEmailModal } from "./components";
import * as API from "../../api";

import { format_date, humanize } from "../../utils/helper_functions";
import { open_create_email_modal, open_edit_email_modal } from "../../slices/emailSlice";
import DescriptionIcon from "@mui/icons-material/Description";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { determineEmailColors, templates } from "./emailsPageHelpers";
import { showConfirm } from "../../slices/snackbarSlice";
import { Loading } from "../../shared/SharedComponents";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import BugReport from "@mui/icons-material/BugReport";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ContentCopy from "@mui/icons-material/ContentCopy";
import Email from "@mui/icons-material/Email";
import TextField from "@mui/material/TextField";

const EmailsPage = () => {
  const emailPage = useSelector(state => state.emails.emailPage);
  const { loading, remoteVersionRequirement, loadingSendAnnouncment } = emailPage;
  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
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
        title: "Scheduled At",
        display: email => (email.scheduled_at ? new Date(email.scheduled_at).toLocaleString() : ""),
      },
      {
        title: "Subject",
        display: email => {
          return email?.subject;
        },
      },

      {
        title: "",
        nonSelectable: true,
        display: email => (
          <Box display="flex" justifyContent="flex-end">
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
              tooltip="Send Email"
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
                    subject: `${email.subject} Copy`,
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
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Helmet>
        <title>{"Admin Emails | Glow LEDs"}</title>
      </Helmet>
      <Loading loading={loadingSendAnnouncment} />
      <GLTableV2
        remoteApi={remoteApi}
        remoteVersionRequirement={remoteVersionRequirement}
        determineColor={determineEmailColors}
        tableName="Emails"
        namespaceScope="emails"
        namespace="emailTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Box display="flex" alignItems="center" gap={2}>
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
                {"Create Email"}
              </Button>
            </div>
          </Box>
        }
      />

      <EditEmailModal />
    </Container>
  );
};
export default EmailsPage;
