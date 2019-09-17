#!/usr/bin/env bash
set -e

MACHINE_NAME=digio-node
for i in 1 2 3; do docker-machine rm -y ${MACHINE_NAME}-$i; done
