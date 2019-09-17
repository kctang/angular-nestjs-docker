#!/usr/bin/env bash
set -e

# connect to docker machine vbox-mongo
docker-machine env vbox-mongo
eval $(docker-machine env vbox-mongo)

# run docker commands in vbox-mongo
docker-compose up -d

# disconnect from vbox-mongo
docker-machine env -u
eval $(docker-machine env -u)
