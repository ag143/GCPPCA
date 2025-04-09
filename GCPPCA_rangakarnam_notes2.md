Google Certified 

# Professional Cloud Architect 

> 1

Getting Started 

GCP has  200+ services . This exam expects knowledge of  40+ Services .

Exam  tests  your  decision making abilities :  

> Which service do you choose in which situation?
> How do you trade-o ff between resilience, performance and cost while not compromising on
> security and operational excellence?

This course is  designed  to help you  make these tough choices 

Our Goal  : Enable you to architect amazing solutions in GCP 

> 2

Challenging certification  - Expects 

you to understand and 

REMEMBER  a number of services 

As time passes, humans forget 

things. 

How do you improve your chances 

of remembering things?   

> Active learning - think and take notes
> Review the presentation every once in a
> while

## How do you put your best foot forward? 

> 3

Three-pronged approach to 

reinforce concepts: 

Presentations (Video) 

Demos (Video) 

Two kinds of quizzes :

> Text quizzes
> Video quizzes

(Recommended) Take your 

time. Do not hesitate to replay 

videos! 

(Recommended) Have Fun! 

# Our Approach 

> 4

5GCP - Getting started 

> 6

Before the Cloud - Example 1 - Online Shopping App 

Challenge: 

Peak usage during holidays and weekends 

Less load during rest of the time 

Solution (before the Cloud): 

PEAK LOAD provisioning  : Procure  (Buy) infrastructure  for peak load 

> What would the infrastructure be doing during periods of low loads?
> 7

Before the Cloud - Example 2 - Startup 

Challenge: 

Startup suddenly becomes popular 

How to handle the  sudden increase  in load? 

Solution (before the Cloud): 

Procure  (Buy) infrastructure assuming they would be successful 

> What if they are not successful?
> 8

Before the Cloud - Challenges 

High cost of procuring infrastructure 

Needs ahead of time planning ( Can you guess the future? )

Low infrastructure utilization ( PEAK LOAD  provisioning) 

Dedicated infrastructure maintenance team ( Can a startup a ff ord it? )

> 9

## How about  provisioning (renting) 

## resources  when you want them and 

## releasing them back when you do not 

## need them?  

> On-demand resource provisioning
> Also called Elasticity

# Silver Lining in the Cloud 

> 10

## Trade  "capital expense"  for  "variable 

## expense" 

## Benefit from massive  economies of scale 

## Stop  guessing  capacity 

## Stop spending money running and 

## maintaining data centers 

## "Go global"  in minutes 

# Cloud - Advantages 

> 11

One of the Top 3  cloud service providers 

Provides a number of services (200+) 

Reliable, secure and highly-performant: 

Infrastructure that powers 8 services with over 1 Billion Users: 

Gmail, Google Search, YouTube etc 

One thing I love :  "cleanest cloud" 

Net carbon-neutral cloud (electricity used matched 100% with 

renewable energy) 

The entire course is all about GCP. You will learn it 

as we go further. 

# Google Cloud Platform (GCP) 

> 12

# Best path to learn GCP! 

Cloud applications make use of multiple GCP services 

There is  no single path  to learn these services 

independently 

HOWEVER, we've worked out a simple path! 

> 13

# Setting up GCP Account 

## Create GCP Account 

> 14

# Regions and Zones 

> 15

## Regions and Zones 

Imagine that your application is deployed in a data center in London 

What would be the challenges? 

Challenge 1 : Slow access for users from other parts of the world ( high latency )

Challenge 2 : What if the data center crashes? 

> Your application goes down ( low availability )
> 16

Multiple data centers 

Let's  add in one more data center  in London 

What would be the challenges? 

Challenge 1 : Slow access for users from other parts of the world 

Challenge 2 ( SOLVED ) : What if one data center crashes?   

> Your application is still available from the other data center

Challenge 3 : What if  entire region  of London is unavailable? 

> Your application goes down
> 17

Multiple regions 

Let's add a new region : Mumbai 

What would be the challenges? 

Challenge 1 ( PARTLY SOLVED ) : Slow access for users from other parts of the world 

You can solve this by adding deployments for your applications in other regions 

Challenge 2 (SOLVED) : What if one data center crashes? 

Your application is still live from the other data centers 

Challenge 3 ( SOLVED ) : What if entire region of London is unavailable? 

Your application is served from Mumbai 

> 18

Imagine setting up data centers in 

di ff erent regions around the world 

> Would that be easy?

(Solution) Google provides  20+ 

regions  around the world 

> Expanding every year

Region  : Specific geographical 

location to host your resources 

Advantages : 

> High Availability
> Low Latency
> Global Footprint
> Adhere to government regulations

Regions 

> 19

How to achieve high availability in the same 

region (or geographic location)?  

> Enter Zones

Each Region has three or more  zones 

(Advantage)  Increased availability and fault 

tolerance  within same region 

(Remember) Each Zone has  one or more 

discrete clusters  

> Cluster : distinct physical infrastructure that is housed
> in a data center

(Remember) Zones in a region are connected 

through  low-latency  links 

Zones 

> 20

# Regions and Zones examples 

Region Code  Region  Zones  Zones List 

us-west1  The Dalles, Oregon, North 

America 

3 us-west1-a 

us-west1-b 

us-west1-c 

europe-

north1 

Hamina, Finland, Europe  3 europe-north1-a, europe-

north1-b 

europe-north1-c 

asia-south1  Mumbai, India APAC  3 asia-south1-a, asia-south1-b 

asia-south1-c 

New Regions and Zones are constantly added 

> 21

# Compute 

> 22

# Compute Engine 

# Fundamentals 

> 23

## In corporate data centers, applications are 

## deployed to physical servers 

## Where do you deploy applications in the 

## cloud? 

Rent virtual servers 

Virtual Machines  - Virtual servers in GCP 

Google Compute Engine (GCE)  - Provision & Manage 

Virtual Machines 

# Google Compute Engine (GCE) 

> 24

Compute Engine - Features 

Create and manage lifecycle of Virtual Machine (VM) instances 

Load balancing  and  auto scaling  for multiple VM instances 

Attach storage  (& network storage) to your VM instances 

Manage  network connectivity and configuration  for your VM instances 

Our Goal :

> Setup VM instances as HTTP (Web) Server
> Distribute load with Load Balancers
> 25

## Let's create a few VM instances and play with 

## them 

## Let's check out the lifecycle of VM instances 

## Let's use SSH to connect to VM instances 

# Compute Engine Hands-on 

> 26

What type of hardware do you want to run your workloads on? 

Di ff erent Machine Families for Di ff erent Workloads: 

General Purpose (E2, N2, N2D, N1)  : Best price-performance ratio 

> Web and application servers, Small-medium databases, Dev environments

Memory Optimized (M2, M1) : Ultra high memory workloads 

> Large in-memory databases and In-memory analytics

Compute Optimized (C2) : Compute intensive workloads 

> Gaming applications

## Compute Engine Machine Family 

> 27

Compute Engine Machine Types 

How much CPU, memory or disk do you want? 

Variety of machine types are available for each machine family 

Let's take an example :  e2-standard-2 :   

> e2 - Machine Type Family
> standard - Type of workload
> 2- Number of CPUs

Memory, disk and networking capabilities increase along with vCPUs 

> 28

# Image 

What operating system and what so 
