To set up and manage Firebase projects and products via Terraform, you can use a configuration file like main.tf. This file includes the necessary provider setup and resource blocks to create a new Firebase project and enable Firebase services on it. Here is an example of how to configure your main.tf file:

# Terraform configuration to set up providers by version.
terraform {
  required_providers {
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 4.0"
    }
  }
}

# Configure the provider not to use the specified project for quota check.
# This provider should only be used during project creation and initializing services.
provider "google-beta" {
  alias = "no_user_project_override"
  user_project_override = false
}

# Configure the provider that uses the new project's quota.
provider "google-beta" {
  user_project_override = true
}

# Enable the required underlying APIs: the Service Usage API and Firebase Management API.
resource "google_project_service" "serviceusage" {
  provider = google-beta.no_user_project_override
  project = google_project.default.project_id
  service = "serviceusage.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "firebase" {
  provider = google-beta.no_user_project_override
  project = google_project.default.project_id
  service = "firebase.googleapis.com"
  disable_on_destroy = false
}

# Create a new Google Cloud project.
resource "google_project" "default" {
  provider = google-beta.no_user_project_override
  name = "Project Display Name"
  project_id = "project-id-for-new-project"
  billing_account = "000000-000000-000000"
}

# Enable Firebase services for the new project created above.
resource "google_firebase_project" "default" {
  provider = google-beta
  project = google_project.default.project_id
  depends_on = [google_project_service.firebase, google_project_service.serviceusage]
}
This configuration file sets up the necessary providers and resource blocks to create a new Firebase project and enable Firebase services on it. After setting up the configuration file, you can initialize and apply the Terraform configuration using the following commands:

terraform init
terraform apply
To manage additional Firebase products like Firestore, Functions, and Storage, you can extend your main.tf file with the appropriate resource blocks. For example, to create a Firestore database, you would add a resource block for google_firestore_database. Similarly, for Firebase Functions, you can use the google_cloudfunctions2_function resource, as shown in the Stack Overflow example.

For detailed information and more examples, you can refer to the Firebase documentation on Terraform