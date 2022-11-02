#!/bin/bash

sudo docker-compose run  certbot certonly --webroot --webroot-path /var/www/certbot/ -d dev.vozo.app
sudo docker-compose run  certbot certonly --webroot --webroot-path /var/www/certbot/ -d backend.dev.vozo.app