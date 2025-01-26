export const sponsorTaskFormFields = () => {
  return {
    tasks: {
      type: "array",
      title: "Tasks",
      label: item => item.taskName,
      itemSchema: {
        type: "object",
        fields: {
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
        },
      },
    },
  };
};
