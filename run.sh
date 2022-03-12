#!/bin/bash

docker-compose build 

if [ $? -eq 0 ]; then

    docker-compose up
else
    echo "Fail to build the app"
fi