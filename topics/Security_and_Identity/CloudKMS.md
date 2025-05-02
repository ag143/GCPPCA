To create KMS keys in GCP using Terraform, you can follow the steps outlined in the Knoldus Blogs post. First, ensure that the Cloud Key Management Service (KMS) API is enabled and that your service account has the necessary permissions for KMS resources. Then, you can use the following Terraform code to create a key ring and a key:

provider "google" {
  credentials = file("~/gcp/access-keys.json")
  project     = var.project_id
  region      = var.region
}

resource "google_kms_key_ring" "key_ring" {
  name     = var.key_ring_name
  location = var.location
}

resource "google_kms_crypto_key" "key" {
  name            = var.key_name
  key_ring        = google_kms_key_ring.key_ring.id
  rotation_period = "100000s"
}

resource "google_kms_crypto_key_iam_binding" "crypto_key" {
  crypto_key_id = google_kms_crypto_key.key.id
  role          = "roles/cloudkms.cryptoKeyEncrypterDecrypter"
  members       = ["serviceAccount:service-${data.google_project.project.number}@compute-system.iam.gserviceaccount.com"]
}
After setting up the variables in var.tf and terraform.tfvars, you can initialize, plan, and apply the resources with the following commands:

terraform init
terraform plan
terraform apply
This code will create a key ring and a crypto key within that key ring, and it will bind the key to a service account with the cloudkms.cryptoKeyEncrypterDecrypter role