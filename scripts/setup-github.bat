@echo off
echo Cryptic Hunt GitHub Repository Setup
echo This script will help you set up your GitHub repository for the Cryptic Hunt website.
echo.

set /p GITHUB_USERNAME=Enter your GitHub username: 
set /p REPO_NAME=Enter your repository name (default: cryptic-hunt): 

if "%REPO_NAME%"=="" set REPO_NAME=cryptic-hunt

echo.
echo Initializing git repository...
git init

echo.
echo Adding files to git...
git add .

echo.
echo Committing changes...
git commit -m "Initial commit"

echo.
echo Adding remote repository...
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

echo.
echo Pushing to GitHub...
echo Note: You may need to authenticate with GitHub.
git push -u origin main

echo.
echo GitHub repository setup complete!
echo Your repository is available at: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo.
echo For deployment instructions, see DEPLOYMENT.md 