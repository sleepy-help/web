/**
 * LIFX OAuth Integration
 *
 * Phase 2: Smart Home Integration
 * Handles OAuth 2.0 flow for LIFX Cloud API
 *
 * Resources:
 * - LIFX API: https://api.developer.lifx.com/
 * - OAuth Guide: https://api.developer.lifx.com/docs/authentication
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

/**
 * LIFX OAuth Configuration
 * NOTE: Set via Firebase config:
 * firebase functions:config:set lifx.client_id="YOUR_ID" lifx.client_secret="YOUR_SECRET"
 */
const LIFX_CONFIG = {
  clientId: functions.config().lifx?.client_id || process.env.LIFX_CLIENT_ID,
  clientSecret: functions.config().lifx?.client_secret || process.env.LIFX_CLIENT_SECRET,
  authUrl: 'https://cloud.lifx.com/oauth/authorize',
  tokenUrl: 'https://cloud.lifx.com/oauth/token',
  redirectUri: 'https://sleepyhelp-b7b4b.web.app/auth/lifx/callback',
  scope: 'remote_control:all' // Full control of lights
};

/**
 * Step 1: Initiate OAuth Flow
 * GET /auth/lifx/start?userId={userId}
 */
exports.startOAuth = functions.https.onRequest((req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).send('Missing userId parameter');
  }

  // Generate state token for CSRF protection
  const state = generateStateToken(userId);

  // Store state in Firestore
  admin.firestore()
    .collection('oauth_states')
    .doc(state)
    .set({
      userId,
      provider: 'lifx',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    });

  // Build authorization URL
  const authUrl = new URL(LIFX_CONFIG.authUrl);
  authUrl.searchParams.append('client_id', LIFX_CONFIG.clientId);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('redirect_uri', LIFX_CONFIG.redirectUri);
  authUrl.searchParams.append('scope', LIFX_CONFIG.scope);
  authUrl.searchParams.append('state', state);

  res.redirect(authUrl.toString());
});

/**
 * Step 2: Handle OAuth Callback
 * GET /auth/lifx/callback?code={code}&state={state}
 */
exports.handleCallback = functions.https.onRequest(async (req, res) => {
  const { code, state } = req.query;

  if (!code || !state) {
    return res.status(400).send('Missing code or state parameter');
  }

  try {
    // Verify state token
    const stateDoc = await admin.firestore()
      .collection('oauth_states')
      .doc(state)
      .get();

    if (!stateDoc.exists) {
      return res.status(400).send('Invalid state token');
    }

    const { userId, expiresAt } = stateDoc.data();

    if (expiresAt.toDate() < new Date()) {
      return res.status(400).send('State token expired');
    }

    // Exchange code for token
    const tokenResponse = await exchangeCodeForToken(code);

    // Store tokens
    await storeTokens(userId, tokenResponse);

    // Clean up state
    await stateDoc.ref.delete();

    res.redirect('/settings?lifx=connected');

  } catch (error) {
    console.error('LIFX OAuth callback error:', error);
    res.redirect('/settings?lifx=error');
  }
});

/**
 * Exchange authorization code for access token
 */
async function exchangeCodeForToken(code) {
  const fetch = (await import('node-fetch')).default;

  const response = await fetch(LIFX_CONFIG.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      client_id: LIFX_CONFIG.clientId,
      client_secret: LIFX_CONFIG.clientSecret,
      redirect_uri: LIFX_CONFIG.redirectUri
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`LIFX token exchange failed: ${error}`);
  }

  const data = await response.json();

  return {
    accessToken: data.access_token,
    tokenType: data.token_type,
    scope: data.scope
  };
}

/**
 * Store tokens in Firestore
 */
async function storeTokens(userId, tokens) {
  // TODO: Encrypt tokens before storage

  await admin.firestore()
    .collection('users')
    .doc(userId)
    .collection('integrations')
    .doc('lifx')
    .set({
      accessToken: tokens.accessToken,
      tokenType: tokens.tokenType,
      scope: tokens.scope,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
}

/**
 * Get access token for user
 * NOTE: LIFX tokens don't expire, but user can revoke them
 */
exports.getAccessToken = async function(userId) {
  const integrationDoc = await admin.firestore()
    .collection('users')
    .doc(userId)
    .collection('integrations')
    .doc('lifx')
    .get();

  if (!integrationDoc.exists) {
    throw new Error('LIFX integration not found');
  }

  return integrationDoc.data().accessToken;
};

/**
 * Generate CSRF protection state token
 */
function generateStateToken(userId) {
  const crypto = require('crypto');
  return crypto.randomBytes(32).toString('hex') + ':' + userId;
}

/**
 * Disconnect LIFX integration
 */
exports.disconnect = functions.https.onRequest(async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).send('Missing userId');
  }

  try {
    // Delete stored tokens
    await admin.firestore()
      .collection('users')
      .doc(userId)
      .collection('integrations')
      .doc('lifx')
      .delete();

    res.send({ success: true });
  } catch (error) {
    console.error('LIFX disconnect error:', error);
    res.status(500).send({ error: error.message });
  }
});
