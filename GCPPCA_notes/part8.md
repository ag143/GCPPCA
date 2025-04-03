# Google Cloud: Professional Cloud Architect (PCA) Exam Notes – Part VIII
*Apr 8, 2023*

**Categories**: Cloud, GCP  
**Reading Time**: 5 min

## Anthos
Anthos is an umbrella term for a suite of products. It is a 100% software-based solution and is portable by nature, aimed at helping customers get the most out of their underlying hardware. The components are primarily managed services built on top of open-source tools.

### Anthos Dashboard
- Provides a secure, unified interface to view and manage applications.
- Helps with cluster management, observability into health and performance, configuration management views, and features such as multi-cluster ingress.

### Core Components

#### Policy Management
- **Anthos Config Management and Policy Controller**:
  - Single pane of glass for managing configurations and policies both on-prem and in the cloud.
  - Great for multi-cluster management; declarative and continuous.
  - Automates policy and security at scale.
  - Uses a Git repository to create common configurations for Kubernetes clusters in the Anthos fleet.
  - Policy Controller manages policies at every stage of deployment.

#### Application Development & Deployment
- **GCP Marketplace** (for Anthos compatible apps)
- **Cloud Run for Anthos** (Built with Knative)
- **Cloud Build for Anthos**
- **Binary Authorization**

#### Service Management
- **Anthos Service Mesh** (Built with Istio):
  - Google Cloud’s managed control plane and commercial version of Istio.
  - Sidecar proxy deployed as a container on every pod, handling all traffic in and out of services.
  - Can “inject chaos” for testing.

#### Container Management
- **Anthos GKE** (Built on Kubernetes)

#### Operations Management
- **ServiceOps**
- **Cloud Monitoring**
- **Cloud Logging**

### Computing Environments

#### Anthos on Google Cloud
- Google Cloud hosts the control plane; the Kubernetes API server is the only accessible control-plane component.
- GKE manages the nodes in the customer’s project with GCE instances.

#### Anthos on-prem
- Used to be only on VMware, now available on other virtualized environments and bare metal.
- Components:
  - **Admin Workstation**: Linux workstation for installation, scaling, and upgrading using gkectl.
  - **Admin Cluster**: Manages lifecycle operations.
  - **User Clusters**: Runs user workloads, managed with gkectl.
  - **Load Balancer**: Exposes workloads, options include Bundled-LB, F5 BigIP, Citrix, NSX.

#### Anthos on AWS
- All components are hosted in the customer’s AWS environment.

#### Attached Clusters
- Used when Kubernetes distribution is offered through another cloud.
- Anthos does not manage the Kubernetes control plane or nodes, just the services running on the cluster.
- Uses the “GKE Connect Agent” for connectivity.

### Anthos Fleets (Formerly Environs)
- Organizes clusters to manage multi-cluster capabilities and apply consistent policies.
- Clusters can only be part of one fleet.
- Features enabled and configured across all infrastructure in the fleet.

### Migrate for Anthos
- Converts VM workloads into containers running on GKE or Anthos clusters.
- Ensure workload suitability for migration (supported OS, not a large database, etc.) and follow planning steps and best practices.
```
