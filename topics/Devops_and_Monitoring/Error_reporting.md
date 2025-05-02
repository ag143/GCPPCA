Terraform Cloud Error Reporting
To set up Google Cloud Error Reporting using Terraform, you can create an alerting policy that triggers based on error logs. Below is an example of how you can configure a Terraform resource to monitor and alert on errors in Cloud Functions:

resource "google_monitoring_alert_policy" "cloud_function_errors" {
  project      = var.project
  enabled      = var.alerts_enabled
  display_name = "${var.cf_name}-errors"
  combiner     = "OR"

  conditions {
    display_name = "${var.cf_name}-errors"
    condition_matched_log {
      filter = "resource.type=\"cloud_function\" resource.labels.function_name=\"${var.cf_name}\" resource.labels.project_id=${var.project} AND severity>=ERROR"
    }
  }

  alert_strategy {
    auto_close = "604800s"
    notification_rate_limit {
      period = "3600s"
    }
  }

  notification_channels = var.alerts_notification_channels
}
This configuration sets up an alert policy that triggers when there are errors (severity level >= ERROR) in a specified Cloud Function. The alert will be active for 7 days before auto-closing and will limit notifications to once per hour. 

For other platforms like Cloud Run, the resource type and labels may differ. You should adjust the filter parameter accordingly to match the specific resource type and labels of your application. 

To configure similar alerting policies for different services or thresholds, you can refer to the documentation and examples provided by Google Cloud for setting up monitoring and alerting policies using Terraform