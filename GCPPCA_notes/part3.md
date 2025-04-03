```markdown
# Google Cloud: Professional Cloud Architect (PCA) Exam Notes – Part III
*Apr 3, 2023*

**Categories**: Cloud, GCP  
**Reading Time**: 8 min

## Security

- Always remember to embrace the separation of duties and defense in depth.
- In Google Cloud, everything is always encrypted at rest and in transit.
- Distrust the network entirely, focus on identity with products like BeyondCorp.

### Cloud Identity
- Cloud Identity is an Identity as a Service (IDaaS) solution that centrally manages users and groups.
- When you adopt Cloud Identity, you create a Cloud Identity account for each of your users and groups. You can then use Identity and Access Management (IAM) to manage access to Google Cloud resources for each Cloud Identity account. This prevents users from using personal accounts to access corporate resources.
- If you already have a different corporate directory such as Microsoft AD or another LDAP provider and want to use the users/groups in your existing directory service, you can schedule a one-way sync using Google Cloud Directory Sync (GCDS) to send the data to your Cloud Identity domain.
  - Syncing one-way preserves your existing IdP as the source of truth, then you can federate back to the service (AD FS in the Microsoft worlds).

### Identity & Access Management (IAM)
- Identity and access management is a cornerstone of your Google Cloud deployment because it provides the authorization controls to Google Cloud resources. Using IAM, you manage employee, customer, and other identities and their respective access authorizations.
- At a high level, a role is a collection of permissions, roles are granted to users (hopefully groups!) by using an IAM policy.

#### Permissions
- Allow you to perform a certain action.
- Service.Resource.Verb pattern (examples are `pubsub.subscriptions.consume` or `pubsub.topics.publish`).
- Usually corresponds to a Google Cloud REST API method.

#### Roles
- Collection of permissions to use or manage resources.
- Primitive (basic) roles – project-level and often too broad.
  - Viewer is read-only.
  - Editor can view and change things.
  - Owner can also control access and billing.
- Predefined roles – Granular access to specific resources.
  - `roles/bigquery.dataEditor`
  - `roles/pubsub.subscriber`
  - For best test results, review the roles for each product and service.
- Custom Roles – Set at the project or organization level.
  - Combine roles or pick and choose permissions.
  - Combined Roles do not include new permissions that are added to the platform over time, use predefined when possible to future-proof your IAM policies.
  - If you delete a custom role, you can undelete it within 7 days using `gcloud iam roles undelete` command.

#### Bindings (Policies)
- Binds members to roles for some scope of resources.
- They answer the question, “Who can do what to which things?”
- Policies are defined at a level in the resource hierarchy such as organization, folder, project, or resource. Resources inherit the policies of their parent resource, child policies cannot restrict access granted at the parent level.
- Roles and Members are listed in a policy, but Resources are identified by attachment.
- As of Jul’ 22, they are Allow only, never subtractive. There are no “deny” rules today, but they are in Public Preview. Apr ’23 update: Looks like they’ve launched!
- Again, child policies cannot restrict access granted at a higher level!
- One policy per resource, maximum of 1,500 member bindings per policy – but you should be using groups instead!!! Limit of 250 group bindings in a policy.
- Usually takes less than a minute to apply changes, but may take up to 7 minutes to fully propagate.
- You can use IAM Conditions to define and enforce conditional, attribute-based access for resources. For example, you could grant access only to employees making a request from a corporate office.
  - Note: Conditions cannot be applied to basic roles (Owner, Editor, Viewer, allUsers, allAuthenticatedUsers).

### Best Practices
- Use groups instead of individual accounts!
- Federate your identity provider with Google Cloud, use Cloud Identity if you don’t have an existing IdP.
- Focus on Least Privilege and granting roles at the smallest scope needed.
- Remember that service account keys are not encryption keys.
- Export audit logs to Cloud Storage to store your logs for longer periods of time.
- Use projects to group resources that share the same trust boundary, important in regulated industries.
- Set IAM bindings (policies) at the organization and project levels rather than the resource levels to make inheritance easy and comprehensive.

### Cloud IAM Product
- By default, only project owners can create new roles. They can grant IAM Role Administrator to others on the same project, and Organization Administrators can grant the Organization Role, Administrator role for organizations. (`roles/iam.roleAdmin` and `roles/iam.organizationRoleAdmin`).
- To see role metadata (role ID and permissions) use `gcloud iam roles describe [NAME]`.
- `gcloud iam list-grantable-roles` to see all roles that can be applied on a resource.
- To create a new custom role, use `gcloud iam roles create [role name]` and provide a YAML `--file` that contains the role definition or flags.
- Roles can be in Beta, Alpha, or GA mode – these are role “stages.” Also use role Stage to mark a role as DISABLED. `gcloud iam roles update ROLE --stage DISABLED --project ID`.
- Include the etag value if you are updating roles using YAML files to ensure other people’s changes are not conflicting. You can also use flags to simplify this, such as: 
  - `gcloud iam roles update viewer --add-permissions storage.buckets.get`.

### Service Accounts
- Service accounts provide an identity for carrying out server-to-server interactions.
- Programs running within GCE can automatically acquire access tokens with credentials.
  - Tokens are used to access any service API in your project and any other services that granted access to that service account.
- Service accounts are convenient when you’re not accessing user data.
- Service accounts authenticate with keys:
  - GCP-Managed Keys cannot be downloaded and are automatically rotated.
  - User-managed Keys means you have to create, manage, and rotate yourself.
    - Can be used with apps outside of Google Cloud that need access to Google Cloud APIs.
- You can give users access to impersonate or manage service accounts.
- Use Service Accounts Insights to list SAs not used in the past 90 days.
- Use Activity Analyzer to see reports about SAs latest usage.

### Security Management Products
- **Cloud Armor**: Edge-level protection from DDoS and other attacks on global HTTP(S) LB.
  - Offloads work, blocked attacks never reach your systems.
  - Detailed request-level logs are available in monitoring.
  - Manage IPs with CIDR allow/block lists, can preview changes before making them.
  - Additional intelligent rules are coming.
- **Security Scanner**: Free but limited Google App Engine vulnerability scanner with “very low false positive rates.”
  - It’s a free web app scanner.
  - Automatically crawls and exercises as many user inputs and event handlers as possible such as XSS, flash injection, mixed content (HTTP/S) and outdated/insecure libraries.
- **Cloud DLP API**: Finds and optionally redacts sensitive information in unstructured data streams. Minimizes what you collect, expose, or copy to other systems. Has over 50 data detectors including names, credit card numbers, etc.
  - Can send data directly or an API can be pointed at GCS, BQ, or Cloud DataStore.
  - Be sure to assign appropriate IAM roles to DLP Service Accounts when configuring storage systems.
  - Can be integrated with Data Catalog.
  - Can scan text and images.
- **Cloud Security Command Center (Cloud SCC)**: GCP’s SIEM.
  - Review the full list of services and tools.
  - Prevent, detect, and respond to threats from a single pane of glass.
  - Other security vendors can integrate their offerings.
  - Can use “Security Marks” to group, track, and manage resources.
  - Event Threat Detection is part of Security Command Center and automatically scans logs for suspicious activity, kind of like Splunk. Uses industry-leading threat intelligence including Google Safe Browsing.
    - Quickly detects malware, crypto, outgoing DDoS, port scanning, brute-force SSH.
    - Unauthorized access to GCP resources via abusive IAM access.
    - Can export parsed logs to BigQuery for forensic analysis.
    - Integrates with Cloud Security Command Center natively or another SIEM via Cloud Pub/Sub.
- **Organizational Policy Service**: Gives you centralized and programmatic control over your organization’s cloud resources. Centralize control to configure restrictions on how your organization’s resources can be used. Define and establish guardrails for your development teams to stay compliant, and help project owners and their teams move fast without breaking things.
  - Some examples include:
    - Ensure external Google identities are not granted IAM permissions.
    - Disable the creation of Service Accounts and the ability to download keys.
    - Disable the assignment of public IPs to instances.
    - Limit VM provisioning to an approved list of images.

### Encryption Key Management
- **Cloud KMS**: Google’s low-latency service to manage and use keys. Supports symmetric and asymmetric keys including AES, RSA, and EC.
  - Access to keys is controlled via IAM and logs.
  - Key deletion has a 24-hour delay to prevent accidental or malicious data loss.
- **Cloud HSM**: A FIPS 140-2 Level 3 certified HSM. Device hosts encryption keys and performs cryptography operations.
  - Enables you to meet compliance that mandates a hardware environment.
  - Essentially just an add-on feature of Cloud KMS to hold your keys.
  - Some key types are more expensive.
- **Cloud Secret Manager**: Stores secrets such as database passwords, API keys, or TLS certificates needed at runtime.
- All data on GCP is encrypted in transit and at rest by default, customer-supplied encryption keys using an AES-256 key for server-side encryption is supported.
  - You can also encrypt data before sending it to Google, but there is a lot of overhead in operating your own security systems.
```
