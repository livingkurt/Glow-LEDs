import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_email_modal, set_email } from "../../../slices/emailSlice";
import * as API from "../../../api";
import { Box, Grid, Paper } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import EmailTemplateEditor from "./EmailTemplateEditor";
import GLForm from "../../../shared/GlowLEDsComponents/GLForm/GLForm";
import { emailFormFields } from "./emailFormFields";

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

  useEffect(() => {
    if (debounceValue && initialFetchDone.current) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        dispatch(API.viewAnnouncement({ template: email }));
      }, 500); // Reduced debounce time to 500ms for better responsiveness
    }

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [debounceValue, dispatch, email]);

  const handleEmailChange = newModules => {
    const updatedEmail = { ...email, modules: newModules };
    console.log({ updatedEmail });
    dispatch(set_email(updatedEmail));
    setDebounceValue(Date.now()); // Use current timestamp to trigger debounce
  };
  const formFields = emailFormFields({
    email,
  });

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
            <GLForm
              formData={formFields}
              state={email}
              onChange={value => {
                dispatch(set_email(value));
                setDebounceValue(value);
              }}
            />
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
