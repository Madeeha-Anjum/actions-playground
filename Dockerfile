# Dockerfile 

# has node 
# FROM alpine:latest
FROM node:18-alpine
# working directory inside the container
WORKDIR /app

# copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./


# run npm install in the container
RUN npm install

# copy the whole project to the container
COPY . ./

EXPOSE 3000

# run npm start in the container
CMD ["npm", "start"]

