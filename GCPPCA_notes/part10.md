
# Google Cloud: Professional Cloud Architect (PCA) Exam Notes – Part X
*Apr 10, 2023*

**Categories**: Cloud, GCP  
**Reading Time**: 9 min

## Machine Learning and AI Products
- **AutoML**: Build custom ML models without any coding.
  - **AutoML Vision**: For image data.
  - **AutoML Natural Language**: For text data.
  - **AutoML Tables**: For structured data.
- **Cloud ML Engine**: Scalable managed service for training ML models and making predictions.
  - Based on TensorFlow.
  - Supports online and batch predictions.
  - HyperTune automatically tunes model hyperparameters.
- **Cloud Vision API**: Classifies images, detects objects/faces, and reads printed text.
- **Cloud Speech API**: Automatic speech recognition; converts spoken words to text and vice-versa.
- **Cloud Natural Language API**: Analyzes texts for sentiment, intent, and content classification.
- **Cloud Translation API**: Translates 100+ languages with semantic understanding.
- **Dialogflow**: Builds conversational interfaces for various platforms.
- **Cloud Video Intelligence API**: Annotates videos in GCS with info about content.
- **Explainable AI**: Provides tools and frameworks to interpret ML models.
- **Transcoder API**: Converts video files for optimized delivery.
- **Cloud Job Discovery**: Enhances job sites with improved engagement and conversion.

## Big Data & Eventing Services
- **4 Steps of Data**: Ingest, Store, Process & Analyze, Explore & Visualize.
- **Cloud Pub/Sub**: Global, infinitely scalable messaging for ingestion and decoupling.
  - Topics and subscriptions.
  - Supports push and pull delivery modes.
  - Messages up to 10MB; undelivered messages stored for 7 days.
- **Cloud Datalab**: Jupyter Notebook based tool for data exploration, analysis, and visualization (deprecated, use Vertex AI).
- **Cloud Data Studio**: Big data visualization tool for dashboards and reporting.
- **Cloud Genomics**: Stores and processes genomic data.

## Web Review Notes
- **TCP Connections**: Use a three-way handshake (SYN, SYN-ACK, ACK) to establish reliable connections.
- **TLS Handshake**: Sets up secure communication by exchanging and verifying messages.
- **Cross-Origin Resource Sharing (CORS)**: Allows servers to specify other origins for resource loading.
- **RTT/TTFB**:
  - **Round-Trip Time (RTT)**: Time for a signal to be sent and acknowledged.
  - **Time to First Byte (TTFB)**: Time from an HTTP request to receiving the first byte of the response.

## HTTP Verbs for RESTful Services
- **POST**: Create a subordinate resource.
- **GET**: Retrieve a resource.
- **PUT**: Create or update a resource.
- **DELETE**: Delete a resource.
- **OPTIONS**: List supported HTTP verbs.
- **HEAD**: Request identical to GET but without the response body.
- **CONNECT**: Establish a tunnel.
- **TRACE**: Perform message loopback test.
- **PATCH**: Apply partial modifications.

## Status Codes
- **200**: OK.
- **201**: Created.
- **202**: Accepted.
- **301**: Moved Permanently.
- **302**: Found (Temporary Redirect).
- **304**: Not Modified.
- **400**: Bad Request.
- **403**: Forbidden.
- **404**: Not Found.
- **429**: Too Many Requests.
- **500**: Internal Server Error.
- **503**: Service Unavailable.

## Commonly Used Port Numbers
- **HTTP**: TCP/80.
- **HTTPS**: TCP/443.
- **FTP**: TCP/21.
- **FTPS/SSH**: TCP/22.
- **SMTP**: TCP/25 (Alternate: TCP/26).
- **SMTP SSL**: TCP/587.
- **MySQL**: TCP/3306.
- **RDP**: TCP/3389.
- **DNS**: UDP/TCP/53.
- **ICMP (Ping)**: IP protocol 7.

## Other DevOps Tools & Practices
- **Jenkins**: Automates integrating and deploying software.
- **Ansible, Chef, Puppet**: Automate configuration management of computers and VMs.
- **Terraform**: Creates infrastructure as code.
- **Post-mortems**: Blameless reviews to identify process changes.
- **Scrum**: Product owner prioritizes product backlog items.

## Firebase
- **Build**:
  - **Cloud Firestore**: NoSQL database for real-time data sync.
  - **Realtime Database**: Syncs JSON data between users in near real-time.
  - **Remote Config**: Feature flags for dynamic user experience control.
  - **Cloud Functions for Firebase**: Event-driven architecture.
  - **Authentication**: Adds identity solutions to apps.
  - **Cloud Messaging**: Reliable message delivery.
  - **Hosting**: Includes global CDN.
  - **Cloud Storage**: Same as GCS.
- **Release & Monitor**:
  - **Crashlytics**: Tracks and fixes stability issues.
  - **Google Analytics**: Tracks app performance.
  - **Performance Monitoring**: Quickly addresses issues.
  - **Test Lab**: Validates apps on physical and virtual devices.
- **Engage**:
  - **Predictions**: Uses ML to predict user behavior.
  - **Dynamic Links**: Deep linking users to specific app content.
