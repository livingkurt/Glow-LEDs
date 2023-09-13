export const surveyFormFields = ({ survey }: any) => {
  return {
    question_answer: {
      type: "array",
      title: "Question and Answer",
      label: "question",
      itemSchema: {
        type: "object",
        fields: {
          question: { type: "text", label: "Question" },
          answer: { type: "text", label: "Answer" },
        },
      },
    },
    rating: { type: "number", label: "Rating", default: 0 },
    is_survey: { type: "checkbox", label: "Is Survey", default: false },
    active: { type: "checkbox", label: "Active", default: false },
  };
};
