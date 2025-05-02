To configure Google Cloud CDN with Terraform, you can use the following resources: google_compute_backend_bucket, google_compute_url_map, google_compute_target_http_proxy, google_compute_global_forwarding_rule, and google_compute_global_address.

First, you need to set up a backend bucket with Cloud CDN enabled. This involves creating a bucket and configuring it to serve as the origin server for the CDN. Here’s an example configuration:

resource "google_storage_bucket" "default" {
  name = "my-bucket"
  location = "us-east1"
  uniform_bucket_level_access = true
  storage_class = "STANDARD"
}

resource "google_compute_backend_bucket" "default" {
  name = "cat-backend-bucket"
  description = "Contains beautiful images"
  bucket_name = google_storage_bucket.default.name
  enable_cdn = true
  cdn_policy {
    cache_mode = "CACHE_ALL_STATIC"
    client_ttl = 3600
    default_ttl = 3600
    max_ttl = 86400
    negative_caching = true
    serve_while_stale = 86400
  }
}
Next, you need to create a URL map that routes traffic to the backend bucket. Then, you create a target HTTP proxy and a global forwarding rule to direct traffic to the URL map.

resource "google_compute_url_map" "default" {
  name = "http-lb"
  default_service = google_compute_backend_bucket.default.id
}

resource "google_compute_target_http_proxy" "default" {
  name = "http-lb-proxy"
  url_map = google_compute_url_map.default.id
}

resource "google_compute_global_forwarding_rule" "default" {
  name = "http-lb-forwarding-rule"
  ip_protocol = "TCP"
  load_balancing_scheme = "EXTERNAL"
  port_range = "80"
  target = google_compute_target_http_proxy.default.id
}
This setup allows you to serve content through a global CDN, offloading static content requests from your web application servers and improving performance.

Additionally, you can find a complete example in the GitHub repository 
 , which includes creating a GCP bucket, Cloud DNS, CDN, and load balancer to serve static files. The repository provides a detailed guide on how to deploy and configure these resources using Terraform