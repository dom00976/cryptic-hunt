#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Cryptic Hunt GitHub Repository Setup${NC}"
echo "This script will help you set up your GitHub repository for the Cryptic Hunt website."
echo ""

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

# Get repository name
read -p "Enter your repository name (default: cryptic-hunt): " REPO_NAME
REPO_NAME=${REPO_NAME:-cryptic-hunt}

# Initialize git repository
echo -e "\n${GREEN}Initializing git repository...${NC}"
git init

# Add all files
echo -e "\n${GREEN}Adding files to git...${NC}"
git add .

# Commit changes
echo -e "\n${GREEN}Committing changes...${NC}"
git commit -m "Initial commit"

# Add remote repository
echo -e "\n${GREEN}Adding remote repository...${NC}"
git remote add origin "https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

# Push to GitHub
echo -e "\n${GREEN}Pushing to GitHub...${NC}"
echo -e "${YELLOW}Note: You may need to authenticate with GitHub.${NC}"
git push -u origin main

echo -e "\n${GREEN}GitHub repository setup complete!${NC}"
echo -e "Your repository is available at: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
echo -e "\nFor deployment instructions, see DEPLOYMENT.md" 