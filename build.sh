#!/bin/bash

set -e

echo "🚀 ShortFlow Infinity - Android Build Script"
echo "=============================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node --version)${NC}"
echo -e "${GREEN}✓ npm $(npm --version)${NC}"

# Install dependencies
echo -e "\n${YELLOW}Installing dependencies...${NC}"
npm ci

# Build web app
echo -e "\n${YELLOW}Building web application...${NC}"
npm run build

# Sync with Capacitor
echo -e "\n${YELLOW}Syncing with Capacitor...${NC}"
npx cap sync android

# Build Android APK
echo -e "\n${YELLOW}Building Android APK...${NC}"
cd android

if [ ! -d "app/build/outputs/apk" ]; then
    mkdir -p app/build/outputs/apk
fi

./gradlew assembleRelease

# Check if build succeeded
if [ -f "app/build/outputs/apk/release/app-release-unsigned.apk" ]; then
    echo -e "${GREEN}✓ Build successful!${NC}"
    echo -e "${GREEN}APK location: app/build/outputs/apk/release/app-release-unsigned.apk${NC}"
else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi

cd ..

echo -e "\n${GREEN}🎉 Build completed successfully!${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Sign the APK with your keystore"
echo "2. Upload to Google Play Store or distribute"
