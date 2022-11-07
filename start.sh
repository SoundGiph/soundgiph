#!/bin/bash

sudo docker-compose up -d --build

if [$? -eq 0]; then
    echo "Docker compose up successful"
else
    echo "Fail to build the app"
fi