import { tableColors } from "../../shared/GlowLEDsComponents/GLTableV2/glTableHelpers";

export const determineSurveyColors = survey => {
  let result = tableColors.waiting;

  if (survey.is_survey) {
    result = tableColors.waiting;
  }

  if (survey.rating === 5) {
    result = tableColors.active;
  }

  if (survey.rating === 3) {
    result = tableColors.alt_color_3;
  }
  if (survey.rating === 4) {
    result = tableColors.alt_color_4;
  }
  if (survey.rating === 1) {
    result = tableColors.inactive;
  }
  if (!survey.rating) {
    result = tableColors.completed;
  }

  if (survey.rating === 2) {
    result = tableColors.alt_color_2;
  }

  return result;
};
