FROM node:10-alpine

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

COPY ./packages/backend/package.json /app/packages/backend/package.json
COPY ./packages/frontend/package.json /app/packages/frontend/package.json
COPY ./packages/config/package.json /app/packages/config/package.json

RUN yarn

COPY . /app/

ARG CLIENT_ID
RUN yarn build

CMD yarn start
