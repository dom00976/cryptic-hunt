# Cryptic Hunt Website

A web application for managing and participating in cryptic hunts. The application features an admin interface for managing questions and a user interface for participating in the hunt.

## Features

- Secure login system
- Admin interface for managing questions
- User interface for participating in the hunt
- Responsive design
- Real-time question management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cryptic-hunt.git
   cd cryptic-hunt
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/cryptic-hunt
   JWT_SECRET=your-secret-key
   PORT=5000
   ```

4. Initialize the database with the admin user:
   ```bash
   npm run init-db
   ```

5. Start MongoDB:
   ```bash
   mongod
   ```

6. Start the backend server:
   ```bash
   npm run dev
   ```

7. Open the client/index.html file in your web browser

## GitHub Repository Setup

1. Create a new repository on GitHub
2. Initialize your local repository and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/cryptic-hunt.git
   git push -u origin main
   ```

3. For deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

## Usage

### Admin Login
- Username: @msmschool
- Password: admin

### Admin Features
- Add new questions
- Edit existing questions
- Delete questions
- View all questions

### User Features
- View questions one at a time
- Submit answers
- See hints (if available)
- Progress through questions

## Security

- JWT-based authentication
- Protected admin routes
- Secure password handling
- Environment variable configuration

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 