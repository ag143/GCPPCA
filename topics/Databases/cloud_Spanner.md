Terraform can be used to manage Cloud Spanner instances and databases. Below is an example of Terraform code to create a Cloud Spanner instance and a database within it:

provider "google" {
  project = "PROJECT_ID"
}

resource "google_spanner_instance" "main" {
  config = "regional-us-central1"
  display_name = "first-terraform-instance"
  num_nodes = 3
}

resource "google_spanner_database" "database" {
  instance = google_spanner_instance.main.name
  name = "my-first-database"
  ddl = [
    "CREATE TABLE t1 (t1 INT64 NOT NULL,) PRIMARY KEY(t1)",
    "CREATE TABLE t2 (t2 INT64 NOT NULL,) PRIMARY KEY(t2)"
  ]
}
This code snippet includes the necessary resources to create a Spanner instance and a database with two tables. The google_spanner_instance resource specifies the instance configuration and the number of nodes. The google_spanner_database resource defines the database name and the Data Definition Language (DDL) statements to create tables within the database.

To apply these changes, you would run terraform apply in your terminal, and Terraform will create the specified resources in your Google Cloud project.

For more detailed examples and best practices, you can refer to the official documentation and codelabs provided by Google