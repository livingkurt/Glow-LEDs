import { useDispatch, useSelector } from "react-redux";
import GLActiionModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { set_edit_email_modal, set_email } from "../../../slices/emailSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { emailFormFields } from "./emailFormFields";
import { Box, Button, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";

let debounceTimer;

const EditEmailModal = () => {
  const dispatch = useDispatch();
  const emailPage = useSelector(state => state.emails.emailPage);
  const { edit_email_modal, email, loading, template } = emailPage;

  const formFields = emailFormFields({
    email,
  });

  const [debounceValue, setDebounceValue] = useState(null);

  useEffect(() => {
    if (debounceValue) {
      debounceTimer = setTimeout(() => {
        dispatch(API.viewAnnouncement({ template: email }));
      }, 1000); // 500ms debounce time
    }

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [debounceValue]);

  return (
    <div>
      <GLActiionModal
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
      </GLActiionModal>
    </div>
  );
};

export default EditEmailModal;
