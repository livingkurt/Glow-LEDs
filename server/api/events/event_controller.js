import event_services from "./event_services.js";

export default {
  findAll_events_c: async (req, res) => {
    const { query } = req;
    try {
      const events = await event_services.findAll_events_s(query);
      if (events) {
        return res.status(200).send(events);
      }
      return res.status(404).send({ message: "Events Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  table_events_c: async (req, res) => {
    const { query } = req;
    try {
      const events = await event_services.table_events_s(query);
      if (events) {
        return res.status(200).send(events);
      }
      return res.status(404).send({ message: "Events Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  findById_events_c: async (req, res) => {
    const { params } = req;
    try {
      const event = await event_services.findById_events_s(params);
      if (event) {
        return res.status(200).send(event);
      }
      return res.status(404).send({ message: "Event Not Found" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  create_events_c: async (req, res) => {
    const { body } = req;
    try {
      const event = await event_services.create_events_s(body);
      if (event) {
        return res.status(201).send(event);
      }
      return res.status(500).send({ message: "Error Creating Event" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  update_events_c: async (req, res) => {
    const { params, body } = req;
    try {
      const event = await event_services.update_events_s(params, body);
      if (event) {
        return res.status(200).send(event);
      }
      return res.status(500).send({ message: "Error Updating Event" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  reorder_events_c: async (req, res) => {
    const { body } = req;
    try {
      const event = await event_services.reorder_events_s(body);
      if (event) {
        return res.status(200).send(event);
      }
      return res.status(500).send({ message: "Error Reordering Event" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  remove_events_c: async (req, res) => {
    const { params } = req;
    try {
      const event = await event_services.remove_events_s(params);
      if (event) {
        return res.status(204).send({ message: "Event Deleted" });
      }
      return res.status(500).send({ message: "Error Deleting Event" });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  getTicketHolders_events_c: async (req, res) => {
    const { params } = req;
    try {
      const ticketHolders = await event_services.getTicketHolders_events_s(params);
      return res.status(200).send(ticketHolders);
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
