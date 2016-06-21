FROM node:latest


RUN mkdir -p /src/app
WORKDIR /src/app

COPY package.json /src/app
RUN npm install

COPY . /usr/src/app

EXPOSE 8090
CMD ["npm","run","start"]
