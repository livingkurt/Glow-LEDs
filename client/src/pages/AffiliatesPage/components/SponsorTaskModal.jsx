import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { close_sponsor_task_modal, set_sponsor_task } from "../../../slices/affiliateSlice";
import * as API from "../../../api";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { sponsorTaskFormFields } from "../sponsorTaskFormFields";

const SponsorTaskModal = () => {
  const dispatch = useDispatch();
  const { sponsorTaskModal, task } = useSelector(state => state.affiliates.affiliatePage);
  const { isOpen, affiliate } = sponsorTaskModal;
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;
  const formFields = sponsorTaskFormFields();

  const handleSubmit = async () => {
    try {
      const currentDate = new Date();
      const taskData = {
        ...task,
        month: currentDate.toLocaleString("default", { month: "long" }),
        year: currentDate.getFullYear(),
        completedAt: currentDate,
        verified: true,
        verifiedBy: current_user._id,
      };

      dispatch(API.addSponsorTask({ affiliateId: affiliate._id, task: taskData }));
      dispatch(close_sponsor_task_modal());
    } catch (error) {
      console.error("Error adding sponsor task:", error);
    }
  };

  return (
    <GLActionModal
      isOpen={isOpen}
      onConfirm={handleSubmit}
      onCancel={() => dispatch(close_sponsor_task_modal())}
      title={`Add Sponsor Task for ${affiliate?.artist_name}`}
      confirmLabel="Add Task"
      confirmColor="primary"
      cancelLabel="Cancel"
      cancelColor="secondary"
      disableEscapeKeyDown
    >
      <GLForm formData={formFields} state={task} onChange={value => dispatch(set_sponsor_task(value))} />
    </GLActionModal>
  );
};

export default SponsorTaskModal;
