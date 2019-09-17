#!/usr/bin/env bash
set -e

DOVOLUME=volume-nyc3-01

# Create a mount point for your volume:
docker-machine ssh digio-mongo "mkdir -p /mnt/${DOVOLUME}"

# Mount your volume at the newly-created mount point:
docker-machine ssh digio-mongo "mount -o discard,defaults,noatime /dev/disk/by-id/scsi-0DO_Volume_${DOVOLUME} /mnt/${DOVOLUME}"

# Change fstab so the volume will be mounted after a reboot
docker-machine ssh digio-mongo "echo '/dev/disk/by-id/scsi-0DO_Volume_${DOVOLUME} /mnt/${DOVOLUME} ext4 defaults,nofail,discard 0 0' | sudo tee -a /etc/fstab"

# create directories in volume
docker-machine ssh digio-mongo "mkdir -p /mnt/${DOVOLUME}/data"
docker-machine ssh digio-mongo "mkdir -p /mnt/${DOVOLUME}/docker-entrypoint-initdb.d"

# create symlink to directories in volume
docker-machine ssh digio-mongo "ln -s /mnt/${DOVOLUME}/data /root/data"
docker-machine ssh digio-mongo "ln -s /mnt/${DOVOLUME}/docker-entrypoint-initdb.d /root/docker-entrypoint-initdb.d"

# copy db init scripts
docker-machine scp -r ./docker-entrypoint-initdb.d digio-mongo:/root
