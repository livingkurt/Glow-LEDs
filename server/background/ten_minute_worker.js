import { send_scheduled_emails } from "./ten_minute_workers/send_scheduled_emails.js";

const ten_minute_worker = () => {
  send_scheduled_emails();
};

ten_minute_worker();
