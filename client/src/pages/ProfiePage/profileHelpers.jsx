const order_colors = [
  { name: "Not Paid", color: "#6d3e3e" },
  { name: "Paid", color: "#3e4c6d" },
  { name: "Crafting", color: "#4b7188" },
  { name: "Crafted", color: "#4b7188" },
  { name: "Packaged", color: "#6f5f7d" },
  { name: "Shipped", color: "#636363" },
  { name: "Delivered", color: "#333333" },
];

export const determine_order_color = order => {
  let result = "";
  if (!order.isPaid) {
    result = order_colors[0].color;
  }
  if (order.isPaid) {
    result = order_colors[1].color;
  }
  if (order.isCrafting) {
    result = order_colors[2].color;
  }
  if (order.isCrafted) {
    result = order_colors[2].color;
  }
  if (order.isPackaged) {
    result = order_colors[3].color;
  }
  if (order.isShipped) {
    result = order_colors[4].color;
  }
  if (order.isDelivered) {
    result = order_colors[5].color;
  }
  return result;
};

export const affiliateLinks = {
  promoter: {
    termsLink: "https://docs.google.com/document/d/1j3Bcv2__QGiTlVf--R-BNVpvGRN_RzWvuvMFCPodqS4/edit?usp=sharing",
    revenueLink: "https://docs.google.com/spreadsheets/d/1vy1OKH0P96cDkjuq-_yBT56CA1yQRMY3XZ2kgN95Spg/edit?usp=sharing",
  },
  sponsor: {
    termsLink: "https://docs.google.com/document/d/1t1HwnnPbsgE5THHLWS_-5gYyXwIRcSv8yunXK2oRxOE/edit?usp=sharing",
    revenueLink: "https://docs.google.com/spreadsheets/d/1nxYhdgGqme0tSvOrYeb6oU9RIOLeA2aik3-K4H1dRpA/edit?usp=sharing",
  },
  team: {
    termsLink: "https://docs.google.com/document/d/1WRCW4psn0U2iRHDk9ZVJuaOYU8vj9nRbj8O2SdfUo90/edit?usp=sharing",
    revenueLink: "https://docs.google.com/document/d/1WRCW4psn0U2iRHDk9ZVJuaOYU8vj9nRbj8O2SdfUo90/edit?usp=sharing",
  },
};

export const determine_terms_link = affiliate => {
  if (affiliate?.promoter) {
    return affiliateLinks.promoter.termsLink;
  }
  if (affiliate?.sponsor) {
    return affiliateLinks.sponsor.termsLink;
  }
  if (affiliate.team) {
    return affiliateLinks.team.termsLink;
  }
};

export const getProfileTitle = (current_user, first_name, title) => {
  if (!current_user || current_user.first_name === first_name || first_name === "") {
    return `My ${title}`;
  } else {
    return `${first_name}'s ${title}`;
  }
};

export const monthCheckinStatus = ({ user, currentMonth, currentYear, previousMonth }) => {
  const affiliateCheckinCompleted = user?.affiliate?.sponsorMonthlyCheckins?.find(
    checkin => checkin.month === currentMonth && checkin.year === currentYear
  );
  const teamCheckinCompleted = user?.team?.teamMonthlyCheckins?.find(
    checkin => checkin.month === currentMonth && checkin.year === currentYear
  );

  const affiliatePreviousCheckin = user?.affiliate?.sponsorMonthlyCheckins?.find(
    checkin => checkin.month === previousMonth && checkin.year === currentYear
  );
  const teamPreviousCheckin = user?.team?.teamMonthlyCheckins?.find(
    checkin => checkin.month === previousMonth && checkin.year === currentYear
  );

  // Combined checkin status
  const checkinCompleted = affiliateCheckinCompleted || teamCheckinCompleted;
  const previousCheckin = affiliatePreviousCheckin || teamPreviousCheckin;
  return { checkinCompleted, previousCheckin };
};

export const checkinButtonLabel = ({ checkin, teamCaptain, month }) => {
  return `${checkin ? "Edit" : `Start ${teamCaptain}` ? "Team" : "Sponsor"} Monthly Checkin for ${month}`;
};
