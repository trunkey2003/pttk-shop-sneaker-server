const express = require('express');
const router = express.Router();
const { auth } = require('express-openid-connect');

// Configure Auth0
const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

// Initialize Auth0 middleware
router.use(auth(authConfig));

// Define a middleware function to check the user's role
function checkRole(role) {
  return (req, res, next) => {
    if (req.oidc.user && req.oidc.user[process.env.AUTH0_NAMESPACE + '/roles'].includes(role)) {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  };
}


router.get('/login', (req, res) => {
  res.oidc.login({ returnTo: '/' });
});

router.get('/logout', (req, res) => {
  res.oidc.logout({ returnTo: '/' });
});

// Define a route for getting the current user's profile
router.get('/profile', auth(), (req, res) => {
  res.send(req.oidc.user);
});

// Define a route for getting all users (only accessible by admin)
router.get('/users', auth(), checkRole('admin'), (req, res) => {
  // Get all users from database or API
  // Send the users as response
});

// Define a route for updating a user's profile (only accessible by the same user or admin)
router.put('/users/:id', auth(), checkRole('user'), (req, res) => {
  // Check if the user id matches the current user's id or the current user is an admin
  if (req.params.id === req.oidc.user.sub || req.oidc.user[process.env.AUTH0_NAMESPACE + '/roles'].includes('admin')) {
    // Update the user's profile in database or API with req.body data
    // Send the updated user as response
  } else {
    res.status(401).send('Unauthorized');
  }
});