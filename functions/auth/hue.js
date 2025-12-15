/**
 * Philips Hue OAuth Integration
 *
 * Phase 2: Smart Home Integration
 * Handles OAuth 2.0 flow for Philips Hue Bridge
 *
 * Resources:
 * - Hue Remote API: https://developers.meethue.com/develop/hue-api-v2/
 * - OAuth 2.0 Guide: https://developers.meethue.com/develop/hue-api-v2/getting-started/
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

/**
 * Hue OAuth Configuration
 * NOTE: These should be set via Firebase config:
 * firebase functions:config:set hue.client_id="YOUR_ID" hue.client_secret="YOUR_SECRET"
 */
const HUE_CONFIG = {
  clientId: functions.config().hue?.client_id || process.env.HUE_CLIENT_ID,
  clientSecret: functions.config().hue?.client_secret || process.env.HUE_CLIENT_SECRET,
  authUrl: 'https://api.meethue.com/v2/oauth2/authorize',
  tokenUrl: 'https://api.meethue.com/v2/oauth2/token',
  redirectUri: 'https://sleepyhelp-b7b4b.web.app/auth/hue/callback', // Update for production
  scope: 'lights.read lights.write'
};

/**
 * Step 1: Initiate OAuth Flow
 * Redirects user to Hue authorization page
 *
 * GET /auth/hue/start?userId={userId}
 */
exports.startOAuth = functions.https.onRequest((req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).send('Missing userId parameter');
  }

  // Generate state token for CSRF protection
  const state = generateStateToken(userId);

  // Store state in Firestore for validation
  admin.firestore()
    .collection('oauth_states')
    .doc(state)
    .set({
      userId,
      provider: 'hue',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    });

  // Build authorization URL
  const authUrl = new URL(HUE_CONFIG.authUrl);
  authUrl.searchParams.append('client_id', HUE_CONFIG.clientId);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('redirect_uri', HUE_CONFIG.redirectUri);
  authUrl.searchParams.append('scope', HUE_CONFIG.scope);
  authUrl.searchParams.append('state', state);

  // Redirect user to Hue authorization page
  res.redirect(authUrl.toString());
});

/**
 * Step 2: Handle OAuth Callback
 * Hue redirects back here with authorization code
 *
 * GET /auth/hue/callback?code={code}&state={state}
 */
exports.handleCallback = functions.https.onRequest(async (req, res) => {
  const { code, state } = req.query;

  // Validate parameters
  if (!code || !state) {
    return res.status(400).send('Missing code or state parameter');
  }

  try {
    // Verify state token (CSRF protection)
    const stateDoc = await admin.firestore()
      .collection('oauth_states')
      .doc(state)
      .get();

    if (!stateDoc.exists) {
      return res.status(400).send('Invalid state token');
    }

    const { userId, expiresAt } = stateDoc.data();

    // Check if state has expired
    if (expiresAt.toDate() < new Date()) {
      return res.status(400).send('State token expired');
    }

    // Exchange authorization code for access token
    const tokenResponse = await exchangeCodeForToken(code);

    // Store tokens in Firestore (encrypted)
    await storeTokens(userId, tokenResponse);

    // Clean up state token
    await stateDoc.ref.delete();

    // Redirect back to app with success
    res.redirect('/settings?hue=connected');

  } catch (error) {
    console.error('Hue OAuth callback error:', error);
    res.redirect('/settings?hue=error');
  }
});

/**
 * Exchange authorization code for access token
 */
async function exchangeCodeForToken(code) {
  const fetch = (await import('node-fetch')).default;

  const response = await fetch(HUE_CONFIG.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(
        `${HUE_CONFIG.clientId}:${HUE_CONFIG.clientSecret}`
      ).toString('base64')
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: HUE_CONFIG.redirectUri
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed: ${error}`);
  }

  const data = await response.json();

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
    tokenType: data.token_type
  };
}

/**
 * Store encrypted tokens in Firestore
 */
async function storeTokens(userId, tokens) {
  // TODO: Implement encryption before storage
  // For now, storing as-is (SECURITY: Must encrypt in production!)

  await admin.firestore()
    .collection('users')
    .doc(userId)
    .collection('integrations')
    .doc('hue')
    .set({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresAt: new Date(Date.now() + tokens.expiresIn * 1000),
      tokenType: tokens.tokenType,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
}

/**
 * Refresh expired access token
 */
async function refreshAccessToken(userId) {
  const integrationDoc = await admin.firestore()
    .collection('users')
    .doc(userId)
    .collection('integrations')
    .doc('hue')
    .get();

  if (!integrationDoc.exists) {
    throw new Error('Hue integration not found');
  }

  const { refreshToken } = integrationDoc.data();
  const fetch = (await import('node-fetch')).default;

  const response = await fetch(HUE_CONFIG.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(
        `${HUE_CONFIG.clientId}:${HUE_CONFIG.clientSecret}`
      ).toString('base64')
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  });

  if (!response.ok) {
    throw new Error('Token refresh failed');
  }

  const data = await response.json();
  await storeTokens(userId, {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
    tokenType: data.token_type
  });

  return data.access_token;
}

/**
 * Get valid access token (refresh if expired)
 */
exports.getAccessToken = async function(userId) {
  const integrationDoc = await admin.firestore()
    .collection('users')
    .doc(userId)
    .collection('integrations')
    .doc('hue')
    .get();

  if (!integrationDoc.exists) {
    throw new Error('Hue integration not found');
  }

  const { accessToken, expiresAt } = integrationDoc.data();

  // Check if token is expired (with 5 minute buffer)
  if (expiresAt.toDate() < new Date(Date.now() + 5 * 60 * 1000)) {
    return await refreshAccessToken(userId);
  }

  return accessToken;
};

/**
 * Generate CSRF protection state token
 */
function generateStateToken(userId) {
  const crypto = require('crypto');
  return crypto.randomBytes(32).toString('hex') + ':' + userId;
}

/**
 * Disconnect Hue integration
 */
exports.disconnect = functions.https.onRequest(async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).send('Missing userId');
  }

  try {
    // TODO: Revoke token with Hue API

    // Delete stored tokens
    await admin.firestore()
      .collection('users')
      .doc(userId)
      .collection('integrations')
      .doc('hue')
      .delete();

    res.send({ success: true });
  } catch (error) {
    console.error('Hue disconnect error:', error);
    res.status(500).send({ error: error.message });
  }
});
