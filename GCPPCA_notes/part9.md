
# Google Cloud: Professional Cloud Architect (PCA) Exam Notes – Part IX
*Apr 9, 2023*

**Categories**: Cloud, GCP  
**Reading Time**: 13 min

## Databases
**Further Reading**: For a comprehensive overview of database design, read *Designing Data-Intensive Applications* by Martin Kleppmann.

### General Recommendations for Databases
- Use good connection management practices, such as connection pooling and exponential backoff.
- Secure and isolate connections to your database.
- Shard your database instances whenever possible.
- Avoid very large transactions, but don’t send too many small ones – batch them!
- When migrating a database requiring a quick cutover, consider streaming the most recent data using tools like Cloud Dataflow.
- Be open to new tools suited for the job when reimplementing or replacing systems.

### Relational Databases

#### Cloud SQL
- Fixed Schema, fully-managed and reliable MySQL, PostgreSQL, or SQL Server.
- Supports automatic replication, backup, and failover.
- Manual scaling for compute resources; automatic for storage.
- Best for transactional workloads (OLTP), not analytics (OLAP).
- Regional service, can span zones but not regions.
- Good for web frameworks (e-commerce) and content management systems (CMS).
- Use read replicas for performance and failover replicas for high availability.
- Best Practices:
  - Use Cloud SQL Auth Proxy for added security.
  - Use private IP networking and Cloud SQL proxy without a public IP address for additional security.
  - If public IP is needed, use built-in firewall with a narrow IP list and require SSL.

#### Cloud Spanner
- Fixed Schema, horizontally scalable, strongly consistent relational database service.
- Combines relational database structure with non-relational horizontal scale.
- Regional, Multi-Regional, or Global service.
- Good for large-scale applications, financial, inventory, gaming, global meta-data.
- Fully managed ACID relational database without planned downtime.
- Supports stale reads and timestamp bounds.
- PostgreSQL interface available.

#### AlloyDB for PostgreSQL
- Fully managed PostgreSQL-compatible database for enterprise workloads.
- Great migration target for Oracle databases.
- 100x faster for analytics queries.
- Built-in Vertex AI capabilities.
- Root resource is a cluster containing primary and read pool instances.
- 99.99% SLA.

### Non-Relational or NoSQL Databases

#### Cloud Bigtable
- NoSQL, Zonal, Schemaless, Key-Value Store with eventual consistency.
- Ideal for analytical and operational workloads such as time series, marketing, financial data, IoT streaming.
- Scale to Terabytes or Petabytes.
- Supports open-source HBase API.
- High throughput, heavy read and write events.
- Best Practices:
  - Design row keys with common queries in mind.
  - Avoid hot spots by not starting row keys with timestamps or using sequential numbers.
  - Tables should be tall and narrow.

#### Cloud Datastore
- NoSQL, Schemaless, hierarchical, good for user profiles, product catalogs, game state.
- Managed and autoscaled NoSQL database with indexes, queries, and ACID transaction support.
- Regional and multi-regional service.
- Best Practices:
  - Use batch operations for reads, writes, and deletes.
  - Avoid high read/write rates to lexicographically close documents.
  - Use sharding or replication to handle hotspots.

#### Cloud Firestore
- Next version of Datastore.
- Multi-Regional, Serverless, Pay for what you use.
- NoSQL document database with real-time client updates via managed websockets.
- Good for user profiles, user messaging, product catalogs, game state, offline/edge data.
- Contains collections, documents, and contained data.
- ACID transactions, multi-region replication, powerful query engine.

#### Cloud Memorystore
- Fully managed Redis or Memcached.
- Good for caching web/mobile app data like user sessions or game state.
- Up to 300 GB instances for Redis, 5TB for Memcached.
- Redis provides 12 Gbps throughput, sub-millisecond latency.

#### Firebase Realtime Database
- Not to be confused with the wider Firebase platform.
- Single, potentially huge JSON doc located in central US.
- NoSQL, pay more for GB/month stored and GB downloaded.

### Data & Analytics Tools

#### Cloud Dataflow
- Autoscaled fully managed batch or stream processing.
- Based on Apache Beam.
- Serverless, fast, cost-effective service for streaming and batch processing.
- Use Apache Beam SDK open source libraries (Java, Python).
- Read data from a source into a parallel collection, transform it, write final collection to a sink.
- Monitoring job metrics at step and worker level.
- Fully managed no-ops, Google manages rebalancing underlying compute cluster.

#### Cloud Dataprep
- Visually explore, clean, and prepare data for analysis without running servers.
- Data Wrangling tool for business analysts.
- Managed by Trifacta Wrangler.
- UI-Driven data preparation.
- Scales on-demand.

#### Cloud Dataproc
- Batch MapReduce processing via configurable, managed Spark and Hadoop clusters.
- Pay for underlying compute servers, can use preemptible for all but one node.
- Best for migrating existing Hadoop/Spark Applications.
- Use the Jobs API to scale Dataproc clusters to reduce costs.

#### Cloud Composer
- Based on Apache Airflow for Workflow Orchestration.
- Directed Acyclic Graphs (DAGs) written in Python.
- Supports hybrid and multi-cloud.

#### Data Catalog
- Fully managed and scalable metadata management service.
- Provides data discovery, cataloging system, and strong security and compliance foundation with Cloud DLP and IAM integrations.
- Can add Structured Tags for business metadata to tables and columns within tables.

#### Cloud Data Fusion
- Fully managed, cloud-native data integration service.
- Graphical interface and broad open-source library of preconfigured connectors and transformations.
- Creates a Spark pipeline and runs it on a Dataproc cluster.

### Data Warehousing

#### BigQuery
- Fixed Schema Enterprise Data Warehouse.
- Multi-regional serverless column-store data warehouse for analytics using SQL.
- Serverless database, scales internally.
- Pay for the GBs that BigQuery “considers” or “scans” during queries.
- Best Practices:
  - Avoid SELECT *; only query the columns needed.
  - Price queries before running them using the pricing calculator or dry-run flag.
  - Use clustering and partitioning to reduce data scanned.
  - Set up clustering and partitioning in the beginning if possible.
  - Break queries into stages by writing results to a destination table.
  - Use expiration settings to remove unneeded tables and partitions.
  - Leverage Policy Tags for column-level security.
  - Authorized Views let you share query results without giving access to the underlying source data.

### Additional Database Notes
- Managed partner solutions on the marketplace and self-managed options on Bare Metal Solution.
- Managed Wide-Column, Apache HBASE will always be Bigtable.
- Cloud Native Databases:
  - Firestore: Fast, fully managed serverless, real-time at global scale.
  - Bigtable: Scales up well, key-value wide-column focusing on low latency, scalability, and reliability.
  - Cloud Spanner: OLTP and relational database services combined with horizontal scalability.
