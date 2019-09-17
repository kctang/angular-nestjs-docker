#!/usr/bin/env bash
set -e

# connect to docker machine digio-mongo
docker-machine env digio-mongo
eval $(docker-machine env digio-mongo)

# run docker commands in digio-mongo
docker-compose up -d

# disconnect from digio-mongo
docker-machine env -u
eval $(docker-machine env -u)
