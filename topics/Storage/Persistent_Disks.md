## Persistent Disk

To create a persistent disk in Terraform for Google Cloud Platform (GCP), you can use the google_compute_disk resource. Here is an example of how to define a persistent disk in Terraform:

resource "google_compute_disk" "example_disk" {
  name   = "example-disk"
  type   = "pd-ssd"
  zone   = "us-central1-a"
  sizeGb = 10
}
This code creates a persistent SSD disk named example-disk in the us-central1-a zone with a size of 10GB. You can customize the name, type, zone, and sizeGb variables to fit your specific requirements.

To attach this persistent disk to a VM instance, you can use the google_compute_instance resource and specify the disk in the disk attribute:

resource "google_compute_instance" "example_instance" {
  name         = "example-instance"
  machine_type = "e2-medium"
  zone         = "us-central1-a"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  disk {
    source = google_compute_disk.example_disk.id
    mode   = "READ_WRITE"
  }

  network_interface {
    network = "default"
    access_config {}
  }
}
This code creates a VM instance named example-instance and attaches the previously created persistent disk to it. The mode attribute specifies the access mode for the disk, which can be READ_WRITE or READ_ONLY.

For more information and detailed configurations, you can refer to the official Terraform documentation for Google Cloud Persistent Disks.

Persistent disks in GCP continue to exist even after the VM they are attached to is deleted, ensuring data persistence and availability