FROM node:latest


RUN mkdir -p /src/app
WORKDIR /src/app

COPY package.json /src/app
COPY . /src/app
RUN npm install


EXPOSE 8090
CMD ["npm","run","start"]
