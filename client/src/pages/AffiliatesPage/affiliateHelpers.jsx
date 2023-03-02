export const determine_color = (affiliate, colors) => {
  if (affiliate.sponsor) {
    return colors[0].color;
  }
  if (affiliate.team) {
    return colors[2].color;
  }
  if (affiliate.rave_mob) {
    return colors[4].color;
  }
  if (affiliate.promoter) {
    return colors[1].color;
  }
  if (!affiliate.active) {
    return colors[3].color;
  }
  return "";
};
