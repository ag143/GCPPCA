To manage access in Looker using Terraform, you can use a Terraform provider specifically designed for Looker. Here’s how you can set up and use Terraform to manage Looker resources:

Setting Up the Terraform Provider
Choose a Terraform Provider for Looker:
Resolution Life Provider: This provider is available on GitHub and supports various Looker resources. You can find it here.
Devoteam GCloud Provider: Another option is the Devoteam GCloud provider, which is also open source and available on GitHub here.
Install the Provider:
Add the provider to your Terraform configuration file (main.tf):
terraform {
  required_providers {
    looker = {
      source = "resolutionlife/looker"
      version = ">= 0.1.0"  # Check for the latest version
    }
  }
}

provider "looker" {
  base_url    = "https://your-looker-instance.cloud.looker.com"
  client_id   = "your-client-id"
  client_secret = "your-client-secret"
}
Initialize Terraform:
Run the following command to initialize Terraform and download the provider:
terraform init
Example Terraform Code for Managing Looker Resources
Create a LookML Project:
Note that while you can create a LookML Project using the Looker API, you cannot delete it, which means it doesn't fully adhere to the CRUD principle. However, you can manage other aspects of the project using Terraform.
Example:
resource "looker_lookml_project" "example_project" {
  name = "example_project"
}
Create a Model Set:
A model set is a group of one or more models. You can define a model set to control access to specific models.
Example:
resource "looker_model_set" "example_model_set" {
  name = "example_model_set"
  models = ["example_model"]
}
Create a Role:
Roles in Looker are linked to permission sets and model sets. You can create roles to manage access for different teams.
Example:
resource "looker_role" "example_role" {
  name = "example_role"
  permission_set_id = looker_permission_set.example_permission_set.id
  model_set_id = looker_model_set.example_model_set.id
}
Create a Permission Set:
Permission sets define the permissions that a role will have.
Example:
resource "looker_permission_set" "example_permission_set" {
  name = "example_permission_set"
  permissions = ["see_looks", "see_user_dashboards"]
}
Assign Roles to Users:
You can assign roles to users to manage their access.
Example:
resource "looker_user_attribute_value" "example_user_attribute_value" {
  user_id = "user_id"
  name = "example_role"
  value = "example_role"
}
Finalizing the LookML Project
After running terraform apply, you will need to finalize the LookML project manually. This involves confirming the project in the Looker UI, as Terraform cannot handle this step automatically.
Logging and Debugging
To aid in debugging, you can set the TF_LOG_PROVIDER environment variable to the desired log level:
export TF_LOG_PROVIDER=DEBUG
terraform apply
Limitations
No Official Terraform Provider: There is no official Terraform provider for Looker, which can be a pain point.
Manual Actions: Some actions, like finalizing the LookML project, still require manual intervention.
By following these steps, you can efficiently manage access and resources in your Looker instance using Terraform