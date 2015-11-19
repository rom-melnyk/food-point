#!/usr/bin/env bash

URL_MASK="http://localhost:8080/api"
URL=
METHOD=
HEADER="Content-Type: application/json"
AREA=
DATA=

# --- method ---
if [ "$1" == "c" -o "$1" == "C" ]; then
    METHOD="POST"
    URL="$URL_MASK/__area__"
fi
if [ "$1" == "r" -o "$1" == "R" ]; then
    METHOD="GET"
    URL="$URL_MASK/__area__"
    HEADER=
fi
if [ "$1" == "u" -o "$1" == "U" ]; then
    METHOD="PUT"
    URL="$URL_MASK/__area__/$3"
fi
if [ "$1" == "d" -o "$1" == "D" ]; then
    METHOD="DELETE"
    URL="$URL_MASK/__area__/$3"
    HEADER=
fi

# --- area ---
if [ "$2" == "user" -o "$2" == "users" ]; then
    AREA="users"
    # TODO
    if [ "$METHOD" == "POST" -o "$METHOD" == "PUT" ]; then
            DATA="{\"name\": \"__3__\", \"email\": \"__4__\", \"phone\": \"__5__\", \"address\": \"__6__\"}"
    fi
fi
if [ "$2" == "dish" -o "$2" == "dishes" ]; then
    AREA="dishes"
    if [ "$METHOD" == "POST" -o "$METHOD" == "PUT" ]; then
            DATA="{\"name\": \"__3__\", \"price\": __4__}"
    fi
fi
if [ "$2" == "order" -o "$2" == "orders" ]; then
    AREA="orders"
    # TODO
    if [ "$METHOD" == "POST" -o "$METHOD" == "PUT" ]; then
            DATA="{\"name\": \"__3__\", \"price\": __4__}"
    fi
fi

URL=$(echo $URL | sed "s/__area__/$AREA/")
DATA=$(echo $DATA | sed "s/__3__/$3/" | sed "s/__4__/$4/")

CMD="curl --include --header '$HEADER' --data '$DATA' --request $METHOD $URL"
CMD=$(echo "$CMD" | sed 's/ \+/ /g')

echo $METHOD $URL
[ "$HEADER" != "" ] && echo Header: "$HEADER"
[ "$DATA" != "" ] && echo Data: "$DATA"
echo Command: "$CMD"
echo -e '\n'

$($CMD)

echo -e '\n'
