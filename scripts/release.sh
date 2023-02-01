#!/usr/bin/env bash

COLOR_BOLD_RED='\033[1;31m'
COLOR_BOLD_CYAN='\033[1;36m'
COLOR_RESET='\033[0m'

clear

print_info() {
  printf "\n${COLOR_BOLD_CYAN}[Publish]${COLOR_RESET} $1\n"
}

PACKAGE_VERSION=$(node -p "require('./package.json').version")

print_info "Prettifying the project..."
yarn prettify

print_info "Linting the project..."
yarn lint

print_info "Trying to build the project..."
yarn build

print_info "Publishing the project with version ${PACKAGE_VERSION}..."
git add .
git commit -m "chore: release version ${PACKAGE_VERSION}"
git push --set-upstream origin main

print_info "Deployed!"
