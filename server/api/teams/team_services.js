import Team from "./team.js";
import team_db from "./team_db.js";
import { determine_filter } from "../../utils/util.js";
import { getFilteredData } from "../api_helpers.js";
import { createStripeAccountLink } from "../affiliates/affiliate_interactors.js";
import { createPublicPromoCode, createPrivatePromoCode, monthToNum } from "../affiliates/affiliate_helpers.js";

export default {
  findAll_teams_s: async query => {
    try {
      const page = query.page ? query.page : "1";
      const limit = query.limit ? query.limit : "0";
      const search = query.search
        ? {
            team_name: {
              $regex: query.search,
              $options: "i",
            },
          }
        : {};
      const filter = determine_filter(query, search);
      const sort_query = query.sort && query.sort.toLowerCase();
      let sort = { _id: -1 };
      if (sort_query === "glover name") {
        sort = { artist_name: 1 };
      } else if (sort_query === "facebook name") {
        sort = { facebook_name: 1 };
      } else if (sort_query === "sponsor") {
        sort = { sponsor: -1 };
      } else if (sort_query === "promoter") {
        sort = { promoter: -1 };
      } else if (sort_query === "active") {
        sort = { active: -1 };
      } else if (sort_query === "newest") {
        sort = { _id: -1 };
      }
      const teams = await team_db.findAll_teams_db(filter, sort, limit, page);
      const count = await team_db.count_teams_db(filter);
      if (count !== undefined) {
        return teams;
      } else {
        // Handle the case where count is undefined
        throw new Error("Count is undefined");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  table_teams_s: async query => {
    try {
      const sort_options = ["active", "team_name", "percentage_off", "captain", "public_code", "private_code"];
      const { filter, sort, limit, page } = getFilteredData({
        query,
        sort_options,
        // normalizeFilters: normalizePromoFilters,
        // normalizeSearch: normalizePromoSearch,
      });
      const teams = await team_db.findAll_teams_db(filter, sort, limit, page);
      const count = await team_db.count_teams_db(filter);
      return {
        data: teams,
        total_count: count,
        currentPage: page,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findById_teams_s: async params => {
    try {
      return await team_db.findById_teams_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByPathname_teams_s: async params => {
    try {
      return await team_db.findByPathname_teams_db(params.pathname);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  findByAffiliate_teams_s: async params => {
    try {
      return await team_db.findByAffiliate_teams_db(params.affiliate_id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_teams_s: async body => {
    try {
      return await team_db.create_teams_db(body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  create_teams_s: async body => {
    const { user, promo_code_name, team_name, captain } = body;

    const public_code = createPublicPromoCode(promo_code_name || team_name);
    const private_code = createPrivatePromoCode(user, 30);
    try {
      const newTeam = await team_db.create_teams_db(body, public_code, private_code);
      if (newTeam) {
        const accountLink = await createStripeAccountLink();
        return { newTeam, accountLink };
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  update_teams_s: async (params, body) => {
    try {
      return await team_db.update_teams_db(params.id, body);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  remove_teams_s: async params => {
    try {
      return await team_db.remove_teams_db(params.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
  team_monthly_checkin_teams_s: async (params, body) => {
    const { id } = params;
    const { questionsConcerns, numberOfContent, month, year } = body;

    // Get previous month and year
    const prevDate = new Date();
    prevDate.setMonth(prevDate.getMonth() - 1);
    // const prevMonth = prevDate.toLocaleString("default", { month: "long" });
    // const prevYear = prevDate.getFullYear();

    try {
      // Prepare the check-in object
      const checkin = {
        month: month,
        year: year,
        questionsConcerns: questionsConcerns,
        numberOfContent,
        // add any additional fields here
      };

      const team = await Team.findOne({ _id: id, deleted: false });
      if (team) {
        const existingCheckinIndex = team.teamMonthlyCheckins.findIndex(
          checkin => checkin.month === month && checkin.year === year
        );

        if (existingCheckinIndex > -1) {
          // Update the existing checkin
          team.teamMonthlyCheckins[existingCheckinIndex] = checkin;
        } else {
          // Find the correct position for the new checkin based on month and year
          const correctPosition = team.teamMonthlyCheckins.findIndex(
            checkin =>
              new Date(`${checkin.year}-${monthToNum(checkin.month)}-01`) > new Date(`${year}-${monthToNum(month)}-01`)
          );

          // If correct position found, insert at that position, else push to the end
          if (correctPosition !== -1) {
            team.teamMonthlyCheckins.splice(correctPosition, 0, checkin);
          } else {
            team.teamMonthlyCheckins.push(checkin);
          }
          // // If the check-in is for the previous month and year, generate sponsor codes
          // if (month === prevMonth && year === prevYear) {
          //   await generateSponsorCodes(team);
          // }
        }

        // Save the updated affiliate
        await team.save();

        return team;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  },
};
