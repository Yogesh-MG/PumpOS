#!/bin/bash

echo "Starting to execute the Android commands"
cd app || exit

#npm run build
if [ ! -d "./android" ]; then
    echo "Android folder not found, creating one"
    npx cap add android
fi
npx cap sync android

echo "Press Y to run"
read -r fed

USERNAME=$(whoami)
SDK_PATH="C:\\\\Users\\\\$USERNAME\\\\AppData\\\\Local\\\\Android\\\\Sdk"
LOCAL_PROPERTIES="./android/local.properties"

echo "sdk.dir=$SDK_PATH" > "$LOCAL_PROPERTIES"

echo "✅ local.properties updated"

# Fixed condition: must have spaces inside [ ]
if [ "$fed" != "y" ]; then
    echo "Sync is completed, check android/app/build/outputs/app-debug.apk"
    exit 0
fi

# Only runs if user pressed Y
npx cap run android
echo "new-app-debug.apk generated, check android/app/build/outputs/app-debug.apk to check APP version"