/**
 * Firebase Cloud Functions for sleepy.help
 *
 * Architecture:
 * - auth/ - OAuth flows for smart home integrations
 * - lights/ - Light control endpoints
 * - utils/ - Shared utilities
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Export function modules
// These will be populated as Phase 2 progresses

// Health check endpoint
exports.healthCheck = functions.https.onRequest((req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Future exports:
// exports.hueOAuth = require('./auth/hue').callback;
// exports.lifxOAuth = require('./auth/lifx').callback;
// exports.controlLights = require('./lights/control').handler;
