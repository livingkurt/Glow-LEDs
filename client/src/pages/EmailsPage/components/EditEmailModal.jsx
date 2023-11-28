import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { setTestEmail, set_edit_email_modal, set_email } from "../../../slices/emailSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { emailFormFields } from "./emailFormFields";
import { Box, Button, Checkbox, FormControlLabel, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { showConfirm } from "../../../slices/snackbarSlice";
import { useRef } from "react";

let debounceTimer;
let runOnce;

const EditEmailModal = () => {
  const dispatch = useDispatch();
  const emailPage = useSelector(state => state.emails.emailPage);
  const { edit_email_modal, email, loading, template, testEmail } = emailPage;

  const formFields = emailFormFields({
    email,
  });

  const [debounceValue, setDebounceValue] = useState(null);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (email && !hasFetched.current) {
      dispatch(API.viewAnnouncement({ template: email }));
      hasFetched.current = true;
    }
  }, [email]);

  useEffect(() => {
    dispatch(API.viewAnnouncement({ template: email }));
  }, [email]);

  useEffect(() => {
    if (debounceValue) {
      debounceTimer = setTimeout(() => {
        dispatch(API.viewAnnouncement({ template: email }));
      }, 2000); // 500ms debounce time
    }

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [debounceValue]);

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
        maxWidth="xl"
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
            <GLForm
              formData={formFields}
              state={email}
              onChange={value => {
                dispatch(set_email(value));
                setDebounceValue(value);
              }}
              loading={loading}
            />
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
