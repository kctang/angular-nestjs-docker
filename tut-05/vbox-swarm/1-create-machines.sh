#!/usr/bin/env bash
set -e

for i in 1 2 3; do docker-machine create --driver virtualbox vbox-node-$i; done
