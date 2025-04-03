```markdown
# Google Cloud: Professional Cloud Architect (PCA) Exam Notes – Part II
*Apr 2, 2023*

**Categories**: Cloud, GCP  
**Reading Time**: 10 min

## Networking

### General Notes
- A normal network routes via the Internet’s edge location closest to the destination.
- Google routes traffic so that traffic enters from the Internet at the edge closest to the source. This is arguably GCP’s biggest differentiator.
- You can use a single global anycast IP address to load balance worldwide.
  - This side steps many DNS issues that come from caching, TTL, ISPs, etc.
- Traffic is free on the way in (ingress) and charged per gigabyte on the way out (egress) but is sometimes free from GCP service to service.
- Points of Presence (PoPs) are network edges and CDN locations.
- A private global network (B4) connects all of the regions and zones.
- Networks are global and span all available regions.
- Public IP addresses are decoupled from VMs, they are mapped to internal IP addresses via the SDN (Software Defined Network).
- Subnets cross zones, VMs in different zones on the same subnet can communicate and share firewall rules.
- Google reserves 4 IP addresses in every subnet:
  - Network – First address in the CIDR range (x.x.x.0)
  - Gateway – Second address in the CIDR range (x.x.x.1)
  - Second-to-last – Reserved for future use – in CIDR range (x.x.x.254)
  - Broadcast – Last address in the CIDR range (x.x.x.255)
- Private IP space can’t overlap in peered VPCs or with connected on-prem networks.
- Grant the `networkUser` role at the subnet level.
  - A network user can create a VM instance that belongs to a host project network but they cannot delete or create new networks in the host project.
- Create a VPC for each autonomous team with shared services in a common VPC.
- Group applications into fewer subnets with larger address ranges.

### VPC Firewall
- Firewall rules are global at the VPC and also use instance-level tags or service accounts. Default firewalls are restrictive inbound and permissive outbound.
- Components of a Firewall Rule: Action (Allow/Deny), Direction (Ingress/Egress), Protocol/Port, Source/Destination for Rule.
  - For ingress rules, source; for egress rules, destination.
- Implied (default) rules make egress allowed and ingress denied. They can’t be removed, but higher priority rules can override them.
  - The implied rules are set at the lowest possible priority (65535) and remember, higher priority rules have lower numbers in VPC firewalls – 0 being the highest.
  - You cannot view the implied rules in the logs, you need to create a new rule with identical settings with a higher priority to log them.
- Deny rules with the same priority are processed with higher importance – better safe than sorry!
- Can combine target tags and service accounts with secondary filters.
- Firewall rules are enforced at the instance.

### VPC Routing
- Routes are global and apply by instance-level tags, not by subnet.
- Routing determines where data should go next (next hop) like directions on a hiking trail.
  - Routes make many local decisions, they are not a full map or path.
- Routes tell the VPC network where to send packets destined for a particular IP address.
- A packet will not be routed unless it has a route and appropriate firewall permissions.
- Currently, all packets sent to the Internet must be sent by an instance with a Public IP address (or using Cloud NAT or a VM acting as a forwarder).

### External Networking Products
- **Google Domains**: Registrar for domain names, includes private WHOIS records and can use built-in DNS or point to custom nameservers. Supports DNSSEC.
- **Cloud Domains**: It looks to better integrate domain registrar services with other Google Cloud services while offering enterprise level access and support.
  - Google Domains (above) is a different service, not under Cloud, and aimed at consumers and SMBs.
- **Cloud DNS**: Scalable, reliable, and managed authoritative Domain Name Service (DNS) 100% uptime guarantee. Public and private managed zones. Pay for lookups/actions.
- **Static IP**: Can reserve static IP addresses in GCP projects and assign them to resources.
  - Regional IPs are used for GCE Instances and Network Load Balancers.
  - Global IPs are used for global load balancers (HTTPS, SSL Proxy, TCP Proxy). Anycast IPs massively simplify DNS (see difference between regional and global IPs).
  - You pay for reserved IPs that aren’t in use.
- **Load Balancing**: High-performance, scalable traffic distribution integrated with autoscaling and Cloud CDN.
  - It’s built into the SDN and can handle spikes without pre-warming, no instances or devices.
  - Can perform health checks and session affinity.
  - Global Load Balancers allow for multi-region failover for HTTP/S, SSL Proxy, and TCP Proxy. Prioritize low-latency connection to the region nearest to the user, then gently fail over in bits. Can react really quickly (unlike DNS) to changes in users, traffic, network, health, etc.
- **Cloud CDN**: Low-latency CDN based on HTTPS CLB that’s integrated with GCE and GCS. Supports HTTP/2 and HTTPS, but it can only get its data from within GCP.
  - Simple checkbox on HTTPS load balancer.
  - On a cache miss, pay origin POP “cache fill” egress charge, then you pay egress from POP and cache invalidation.
  - Cache Keys identify each cache entry in Cloud CDN. You can change which parts of the URL are used in the cache key, you can omit any combination of protocol, host/domain, or query string to customize cache keys to be more efficient (improving the cache hit ratio).
  - The Cache-Control header holds instructions for caching in both requests and responses. For example, “Cache-Control: max-age=<seconds>” and gives instructions to browsers.

### Internal Networking Products
- Review Choosing an Interconnect Type for extensive details on the products below, the primary difference is an Interconnect vs. Peering. Interconnects are for VPC connectivity, Peering is for public Google service connectivity. Either can be done directly or with a partner (or carrier).
- **Cloud Interconnect**: Private connections to VPC via Cloud VPN or Dedicated/Partner Interconnect.
- **Dedicated Interconnect**: Direct physical link between VPC and on-premises for high-volume data connections.
  - A VLAN attachment is a private connection to a VPC in one region. Links are private, but you need to layer your own tunnel on top of it if you need encryption.
  - Each VLAN attachment supports a maximum bandwidth of 50 Gbps in 50 Mbps to 50 Gbps increments.
  - Some regions now support dedicated 100 GBPS connections that can be doubled to support a maximum of 200 GBPS – Check availability per region/colo.
  - Does not give you access to Google Workspace (Need Direct or Carrier Peering for this, more below).
- **Cloud VPN**: IPSec VPN to connect to VPC via public internet for low-volume data connections.
  - For persistent, static connections between gateways. Peer VPN gateway must have static IP. Connects into one subnet. Only the HA VPN will be available moving forward.
  - Can support static and dynamic routing.
  - Pay per tunnel hour.
  - VPN Gateways are regional resources.
  - Each Cloud VPN tunnel can support up to 3 Gbps for ingress and egress.
- **Public Google services via External Peering** (No SLAs) and all communication is over public IP addresses.
  - Direct Peering for high volume, Carrier Peering via a partner for lower volume.
  - If you cannot meet Google’s Direct Peering requirements, use Carrier Peering. Direct peering connects in a GCP PoP, carrier varies on service provider.
- **CDN Interconnect**: Offers direct, low-latency connectivity to certain CDN providers for external CDNs, (Akamai, Cloudflare, Fastly, etc.). Set it up at the project/region level.
- **Private Google Access**: Allows you to connect to Google services without going out through the internet.
  - This includes Google APIs, App Engine services, and storage buckets.
  - It is enabled on a subnet level. It follows the default route and a firewall rule that allows connecting to the public Google services.
- **Private Service Connect**: Allows private consumption of services across VPC networks that belong to different groups, teams, projects, or orgs.
  - You can publish and consume services using IP addresses that you define and that are internal to your VPC.
- **Private Services Access**: Allows Google and other 3rd parties (aka service producers) to offer internal IPs inside of a VPC network.
  - Private services access enables you to reach those internal IPs. The private connection links your VPC with the service producer’s VPC.
- Private access options for Google services are very confusing at first, visit this page to compare the differences and services that are supported using each type.
- **Cloud Router**: Google’s dynamic routing solution. When you extend an on-premises network into GCP, Cloud Router peers with a firewall/router on premises. The routers exchange routes using BGP.
- **Cloud NAT**: Allows your instances outbound access to the internet without having a dedicated external IP.
  - Software-defined networking solution, fully-managed offering. It doesn’t use a proxy!
  - Each instance is given a set of NAT IPs and port ranges which are used by Andromeda, Google’s network virtualization stack.
  - Cloud NAT requires a Cloud Router.
- **Identity-Aware Proxy**: An app authorization layer for applications accessed by HTTPS and can eliminate the need for a VPN, following the OpenID Connect flow. It is implemented by the load balancer.
  - IAP TCP Forwarding lets you control who can access administrative services like SSH & RDP on your backends from the public internet.
- **VPC Service Controls**: Keep data private inside of VPCs. They are primarily used to mitigate data exfiltration risks and offer an extra layer of control with defense-in-depth principles.
  - They use a variety of allow/deny rules using IPs, identities, devices, and GCP resources. Be sure to check which products are supported.
- **VPC Flow Logs**: Used for network monitoring, forensics, security analysis, and cost optimization. These logs provide a sample of network flows sent and received by VM instances or GKE nodes within a network.
  - VPC Flow Logs can be very expensive to use, so it is not recommended to leave them on indefinitely.

### External Load Balancers
- This [video](#) is a good overview of choosing a Cloud Load Balancer.

### Network Load Balancers
- Operating at Layer 3 and Layer 4, external load balancers that face the internet. They are also regional load balancers, they operate within a region.
  - Regional = HA with multiple zones.
  - Don’t look at Layer 7, just for TCP and UDP traffic.
  - Client IP is preserved.
  - Client access can be controlled with VPC firewall because client IP is preserved.
  - Balances traffic using 2-, 3-, or 5-tuple hashing (Source IP, Dest IP, Src/Dest Port, Protocol).
  - Maintains session affinity based on the IP address.
  - Supports HTTP health checks on the back ends.
  - High performance, can handle 1,000,000+ requests per second.

### Google Global Load Balancer (Layer 7)
- Uses a single global anycast virtual IP (VIP) with a single DNS record.
  - We built this because we needed to make Google function for a billion + users.
  - CDN lays parallel to this, customers hit global LB first, then gets sent to CDN.
  - Some customers stick this on the edge, then use their own hardware as backends.
  - Built in HA running on Google’s edge, highly scalable.
  - Handles websocket traffic natively.
  - GFE is Google Front End, internal terminology for this product.
  - Backends are either Instance Groups or Network Endpoint Groups. Use Network Endpoint Groups with VPC-Native GKE Clusters for more integrated K8s load balancing.
  - Client IP is not passed through, it is terminated at the load balancer and opens a new session on the backside using private IPs.
  - Cloud Armor works in tandem with this if you want to allow/deny specific IP blocks.
  - Health checks determine which instances of a load balancer can receive new connections. For HTTP load balancing, the health check probes to your load balanced instances come from addresses in the ranges 130.211.0.0/22 and 35.191.0.0/16. Your firewall rules must allow these connections.

### Internal Load Balancers
- There really is no load balancer, you’re really manipulating the SDN control plane, not adding a VM or box on top of the workload.
  - It’s delivered on Andromeda, not a middle proxy. No single point of failure. Dynamically scales up and down as needed.

#### L4 Regional Load Balancer
- Internal (RFC 1918) VIP.
- Client IP is preserved.
- TCP, HTTP, HTTPS health checks.
- Can scale compute engines based on Cloud Load Balancer metrics.
```
