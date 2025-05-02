Terraform code for Google Cloud Platform (GCP) cloud logging can be implemented using various modules and configurations. One such module is terraform-google-modules/terraform-google-log-export, which allows you to create log exports at the project, folder, or organization level.

Here is an example of how to use this module to create a log export:

module "log_export" {
  source = "terraform-google-modules/log-export/google"
  version = "~> 10.0"

  destination_uri = "${module.destination.destination_uri}"
  filter = "severity >= ERROR"
  log_sink_name = "storage_example_logsink"
  parent_resource_id = "sample-project"
  parent_resource_type = "project"
  unique_writer_identity = true
}

module "destination" {
  source = "terraform-google-modules/log-export/google//modules/storage"
  version = "~> 10.0"

  project_id = "sample-project"
  storage_bucket_name = "storage_example_bucket"
  log_sink_writer_identity = "${module.log_export.writer_identity}"
}
This configuration sets up a log export to a Cloud Storage bucket. The log_export module is responsible for creating the log sink, while the destination module configures the Cloud Storage bucket to receive the exported logs.

Another example involves integrating GCP logging with Datadog using the GoogleCloudPlatform/terraform-gcp-datadog-integration module. This module simplifies the process of sending logs from GCP to Datadog.

Here is an example of how to use this module:

module "datadog-integration" {
  source = "./gcp-datadog-module"
  project_id = "my-gcp-project-id"
  dataflow_job_name = "datadog-export-job"
  dataflow_temp_bucket_name = "my-temp-bucket"
  topic_name = "datadog-export-topic"
  subscription_name = "datadog-export-sub"
  vpc_name = "vpc-name"
  subnet_name = "subnet-name"
  subnet_region = "us-east1"
  datadog_api_key = "ab1c23d4ef56789a0bc1d23ef45ab6789"
  datadog_site_url = "https://http-intake.logs.us5.datadoghq.com"
  log_sink_in_folder = true
  folder_id = "123456789012"
  inclusion_filter = "resource.type=gce_instance AND protoPayload.methodName=v1.compute.instances.stop"
}
This configuration sets up a log sink in a GCP folder and configures a Dataflow job to send logs to Datadog.

For a more comprehensive security logging setup in GCP, you can follow the guide provided in the article "Implementing Comprehensive Security Logging in GCP with Terraform".
 This guide covers setting up Cloud Audit Logs, VPC Flow Logs, and log sinks to export logs to Cloud Storage and BigQuery.

Here is an example of setting up a dedicated logging project and log sinks:

resource "google_project" "logging_project" {
  name = "centralized-logging"
  project_id = "centralized-logging-${random_id.project_id.hex}"
  org_id = var.organization_id
  billing_account = var.billing_account
}

resource "random_id" "project_id" {
  byte_length = 4
}

resource "google_storage_bucket" "log_bucket" {
  name = "centralized-logs-${random_id.project_id.hex}"
  location = "US"
  project = google_project.logging_project.project_id
}

resource "google_bigquery_dataset" "logs_dataset" {
  dataset_id = "security_logs"
  description = "Dataset for security logs"
  location = "US"
  project = google_project.logging_project.project_id
}

resource "google_logging_project_sink" "storage_sink" {
  name = "storage-sink"
  destination = "storage.googleapis.com/${google_storage_bucket.log_bucket.name}"
  filter = "logName:(cloudaudit.googleapis.com OR compute.googleapis.com)"
  unique_writer_identity = true
  project = google_project.logging_project.project_id
}

resource "google_logging_project_sink" "bigquery_sink" {
  name = "bigquery-sink"
  destination = "bigquery.googleapis.com/projects/${google_project.logging_project.project_id}/datasets/${google_bigquery_dataset.logs_dataset.dataset_id}"
  filter = "logName:(cloudaudit.googleapis.com OR compute.googleapis.com)"
  unique_writer_identity = true
  project = google_project.logging_project.project_id
}
This configuration creates a dedicated logging project, sets up a Cloud Storage bucket and a BigQuery dataset, and configures log sinks to export logs to these destinations.

These examples provide a starting point for implementing GCP cloud logging using Terraform. Depending on your specific requirements, you may need to customize the configurations further