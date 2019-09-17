#!/usr/bin/env bash
set -e
docker run -it --rm \
    --name mongo-express-it \
    -p 8082:8081 \
    -e ME_CONFIG_MONGODB_SERVER="127.0.0.1" \
    -e ME_CONFIG_MONGODB_ADMINUSERNAME="admin" \
    -e ME_CONFIG_MONGODB_ADMINPASSWORD="password" \
    mongo-express:0.49
