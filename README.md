# Udagram Image Filtering Application

Udagram is a simple cloud application developed as a part of the Cloud Developer Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

The project is split into four parts:

1) The [Frontend](https://github.com/SwethaVipparla/udacity-cloud-project3/tree/master/udagram-frontend), an Ionic client web application which consumes the RestAPI feed and user.
2) The [RestAPI Feed Backend](https://github.com/SwethaVipparla/udacity-cloud-project3/tree/master/udagram-api-feed), a Node-Express feed microservice.
3) The [RestAPI User Backend](https://github.com/SwethaVipparla/udacity-cloud-project3/tree/master/udagram-api-user), a Node-Express user microservice.
4) The [Reverse Proxy server](https://github.com/SwethaVipparla/udacity-cloud-project3/tree/master/udagram-deployment/k8s), a NGINX proxy server.


## Getting Started

### Prerequisites
The following tools need to be installed on your machine:

* [Docker](https://www.docker.com/products/docker-desktop)
* [Docker Compose](https://docs.docker.com/compose/install/)
* [AWS CLI](https://aws.amazon.com/cli/)
* [Eksctl](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html)
* [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

Furthermore, you need to have:

* an [Amazon Web Services](https://signin.aws.amazon.com/signin?redirect_uri=https%3A%2F%2Fconsole.aws.amazon.com%2Fconsole%2Fhome%3Fstate%3DhashArgs%2523%26isauthcode%3Dtrue&client_id=arn%3Aaws%3Aiam%3A%3A015428540659%3Auser%2Fhomepage&forceMobileApp=0&code_challenge=SjSQjqJnJnk-FtLjh8d7giM0dF-fsHgNI94asx8NcxM&code_challenge_method=SHA-256) account
* a [DockerHub](https://hub.docker.com/) account

### Setup Environment Variables
Open your bash profile to store your application variables at OS level to use them within and across applications:

`open ~/.profile`

Copy and Paste the bash scripts bellow with your values:
```
export DB_USERNAME=your postgress username;
export DB_PASSWORD=your postgress password;
export DB_NAME=your postgress database;
export DB_HOST=your postgress host;
export AWS_REGION=your aws region;
export AWS_PROFILE=your aws profile;
export AWS_MEDIA_BUCKET=your aws bucket name;
export JWT_SECRET=your jwt secret;
export ACCESS_CONTROL_ALLOW_ORIGIN=url of the frontend;
```
Source your `.profile` to execute your bash scripts automatically whenever a new interactive shell is started:

`source ~/.profile`

## Running Locally with Docker 

### Create Docker Images

#### Reverse Proxy Image
* Navigate to the udagram-deployment/docker directory.
* Build a docker image of the reverseproxy with `docker build -t {your_docker_usernam}/reverseproxy .`

#### Backend User Image
* Navigate to the udagram-api-user directory.
* Build a docker image of the backend user microservice with `docker build -t {your_docker_username}/restapi-user .`

#### Backend Feed Image
* Navigate to the udagram-api-feed directory.
* Build a docker image of the backend feed microservice with `docker build -t {your_docker_username}/restapi-feed .`

#### Frontend Image
* Navigate to udagram-frontend directory.
* Build a docker image of the frontend with `docker build -t {your_docker_username}/frontend .`

### Publish Images to Docker Hub
* Publish the reverseproxy image with docker push {your_docker_username}/reverseproxy.
* Publish the backend user image with docker push {your_docker_username}/restapi-user.
* Publish the backend feed image with docker push {your_docker_username}/restapi-feed.
* Publish the backend feed image with docker push {your_docker_username}/frontend.

### CI/CD with Travis
* Sign up for [Travis](https://travis-ci.com/) and connect your Github application repository to TravisCL.
* Have a look at the [config file](https://github.com/SwethaVipparla/udacity-cloud-project3/blob/master/.travis.yml) that will be read by Travis at the root of the repository. It needs some environment variables.
* Add your environment variables to the project repository in Travis by selecting the setting option.
* Commit and push your changes to trigger a Travis build.
* Check the build status page to see if your build passes or fails according to the return status of the build command by visiting TravisCI and selecting your repository.

### Run the Docker containers
`docker-compose up`

### Access Udagram
Browse the frontend application at http://localhost:8100/

## Run with a Kubernetes Cluster on Amazon EKS

### Deploy to Kubernetes Cluster
1) Navigate to the udagram-deployment/k8s/ directory.
2) Modify the configuration values in aws-secret.yaml, env-configmap.yaml, env-secret.yaml.
3) Set the correct docker hub username in the backend-feed-deployment.yaml, backend-user-deployment.yaml, frontend-deployment.yaml, reverseproxy-deployment.yaml files.
4) Repeat step 3 for the docker-compose-build.yaml and docker-compose.yaml files in the udagram-deployment/docker directory.
5) Deploy to Kubernetes cluster with `kubectl apply -f {file_name}.yaml` for each file in this directory.

#### Check status of all resources (services, delpoyments, pods, hpa)
`kubectl get all`

#### Check pods logs
`kubectl logs <podId>`

### Connect the Services with Port Forwarding
Use Port Forwarding to the Frontend and Reverse Proxy services: The port forwarding must be done in separate terminals, to run both services at the same time.
```
kubectl port-forward service/frontend 8100:8100
kubectl port-forward service/reverseproxy 8080:8080
```
Browse the frontend application at http://localhost:8100/
