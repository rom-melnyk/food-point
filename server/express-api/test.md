# CRUD testing

## Labels
- curl --include --request GET http://127.0.0.1:8080/api/labels
- curl --include --request GET http://127.0.0.1:8080/api/labels/1
- curl --include --request POST --header 'Content-Type: application/json' --data '{"name": "label two", "icon": 2}' http://127.0.0.1:8080/api/labels
- curl --include --request PUT --header 'Content-Type: application/json' --data '{"name": "label three", "icon": 3}' http://127.0.0.1:8080/api/labels/3
- curl --include --request DELETE http://127.0.0.1:8080/api/labels/3
