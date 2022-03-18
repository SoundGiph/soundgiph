#!/bin/bash
set -e

sleep 10
yarn build

if [ $? -eq 0 ]; then

    yarn start
else
    echo "Fail to build the app"
fi
