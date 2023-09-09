import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { EditEmailModal } from "./components";
import * as API from "../../api";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { format_date, humanize } from "../../utils/helper_functions";
import { open_create_email_modal, open_edit_email_modal } from "../../slices/emailSlice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ContentCopy } from "@mui/icons-material";
import { determineEmailColors, templates } from "./emailsPageHelpers";

const EmailsPage = () => {
  const emailPage = useSelector(state => state.emails.emailPage);
  const { loading, remoteVersionRequirement } = emailPage;
  const dispatch = useDispatch();

  const column_defs = useMemo(
    () => [
      { title: "createdAt", display: email => email.createdAt && format_date(email.createdAt) },
      {
        title: "Active",
        display: email => (
          <IconButton
            onClick={() => {
              dispatch(
                API.saveEmail({
                  ...email,
                  active: email.active ? false : true,
                })
              );
            }}
            aria-label={email.active ? "deactivate" : "activate"}
          >
            {email.active ? <CheckCircleIcon color="white" /> : <CancelIcon color="white" />}
          </IconButton>
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
        title: "Actions",
        display: email => (
          <div className="jc-b">
            <IconButton aria-label="Edit" onClick={() => dispatch(open_edit_email_modal(email))}>
              <EditIcon color="white" />
            </IconButton>
            <IconButton
              aria-label="Edit"
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
            </IconButton>

            <IconButton onClick={() => dispatch(API.deleteEmail(email._id))} aria-label="Delete">
              <DeleteIcon color="white" />
            </IconButton>
          </div>
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

      <GLTableV2
        remoteApi={remoteApi}
        remoteVersionRequirement={remoteVersionRequirement}
        determine_color={determineEmailColors}
        tableName={"Emails"}
        namespaceScope="emails"
        namespace="emailTable"
        columnDefs={column_defs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Box display="flex" alignItems={"center"} gap={2}>
            <Autocomplete
              options={templates}
              getOptionLabel={option => humanize(option)}
              onChange={(event, newValue) => {
                // set_link(newValue);
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
