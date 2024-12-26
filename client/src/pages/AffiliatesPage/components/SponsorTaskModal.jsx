import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { close_sponsor_task_modal } from "../../../slices/affiliateSlice";
import * as API from "../../../api";

const SponsorTaskModal = () => {
  const dispatch = useDispatch();
  const { sponsorTaskModal } = useSelector(state => state.affiliates.affiliatePage);
  const { open, affiliate } = sponsorTaskModal;

  const [formData, setFormData] = useState({
    taskType: "",
    taskNumber: "",
    points: "",
    description: "",
    driveLink: "",
    jiraLink: "",
  });

  const handleClose = () => {
    dispatch(close_sponsor_task_modal());
    setFormData({
      taskType: "",
      taskNumber: "",
      points: "",
      description: "",
      driveLink: "",
      jiraLink: "",
    });
  };

  const handleSubmit = async () => {
    try {
      const currentDate = new Date();
      const task = {
        ...formData,
        month: currentDate.toLocaleString("default", { month: "long" }),
        year: currentDate.getFullYear(),
        completedAt: currentDate,
      };

      await dispatch(API.addSponsorTask(affiliate._id, task));
      handleClose();
    } catch (error) {
      console.error("Error adding sponsor task:", error);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{"Add Sponsor Task"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Task Type"
          name="taskType"
          value={formData.taskType}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="Task Number"
          name="taskNumber"
          type="number"
          value={formData.taskNumber}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="Points"
          name="points"
          type="number"
          value={formData.points}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Jira Task Link"
          name="jiraLink"
          value={formData.jiraLink}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Google Drive Link"
          name="driveLink"
          value={formData.driveLink}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{"Cancel"}</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {"Add Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SponsorTaskModal;
