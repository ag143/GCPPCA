## creating bucket
To create a storage bucket, you can use the google_storage_bucket resource. Here is a sample configuration:
```
resource "google_storage_bucket" "static" {
  name          = "my-bucket"
  location      = "US"
  storage_class = "STANDARD"
  uniform_bucket_level_access = true
}
```

## update

To upload an object to a bucket, you can use the google_storage_bucket_object resource. Here is a sample configuration:

```
resource "google_storage_bucket_object" "sample_file" {
  name   = "sample_file.txt"
  bucket = google_storage_bucket.static.name
  source = "~path/to/sample_file.txt"
  content_type = "text/plain"
}
```

## Managing object lifecycle: 

To manage the lifecycle of objects in a bucket, you can use the lifecycle_rule attribute within the google_storage_bucket resource. Here is a sample configuration:

```
resource "google_storage_bucket" "static" {
  name          = "my-bucket"
  location      = "US"
  storage_class = "STANDARD"
  lifecycle_rule {
    action {
      type = "Delete"
    }
    condition {
      age = 30
    }
  }
}
```