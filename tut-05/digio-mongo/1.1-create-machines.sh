#!/usr/bin/env bash
set -e

#https://www.digitalocean.com/community/tutorials/how-to-provision-and-manage-remote-docker-hosts-with-docker-machine-on-ubuntu-16-04
#https://developers.digitalocean.com/documentation/v2/#sizes

DOTOKEN=xxx
MACHINE_NAME=digio-mongo
docker-machine create --driver digitalocean --digitalocean-image ubuntu-18-04-x64 --digitalocean-size s-1vcpu-1gb --digitalocean-access-token $DOTOKEN $MACHINE_NAME
