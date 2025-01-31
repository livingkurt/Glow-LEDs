<p align="center">
  <img style="text-align: center;" src="./client/public/images/optimized_images/logo_images/glow_logo_optimized.png">
  <h1 style="text-align: center;">3D Printed LED toys, by a glover that wants the world to stay lit</h1>
  <!-- <h1 style="text-align: center;">3D Printed LED toys and accessories, by a glover that just wants to light up the world</h1> -->
</p>

# About

Glow LEDs is a full-stack e-commerce application specializing in 3D printed LED toys and accessories. The platform provides a seamless shopping experience with features for both users and administrators.

# Tech Stack

## Frontend

- React 18
- Vite
- Redux Toolkit
- Material-UI (MUI) v6
- React Router v6
- Socket.io Client
- Axios
- SASS
- Vitest for unit testing

## Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.io
- JWT Authentication
- Nodemailer
- Stripe Integration
- EasyPost API Integration
- Various security middlewares

# Features

## User Features

- User authentication (signup, login, password reset)
- Product browsing and searching
- Shopping cart management
- Secure checkout with Stripe
- Order tracking
- Email notifications
- Account management
- Real-time updates via WebSocket

## Admin Features

- Product management (CRUD operations)
- Order management
- Shipping integration with EasyPost
- Sales analytics
- User management
- Inventory tracking

# Prerequisites

Before installation, ensure you have the following installed:

- Node.js (v20.11.1)
- npm (v10.2.4)
- Git
- XCode
- Homebrew (for MongoDB installation)

## Installing MongoDB on macOS

1. Install Homebrew (if not already installed):

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Tap the MongoDB Homebrew Tap:

   ```bash
   brew tap mongodb/brew
   ```

3. Install MongoDB Community Edition:

   ```bash
   brew install mongodb-community
   ```

4. Start MongoDB as a macOS service:

   ```bash
   brew services start mongodb-community
   ```

5. Verify MongoDB installation:
   ```bash
   mongosh
   ```

## Installing MongoDB Database Tools

MongoDB Database Tools are included with MongoDB Community Edition. If you need to install them separately:

1. Install via Homebrew:

   ```bash
   brew install mongodb-database-tools
   ```

2. Verify the installation:
   ```bash
   mongoexport --version
   ```

## Configuring MongoDB PATH

Homebrew automatically adds MongoDB binaries to your PATH. If you need to add them manually:

1. Open your shell configuration file:

   ```bash
   nano ~/.zshrc  # for Zsh
   # or
   nano ~/.bash_profile  # for Bash
   ```

2. Add the following line:

   ```bash
   export PATH="/usr/local/opt/mongodb-community/bin:$PATH"
   ```

3. Save and reload your shell configuration:
   ```bash
   source ~/.zshrc  # for Zsh
   # or
   source ~/.bash_profile  # for Bash
   ```

# Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/Glow-LEDs.git
   cd Glow-LEDs
   ```

2. Install dependencies:

   ```bash
   npm run clean-install
   ```

3. Create a .env file in the root directory with the following variables:

   ```
   MONGODB_URI=mongodb://localhost:27017/glow_leds  # local MongoDB URI
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_app_password
   EASYPOST_API_KEY=your_easypost_key
   NODE_ENV=development
   ```

4. Start MongoDB (if not already running):

   ```bash
   brew services start mongodb-community
   ```

5. Start the transpiler server:

   ```bash
   npm run transpile-watch
   ```

6. Start the development server:
   ```bash
   npm run start:dev
   ```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:8080

# Available Scripts

- `npm run start:dev`: Start development server
- `npm run build`: Build the application
- `npm run test`: Run tests
- `npm run lint`: Run ESLint
- `npm run prettier`: Run Prettier
- `npm run cypress:run`: Run Cypress tests

# Development

## Directory Structure

- `/client`: Frontend React application
- `/server`: Backend Node.js application
- `/dist`: Compiled backend code
- `/client/dist`: Compiled frontend code

## Testing

- Frontend unit tests: `cd client && npm test`
- E2E tests: `npm run cypress:run`
- Backend tests: `npm run test:backend`

## Code Style

The project uses ESLint and Prettier for code formatting. Run `npm run lint` and `npm run prettier` to ensure your code meets the project's style guidelines.

# Deployment

The application is configured for deployment on Heroku. The `heroku-postbuild` script will handle the build process.

# Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

# License

This project is licensed under the MIT License.

# Inspiration

I have been facinated with LEDs ever since I saw my first light show back in early 2014, and always wanted the top of the line gloves so that I could customize the modes as much as possible. I've noticed that led diffusers have not made any significant advancements and feel little bored with what is avaiable. So then I bought my Prusa i3 MK3s 3D printer, and got to work developing what I call **\_\_\_** (To Be Announced)!
