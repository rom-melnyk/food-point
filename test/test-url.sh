#!/usr/bin/env bash

curl --request POST \
    --header 'Content-Type: application/json' \
    --include \
    --data '{"name":"dish one", "price": 14.88}' \
    localhost:8080/api/dishes

echo -e '\n'
