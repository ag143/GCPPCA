
# Google Cloud: Professional Cloud Architect (PCA) Exam Notes – Part VII
*Apr 7, 2023*

**Categories**: Cloud, GCP  
**Reading Time**: 14 min

## Google Kubernetes Engine (GKE)
GKE is Google’s managed version of Kubernetes. It is a popular container orchestration engine.

### GKE Overview
- Sits between IaaS and PaaS.
- Manages and maintains logging, health management, and monitoring of clusters.
- Easy to update Kubernetes clusters; choose release channel based on update frequency.
- Create regional GKE clusters to improve availability and resilience by distributing components across zones in a region.

### Container Review
- Popularized by Docker: write once, run anywhere.
- Single package of everything needed to run an app (excluding external dependencies).
- Consistency across dev/test/prod environments.
- Loose coupling between application and OS layers.
- Simplifies migration between on-prem and cloud.
- Supports agile development and operations.
- Great for microservices.
- Use Cloud Artifact Registry for Docker containers in a private repo.

### General Kubernetes (K8s) Notes
- **Pods**: Smallest deployable unit in GKE, often containing a single container. Sidecars (e.g., proxies) may be included.
- **Deployments**: Declarative, desired state for Pods and/or ReplicaSets. Supports rolling updates, rollback, and scaling.
- **ReplicaSets**: Maintain a stable set of replica pods.
- **StatefulSets**: Manage stateful applications, providing ordering and uniqueness of pods.
- **DaemonSets**: Ensure all nodes run a copy of a pod (e.g., log collection, monitoring tools).
- **CronJobs and Jobs**: Schedule and manage tasks. CronJobs create jobs on a repeating schedule.
- **Init Containers**: Execute before application containers in a pod.
- **Taints and Tolerations**: Control pod placement on nodes.
- **Operators**: Extend Kubernetes API functionality with custom resource definitions (CRDs).

### Automatically Scaling Deployments
- **HorizontalPodAutoscaler**: Auto-scales pod replicas based on CPU, memory, or custom metrics.
- **VerticalPodAutoscaler**: Recommends or applies CPU and RAM requests, suitable for stateful deployments.
- **Cluster Autoscaler**: Scales cluster nodes based on pod capacity. Works best with Node Pools.

### Services Overview
- **Service Types**:
  - **ClusterIP**: Internal IP address for pods.
  - **NodePort**: Exposes service on each Node’s IP at a static port.
  - **LoadBalancer**: Creates a GCP Network Load Balancer.
- Configured with selectors and labels to group pods.

### Health Checks
- **Liveness Probes**: Check if a pod is running.
- **Readiness Probes**: Check if a pod is ready to serve traffic.
- Probes are performed by handlers (ExecAction, TCPSocketAction, HTTPGetAction).

### Accessing External Services
- **Service Endpoints**: Services with no selector, map to an IP or FQDN.
- **Sidecars**: Provide a connection to external services.

### Volumes & Persistent Storage
- **PersistentVolume**: Defines a piece of storage in the cluster.
- **PersistentVolumeClaim**: Claims durable storage for a pod.
- **Volume Types**:
  - **emptyDir**: Scratch space for a pod.
  - **gcePersistentDisk**: GCP-native volume type.
  - **PersistentVolumeClaim**: Mounts a PersistentVolume into a pod.

### ConfigMaps & Secrets
- **Secrets**: Obfuscate sensitive data and insert at runtime.
- **ConfigMaps**: Decouple app configuration from image content.

### Kubernetes Deployment Patterns
- **Rolling Updates**: Gradually replace pods with an updated spec.
- **Canary Deployments**: Deploy updates to a small subset of traffic.
- **Blue-Green Deployments**: Maintain two versions of the application deployment, switching traffic between them.

### Helm: The Kubernetes Package Manager
- Packages Kubernetes object manifests and configurations into Helm charts.
- Install Helm tool and use Artifact Hub to find charts.
- Example commands:
  - `helm repo add bitnami https://charts.bitnami.com/bitnami`
  - `helm install my-wordpress bitnami/wordpress`

### Advanced Ingress Controls
- Ingress objects configure access to services from outside the cluster.
- Designed for HTTP and HTTPS services.
- Requires an Ingress Controller (e.g., NGINX).
- Multi-cluster ingress for replicating application deployments across multiple GKE clusters using `kubemci`.

### Running a Secure GKE Cluster
- **Private Clusters**: Use internal IP addresses only.
- **Binary Authorization**: Ensures only signed and authorized images are deployed.
- **Role-Based Access Control (RBAC)**: Regulates object access to cluster resources.
- **Namespaces & Resource Restrictions**: Isolate resources for multiple teams or projects.
- **Pod Security Policies**: Control security-sensitive aspects of a pod spec (deprecated).
- **Network Policies**: Define ingress and egress rules for pods.
- **Workload Identities**: Access GCP services securely from GKE applications.

### Service Mesh Overview
- **Data Plane**: Sidecar container running a proxy (Envoy in Istio).
- **Control Plane**: Configures data plane, collects traffic metrics, and manages authorization (Pilot, Mixer, Citadel).
- **Traffic Director**: GCP’s managed traffic control plane for service mesh.
