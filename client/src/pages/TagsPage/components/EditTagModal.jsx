import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box } from "@mui/material";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import GLForm from "../../../shared/GlowLEDsComponents/GLForm/GLForm";
import { close_tag_modal } from "../../../slices/tagSlice";
import { tagFormFields } from "../tagHelpers";
import * as API from "../../../api";

export const EditTagModal = () => {
  const dispatch = useDispatch();
  const tagPage = useSelector(state => state.tags.tagPage);
  const { selectedTag, modalOpen } = tagPage;

  const handleClose = useCallback(() => {
    dispatch(close_tag_modal());
  }, [dispatch]);

  const handleSubmit = useCallback(
    values => {
      dispatch(API.saveTag(values));
      handleClose();
    },
    [dispatch, handleClose]
  );

  return (
    <GLActionModal open={modalOpen} onClose={handleClose} title={selectedTag?._id ? "Edit Tag" : "Create Tag"}>
      <Box p={2}>
        <GLForm
          formFields={tagFormFields()}
          onSubmit={handleSubmit}
          initialValues={selectedTag || { active: true }}
          submitText={selectedTag?._id ? "Save" : "Create"}
        />
      </Box>
    </GLActionModal>
  );
};

export default EditTagModal;
