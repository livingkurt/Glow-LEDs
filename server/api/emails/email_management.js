import mongoose from "mongoose";
import User from "../users/user.js";
import { sendEmail } from "../orders/order_interactors.js";
import config from "../../config.js";

// Schema for tracking bounces and complaints
const EmailStatusSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  status: { type: String, enum: ["active", "bounced", "complained"], default: "active" },
  bounceType: String,
  bounceSubType: String,
  lastBounceDate: Date,
  complaintFeedbackType: String,
  lastComplaintDate: Date,
  suppressionReason: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

EmailStatusSchema.index({ email: 1 });
const EmailStatus = mongoose.model("EmailStatus", EmailStatusSchema);

// Suppression list management
export const addToSuppressionList = async (email, reason) => {
  try {
    const emailStatus = await EmailStatus.findOneAndUpdate(
      { email: email.toLowerCase() },
      {
        $set: {
          status: "bounced",
          suppressionReason: reason,
          updatedAt: new Date(),
        },
      },
      { upsert: true, new: true }
    );

    // Update user's email subscription status
    await User.updateOne({ email: email.toLowerCase() }, { $set: { email_subscription: false } });

    return emailStatus;
  } catch (error) {
    console.error("Error adding to suppression list:", error);
    throw error;
  }
};

// Bounce handling
export const handleBounce = async bounceData => {
  try {
    const { bounceType, bounceSubType, bouncedRecipients } = bounceData;

    await Promise.all(
      bouncedRecipients.map(async recipient => {
        const { emailAddress } = recipient;

        // Update email status
        await EmailStatus.findOneAndUpdate(
          { email: emailAddress.toLowerCase() },
          {
            $set: {
              status: "bounced",
              bounceType,
              bounceSubType,
              lastBounceDate: new Date(),
              updatedAt: new Date(),
            },
          },
          { upsert: true }
        );

        // Add to suppression list if it's a permanent bounce
        if (bounceType === "Permanent") {
          await addToSuppressionList(emailAddress, `Permanent bounce: ${bounceSubType}`);
        }

        // Log bounce event
        console.log(`Bounce handled for ${emailAddress}: ${bounceType} - ${bounceSubType}`);

        // Notify admin if it's a permanent bounce
        if (bounceType === "Permanent") {
          await sendAdminNotification("bounce", {
            email: emailAddress,
            bounceType,
            bounceSubType,
          });
        }
      })
    );
  } catch (error) {
    console.error("Error handling bounce:", error);
    throw error;
  }
};

// Complaint handling
export const handleComplaint = async complaintData => {
  try {
    const { complainedRecipients, complaintFeedbackType } = complaintData;

    await Promise.all(
      complainedRecipients.map(async recipient => {
        const { emailAddress } = recipient;

        // Update email status
        await EmailStatus.findOneAndUpdate(
          { email: emailAddress.toLowerCase() },
          {
            $set: {
              status: "complained",
              complaintFeedbackType,
              lastComplaintDate: new Date(),
              updatedAt: new Date(),
            },
          },
          { upsert: true }
        );

        // Add to suppression list
        await addToSuppressionList(emailAddress, `Complaint: ${complaintFeedbackType}`);

        // Log complaint event
        console.log(`Complaint handled for ${emailAddress}: ${complaintFeedbackType}`);

        // Notify admin
        await sendAdminNotification("complaint", {
          email: emailAddress,
          complaintFeedbackType,
        });
      })
    );
  } catch (error) {
    console.error("Error handling complaint:", error);
    throw error;
  }
};

// Email validation before sending
export const validateEmailBeforeSending = async email => {
  try {
    const emailStatus = await EmailStatus.findOne({ email: email.toLowerCase() });

    if (!emailStatus) {
      return { isValid: true };
    }

    if (emailStatus.status !== "active") {
      return {
        isValid: false,
        reason: `Email ${emailStatus.status} - ${emailStatus.suppressionReason || emailStatus.bounceType}`,
      };
    }

    return { isValid: true };
  } catch (error) {
    console.error("Error validating email:", error);
    throw error;
  }
};

// Admin notification
const sendAdminNotification = async (type, data) => {
  try {
    const subject =
      type === "bounce"
        ? `Email Bounce Alert - ${data.bounceType}`
        : `Email Complaint Alert - ${data.complaintFeedbackType}`;

    const htmlBody =
      type === "bounce"
        ? `
        <h2>Email Bounce Detected</h2>
        <p>Email: ${data.email}</p>
        <p>Bounce Type: ${data.bounceType}</p>
        <p>Bounce Sub-Type: ${data.bounceSubType}</p>
        <p>Time: ${new Date().toISOString()}</p>
      `
        : `
        <h2>Email Complaint Received</h2>
        <p>Email: ${data.email}</p>
        <p>Complaint Type: ${data.complaintFeedbackType}</p>
        <p>Time: ${new Date().toISOString()}</p>
      `;

    await sendEmail("info", {
      from: config.DISPLAY_INFO_EMAIL,
      to: config.ADMIN_EMAIL,
      subject,
      html: htmlBody,
    });
  } catch (error) {
    console.error("Error sending admin notification:", error);
  }
};

// Export the model for use in other files
export const EmailStatusModel = EmailStatus;
