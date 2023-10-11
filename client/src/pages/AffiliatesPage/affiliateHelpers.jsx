const colors = [
  { name: "Sponsor", color: "#3e4c6d" },
  { name: "Promoter", color: "#7d5555" },
  { name: "Team", color: "#557d6c" },
  { name: "Not Active", color: "#757575" },
  { name: "Rave Mob", color: "#55797d" },
];

export const determineColor = affiliate => {
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
