export const sponsorTaskFormFields = () => {
  return {
    taskName: {
      label: "Task Name",
      type: "text",
      required: true,
    },
    points: {
      label: "Points",
      type: "number",
      required: true,
    },
    isFullLightshow: {
      label: "Is Full Lightshow",
      type: "checkbox",
    },
    jiraLink: {
      label: "Jira Task Link",
      type: "text",
    },
    driveLink: {
      label: "Google Drive Link",
      type: "text",
    },
  };
};
