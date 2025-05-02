Terraform can be used to deploy speech-to-text services on different cloud platforms. For IBM Cloud, you can use the following Terraform configuration to deploy a speech-to-text app on IBM Container Service:

provider "ibm" {
  ibmcloud_api_key = var.bluemix_api_key
}

resource "ibm_container_cluster" "speech_to_text_cluster" {
  name              = var.cluster_name
  resource_group_id = ibm_resource_group.resource_group.id
  zone              = "us-south"
  worker_pools {
    name       = "primary"
    flavor     = "bx2-4x16"
    count      = 1
    disk_size  = 100
    volume_type = "standard"
  }
}

resource "ibm_resource_group" "resource_group" {
  name = "speech-to-text-resource-group"
}

resource "ibm_container_kubeconfig" "speech_to_text_kubeconfig" {
  cluster_id = ibm_container_cluster.speech_to_text_cluster.id
}

resource "ibm_container_service" "speech_to_text_service" {
  cluster_id = ibm_container_cluster.speech_to_text_cluster.id
  name       = var.service_instance_name
  service    = var.service_offering
}
This code sets up an IBM Cloud Container Service cluster and deploys a speech-to-text service within it. You need to define the variables bluemix_api_key, cluster_name, service_instance_name, and service_offering in your Terraform configuration or as environment variables.

For Azure, you can use the following Terraform code to create a Speech Service resource:

provider "azurerm" {
  features = {}
}

resource "azurerm_resource_group" "speech_to_text_rg" {
  name     = "speech-to-text-rg"
  location = "East US"
}

resource "azurerm_cognitive_services_account" "speech_to_text" {
  name                = "speech-to-text-account"
  resource_group_name = azurerm_resource_group.speech_to_text_rg.name
  location            = azurerm_resource_group.speech_to_text_rg.location
  sku_name            = "S0"
  kind               = "SpeechServices"
}
This code creates a resource group and a Speech Service resource in Azure. The azurerm_cognitive_services_account resource specifies the kind of service as SpeechServices and sets the SKU to S0.

For Google Cloud Platform (GCP), while there is no specific Terraform resource for Cloud Speech-to-Text, you can manage the prerequisites and dependencies using Terraform. Here is an example of how to set up a GCP project, enable the Speech-to-Text API, and configure IAM permissions:

provider "google" {
  project = "your-gcp-project-id"
  region  = "us-central1"
}

resource "google_project" "speech_to_text_project" {
  name = "speech-to-text-project"
  project_id = "speech-to-text-project-id"
  org_id = "your-organization-id"
}

resource "google_project_service" "speech_service" {
  project = google_project.speech_to_text_project.project_id
  service = "speech.googleapis.com"
  disable_dependent_services = true
}

resource "google_project_iam_member" "speech_to_text_admin" {
  project = google_project.speech_to_text_project.project_id
  role    = "roles/speech.admin"
  member  = "serviceAccount:your-service-account-email"
}
This code creates a GCP project, enables the Speech-to-Text API, and grants the specified service account administrative access to the Speech-to-Text service.

These examples provide a basic setup for deploying speech-to-text services on IBM Cloud, Azure, and GCP using Terraform. You may need to customize the configurations based on your specific requirements and cloud provider guidelines