import { ticket_services } from ".";

export default {
  findAll_tickets_c: async (req, res) => {
    const { query } = req;
    try {
      const tickets = await ticket_services.findAll_tickets_s(query);
      if (tickets) {
        return res.status(200).send(tickets);
      }
      return res.status(404).send({ message: "Tickets Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  table_tickets_c: async (req, res) => {
    const { query } = req;
    try {
      const tickets = await ticket_services.table_tickets_s(query);
      if (tickets) {
        return res.status(200).send(tickets);
      }
      return res.status(404).send({ message: "Tickets Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_tickets_c: async (req, res) => {
    const { params } = req;
    try {
      const ticket = await ticket_services.findById_tickets_s(params);
      if (ticket) {
        return res.status(200).send(ticket);
      }
      return res.status(404).send({ message: "Ticket Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_tickets_c: async (req, res) => {
    const { body } = req;
    try {
      const ticket = await ticket_services.create_tickets_s(body);
      if (ticket) {
        return res.status(201).send(ticket);
      }
      return res.status(500).send({ message: "Error Creating Ticket" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_tickets_c: async (req, res) => {
    const { params, body } = req;
    try {
      const ticket = await ticket_services.update_tickets_s(params, body);
      if (ticket) {
        return res.status(200).send(ticket);
      }
      return res.status(500).send({ message: "Error Updating Ticket" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  reorder_tickets_c: async (req, res) => {
    const { body } = req;
    try {
      const ticket = await ticket_services.reorder_tickets_s(body);
      if (ticket) {
        return res.status(200).send(ticket);
      }
      return res.status(500).send({ message: "Error Reordering Ticket" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_tickets_c: async (req, res) => {
    const { params } = req;
    try {
      const ticket = await ticket_services.remove_tickets_s(params);
      if (ticket) {
        return res.status(204).send({ message: "Ticket Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Ticket" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
