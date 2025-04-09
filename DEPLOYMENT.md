# Deployment Guide

This guide explains how to deploy the Cryptic Hunt website to GitHub Pages.

## Backend Deployment

For the backend, you have several options:

1. **Heroku**:
   - Create a Heroku account
   - Install the Heroku CLI
   - Run `heroku create`
   - Set environment variables: `heroku config:set MONGODB_URI=your_mongodb_uri JWT_SECRET=your_secret`
   - Deploy: `git push heroku main`

2. **Render**:
   - Create a Render account
   - Connect your GitHub repository
   - Set environment variables in the Render dashboard
   - Deploy automatically from your GitHub repository

3. **Railway**:
   - Create a Railway account
   - Connect your GitHub repository
   - Set environment variables in the Railway dashboard
   - Deploy automatically from your GitHub repository

## Frontend Deployment to GitHub Pages

1. Update the API URL in `client/app.js`:
   ```javascript
   // Change this line
   const API_URL = 'http://localhost:5000/api';
   
   // To your deployed backend URL
   const API_URL = 'https://your-backend-url.com/api';
   ```

2. Create a GitHub repository for your project

3. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/cryptic-hunt.git
   git push -u origin main
   ```

4. Go to your repository settings on GitHub

5. Scroll down to the "GitHub Pages" section

6. Select the branch you want to deploy (usually `main`)

7. Select the folder to deploy (usually `/ (root)`)

8. Click "Save"

9. Your site will be published at `https://yourusername.github.io/cryptic-hunt/`

## Important Notes

- Make sure your backend CORS settings allow requests from your GitHub Pages domain
- Update the `API_URL` in the frontend code to point to your deployed backend
- Consider using environment variables for the API URL to make it easier to switch between development and production

## Troubleshooting

- If you see CORS errors, update your backend CORS configuration to allow requests from your GitHub Pages domain
- If the frontend can't connect to the backend, check that the API_URL is correct
- If you're using MongoDB Atlas, make sure your IP address is whitelisted 