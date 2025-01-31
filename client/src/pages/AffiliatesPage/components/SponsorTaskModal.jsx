import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { close_sponsor_task_modal, set_sponsor_task } from "../../../slices/affiliateSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { sponsorTaskFormFields } from "../sponsorTaskFormFields";
import { showError } from "../../../slices/snackbarSlice";

const SponsorTaskModal = () => {
  const dispatch = useDispatch();
  const { sponsorTaskModal, tasks } = useSelector(state => state.affiliates.affiliatePage);
  const { isOpen, affiliate } = sponsorTaskModal;
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;
  const formFields = sponsorTaskFormFields();

  const handleSubmit = async () => {
    try {
      if (!tasks || tasks.length === 0) {
        dispatch(showError({ message: "Please add at least one task" }));
        return;
      }

      const currentDate = new Date();
      const currentMonth = currentDate.toLocaleString("default", { month: "long" });
      const currentYear = currentDate.getFullYear();

      const tasksToSubmit = tasks.map(task => ({
        ...task,
        month: currentMonth,
        year: currentYear,
        completedAt: currentDate,
        verified: true,
        verifiedBy: current_user._id,
      }));

      await dispatch(API.addSponsorTask({ affiliateId: affiliate._id, tasks: tasksToSubmit }));
      dispatch(close_sponsor_task_modal());
    } catch (error) {
      dispatch(showError({ message: "Error adding sponsor tasks" }));
    }
  };

  return (
    <GLActionModal
      isOpen={isOpen}
      onConfirm={handleSubmit}
      onCancel={() => dispatch(close_sponsor_task_modal())}
      title={`Add Sponsor Tasks for ${affiliate?.artist_name}`}
      confirmLabel="Add Tasks"
      confirmColor="primary"
      cancelLabel="Cancel"
      cancelColor="secondary"
      disableEscapeKeyDown
    >
      <GLForm
        formData={formFields}
        state={{ tasks: tasks || [] }}
        onChange={value => dispatch(set_sponsor_task(value))}
      />
    </GLActionModal>
  );
};

export default SponsorTaskModal;
