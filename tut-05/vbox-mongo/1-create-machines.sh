#!/usr/bin/env bash
set -e

# create machine
docker-machine create --driver virtualbox vbox-mongo

# expose virtualbox ports on host
VBoxManage controlvm "vbox-mongo" natpf1 "tcp-port27017,tcp,,27017,,27017";
VBoxManage controlvm "vbox-mongo" natpf1 "tcp-port8081,tcp,,8081,,8081";

# copy db init scripts to vbox-mongo
docker-machine scp -r ./docker-entrypoint-initdb.d vbox-mongo:/home/docker/docker-entrypoint-initdb.d
