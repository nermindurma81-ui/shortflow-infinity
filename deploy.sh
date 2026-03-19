#!/bin/bash

set -e

echo "🚀 ShortFlow Infinity - Deployment Script"
echo "=========================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Select deployment target:${NC}"
echo "1) Firebase Hosting (Web)"
echo "2) Firebase App Distribution (Android)"
echo "3) GitHub Pages"
echo "4) Local Preview"
read -p "Enter choice (1-4): " choice

case $choice in
  1)
    echo -e "\n${YELLOW}Deploying to Firebase Hosting...${NC}"
    npm run build
    firebase deploy --only hosting
    echo -e "${GREEN}✓ Deployed to Firebase Hosting${NC}"
    ;;
  2)
    echo -e "\n${YELLOW}Deploying to Firebase App Distribution...${NC}"
    ./build.sh
    firebase appdistribution:distribute android/app/build/outputs/apk/release/app-release-unsigned.apk \
      --app YOUR_APP_ID \
      --groups testers \
      --release-notes "New build"
    echo -e "${GREEN}✓ Deployed to Firebase App Distribution${NC}"
    ;;
  3)
    echo -e "\n${YELLOW}Deploying to GitHub Pages...${NC}"
    npm run build
    npx gh-pages -d dist
    echo -e "${GREEN}✓ Deployed to GitHub Pages${NC}"
    ;;
  4)
    echo -e "\n${YELLOW}Starting local preview...${NC}"
    npm run preview
    ;;
  *)
    echo -e "${RED}Invalid choice${NC}"
    exit 1
    ;;
esac
