#!/bin/bash
set -e

yarn build

if [ $? -eq 0 ]; then
    yarn start
else
    echo "Fail to build the app"
fi
