#!/usr/bin/env bash
set -e

docker tag app-api:latest kctang/big2:app-api
docker tag app-ui:latest kctang/big2:app-ui

docker push kctang/big2:app-api
docker push kctang/big2:app-ui

