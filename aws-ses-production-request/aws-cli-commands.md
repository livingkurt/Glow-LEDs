# AWS CLI Commands for SES Setup

## 1. Create Configuration Set

```bash
aws ses create-configuration-set \
  --configuration-set '{
    "Name": "GlowLEDsEmailMetrics"
  }'
```

## 2. Create SNS Topic

```bash
aws sns create-topic \
  --name ses-feedback \
  --attributes DisplayName="SES Feedback"
```

## 3. Create Event Destination

First, save your SNS topic ARN from the previous command output, then:

```bash
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

## 4. Configure SNS Subscription

Replace YOUR_DOMAIN with your domain (e.g., www.glow-leds.com):

```bash
aws sns subscribe \
  --topic-arn YOUR_SNS_TOPIC_ARN \
  --protocol https \
  --notification-endpoint https://YOUR_DOMAIN/api/sns/email-feedback
```

## Verification Steps

1. Verify Configuration Set:

```bash
aws ses describe-configuration-set \
  --configuration-set-name GlowLEDsEmailMetrics
```

2. Verify SNS Topic:

```bash
aws sns list-topics
```

3. Verify SNS Subscriptions:

```bash
aws sns list-subscriptions
```

## Environment Variables to Update

After setting up the above, update your .env file with:

```
AWS_SES_REGION=us-east-1
AWS_SNS_TOPIC_ARN=your-sns-topic-arn
```

## Testing the Setup

1. Send a test email:

```bash
aws ses send-email \
  --from "noreply@glow-leds.com" \
  --destination "ToAddresses=test@example.com" \
  --message "Subject={Data=Test Email,Charset=utf8},Body={Text={Data=This is a test email,Charset=utf8}}" \
  --configuration-set-name GlowLEDsEmailMetrics
```

2. Check CloudWatch for metrics:

```bash
aws cloudwatch get-metric-statistics \
  --namespace AWS/SES \
  --metric-name Send \
  --dimensions Name=ConfigurationSet,Value=GlowLEDsEmailMetrics \
  --start-time $(date -v-1H +%Y-%m-%dT%H:%M:%S) \
  --end-time $(date +%Y-%m-%dT%H:%M:%S) \
  --period 3600 \
  --statistics Sum
```
