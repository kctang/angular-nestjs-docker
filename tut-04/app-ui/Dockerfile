# reference:
# https://dev.to/avatsaev/create-efficient-angular-docker-images-with-multi-stage-builds-1f3n

# --- stage 1: build
# allow caching of this stage unless package.json has changed
FROM node:12.9-alpine as builder

COPY package.json package-lock.json ./
RUN npm ci && mkdir app && mv ./node_modules ./app

WORKDIR /app
COPY . .
RUN npm run ng build

# --- stage 2: setup
FROM nginx:1.17.3-alpine

RUN rm -fr /usr/share/nginx/html/*

COPY --from=builder /app/dist/app-ui /usr/share/nginx/html

COPY config/nginx /etc/nginx/conf.d/
COPY config/config.prod.json /usr/share/nginx/html/assets/config/config.json

CMD ["nginx", "-g", "daemon off;"]
