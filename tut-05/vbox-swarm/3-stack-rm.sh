#!/usr/bin/env bash
set -e

# connect to docker machine vbox-node-1
docker-machine env vbox-node-1
eval $(docker-machine env vbox-node-1)

# run docker commands in vbox-node-1
docker stack rm my-app

# disconnect from vbox-node-1
docker-machine env -u
eval $(docker-machine env -u)
