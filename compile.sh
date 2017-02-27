#!/bin/sh

UPLOAD_DIR=___upload-me___$(date "+%Y-%m-%d---%H-%M-%S")

LIST="index.php "
LIST="$LIST "

echo "Preparing the \"$UPLOAD_DIR/\" directory..."
[ -d $UPLOAD_DIR ] && rm -fr $UPLOAD_DIR
mkdir $UPLOAD_DIR

echo
echo "Copying files..."
cp -vr $LIST $UPLOAD_DIR

echo
echo "Done!"

