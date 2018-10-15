FROM node:10.12-alpine as build

WORKDIR /app

ADD package.json /app
ADD yarn.lock /app
RUN yarn

ADD . /app

RUN yarn build

FROM nginx:1.15-alpine

LABEL maintainer="Daniele Monteleone <daniele.monteleone.it@gmail.com>"

COPY default.conf /etc/nginx/conf.d
COPY --from=build /app/build /usr/share/nginx/html
