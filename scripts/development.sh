#!/usr/bin/env bash

COLOR_BOLD_RED='\033[1;31m'
COLOR_BOLD_CYAN='\033[1;36m'
COLOR_RESET='\033[0m'

clear

print_info() {
  printf "\n${COLOR_BOLD_CYAN}[Development]${COLOR_RESET} $1\n"
}


TOKEN=$(cat .env | grep USER_DEV_TOKEN | cut -d '=' -f2)
APP_ID=$(cat .env | grep APP_ID | cut -d '=' -f2)

REQUEST_URL="https://api.vk.com/method/apps.getAppLaunchParams?mini_app_id=${APP_ID}&v=5.201&referer=1&access_token=${TOKEN}"

response=$(curl -s -w "%{http_code}" $REQUEST_URL)

data=$(echo $response | jq -r '.response')

stringifyParams=$(echo $data | jq -r 'to_entries | map("\(.key)=\(.value)") | join("&")')

clear

> ./params.txt
echo $stringifyParams > ./params.txt

nest start --watch
