Terraform can be used to manage Cloud SQL resources on Google Cloud Platform. Below is an example of how to create a Cloud SQL instance using Terraform:

provider "google" {
  version = "3.10.0"
  credentials = file("[NAME].json")
  project = "[PROJECT_ID]"
  region = "us-east1"
  zone = "us-east1-d"
}

resource "random_id" "db_name_suffix" {
  byte_length = 4
}

resource "google_sql_database_instance" "postgres" {
  name = "postgres-instance-${random_id.db_name_suffix.hex}"
  database_version = "POSTGRES_11"
  settings {
    tier = "db-f1-micro"
    user_labels = {
      "environment" = "development"
    }
    backup_configuration {
      enabled = true
      start_time = "04:30"
    }
  }
}
This code snippet creates a PostgreSQL database instance with automatic backups enabled and scheduled to start at 04.

Additionally, you can find deployable, reusable Terraform modules for Cloud SQL on the official Terraform on Google Cloud documentation page.
 These modules can help streamline the setup and management of Cloud SQL instances.

For more advanced configurations, such as setting up a Cloud SQL instance with a private IP, you can use the Terraform modules provided in the terraform-google-cloudsqlnetworking repository.
 This repository offers solutions to simplify networking configurations for Cloud SQL instances, making it easier to set up and manage Cloud SQL instances and their dependencies.

terraform-google-sql-db: Creates a Cloud SQL database instance.
terraform-google-cloudsqlnetworking: Simplifies networking configuration for Cloud SQL instances.
terraform-google-sql: Terraform modules for deploying Google Cloud SQL (e.g., MySQL, PostgreSQL) in GCP.
These repositories provide comprehensive examples and documentation to help you manage Cloud SQL resources effectively using Terraform