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

export const getProfileTitle = (current_user, first_name) => {
  if (first_name === "") {
    return `Guest Account Profile`;
  } else if (!current_user || current_user.first_name === first_name) {
    return `My Profile`;
  } else {
    return `${first_name}'s Profile`;
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

export const this_month_date_range = () => {
  const today = new Date(); // get current date
  const year = today.getFullYear(); // get current year
  const month = today.getMonth() + 1; // get current month (0-indexed)
  const start_date = `${year}-${month.toString().padStart(2, "0")}-01`;
  const lastDayOfMonth = new Date(year, month, 0).getDate();
  const end_date = `${year}-${month.toString().padStart(2, "0")}-${lastDayOfMonth.toString().padStart(2, "0")}`;
  return { start_date, end_date };
};

export const this_year_date_range = () => {
  const today = new Date(); // get current date
  const year = today.getFullYear(); // get current year
  const start_date = `${year}-01-01`;
  const end_date = `${year}-12-31`;
  return { start_date, end_date };
};
