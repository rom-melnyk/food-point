#!/bin/bash

DIRECTORY=~/Prj/food-point/

# change me if not GNOME
TERMINAL=gnome-terminal

# change this according to your terminal key
TERM_COMMAND="-x bash -c"
TERM_NEW_INSTANCE=--window
TERM_NEW_TAB=--tab
TERM_WORKING_DIRECTORY="--working-directory=$DIRECTORY"

# optional non-functional additions; might be omitted
TERM_TITLE_SERVER=--title=Server/nodemon
TERM_TITLE_CLIENT=--title=Client/Webpack
TERM_MAXIMIZE=--maximize

# ----------------- run two instances -----------------
INSTANCE_2="$TERMINAL $TERM_NEW_TAB $TERM_COMMAND \\\"webpack --colors\\\""
INSTANCE_1="$TERMINAL $TERM_NEW_INSTANCE $TERM_WORKING_DIRECTORY $TERM_MAXIMIZE"
INSTANCE_1="$INSTANCE_1 $TERM_COMMAND \"$INSTANCE_2; nodemon server.es\""

echo "$INSTANCE_1"
#eval '$INSTANCE_1'

#gnome-terminal --working-directory=/home/rom/Prj/food-point/ --maximize --tab --tab --command "node node_modules/webpack/webpack.js --colors --watch" --tab --command "nodemon server.es"