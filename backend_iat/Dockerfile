# using node version 17 with alpine os
FROM node:17.8-alpine

# add tini & create app folder
RUN apk add --no-cache tini && mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install && npm cache clean --force
RUN npm i bcrypt@5.0.1
RUN npm install -g nodemon
COPY . .

EXPOSE 7878

CMD ["nodemon", "index.js"]