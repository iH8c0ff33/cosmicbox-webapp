FROM node:9.4-alpine as build

WORKDIR /app
ADD package.json /app
RUN npm install --verbose

ADD public /app/public
ADD src /app/src
ADD tsconfig.json /app

RUN npm run build

FROM nginx:1.13-alpine

COPY --from=build /app/build /usr/share/nginx/html
