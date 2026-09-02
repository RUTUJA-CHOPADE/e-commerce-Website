const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const path = require('path');
const fs = require('fs');

let serviceAccountPath = path.join(__dirname, '../../authkey.json');
if (!fs.existsSync(serviceAccountPath)) {
  serviceAccountPath = path.join(__dirname, '../../authorizationkey.json');
}

let app;
try {
  const serviceAccount = require(serviceAccountPath);

  if (getApps().length === 0) {
    app = initializeApp({
      credential: cert(serviceAccount)
    });
  } else {
    app = getApps()[0];
  }

  console.log('Firebase Admin SDK initialized successfully with key:', path.basename(serviceAccountPath));
} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error.message);
}

const auth = getAuth();

module.exports = {
  adminApp: app,
  auth
};
