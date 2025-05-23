FROM node:slim

WORKDIR /app

COPY front/package*.json ./

RUN npm install

RUN npm i -g serve

COPY front/ .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]