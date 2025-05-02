# Google Compute Engine

 is an Infrastructure-as-a-Service (IaaS) product that offers self-managed virtual machines (VMs) hosted on Google's infrastructure.
 It allows customers to use powerful virtual machines in the cloud as server resources instead of acquiring and managing server hardware.
 Compute Engine supports both Linux and Windows operating systems and provides local and durable storage options.

Compute Engine VMs are implemented as virtual CPUs (vCPUs) on Google's KVM hypervisor, with each vCPU corresponding to a single hardware hyper-thread on one of the available CPU platforms.
 Customers can configure and run a wide variety of virtual machine configurations, including multiple flavors of Linux and Windows Server.

Compute Engine integrates with other Google Cloud technologies, such as Cloud Storage, App Engine, and BigQuery, to extend beyond basic computational capabilities and create more complex and sophisticated applications.
 It also offers flexible pricing options, including a free tier that provides one e2-micro VM instance, up to 30 GB standard persistent disk storage, and up to 1 GB of outbound data transfers per month.

Compute Engine supports various machine types and instance groups, and users can interact with it through the Cloud Console or command-line tools like gcloud.

# Terraform code

```
resource "google_compute_instance" "default" {
  name         = "my-vm"
  machine_type = "n1-standard-1"
  zone         = "us-central1-a"

  boot_disk {
    initialize_params {
      image = "ubuntu-minimal-2210-kinetic-amd64-v20230126"
    }
  }

  network_interface {
    network = "default"
    access_config {}  # Enables a public IP address
  }
}
```
