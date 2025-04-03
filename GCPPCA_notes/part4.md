```markdown
# Google Cloud: Professional Cloud Architect (PCA) Exam Notes – Part IV
*Apr 4, 2023*

**Categories**: Cloud, GCP  
**Reading Time**: 6 min

## Storage

Open this image in a new page or tab for the full view.

### Data Transfer Appliance
- Ingest only, 100TB or 480TB high-capacity rackable storage server to physically ship data.
- Recommended for data that exceeds 10 TB or would take more than a week to upload.
- Data Rehydration is required to access and use the transferred data.
  - The data is uploaded to a staging GCS bucket compressed, deduplicated, and encrypted.
  - Data rehydration reverses this process and restores the data to a usable state.

### Storage Transfer Service
- Source can be S3, Azure Blob Storage, HTTP/HTTPS endpoint, or another GCS bucket.
- Set up scheduled or one-time transfers. You pay for its actions.
- BigQuery Data Transfer Service is different, use bq commands or API.
  - Automates data movement into BigQuery on a scheduled, managed basis.
  - Can also support copying BQ datasets from one region to another.
- Transfer Service | on-premises is used for >1TB of on-premises data.
  - An agent is installed on-prem that runs inside a Docker container, you need at least one agent per project and the workload is distributed across agents.
  - The Transfer Service uses Cloud Pub/Sub to communicate with the agents.

### gsutil Scripts and Browser-Based Tools
- Used when data is under 1TB.
- Common gsutil commands are similar to Linux file management:
  - Make Bucket: `mb`
  - Copy: `cp`
  - Move: `mv`
  - Remove: `rm`
- Another helpful table for deciding when to use which one.

### Cloud Filestore
- Fully-managed file-based storage system, multiple VMs can write to it.
- It’s a network-attached storage (NAS) solution.
  - Performance is consistent.
  - Accessible to GCE and GKE through a VPC via NFSv3 protocol.
  - Not compatible with Cloud Functions or App Engine.
- Used to need to combine with a backup system, but Google Cloud now has a built-in backup tool.
- Provisioned in TB in standard or premium tier (up to 64TB each), you pay for the provisioned amount.

### Cloud Storage (GCS)
- Infinitely scalable, fully-managed, versioned, and highly-durable object storage.
  - You create buckets, and objects go in buckets.
  - URLs are predictable, kind of like a file system, but it’s NOT a file system.
  - Accessed through a RESTful JSON or XML API, JSON is preferred.
  - Integrated site hosting and CDN functionality.
  - You only pay for what you use.
  - Control access at a uniform level with IAM (bucket or key prefix) or at object level with ACLs.
  - Signed Policy Documents specify what can be uploaded to a bucket.
  - Object Lifecycle Management can be set up to automatically delete or archive objects that meet certain rules.
  - Object Versioning can maintain multiple versions of an object.
  - Retention Policies are best for compliance.
  - Directory Synchronization can sync a VM directory with a bucket – `gsutil rsync`.
  - Use Cloud Storage FUSE (gcsfuse) to mount Cloud Storage buckets as file systems.
  - Setting a bucket to `allUsers` with Reader access makes it publicly accessible.
  - Use `gsutil label` command to set labels using flags or a JSON file.
  - `gsutil` also helps with ACLs and moving data.
  - Notify on object changes using Pub/Sub.

### Storage Classes (From Hot to Cold)
- **Multi-Regional**: Geo-redundant globally available data. Good for data that is frequently accessed.
- **Dual-Region**: High availability and low latency across 2 regions.
- **Regional**: Lower latency and stored in a single region.
- **Nearline**: Access less than once/month (backups).
- **Coldline**: Access less than once/quarter (backups).
- **Archive**: Access less than once/year.

### Encryption of VM Disks and Cloud Storage Buckets
- **Default Encryption**: Data is automatically encrypted prior to being written to the disk.
- **Customer-Managed Encryption Keys (CMEK)**: Allows customers to create, use, and revoke the key encryption key (KEK).
- **Customer-Supplied Encryption Keys (CSEK)**: Allows customers to keep keys on-premises and use them to encrypt cloud services.
- **External Key Manager**: Customer keys can also be managed by a trusted partner using External Key Manager (EKM) service.
- **Client-Side Encryption**: Data is encrypted before it is sent to the cloud with the customer’s keys and tools.
```
