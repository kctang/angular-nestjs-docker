#!/usr/bin/env bash
set -e

# connect to docker machine vbox-node-1
docker-machine env vbox-node-1
eval $(docker-machine env vbox-node-1)

docker service scale my-app_my-ui=3
docker service scale my-app_my-api=2

# disconnect from vbox-node-1
docker-machine env -u
eval $(docker-machine env -u)
