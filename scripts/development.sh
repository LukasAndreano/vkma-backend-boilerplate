#!/usr/bin/env bash

# This script starts development mode with authorization
# Available params:
#   - USER_DEV_TOKEN - user token for development mode (required)
#   - APP_ID - application id (required)
#   - COPY_TO_CLIPBOARD - copy params to clipboard (optional)

COLOR_BOLD_RED='\033[1;31m'
COLOR_BOLD_CYAN='\033[1;36m'
COLOR_RESET='\033[0m'

clear

print_info() {
  printf "\n${COLOR_BOLD_CYAN}[DEV START SCRIPT]${COLOR_RESET} $1\n"
}

TOKEN=$(cat .env | grep USER_DEV_TOKEN | cut -d '=' -f2)
APP_ID=$(cat .env | grep APP_ID | cut -d '=' -f2)
COPY_TO_CLIPBOARD=$(cat .env | grep COPY_TO_CLIPBOARD | cut -d '=' -f2)

if [ -z "$TOKEN" ]
then
  clear
  print_info "Please, set USER_DEV_TOKEN in .env file to run development mode with authorization"
  exit 1
fi

if [ -z "$APP_ID" ]
then
  clear
  print_info "Please, set APP_ID in .env file to run development mode with authorization"
  exit 1
fi

REQUEST_URL="https://api.vk.com/method/apps.getAppLaunchParams?mini_app_id=${APP_ID}&v=5.201&referer=1&access_token=${TOKEN}"

response=$(curl -s -w "%{http_code}" $REQUEST_URL)

data=$(echo $response | jq -r '.response')

stringifyParams=$(echo $data | jq -r 'to_entries | map("\(.key)=\(.value)") | join("&")')

clear

> ./params.txt
echo $stringifyParams > ./params.txt

if [ "$COPY_TO_CLIPBOARD" = true ]
then
  echo $stringifyParams | pbcopy
  print_info "Params copied to clipboard"
fi

nest start --watch
