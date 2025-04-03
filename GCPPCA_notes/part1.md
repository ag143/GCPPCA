```markdown
# Helpful Links

- [gcloud command-line tool cheat sheet](#)
- [Google Cloud Developer Cheat Sheet](#)
- Important SRE Chapters: Chapter 2, Chapter 6, Chapter 17
- Last Revision of Case Studies (A lot of online training materials still references these.)
  - Mountkirk Games, TerramEarth
- [Professor Messer’s Network+ Training Course](#) (Great for brushing up on networking basics as needed, especially when thinking about VPCs, Interconnects, Cloud NATs, etc.)

## Billing Constructs

- Billing account is linked to a customer’s Payment Profile
- A billing account stores a customer’s payment info and billing address. It is where costs accrue to and charges are raised
- A billing account may be set to “online” (e.g. credit card) or “offline” (e.g. invoice)
- Projects can be linked to a billing account, and they can be from separate organizations
- Disabling billing on a project removes this link and resources will stop functioning
- Billing can be set up to export into BigQuery for detailed reporting and visual representation, and seen in the console under billing reports
- Committed Use Discounts (CUDs) and Flex CUDs are for VMs only and provide customers with the ability to pre-purchase Google Cloud resource usage at a discounted rate. Resource-based CUDs are linked to a project and cannot be moved. Flex CUDs are not restricted to a specific region, project, or VM series. CUDs (like quotas) do not guarantee capacity. For guaranteed capacity, be sure to purchase a Reservation.

## Scale & Automation

- Zones have independent power, cooling, and networking and are grouped together in a region. Regions are combined into multi-regions, currently the US, Europe, and Asia are available.
- Engineer reliability into the systems and automate the systems
- Resource Quotas are scoped at the Regional and Global level
  - Changes can be automatic or by request, and you will generally hear back from Google in 24-48 hours
  - Queryable with the gcloud command: `gcloud compute project-info describe`
- Reservations ensure customers have capacity available. Quotas don’t guarantee a resource will be available, you need to ensure you have enough capacity.
- Quotas provide protection against cost overrun and can be indicators of bad code. They assist in isolation from other poorly behaved GCP customers, you can increase your quotas as your projects expand and most quotas are applied per project.
- Use project liens to protect projects from being accidentally deleted
- Use Deployment Manager for Infrastructure Automation (Templates)
  - It’s like Google Cloud’s version of Terraform, repeatable YAML declarative files for cloud infrastructure. Can use Python or Jinja2 templates to parametrize config.
  - Unlike Cloud Shell, Deployment Manager will deploy resources in parallel
  - `gcloud deployment-manager deployments create name --config vm.yaml`
  - `gcloud deployment-manager deployments describe name`
  - Idempotence means that you can repeat commands and the result will be the same. Immutability means that something will never change.
  - Config Connector is a Kubernetes addon that allows you to manage GCP resources through Kubernetes. This also works with Anthos.
  - Cloud Code has a collection of starter templates in various languages, you can easily enable GCP APIs from your IDE, it includes Secret Manager. It’s a developer’s tool. Code snippets and inline docs for YAML

## GCP Marketplace

- Used to be called Cloud Launcher. The marketplace contains integrated solutions vetted by GCP to cover IT needs that aren’t native to Google Cloud.

## Monitoring

- White-Box Monitoring is monitoring based on the internals of a system. This includes logs, interfaces, and HTTP handlers. This is good for predicting problems and failures
- Black-Box Monitoring is testing externally visible behavior as a user would experience it and will help find current active problems. Also known as end-to-end monitoring.
- Four Important Metrics if nothing else: (LETS) “Four Golden Signals for Monitoring”
  1. Latency: The time it takes to service a request
  2. Errors: Rate of requests that fail
  3. Traffic: How much demand is being placed on your system
  4. Saturation: How “full” a service is, emphasizing most constrained components
- Consider your tolerance for outliers. Average and median values can skew data, so consider a percentile instead.
- Percentiles are typically used in metrics instead of averages. A good place to start is p50, p90, and p99. p50 is the median, p90 throws out the bottom 90% of requests, and p99 throws out the bottom 99%. Creating good alarms is the key to metric productivity, but you don’t want to get bogged down by false positives.

## Software Testing

- Unit Testing is the smallest and simplest form of testing. It is used to assess a separable unit of software, such as a class or a function
- Integration Testing combines unit tests into larger components to verify that larger components run correctly
- System Testing is for testing end-to-end functionality of your application, and there are several different types:
  - Smoke Tests (or sanity tests) test very simple but critical behavior
  - Performance tests ensure that performance stays where it needs to be
  - Regression tests test against a known set of bugs to make sure they’re not re-introduced
- Production Tests
  - Canary tests are to test a subset of production servers upgraded with new software and left to incubate for a period of time to discover problems. If there are no problems, release to the rest of the servers. If there are problems, roll those few servers back
  - Be sure to review the other types of deployment testing options Kubernetes
  - Stress/Load Tests discover the limits of a system. How full can it get before writes start to fail? Discover when autoscaling kicks in
- Make it a culture…
  - “Hope is not a strategy.” – Corey Bertram
  - Establish a strong testing culture by documenting all reported bugs as test cases. If every bug is converted into a test, each test is supposed to initially fail because the bug hasn’t yet been fixed.
  - As engineers fix the bugs, the software passes testing and you’re on the road to developing a comprehensive regression test suite.
  - Set up a testing infrastructure. The foundation for a strong testing infrastructure is a versioned source control system that tracks every change to the codebase.
  - Once source control is in place, add a continuous build system that builds the software and runs tests every time code is submitted. [Google] found it optimal if the build system notifies engineers the moment a change breaks a software project.
- Continuous Integration (CI)
  - Development practice that requires developers to integrate (check in) code to a shared repository branch often called Trunk or Main (GitHub, BitBucket, etc.) many times per day
  - Cloud Source Repositories are GCP’s private Git repositories. Use `gcloud source repos create`
  - Each check-in should be verified by an automated build process that will pass or fail to allow development teams to detect problems early
  - Popular CI tools include Jenkins (self deployed/managed), CircleCI (SaaS), and TravisCI (SaaS)
- Continuous Deployment (CD)
  - Next logical step after CI, refers to the deployment/release of software that passes automated tests/builds into production
  - Automated Testing Tools Include: Selenium, JUnit
  - Popular CD tools include Jenkins, Spinnaker (both self deployed/managed) or Cloud Build
  - Artifact Registry is for build artifacts (this is the next generation of Container Registry)
  - Cloud Build is Google’s CI/CD pipeline tool
- Blue/Green Deployments (or Red/Black if you’re at Netflix)
  - Simply the process of having two sets of machines. One set (Blue) has the current software and the other set (Green) has the new software. Then, switch the traffic from blue to green. If there is a problem, just switch it back!

## Operations Suite: Cloud Monitoring & Logging

- Cloud Logging has a lot of service integrations and can be a go-to sink for any logs. One account can track many projects and other resources
  - Store, search, analyze, monitor and alert on log data and events
  - Can send log data in real time to BigQuery for advanced analytics
  - Can export log data to GCS to cost-effectively store log archives
  - Can stream logs to Pub/Sub for third-party SIEM such as Splunk
  - Great way to debug App Engine Standard issues
  - Can create log-based metrics
  - Default retention is 30 days
- Cloud Monitoring includes built-in and custom metrics, dashboards, global uptime monitoring, and alerts
  - Offers both white-box and black-box monitoring techniques described above.
  - There are pre-defined metrics set up already, but you can create custom metrics using Python and they can be very complex
- Error Reporting smartly aggregates errors into meaningful groups tailored to a language/framework. Notifies you when new errors are detected.
- Trace tracks and displays call trees and timings across distributed systems. Trace API and SDKs for other languages available.
  - Latency reporting and sampling, provides latency statistics to discover performance bottlenecks
- Debugger grabs program state (callstack, variables, expressions) in live deployments. Agent based. Source view supports Cloud Source Repository, Github, Bitbucket, local and upload
  - Supports Python, Node.js, Java, Go, Ruby, PHP, or .NET Core on GCE, GKE, and GAE
  - Automatically enabled on GAE
  - Can share debugging with coworkers with a URL
  - Works best when your source code is available
  - Does not impact your end users and you can debug your apps in prod
- Profiler continuously monitors CPU and memory profiles to improve performance and reduce cost. Typically uses 0.5% but a max of 5% overhead. Agent based.
- Cloud Billing API allows you to programmatically manage billing for GCP projects and get GCP pricing. Can also get things like regional availability
  - Current bill isn’t available now, but can be exported to GCS or BQ
- Security Marks: Use to group/classify resources for compliance requirements, used with Cloud Security Command Center
- Labels: Use to group resources for a billing breakdown, they are key:value pairs
- Network Tags: Use to manage network traffic to/from VMs
- Resource Groups in cloud monitoring allow you to monitor resources grouped together
- Cloud Scheduler is a fully managed cron job service.
- Cloud Tasks is a fully managed service to manage execution, dispatch and delivery of a large number of distributed tasks. You can asynchronously perform work outside of a user request. Your tasks can be executed on App Engine or any arbitrary HTTP endpoint.

## Development & API Tools

- Cloud Source Repositories are hosted, private Git repositories with integrations to GCP and other hosted repos. Can automatically sync from GitHub or Bitbucket
  - Natural integration with Cloud Monitoring Debugger
- Cloud Build turns your source code into build artifacts. CI/CD service that continuously takes source code, and builds, tests, and deploys it. 
  - Can be connected to Cloud Source Repository, GitHub, Bitbucket with Cloud Source Repositories RepoSync feature
  - Runs many builds in parallel
  - Dockerfile makes this super-simple build+push and includes package vulnerability scanning
  - Private Pools are dedicated pools of workers that are customer-specific resources for additional security
- Container Registry is a fast, private Docker image storage with Docker V2 Registry API
  - Like Dockerhub, it creates and manages a multi-regional GCS bucket and translates Google Container Registry calls to the underlying GCS service
  - Integrates with IAM, quickly deploys because of GCP networking to GCS
  - Native Docker login support
  - You just pay for GCS
- Cloud Deploy is a fully managed continuous delivery service that is tightly integrated with GKE and the Google Cloud environment. It’s similar to Jenkins.
- Cloud Endpoints handles authorization, monitoring, logging, and API keys for APIs backed by GCP. Based on NGINX (v1) or Envoy (v2), the proxy instances are distributed and connect to Cloud Load Balancer. Uses JWTs for claims and integrates with Firebase.
  - Runs on your instance
  - Extensible Service Proxy (ESP) can transcode HTTP/JSON to gRPC
  - Pay per call to your API
  - Supports OpenAPI standard
- Apigee is a full-featured and enterprise-scale API management platform for whole API lifecycle management. Transform calls between different protocols including SOAP, REST, XML, binary, and authenticate via OAuth/SAML/LDAP and RBAC. 
  - Throttle with quotas, manage API versions
  - Senses suspicious activities, can add monetization tools
```
