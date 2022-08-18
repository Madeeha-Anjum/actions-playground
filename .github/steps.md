



**GitHub Packages**: hosting and managing packages(containers and other dependencies)
-  integrate GitHub Packages with GitHub APIs, GitHub Actions, and webhooks to create an end-to-end DevOps workflow that includes your code, CI, and deployment solutions.


**Github Container Registry** 
-  integrate GitHub Container Registry with GitHub APIs, GitHub Actions, and webhooks to create an end-to-end DevOps workflow that includes your code, CI, and deployment solutions.



**GitHub Packages** vs **Github Container Registry**
-  The GitHub Container Registry supersedes the existing Packages Docker registry and is optimized to support some of the unique needs of containers.

# Therefore we will be using the GitHub Container Registry with github actions.

## Steps to auto deployment 
Step 1: - [x] Create Docker file 
Step 2: - [x] Create docker-composer file 
Step prerequisites: 
- [ ] Push the docker image to github container registers 
Step 3: - [ ] Create github actions to push image onto github container registry
Step 4: - [ ] Create github actions to run the container on a server???

**Push the docker image to github container registers**
[Source](https://codefresh.io/docs/docs/integrations/docker-registries/github-container-registry/)
1. - [ ] A personal access Token
    Settings > Personal Access Tokens > Create a new token (read/write/delete packages)
    check: `docker login ghcr.io --username github-account` then paste password
