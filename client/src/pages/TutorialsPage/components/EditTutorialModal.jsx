import React from "react";
import GLModal from "../../../shared/GlowLEDsComponents/GLModal/GLModal";

const EditTutorialModal = () => {
  return (
    <div>
      <GLModal
        isOpen={createTagModal}
        onConfirm={() => {
          if (Object.keys(tagErrors).length > 0) {
            dispatch(setShowTagErrors(true));
          } else {
            dispatch(API.createTags({ newTags }));
          }
        }}
        onCancel={() => {
          dispatch(showCreateTagModal(false));
        }}
        title={translateCreateTagsModal("create_tags_title")}
        confirmDisabled={isDisabled}
        confirmLabel={translateButtons("confirm_button")}
        confirmColor="primary"
        cancelLabel={translateButtons("cancel_button")}
        cancelColor="default"
        id="create-tag-modal"
        disableEscapeKeyDown
      >
        <div style={{ position: "relative", minHeight: "150px" }} className="ai-c" data-test="create-tag-modal">
          Hello
        </div>
      </GLMo>
    </div>
  );
};

export default EditTutorialModal;
