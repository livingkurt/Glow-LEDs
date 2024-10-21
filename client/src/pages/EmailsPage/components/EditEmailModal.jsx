import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_email_modal, set_email } from "../../../slices/emailSlice";
import * as API from "../../../api";
import { Box, Grid, Paper } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import EmailTemplateEditor from "./EmailTemplateEditor";

let debounceTimer;

const EditEmailModal = () => {
  const dispatch = useDispatch();
  const emailPage = useSelector(state => state.emails.emailPage);
  const { edit_email_modal, email, template } = emailPage;

  const [debounceValue, setDebounceValue] = useState(null);
  const initialFetchDone = useRef(false);

  useEffect(() => {
    if (email && edit_email_modal && !initialFetchDone.current) {
      dispatch(API.viewAnnouncement({ template: email }));
      initialFetchDone.current = true;
    }
  }, [dispatch, email, edit_email_modal]);

  useEffect(() => {
    initialFetchDone.current = false;
  }, [edit_email_modal]);

  const debounceKeys = ["status", "scheduled_at", "active", "link", "subject"];

  useEffect(() => {
    if (debounceValue && initialFetchDone.current) {
      const keys = Object.keys(debounceValue);
      const shouldDebounce = keys.some(key => debounceKeys.includes(key));

      if (!shouldDebounce) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          dispatch(API.viewAnnouncement({ template: email }));
        }, 2000); // 2000ms debounce time
      }
    }

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [debounceValue, dispatch, email]);

  const handleEmailChange = newModules => {
    const updatedEmail = { ...email, modules: newModules };
    dispatch(set_email(updatedEmail));
    setDebounceValue(updatedEmail);
  };

  return (
    <div>
      <GLActionModal
        isOpen={edit_email_modal}
        onConfirm={() => {
          dispatch(API.saveEmail(email));
        }}
        onCancel={() => {
          dispatch(set_edit_email_modal(false));
        }}
        maxWidth="xxl"
        title={"Edit Email"}
        confirmLabel={"Save"}
        confirmColor="primary"
        cancelLabel={"Cancel"}
        cancelColor="secondary"
        actionColor="secondary"
        disableEscapeKeyDown
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <EmailTemplateEditor initialModules={email.modules || []} onChange={handleEmailChange} />
          </Grid>
          <Grid item xs={6}>
            <Box m={2}>
              <Paper>{template}</Paper>
            </Box>
          </Grid>
        </Grid>
      </GLActionModal>
    </div>
  );
};

export default EditEmailModal;
