import { team_services } from "../teams";

export default {
  findAll_teams_c: async (req, res) => {
    const { query } = req;
    try {
      const teams = await team_services.findAll_teams_s(query);
      if (teams) {
        return res.status(200).send(teams);
      }
      return res.status(404).send({ message: "Teams Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  table_teams_c: async (req, res) => {
    const { query } = req;
    try {
      const teams = await team_services.table_teams_s(query);
      if (teams) {
        return res.status(200).send(teams);
      }
      return res.status(404).send({ message: "Promos Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  team_monthly_checkin_teams_c: async (req, res) => {
    const { body, params } = req;
    try {
      const team = await team_services.team_monthly_checkin_teams_s(params, body);
      if (team) {
        return res.status(201).send(team);
      }
      return res.status(500).send({ message: "Error Creating Affiliate" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_teams_c: async (req, res) => {
    const { params } = req;
    try {
      const team = await team_services.findById_teams_s(params);
      if (team) {
        return res.status(200).send(team);
      }
      return res.status(404).send({ message: "Team Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findByPathname_teams_c: async (req, res) => {
    const { params } = req;
    console.log({ params });
    try {
      const team = await team_services.findByPathname_teams_s(params);
      if (team) {
        return res.status(200).send(team);
      }
      return res.status(404).send({ message: "Team Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findByAffiliate_teams_c: async (req, res) => {
    const { params } = req;
    try {
      const team = await team_services.findByAffiliate_teams_s(params);
      if (team) {
        return res.status(200).send(team);
      }
      return res.status(404).send({ message: "Team Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_teams_c: async (req, res) => {
    const { body } = req;
    try {
      const team = await team_services.create_teams_s(body);
      if (team) {
        return res.status(201).send(team);
      }
      return res.status(500).send({ message: "Error Creating Team" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_teams_c: async (req, res) => {
    const { params, body } = req;
    try {
      const team = await team_services.update_teams_s(params, body);
      if (team) {
        return res.status(200).send(team);
      }
      return res.status(500).send({ message: "Error Updating Team" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_teams_c: async (req, res) => {
    const { params } = req;
    try {
      const team = await team_services.remove_teams_s(params);
      if (team) {
        return res.status(204).send({ message: "Team Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Team" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
