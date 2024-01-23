FROM node:20-alpine as build

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn config set network-timeout 600000 && yarn install --immutable --silent

COPY . .

CMD [ "yarn", "start"]
EXPOSE 1234