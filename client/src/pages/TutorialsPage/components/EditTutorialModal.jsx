import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { set_edit_tutorial_modal, set_tutorial } from "../../../slices/tutorialSlice";
import * as API from "../../../api";
import { Autocomplete, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { snake_case, toCapitalize } from "../../../utils/helper_functions";

const EditTutorialModal = () => {
  const dispatch = useDispatch();
  const tutorialsSlice = useSelector(state => state.tutorialSlice);
  const { edit_tutorial_modal, tutorial, loading } = tutorialsSlice;
  const { affiliate, title, video, description, categorys, level, order, active, pathname } = tutorial;

  const affiliatesSlice = useSelector(state => state.affiliateSlice);
  const { affiliates, loading: loading_affiliates } = affiliatesSlice;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listAffiliates({ active: true }));
    }
    return () => {
      clean = false;
    };
  }, [dispatch, tutorial._id]);

  const generate_pathname = () => {
    return affiliate ? snake_case(`${title} by ${affiliate.artist_name}`) : "";
  };

  return (
    <div>
      <GLModal
        isOpen={edit_tutorial_modal}
        onConfirm={() => {
          dispatch(API.saveTutorial({ ...tutorial, affiliate: affiliate._id, pathname: generate_pathname() }));
          dispatch(API.listAffiliates({ active: true }));
        }}
        onCancel={() => {
          dispatch(set_edit_tutorial_modal(false));
        }}
        title={"Edit Tutorial"}
        confirmLabel={"Save"}
        confirmColor="primary"
        cancelLabel={"Cancel"}
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <Autocomplete
          loading={!loading_affiliates}
          getOptionLabel={option => option.artist_name}
          getOptionSelected={(option, value) => option.artist_name === value.artist_name}
          isOptionEqualToValue={(option, value) => option.artist_name === value.artist_name}
          name="affiliate"
          margin="normal"
          value={affiliate}
          size="small"
          options={affiliates}
          renderInput={params => <TextField {...params} margin="normal" label="Affiliate" variant="outlined" />}
          onChange={(e, value) => dispatch(set_tutorial({ affiliate: value }))}
        />
        <TextField
          size="small"
          loading={!loading}
          value={title}
          fullWidth
          type="text"
          margin="normal"
          name="title"
          label="Title"
          variant="outlined"
          onChange={e => dispatch(set_tutorial({ [e.target.name]: e.target.value }))}
        />
        <TextField
          size="small"
          loading={!loading}
          value={video}
          fullWidth
          type="text"
          margin="normal"
          name="video"
          label="Video"
          variant="outlined"
          onChange={e => dispatch(set_tutorial({ [e.target.name]: e.target.value }))}
        />
        <TextField
          size="small"
          loading={!loading}
          value={description}
          multiline={true}
          fullWidth
          type="text"
          margin="normal"
          name="description"
          label="Desciption"
          variant="outlined"
          onChange={e => dispatch(set_tutorial({ [e.target.name]: e.target.value }))}
        />
        <Autocomplete
          getOptionLabel={option => toCapitalize(option)}
          name="level"
          size="small"
          value={level}
          options={["beginner", "intermediate", "advanced"]}
          getOptionSelected={(option, value) => option === value}
          renderInput={params => <TextField {...params} margin="normal" label="Difficulty" variant="outlined" />}
          onChange={(e, value) => dispatch(set_tutorial({ level: value }))}
        />
        <TextField
          size="small"
          loading={!loading}
          value={order}
          multiline={true}
          fullWidth
          type="text"
          margin="normal"
          name="order"
          label="Order"
          variant="outlined"
          onChange={e => dispatch(set_tutorial({ [e.target.name]: e.target.value }))}
        />
        <TextField
          size="small"
          loading={!loading}
          value={generate_pathname()}
          fullWidth
          type="text"
          margin="normal"
          name="pathname"
          label="Pathname"
          variant="outlined"
          onChange={e => dispatch(set_tutorial({ [e.target.name]: e.target.value }))}
        />
        <FormControlLabel
          control={
            <Checkbox name="active" size="large" onChange={e => dispatch(set_tutorial({ active: e.target.checked }))} checked={active} />
          }
          label="Active"
        />
      </GLModal>
    </div>
  );
};

export default EditTutorialModal;
