import axios from "axios";
import { domain } from "../../../../helpers/sharedHelpers";

export const review_checker = async () => {
  const domainUrl = domain();
  // Replace `db` with your database connection object
  // const orders = await db.collection("orders").find({
  //   createdAt: { $lt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14) },
  //   reviewEmailSent: { $exists: false }
  // });

  // Get the current date and subtract 2 weeks to get the date 2 weeks ago
  const twoWeeksAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 14);

  // Send a request to the backend to get the orders that meet the criteria
  // const { data: orders } = await axios.get(`${domainUrl}/api/orders?createdAt=${twoWeeksAgo}`);
  // const { data: orders } = await axios.get(`${domainUrl}/api/orders?createdAt=${twoWeeksAgo}&review_email_sent=false`);
  const { data: orders } = await axios.post(`${domainUrl}/api/orders/reviews`, {
    createdAt: { $lt: twoWeeksAgo },
    review_email_sent: { $exists: false }
  });

  // Loop through the orders and send an email to each customer
  for (const order of orders) {
    // Replace `sendEmail` with your function for sending emails
    const { data } = await axios.post(`${domainUrl}/api/emails/review`, { order });

    // Send a request to the backend to mark the review email as sent
    await axios.put("/api/orders/", {
      _id: order._id,
      review_email_sent: true
    });
  }
};
