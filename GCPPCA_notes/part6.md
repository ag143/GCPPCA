# Google Cloud: Professional Cloud Architect (PCA) Exam Notes – Part VI
*Apr 6, 2023*

**Categories**: Cloud, GCP  
**Reading Time**: 4 min

## App Engine
App Engine is a platform for building scalable web applications and mobile and IoT backends. It provides built-in services and APIs, such as NoSQL datastores, memcache, and a user authentication API. App Engine can automatically scale your application in response to traffic, so you pay only for the resources you use. Just upload your code and Google will manage your app’s availability—you don’t need to provision or maintain a single server.

- **Traffic Splitting**: Split traffic between deployment versions by IP address, Cookie, or Random.
- **Traffic Migration**: Migrate traffic between deployment versions.

### Standard Environment
- Supports specific versions of Java, Python, PHP, Node.js, Ruby, and Go.
- Must conform to sandbox constraints (no writing to the local file system, 60-second timeouts, limited 3rd party software installation).
- Automatically scales and load balances; scales to 0 instances when not in use.
- Store state in a data tier since you can’t write to the local file system.
- Takes about 15 minutes to scale down; if you need compute power for less than 15 minutes, consider Cloud Run.

### Flexible Environment
- Takes longer to startup, must have a minimum of 1 instance.
- Supports longer request timeouts, background processes, SSH into instance, writing to local disk, modifying the runtime, using websockets, and 3rd party binaries.
- Another way to run containers on Google Cloud, but Cloud Run is the future.
- Supports .NET Core framework in addition to the languages supported by App Engine Standard.

## Cloud Functions
Cloud Functions lets you build automation code that runs for a short duration and can perform actions in a scalable fashion. It acts as glue to stitch together various pieces of your applications without worrying about infrastructure management.

- Write simple, single-purpose functions attached to events emitted from your cloud infrastructure and services.
- Triggered when an event being watched is fired.
- Executes in a fully managed environment; no need to provision infrastructure or manage servers.
- To improve performance and latency:
  - Reduce the amount of imported code.
  - Don’t use lazy initializations.
  - Reuse global variables in future invocations.
- Functions will retry on failure, but it’s not enabled by default.

## Cloud Run
Cloud Run is a managed compute platform enabling you to run stateless containers invocable through web requests or Pub/Sub events. It abstracts away infrastructure management, allowing you to focus on building great applications. Built from Knative, it lets you run containers either fully managed or in your GKE cluster with Cloud Run for Anthos.

- **Service and Revisions**: A deployment is called a Service, creating a new revision with each deployment (up to 1,000 past revisions).
- **Rollbacks and Traffic Management**: Supports rollbacks and gradual rollouts using traffic management tools.
- **Integration**: Combine with Cloud Build to automatically deploy new revisions using `cloudbuild.yaml`.
- **Triggers**: By default, triggered by an HTTPS request; can also be triggered by Pub/Sub, scheduled with Cloud Scheduler or Cloud Tasks.
- **Serverless VPC Connector**: Access internal IPs in a VPC when your serverless environment needs to access data from your on-premises database.
- **Configuration**: Default configuration uses 1 CPU and 256MiB of RAM (up to 2 CPUs and 2GiB of RAM). Timeout set to 300 seconds (up to 900 seconds). Default concurrency is 80 requests.

