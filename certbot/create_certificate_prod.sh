#!/bin/bash

sudo docker-compose run  certbot certonly --webroot --webroot-path /var/www/certbot/ -d vozo.app
sudo docker-compose run  certbot certonly --webroot --webroot-path /var/www/certbot/ -d backend.vozo.app