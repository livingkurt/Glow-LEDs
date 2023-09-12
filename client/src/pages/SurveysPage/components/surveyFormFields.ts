export const surveyFormFields = ({ survey }: any) => {
  return {
    question_1: { type: "text", label: "Question 1" },
    question_2: { type: "text", label: "Question 2" },
    question_3: { type: "text", label: "Question 3" },
    question_4: { type: "text", label: "Question 4" },
    question_5: { type: "text", label: "Question 5" },
    answer_1: { type: "text", label: "Answer 1" },
    answer_2: { type: "text", label: "Answer 2" },
    answer_3: { type: "text", label: "Answer 3" },
    answer_4: { type: "text", label: "Answer 4" },
    answer_5: { type: "text", label: "Answer 5" },
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
