

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
    [Source:](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
    check: `docker login ghcr.io --username github-account` then paste your token 
2. Create the docker image:  
    `docker compose up`
3. Tag the image  
     - once your logged in your can tag  
    - view the docker images to find the id `docker images` 
    `docker tag image-id ghcr.io/github-account/image-name:image-version`
4. Push image to the registry
    [source:](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
    - `docker push ghcr.io/OWNER/IMAGE_NAME:latest`

5. Setup Vultr SSH
    - Generate the key using `ssh-keygen -t ed25519 -C "your_email@example.com" `
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
   - `ssh user@hostName` and type the user password 
   - install docker on Ubunto 20.04
    - ` sudo apt  install docker.io`
    - `sudo snap install docker`
    - check `docker --version`
7. Pull an image
    - ` docker pull ghcr.io/OWNER/IMAGE_NAME:latest`
    - Check `docker images`
8. Run the image  
 https://www.vultr.com/docs/how-to-use-docker-creating-your-first-docker-container/
 docker run IMAGE_ID -p (Vultr port ):(docker container port aka app aka 3000)

9. Check the server IP  to see your app live 

## Create github actions to push image onto github container registry

**GitHub Actions**
[Source](https://codefresh.io/docs/docs/integrations/github-actions/)
- Reusable workflows
- Can use then in codefresh pipelines  

1. - [ ] A personal access Token
    Settings > Personal Access Tokens > Create a new token (read/write/delete packages)
    [Source:](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
    check: `docker login ghcr.io --username github-account` then paste password/PAT
2. Register the PAT in the repository Actions Secrets 
    - Repo > Settings > Secrets > Actions > new repo secret
3. Create GitHub Actions workflow: login to GitHub Container Registry using the PAT
    a. create `.github/workflows/publish.yml` in the root of the repository
    b . add the following to the workflow
 
4. Create a GitHub Actions workflow step to push the image to the registry

5. Create a GitHub Actions workflow step to run the image on the server
 




 
## How to write a workflow/Action file
[Source:](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idruns-on)
1. Start the Actions file with a name
**name means the name of the workflow**
`name: [workflow name]`
2. Add on and specify the branches and paths
**on means to run this workflow when the following actions are run**
` on [push]`
`  branches: [branch name]`
`  paths: [path name]` workflow runs when these paths are pushed to the 
    - "*.dockerfile"
    - "*.Dockerfile"
    - "*.docker-compose.yml"
    - "*.docker-compose.yaml"
    - "*.yml"
    - "*.yaml"repository ` - "*.dockerfile"`
3. Add the jobs,name and specify the steps to run
**jobs are a series of tasks**
`jobs`
  `[job name]:` - "build" or "publish" or "checkout"
  **runs-on, is a new virtual machine (VM) hosted by GitHub where u can clone your repo and test your code**
  `runs-on: [job name]` - "ubuntu-latest" or "ubuntu-20.04"
  `permissions:`
    **modify the default permissions granted to the GITHUB_TOKEN**
    `push:`
      `access: [job name]` - "read" or "write" or "delete"
    `pull:`
      `access: [job name]` - "read" or "write" or "delete"
    `admin:`
      `access: [job name]` - "read" or "write" or "delete"
    `contents:`
      `access: [job name]` - "read" or "write" or "delete"
    `packages:`
      `access: [job name]` - "read" or "write" or "delete"
  `steps` - steps to run
    `- name: [step name]`
    `  uses: [step name]` - uses is the docker image 
    `  run: [step name]` 
    `  id: [id]` - unessasary 
    `  with:`
        `registry: [registry name]`
        `username: [username]`
        `password: [password]`
        `image: [image name]`
        `tag: [tag name]`
        `port: [port number]`
        `server: [server name]`
        `server_ip: [server ip]`
        `server_port: [server port]`
         `context: [context name]`
        `command: [command]`
        `args: [args]`
        `env: [env]`
        `volumes: [volumes]`
        `workdir: [workdir]`
        `key: ~/.ssh/athena.key`
        `host: athena`
        `user: root`
        `port: 22`

# What is Uses?
- The uses is the docker image to run the step
`uses: docker/metadata-action@98669ae865ea3cffbcbaa878cf57c20bbf1c6c38`
- The use is the checkout step to get the code from the repository
`uses: actions/checkout@v3`
- The use is the build step to build the image
`uses: actions/build@v3`
- The use is the publish step to push the image to the registry
`uses: actions/publish@v3`
- The use is the check step to check the image is running
`uses: actions/check@v3`
- The use is the delete step to delete the image
`uses: actions/delete@v3`
- The use is the metadata step to get the metadata of the image
`uses: actions/metadata@v3`
- The use is the run step to run the image
`uses: actions/run@v3`
 
   
 