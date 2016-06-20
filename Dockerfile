FROM node:latest


RUN mkdir -p /src/app
WORKDIR /src/app

EXPOSE 8080
