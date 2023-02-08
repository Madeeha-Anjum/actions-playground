# Playground :runner: for github actions

Topics:

- [x] Google Cloud Platform (GCP)
- [x] Github Packages/Github Container Registry
- [x] Github Actions
- [x] Docker images and containers
- [x] Vultr Server

## Google Cloud Platform (GCP) and GitHub Actions connection using Workload Identity Federation

### Useful links

1. INSTRUCTIONS CLI: <https://cloud.google.com/blog/products/identity-security/enabling-keyless-authentication-from-github-actions>
2. GITHUB OIDC: <https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-google-cloud-platform>
3. ACTIONS: <https://github.com/google-github-actions/auth>

### How to setup Google Cloud Compute Engine with Workload identity provider

**Step 1:** Create a Google Cloud Platform account

**Step 2:** Create a project

**Step 3:** Create a service account

**Step 4:** Grant this service account access to the project

         - Compute Admin
         - workload identity user *

**Step 5:** Copy the service account email address

service-id@exalted-booster-377120.iam.gserviceaccount.com

note:we don't need a key for this service account because we will use workload identity provider

---

**Step: 6**: Create a workload identity pool

**Step: 7**: Create a workload identity provider

         - Provider type: OIDC
         - Issuer URL:  <https://token.actions.githubusercontent.com>

**Step: 8**: Copy the identity provider Url: <https://iam.googleapis.com/projects/377961128619/locations/global/workloadIdentityPools/pool/providers/provider-id>

---

**Step: 9**: Configure provider attributes

         - google.subject = assertion.sub # identity of the user or service that is executing the Github Actions

**Step 10**: Select the workload identity provider you created in **step 7** Grant Access to the service account

       - Select the service account you created in **step3** - Paste the OIDC provider URL you copied in**step 8 **in the Workload Identity Provider field
       - format type: JSON
---

**Step 11**: Create a workflow file  in your repository

         - .github/workflows/googleworkload.yml

## Github Packages/Github Container Registry

**GitHub Packages**: hosting and managing packages(containers and other dependencies)

- integrate GitHub Packages with GitHub APIs, GitHub Actions, and webhooks to create an end-to-end DevOps workflow that includes your code, CI, and deployment solutions.

**Github Container Registry**

- integrate GitHub Container Registry with GitHub APIs, GitHub Actions, and webhooks to create an end-to-end DevOps workflow that includes your code, CI, and deployment solutions.

**GitHub Packages** vs **Github Container Registry**

- The GitHub Container Registry supersedes the existing Packages Docker registry and is optimized to support some of the unique needs of containers.

## GitHub Container Registry with github actions DEPLOYMENT

**Steps to auto deployment**
Step 1: Create Docker file
Step 2: Create docker-composer file
Step 3: Push the docker image to github container registers
Step 4: Pull image from server and run

# MANUAL DEPLOYMENT STEPS

**Push the docker image to github container registers**
[Source](https://codefresh.io/docs/docs/integrations/docker-registries/github-container-registry/)

1. A personal access Token
    Settings > Personal Access Tokens > Create a new token (read/write/delete packages)
    [Source:](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
    check: `docker login ghcr.io --username github-account` then paste your token
2. build the docker image:  
    `docker compose up` - creates/builds/starts the docker image
    `docker build .` - builds the docker image
3. Tag the built image  
     - once your logged in your can tag  
    - view the docker images to find the id `docker images`
    `docker tag image-id ghcr.io/github-account/image-name:image-version`

- **OR Step 2 and Step 3 combined**
    `docker build -t ghcr.io/github-account/image-name:image-version .`

4. Push image to the registry
    [source:](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
    - `docker push ghcr.io/OWNER/IMAGE_NAME:latest`
5. Setup Vultr SSH (NOTE: the public key is added to the server when the vultr server is created )
    - Generate the key using `ssh-keygen -t ed25519 -C "your_email@example.com"`
    - Setup the config file
    **~/.ssh/config**

    ```
    Host athena
    HostName 2001:19f0:8001:21a:5400:04ff:fe13:6f89
    User root
    Port 22
    IdentityFile ~/.ssh/athena.key
    ```

6. Login to Vultr Server using SSH
   - `ssh user@hostName`  
   - install docker on Ubunto 20.04
    - `sudo snap install docker`
    - check `docker --version`
7. Pull an image
    - `docker pull ghcr.io/OWNER/IMAGE_NAME:latest`
    - Check `docker images`
8. Run the image  
    - [Source](https://www.vultr.com/docs/how-to-use-docker-creating-your-first-docker-container/)
    - `docker run IMAGE_ID -p (Vultr port):(docker container[3000])`

9. Check the server IP to see your app live

## AUTOMATED ACTIONS DEPLOYMENT STEPS PART 1 - REGISTRY

**GitHub Actions**

- [Source](https://codefresh.io/docs/docs/integrations/github-actions/)
- Reusable workflows
- Can use then in codefresh pipelines  

## WAY 1 (USING PAT-personal access token)

**Create the PAT**

1. A personal access Token
    `Settings > Personal Access Tokens > Create a new token (read/write/delete packages)`
    [Source:](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
    check: `docker login ghcr.io --username github-account` then paste password/PAT
2. Register the PAT in the repository Actions Secrets
    - `Repo > Settings > Secrets > Actions > new repo secret`
3. Create GitHub Actions workflow: login to GitHub Container Registry using the PAT
    a. create `.github/workflows/publish.yml` in the root of the repository
    b . add the following to the workflow

    ```yml
    name: Publish
    on:
    push:
      branches:
         - 'main'
   env:
      # The following environment variables are required for the workflow to run
     REGISTRY: ghcr.io
   jobs:
     echo:
       runs-on: ubuntu-latest
       steps:
         - run: echo ${{ github.actor}} # => Madeeha-Anjum
         - run: echo ${{ github.repository }} # => Madeeha-Anjum/actions-playground
     build-and-push-image:
       name: Build and push image
       runs-on: ubuntu-latest
       permissions:
         contents: read
         packages: write
       steps:
         - name: set lower case owner name
           env:
             IMAGE_NAME: '${{ github.repository }}'
           run: echo "IMAGE_NAME=${IMAGE_NAME,,}" >>${GITHUB_ENV}

         - name: Checkout Repository
           uses: actions/checkout@v3
        # LOGIN WAY #1
         - name: Build/tag/login/push the latest image 
           run: |
             docker build -t $REGISTRY/$IMAGE_NAME:latest .
             echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin
             docker push $REGISTRY/$IMAGE_NAME
           env:
             # using custom PAT
             CR_PAT: ${{ secrets.CR_PAT }}
    ```

## WAY 2 (USING GITHUB-TOKEN)

- using the built in GITHUB TOKEN
- create `.github/workflows/publish.yml` in the root of the repository
- **NOTE for Github Token** go to `packages` and `add the repo` to the packages and `set write permissions`
- add the following to the workflow:

    ```yml
    name: Publish
    on:
    push:
      branches:
         - 'main'
   env:
      # The following environment variables are required for the workflow to run
     REGISTRY: ghcr.io
   jobs:
     echo:
       runs-on: ubuntu-latest
       steps:
         - run: echo ${{ github.actor}} # => Madeeha-Anjum
         - run: echo ${{ github.repository }} # => Madeeha-Anjum/actions-playground
     build-and-push-image:
       name: Build and push image
       runs-on: ubuntu-latest
       permissions:
         contents: read
         packages: write
       steps:
         - name: set lower case owner name
           env:
             IMAGE_NAME: '${{ github.repository }}'
           run: echo "IMAGE_NAME=${IMAGE_NAME,,}" >>${GITHUB_ENV}

         - name: Checkout Repository
           uses: actions/checkout@v2
          # LOGIN WAY 2
         - name: Log in to the Container registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
        
         - name: Build-tag/push the latest image 
           run: |
             docker build -t $REGISTRY/$IMAGE_NAME:latest .
             docker push $REGISTRY/$IMAGE_NAME
           env:
             # using custom PAT
             CR_PAT: ${{ secrets.CR_PAT }}
    ```

## WAY 3: GitHub Action to build and push Docker images with Buildx

[Source](https://docs.github.com/en/actions/publishing-packages/publishing-docker-images)

- **NOTE for github token:** go to `packages` and `add the repo` to the packages and `set write permissions`

 ```yml
name: Create and publish a Docker image

on:
  push:
    branches: [main]

env:
  REGISTRY: ghcr.io

jobs:
  build-and-push-image:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Lower case github.repository
        run: echo "IMAGE_NAME=${IMAGE_NAME,,}" >>${GITHUB_ENV}
        env:
          IMAGE_NAME: '${{ github.repository }}'

      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Log in to the Container registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata (tags, labels) for Docker
        id: meta
        uses: docker/metadata-action@v4
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=semver,pattern={{version}}

      - name: Build and push Docker image
        uses: docker/build-push-action@v3
        with:
          context: .
          push: true
          labels: ${{ steps.meta.outputs.labels }}
          tags: ${{ steps.meta.outputs.tags }}
 ```

## AUTOMATED ACTIONS DEPLOYMENT STEPS PART 2 - SERVER

1. Setup Vultr SSH (NOTE: the public key is added to the server when the vultr server is created )
    - Generate the key using `ssh-keygen -t ed25519 -C "your_email@example.com"`
    - Setup the config file
    **~/.ssh/config**

    ```yml
    Host athena
    HostName 2001:19f0:8001:21a:5400:04ff:fe13:6f89
    User root
    Port 22
    IdentityFile ~/.ssh/athena.key
    ```

2. Register the Private key/host/user in the repository Actions Secrets
    - `Repo > Settings > Secrets > Actions > new repo secret`

## WAY 1: Using Scripts

Another way: <https://blog.benoitblanchon.fr/github-action-run-ssh-commands/>

```yaml
 pull-and-run-image-on-vultr:
    name: Pull and run image on Vultr
    runs-on: ubuntu-latest
    # needs:
    #   - build-and-push-image

    steps:
      - name: SSH Command with key
        run: |
          echo $USER@$HOSTNAME
          mkdir ~/.ssh
          echo "$SSH_KEY" >> ~/.ssh/github-action
          chmod 600 ~/.ssh/github-action

      - name: Add known_hosts
        run: |
          ssh-keyscan $HOSTNAME >> ~/.ssh/known_hosts

      - name: SSH into Vultr server using private key
        run: | 
```

**Run commands inside the server options:**

1. inline with quotes "" (Hard to read)

```yml
run: |
    ssh -i ~/.ssh/github-action $USER@$HOSTNAME "docker pull $REGISTRY/$IMAGE_NAME:latest && docker run -d -p 80:3000 $REGISTRY/$IMAGE_NAME:latest"

```

3. EOF (Easier to read)

```yml
  run: |
    ssh -i ~/.ssh/github-action $USER@$HOSTNAME << EOF

    # Check if Docker is installed on the server
    if [ -x "$(command -v docker)" ]; then
      echo "DOCKER IS INSTALLED"
      docker kill $(docker ps -q)
    else
      echo "INSTALLING DOCKER"
      echo install docker on ubuntu 20.04
      sudo snap install docker
    fi


    # Pull the image 
    docker pull $REGISTRY/$IMAGE_NAME:latest

    # run the image
    docker run -d -p 80:3000 $REGISTRY/$IMAGE_NAME
# exit 
    exit
    EOF

```

## WAY 2: Using github actions

appleby: <https://github.com/marketplace/actions/ssh-remote-commands>

```yml
  pull-and-run-image-on-vultr:
    name: Pull and run image on Vultr
    runs-on: ubuntu-latest
    # needs:
    #   - build-and-push-image
    steps:
      - name: SSH command runner
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VULTR_IP }}
          username: ${{ secrets.VULTR_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            # Run server commands here 

            if [ -x "$(command -v docker)" ]; then
              echo "DOCKER IS INSTALLED"
              docker kill $(docker ps -q)
            else
              echo "INSTALLING DOCKER"
              echo install docker on ubuntu 20.04
              sudo snap install docker
            fi

            # pull the image
            docker pull ghcr.io/madeeha-anjum/actions-playground:latest

            # run the image
            docker run -d -p 80:3000 ghcr.io/madeeha-anjum/actions-playground:latest
           # exit 
            exit
```
  
============================================================

## HOW ON WORKFLOW FILES

[Source](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idruns-on)

1. Start the Actions file with a name
**name means the name of the workflow**
`name: [workflow name]`
2. Add on and specify the branches and paths
**on means to run this workflow when the following actions are run**
`on [push]`
`branches: [branch name]`
`paths: [path name]` workflow runs when these paths are pushed to the
    - "*.dockerfile"
    - "*.Dockerfile"
    - "*.docker-compose.yml"
    - "*.docker-compose.yaml"
    - "*.yml"
    - "*.yaml"repository `- "*.dockerfile"`
3. Add the jobs,name and specify the steps to run
**jobs are a series of tasks**
`jobs`

- `[job name]:` - "build" or "publish" or "checkout"
  **runs-on, is a new virtual machine (VM) hosted by GitHub where u can clone your repo and test your code**
- `runs-on: [job name]` - "ubuntu-latest" or "ubuntu-20.04"
- `permissions:`
    **modify the default permissions granted to the GITHUB_TOKEN**
  - `push:`
      `access: [job name]` - "read" or "write" or "delete"
    -`pull:`
      `access: [job name]` - "read" or "write" or "delete"
  - `admin:`
      `access: [job name]` - "read" or "write" or "delete"
  - `contents:`
      `access: [job name]` - "read" or "write" or "delete"
    -`packages:`
      `access: [job name]` - "read" or "write" or "delete"
  -`steps` - steps to run
  - `- name: [step name]`
  - `uses: [step name]` - uses is the docker image
     -`run: [step name]`
  - `id: [id]` - unessasary
  - `with:`
    - `registry: [registry name]`
    - `username: [username]`
    - `password: [password]`
    - `image: [image name]`
    - `tag: [tag name]`
    - `port: [port number]`
    - `server: [server name]`
    - `server_ip: [server ip]`
    - `server_port: [server port]`
    - `context: [context name]`
    - `command: [command]`
    - `args: [args]`
    - `env: [env]`
    - `volumes: [volumes]`
    - `workdir: [workdir]`
    - `key: ~/.ssh/athena.key`
    - `host: athena`
    - `user: root`
    - `port: 22`

**What is Uses?**

- The uses is the docker image to run the step
    -`uses: docker/metadata-action@98669ae865ea3cffbcbaa878cf57c20bbf1c6c38`
- The use is the checkout step to get the code from the repository
  - `uses: actions/checkout@v3`
- The use is the build step to build the image
  - `uses: actions/build@v3`
- The use is the publish step to push the image to the registry
  - `uses: actions/publish@v3`
- The use is the check step to check the image is running
  - `uses: actions/check@v3`
- The use is the delete step to delete the image
  - `uses: actions/delete@v3`
- The use is the metadata step to get the metadata of the image
  - `uses: actions/metadata@v3`
- The use is the run step to run the image
  - `uses: actions/run@v3`
