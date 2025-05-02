To create a VPC in Google Cloud Platform (GCP) using Terraform, you can use the following code as a template:

provider "google" {
  credentials = file("")
  project     = ""
  region      = "us-central1"
}

resource "google_compute_network" "vpc_network" {
  name = "terraform-network"
}

resource "google_compute_subnetwork" "public-subnetwork" {
  name          = "terraform-subnetwork"
  ip_cidr_range = "10.2.0.0/16"
  region        = "us-central1"
  network       = google_compute_network.vpc_network.name
}
This code initializes the Google provider with your service account file path and project ID, then defines a VPC network and a public subnetwork within that network.

To use this code, you need to replace <path_to_your_service_account_file> and <your_project_id> with your actual service account file path and project ID respectively. After setting up the necessary environment and running terraform init, you can apply the configuration with terraform apply.

Additionally, you can customize the VPC network and subnetwork settings according to your requirements by modifying the parameters in the google_compute_network and google_compute_subnetwork resources.