# Email Management System

This system implements comprehensive email handling for AWS SES, including bounce and complaint management, email validation, and suppression list handling.

## Features

- Bounce handling
- Complaint management
- Email validation
- Suppression list
- Admin notifications
- SNS integration
- Email tracking

## Setup Instructions

### 1. AWS SES Configuration

First, ensure you have AWS CLI installed and configured with appropriate credentials. Then run these commands:

```bash
# Create Configuration Set
aws ses create-configuration-set \
  --configuration-set '{
    "Name": "GlowLEDsEmailMetrics"
  }'

# Create SNS Topic
aws sns create-topic \
  --name ses-feedback \
  --attributes DisplayName="SES Feedback"

# Note: Save the TopicArn from the output

# Create Event Destination
aws ses create-configuration-set-event-destination \
  --configuration-set-name GlowLEDsEmailMetrics \
  --event-destination '{
    "Name": "bounce-complaints",
    "Enabled": true,
    "MatchingEventTypes": ["bounce", "complaint"],
    "SNSDestination": {
      "TopicARN": "YOUR_SNS_TOPIC_ARN"
    }
  }'
```

### 2. Environment Variables

Update your .env file with:

```bash
AWS_SES_REGION=us-east-1
AWS_SNS_TOPIC_ARN=your-sns-topic-arn
ADMIN_EMAIL=your-admin-email
```

### 3. SNS Endpoint Setup

After deploying your application:

1. Get your application's URL (e.g., https://www.glow-leds.com)
2. Subscribe the SNS topic to your endpoint:

```bash
aws sns subscribe \
  --topic-arn YOUR_SNS_TOPIC_ARN \
  --protocol https \
  --notification-endpoint https://YOUR_DOMAIN/api/sns/email-feedback
```

## Usage

### Sending Emails

```javascript
await sendEmail("info", {
  from: "noreply@glow-leds.com",
  to: "recipient@example.com",
  subject: "Test Email",
  html: "<h1>Hello World</h1>",
});
```

### Checking Email Status

```javascript
const status = await validateEmailBeforeSending("test@example.com");
if (status.isValid) {
  // Proceed with sending
} else {
  // Handle invalid email
}
```

## Monitoring

The system automatically tracks:

- Bounce rates
- Complaint rates
- Delivery success rates
- Email engagement metrics

Admin notifications are sent for:

- Hard bounces
- Spam complaints
- High bounce/complaint rates

## Database Schema

### EmailStatus Collection

```javascript
{
  email: String,
  status: String, // 'active', 'bounced', 'complained'
  bounceType: String,
  bounceSubType: String,
  lastBounceDate: Date,
  complaintFeedbackType: String,
  lastComplaintDate: Date,
  suppressionReason: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

### Common Issues

1. SNS Subscription Confirmation

   - Check your endpoint is accessible
   - Verify SSL certificate is valid
   - Check server logs for confirmation request

2. Email Sending Failures

   - Verify SES configuration set exists
   - Check SNS topic ARN is correct
   - Ensure email addresses are verified in SES

3. Monitoring Issues
   - Check CloudWatch metrics are enabled
   - Verify SNS permissions
   - Check admin email notifications are configured

### Verification Steps

1. Test Configuration:

```bash
aws ses describe-configuration-set \
  --configuration-set-name GlowLEDsEmailMetrics
```

2. Test SNS Topic:

```bash
aws sns list-topics
aws sns list-subscriptions
```

3. Send Test Email:

```bash
aws ses send-email \
  --from "noreply@glow-leds.com" \
  --destination "ToAddresses=test@example.com" \
  --message "Subject={Data=Test Email,Charset=utf8},Body={Text={Data=This is a test email,Charset=utf8}}" \
  --configuration-set-name GlowLEDsEmailMetrics
```

For detailed AWS CLI commands and setup instructions, see `aws-ses-production-request/aws-cli-commands.md`.
