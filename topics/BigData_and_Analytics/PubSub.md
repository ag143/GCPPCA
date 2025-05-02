To create a Google Cloud Pub/Sub topic and subscriptions using Terraform, you can use the following code snippet:

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "> 4.34.0"
    }
  }
}

resource "google_pubsub_topic" "default" {
  name = "my-topic"
}

resource "google_pubsub_subscription" "default" {
  name        = "my-subscription"
  topic       = google_pubsub_topic.default.name
  ack_deadline_seconds = 20
  push_config {
    push_endpoint = "https://example.com"
  }
  dead_letter_policy {
    dead_letter_topic = "projects/my-project/topics/example-dl-topic"
    max_delivery_attempts = 5
  }
}
This code creates a Pub/Sub topic named my-topic and a subscription named my-subscription that listens to messages from the topic. The subscription is configured to push messages to a specified endpoint and has a dead-letter policy set up for failed deliveries.

For more detailed configurations, such as pull subscriptions, bigquery subscriptions, cloud storage subscriptions, and more, you can refer to the official Terraform Google Cloud Pub/Sub module documentation.

Additionally, you can customize the subscriptions with various options like ack_deadline_seconds, push_endpoint, dead_letter_topic, max_delivery_attempts, and others to fit your specific requirements.

AI-generated answer. Please verify critical facts.