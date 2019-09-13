#!/usr/bin/env bash
set -e

pushd app-api
docker build -t app-api .
popd

pushd app-ui
docker build -t app-ui .
popd

