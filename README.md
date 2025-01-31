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
- MongoDB (local or Atlas URI)
- Git
- XCode

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
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_app_password
   EASYPOST_API_KEY=your_easypost_key
   NODE_ENV=development
   ```

4. Start the development server:

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
