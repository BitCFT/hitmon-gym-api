FROM node:20-alpine

RUN apk add --no-cache bash

USER node

WORKDIR /usr/src/app
