FROM node:lts-alpine as base


WORKDIR /twodatabase

COPY package.json package-lock.json ./

RUN npm i

COPY . .

CMD [ "npm","run","start:dev" ]




