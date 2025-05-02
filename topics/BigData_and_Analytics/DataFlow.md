Note that you have declared temp_gcs_location as "gs://${var.gcs_location}/tmp_dir" but then, in terraform.tvars you set gcs_location as "gs://www/yyy" (so the gs:// prefix appears twice). In any case, the job should be launched but then fail to create.

I made a minimal example with the following versions:

$ terraform --version
Terraform v0.12.20
+ provider.google v3.5.0

and using the Google-provided word count template. My main.tf file is:

variable "project_id" {
  type        = string
  description = "GCP Project ID."
}
variable "gcs_location" {
  type        = string
  description = "GCS bucket name (no gs:// prefix)."
}

provider "google" {
  project = var.project_id
  region  = "us-central1"
  zone    = "us-central1-c"
}

resource "google_dataflow_job" "wordcount" {
  name              = "wordcount"
  template_gcs_path = "gs://dataflow-templates/latest/Word_Count"
  temp_gcs_location = "gs://${var.gcs_location}/temp"
  parameters = {
    inputFile = "gs://dataflow-samples/shakespeare/kinglear.txt"
    output = "gs://${var.gcs_location}/wordcount/output"
  }
}

and df.tfvars (change with the appropriate values):

project_id = "PROJECT_ID"
gcs_location = "BUCKET_NAME"

I run it with:

terraform apply -var-file="df.tvars"

and the job is successfully created:

google_dataflow_job.wordcount: Creating...
google_dataflow_job.wordcount: Creation complete after 3s [id=2020-01-27_...]

Let me know if this helps.