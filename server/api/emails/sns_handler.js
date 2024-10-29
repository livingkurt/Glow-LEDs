import { handleBounce, handleComplaint } from "./email_management.js";

export const handleSESNotification = async notification => {
  try {
    const message = JSON.parse(notification.Message);

    switch (message.notificationType) {
      case "Bounce":
        await handleBounce(message.bounce);
        break;
      case "Complaint":
        await handleComplaint(message.complaint);
        break;
      default:
        console.log("Unknown notification type:", message.notificationType);
    }
  } catch (error) {
    console.error("Error handling SES notification:", error);
    throw error;
  }
};

export const configureSNSEndpoint = app => {
  app.post("/api/sns/email-feedback", async (req, res) => {
    try {
      // Verify SNS message signature here if needed
      const notification = req.body;

      if (notification.Type === "SubscriptionConfirmation") {
        // Handle SNS subscription confirmation
        // You should verify the subscription URL and confirm it
        console.log("SNS Subscription confirmation received");
        res.status(200).send("Subscription processed");
        return;
      }

      if (notification.Type === "Notification") {
        await handleSESNotification(notification);
        res.status(200).send("Notification processed");
        return;
      }

      res.status(400).send("Unknown notification type");
    } catch (error) {
      console.error("Error processing SNS notification:", error);
      res.status(500).send("Error processing notification");
    }
  });
};
