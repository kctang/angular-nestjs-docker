# reference:
# https://dev.to/avatsaev/create-efficient-angular-docker-images-with-multi-stage-builds-1f3n

# --- stage 1: build
FROM node:12.9-alpine as builder

COPY package.json package-lock.json ./
RUN npm ci && mkdir app && mv ./node_modules ./app

WORKDIR /app
COPY . .
RUN npm run build

# --- stage 2: setup
FROM node:12.9-alpine

WORKDIR /app
COPY --from=builder /app /app

ENV NODE_ENV prod

CMD ["npm", "run", "start:prod"]
