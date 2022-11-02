#!/bin/bash

sudo docker-compose down

if [$? -eq 0]; then
    echo "Docker compose up successful"
else
    echo "Fail to build the app"
fi