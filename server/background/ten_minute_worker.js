const { send_scheduled_emails } = require("./ten_minute_workers/send_scheduled_emails");

const ten_minute_worker = () => {
  send_scheduled_emails();
};

ten_minute_worker();
