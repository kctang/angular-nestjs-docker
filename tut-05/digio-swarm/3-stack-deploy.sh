#!/usr/bin/env bash
set -e

# connect to docker machine digio-node-1
docker-machine env digio-node-1
eval $(docker-machine env digio-node-1)

# run docker commands in digio-node-1
docker stack deploy --with-registry-auth -c docker-compose.yml my-app

# disconnect from digio-node-1
docker-machine env -u
eval $(docker-machine env -u)
