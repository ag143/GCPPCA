To use Terraform in Cloud Shell, you can start by writing a simple Terraform configuration file. For example, in AWS CloudShell, you can create a file named main.tf with the following code to create an S3 bucket:

resource "aws_s3_bucket" "example" {
  bucket = "my-example-bucket"
}
For Google Cloud Shell, you can create a similar file to provision a Cloud Storage bucket:

resource "google_storage_bucket" "this" {
  name = "my-example-bucket"
}
For Alibaba Cloud CloudShell, you can create a file to provision a VPC and VSwitch:

provider "alicloud" {}

resource "alicloud_vpc" "vpc" {
  name       = "my-example-vpc"
  cidr_block = "172.16.0.0/12"
}

resource "alicloud_vswitch" "vsw" {
  vpc_id            = alicloud_vpc.vpc.id
  cidr_block        = "172.16.0.0/21"
  availability_zone = "cn-hangzhou-b"
}
Once you have your Terraform configuration file, you can run the following commands to initialize, plan, and apply your configuration:

terraform init
terraform plan
terraform apply
These commands will initialize the Terraform configuration, show you the execution plan, and then apply the changes to create the resources in your cloud environment respectively.

Remember to format your configuration files with terraform fmt to ensure they are syntactically correct and consistent