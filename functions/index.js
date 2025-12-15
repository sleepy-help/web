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

// Health check endpoint
exports.healthCheck = functions.https.onRequest((req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Phase 2: Smart Home Integration

// Philips Hue OAuth
const hueAuth = require('./auth/hue');
exports.hueOAuthStart = hueAuth.startOAuth;
exports.hueOAuthCallback = hueAuth.handleCallback;
exports.hueDisconnect = hueAuth.disconnect;

// LIFX OAuth
const lifxAuth = require('./auth/lifx');
exports.lifxOAuthStart = lifxAuth.startOAuth;
exports.lifxOAuthCallback = lifxAuth.handleCallback;
exports.lifxDisconnect = lifxAuth.disconnect;

// Light Control
const lightControl = require('./lights/control');
exports.controlLights = lightControl.control;
exports.listLights = lightControl.list;
