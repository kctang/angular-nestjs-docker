#!/usr/bin/env bash
set -e

docker-machine ls
echo "Got to do these manually. Read this script file's comments"

#docker-machine ssh digio-node-1
#docker swarm init --advertise-addr 167.71.162.192
#docker login -u kctang
#
#docker-machine ssh digio-node-2
#docker swarm join --token SWMTKN-1-6c90ezfan0wgw98ztwrckjqz14h9mpdi3ayghqepy9oe2xp3k8-7hycrx3d74u14mkkeuwmapqku 167.71.162.192:2377
#docker login -u kctang
#
#docker-machine ssh digio-node-3
#docker swarm join --token SWMTKN-1-6c90ezfan0wgw98ztwrckjqz14h9mpdi3ayghqepy9oe2xp3k8-7hycrx3d74u14mkkeuwmapqku 167.71.162.192:2377
#docker login -u kctang
#
