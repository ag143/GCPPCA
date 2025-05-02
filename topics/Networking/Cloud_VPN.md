Terraform code for setting up a Cloud VPN gateway in Google Cloud Platform (GCP) can be found in the GitHub repository.
 The code includes resources for creating a Cloud VPN gateway, external IP address, and IPsec tunnels. Additionally, there are examples for setting up a high availability (HA) VPN gateway between Google Cloud networks.

Here is a simplified example of Terraform code for creating a Cloud VPN gateway:

resource "google_compute_ha_vpn_gateway" "ha_gateway" {
  region  = "us-central1"
  name    = "ha-vpn"
  network = google_compute_network.network.id
}

resource "google_compute_external_vpn_gateway" "external_gateway" {
  name = "external-gateway"
  redundancy_type = "SINGLE_IP_INTERNALLY_REDUNDANT"
  description = "An externally managed VPN gateway"
  interface {
    id = 0
    ip_address = "8.8.8.8"
  }
}

resource "google_compute_network" "network" {
  name = "network-1"
  routing_mode = "GLOBAL"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "network_subnet1" {
  name = "ha-vpn-subnet-1"
  ip_cidr_range = "10.0.1.0/24"
  region = "us-central1"
  network = google_compute_network.network.id
}

resource "google_compute_router" "router1" {
  name = "ha-vpn-router1"
  network = google_compute_network.network.name
  bgp {
    asn = 64514
  }
}

resource "google_compute_vpn_tunnel" "tunnel1" {
  name = "ha-vpn-tunnel1"
  region = "us-central1"
  vpn_gateway = google_compute_ha_vpn_gateway.ha_gateway.id
  peer_external_gateway = google_compute_external_vpn_gateway.external_gateway.id
  peer_external_gateway_interface = 0
  shared_secret = "a secret message"
  router = google_compute_router.router1.id
  vpn_gateway_interface = 0
}

resource "google_compute_vpn_tunnel" "tunnel2" {
  name = "ha-vpn-tunnel2"
  region = "us-central1"
  vpn_gateway = google_compute_ha_vpn_gateway.ha_gateway.id
  peer_external_gateway = google_compute_external_vpn_gateway.external_gateway.id
  peer_external_gateway_interface = 0
  shared_secret = "a secret message"
  router = google_compute_router.router1.id
  vpn_gateway_interface = 1
}
This code sets up a high availability (HA) VPN gateway and connects it to an external peer network.

For more detailed examples and configurations, you can refer to the GitHub repositories mentioned above