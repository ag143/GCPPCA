Terraform provides several ways to manage Google Cloud Platform (GCP) IAM roles and permissions. One method is using the google_project_iam_binding resource to assign roles to a list of users or service accounts. For example:

resource "google_project_iam_binding" "store_user" {
  project = var.project_id
  for_each = toset([ "roles/storage.admin", "roles/pubsub.admin", ])
  role = each.value
  members = [
    "serviceAccount:${google_service_account.store_user.email}",
  ]
}
This code assigns the specified roles to the store_user service account. Another approach is using the google_service_account_iam_binding resource to manage IAM roles for a specific service account:

resource "google_service_account_iam_binding" "storage-iam" {
  service_account_id = google_service_account.store_user.name
  role = "roles/storage.admin"
  members = [
    "serviceAccount:${google_service_account.store_user.email}",
  ]
}

resource "google_service_account_iam_binding" "pubsub-iam" {
  service_account_id = google_service_account.store_user.name
  role = "roles/pubsub.admin"
  members = [
    "serviceAccount:${google_service_account.store_user.email}",
  ]
}
These examples demonstrate how to assign multiple roles to a service account in GCP using Terraform. Additionally, the google_project_iam_member resource can be used to add a member to a role without removing other members from that role:

resource "google_project_iam_member" "project" {
  project = "your-project-id"
  role = "roles/editor"
  member = "user:alice@example.com"
}
This ensures that the specified role is assigned to the given member without affecting other members' permissions.

For managing multiple IAM roles for resources on Google Cloud, you can use the terraform-google-modules/terraform-google-iam module. This module simplifies the process of managing IAM roles for various resources:

module "storage_buckets_iam_bindings" {
  source  = "terraform-google-modules/iam/google//modules/storage_buckets_iam"
  version = "~> 8.0"

  storage_buckets = ["my-storage-bucket"]

  mode = "authoritative"

  bindings = {
    "roles/storage.legacyBucketReader" = [
      "user:josemanuelt@google.com",
      "group:test_sa_group@lnescidev.com",
    ]

    "roles/storage.legacyBucketWriter" = [
      "user:josemanuelt@google.com",
      "group:test_sa_group@lnescidev.com",
    ]
  }
}
This code uses the module to manage IAM bindings for storage buckets, ensuring that only the roles specified in the module are applied.

Each method has its own advantages and use cases, depending on the specific requirements and existing configurations of your GCP environment