#!/bin/bash
set -e


sleep 10
yarn migration:run:prod

if [ $? -eq 0 ]; then
    yarn start:prod
else
    echo "Fail to run migrations"
fi