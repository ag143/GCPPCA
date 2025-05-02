To configure workload identity federation for Google Cloud Platform (GCP) using Terraform, you can use the mscribellito/terraform-google-workload-identity-federation module. This module helps in setting up the necessary components for workload identity federation, including creating a workload identity pool and provider.

Here is an example of how to use the module in your Terraform code:

module "github-wif" {
  source = "mscribellito/workload-identity-federation/google"

  project_id = var.project_id
  pool_id    = "github-pool"
  provider_id = "github-provider"

  attribute_mapping = {
    "google.subject" = "assertion.sub"
    "attribute.actor" = "assertion.actor"
    "attribute.aud" = "assertion.aud"
    "attribute.repository" = "assertion.repository"
  }

  issuer_uri = "https://token.actions.githubusercontent.com"

  service_accounts = [
    {
      name = data.google_service_account.preexisting.name
      attribute = "attribute.repository/my-org/my-repo"
      all_identities = true
    }
  ]
}
In this example, the module "github-wif" block sets up the workload identity federation for GitHub Actions. The project_id, pool_id, and provider_id are specified to create the necessary resources. The attribute_mapping block defines how external identities are mapped to GCP identities. The issuer_uri specifies the URI of the external identity provider, and service_accounts lists the service accounts and their attributes that will be used for authentication.

Make sure to replace var.project_id, data.google_service_account.preexisting.name, and other placeholders with actual values relevant to your environment.

For more detailed information and additional configurations, you can refer to the module's documentation and examples provided in the GitHub repository