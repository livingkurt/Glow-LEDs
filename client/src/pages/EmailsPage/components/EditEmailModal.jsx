import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_email_modal, set_email } from "../../../slices/emailSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { emailFormFields } from "./emailFormFields";
import { Box, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useRef } from "react";

let debounceTimer;

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

  const debounceKeys = ["status", "scheduled_at", "active", "link", "subject"];

  useEffect(() => {
    const keys = Object.keys(debounceValue || {});
    const shouldDebounce = keys.some(key => debounceKeys.includes(key));

    if (debounceValue && !shouldDebounce) {
      console.log({ debounceValue });
      debounceTimer = setTimeout(() => {
        dispatch(API.viewAnnouncement({ template: email }));
      }, 2000); // 2000ms debounce time
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
