To configure a Google Cloud Platform (GCP) Cloud Interconnect using Terraform, you can use the following code snippets. These examples cover the creation of a Cloud Router, VLAN attachments, and BGP peers.

Cloud Router Creation
First, you need to create a Cloud Router. This router will be used to manage the BGP sessions for your interconnect.

resource "google_compute_router" "gcp_cloud_router" {
  name    = "router-1"
  network = var.gcp_vpc_name
  region  = var.gcp_region
  bgp {
    asn = 16550 # The Cloud Router used by PARTNER type interconnect attachments must be assigned a local ASN of '16550'
    advertise_mode = "CUSTOM"
  }
}
VLAN Attachment Creation
Next, you create the VLAN attachments. These attachments connect your on-premises network to the GCP VPC network.

resource "google_compute_interconnect_attachment" "fcr_to_gcp" {
  project = var.gcp_project_id
  region  = var.gcp_region
  name    = "dx-to-gcp"
  edge_availability_domain = "AVAILABILITY_DOMAIN_1"
  type    = "PARTNER"
  router  = google_compute_router.gcp_cloud_router.id
  mtu     = 1500
}
BGP Peer Configuration
To configure the BGP peer, you need to create a BGP peer resource. This resource specifies the peer ASN and the IP address of the peer.

resource "google_compute_router_peer" "bgp_peer" {
  name            = "bgp-peer-1"
  router          = google_compute_router.gcp_cloud_router.name
  peer_ip_address = "192.168.1.1" # Replace with the actual peer IP address
  interface       = "fcr-to-gcp" # Replace with the actual interface name
  peer_asn        = 65000 # Replace with the actual peer ASN
}
Example for HA VPN over Cloud Interconnect
For a more complex setup, such as an HA VPN over Cloud Interconnect, you can use the following example. This example includes the creation of a VPC network, subnets, Cloud Router, VLAN attachments, and BGP peers.

provider "google" {
  region = "us-east4"
}

resource "google_compute_network" "network_havpn_ic" {
  name                    = "network-havpn-ic"
  auto_create_subnetworks = false
  routing_mode            = "GLOBAL"
}

resource "google_compute_subnetwork" "subnet_havpn_ic" {
  name          = "subnet-havpn-ic"
  ip_cidr_range = "192.168.1.0/24"
  network       = google_compute_network.network_havpn_ic.self_link
}

resource "google_compute_router" "ic_router" {
  name                          = "ic-router"
  network                       = google_compute_network.network_havpn_ic.self_link
  encrypted_interconnect_router = true
  bgp {
    asn = 65000
  }
}

resource "google_compute_interconnect_attachment" "ia_1" {
  name    = "ia-1"
  project = data.google_project.project.project_id
  router  = google_compute_router.ic_router.self_link
  interconnect = "https://www.googleapis.com/compute/v1/projects/${data.google_project.project.project_id}/global/interconnects/interconnect-zone1"
  description  = ""
  bandwidth    = "BPS_10G"
  type         = "DEDICATED"
  encryption   = "IPSEC"
  ipsec_internal_addresses = [
    google_compute_address.address_vpn_ia_1.self_link,
  ]
  vlan_tag8021q = 2001
}

resource "google_compute_router_peer" "ic_peer_1" {
  name            = "ic-peer-1"
  router          = google_compute_router.ic_router.name
  peer_ip_address = trimsuffix(google_compute_interconnect_attachment.ia_1.customer_router_ip_address, "/29")
  interface       = google_compute_router_interface.ic_if_1.name
  peer_asn        = 65098
}
These examples should help you get started with configuring GCP Cloud Interconnect using Terraform. For more detailed configurations and best practices, refer to the official GCP documentation and the provided Terraform examples.