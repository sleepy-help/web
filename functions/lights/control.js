/**
 * Smart Light Control API
 *
 * Phase 2: Smart Home Integration
 * Unified API for controlling Hue and LIFX lights
 *
 * Features:
 * - Gradual dimming (2 hour wind-down)
 * - Color temperature shift (blue → amber)
 * - Automatic scheduling based on bedtime
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const hue = require('../auth/hue');
const lifx = require('../auth/lifx');

/**
 * Control lights endpoint
 * POST /lights/control
 *
 * Body: {
 *   userId: string,
 *   provider: 'hue' | 'lifx',
 *   action: 'dim' | 'off' | 'warmup' | 'schedule',
 *   params: object
 * }
 */
exports.control = functions.https.onRequest(async (req, res) => {
  // CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  const { userId, provider, action, params } = req.body;

  // Validate request
  if (!userId || !provider || !action) {
    return res.status(400).json({
      error: 'Missing required fields: userId, provider, action'
    });
  }

  try {
    let result;

    switch (provider) {
      case 'hue':
        result = await controlHueLights(userId, action, params);
        break;
      case 'lifx':
        result = await controlLIFXLights(userId, action, params);
        break;
      default:
        return res.status(400).json({ error: 'Invalid provider' });
    }

    res.json({ success: true, result });

  } catch (error) {
    console.error('Light control error:', error);
    res.status(500).json({
      error: error.message,
      provider,
      action
    });
  }
});

/**
 * Control Philips Hue lights
 */
async function controlHueLights(userId, action, params) {
  const accessToken = await hue.getAccessToken(userId);
  const fetch = (await import('node-fetch')).default;

  switch (action) {
    case 'dim':
      return await dimHueLights(accessToken, params);
    case 'off':
      return await turnOffHueLights(accessToken);
    case 'warmup':
      return await warmupHueLights(accessToken, params);
    default:
      throw new Error(`Unknown action: ${action}`);
  }
}

/**
 * Dim Hue lights gradually
 * params: { brightness: 0-100, duration: seconds }
 */
async function dimHueLights(accessToken, params) {
  const fetch = (await import('node-fetch')).default;
  const { brightness = 10, duration = 7200 } = params; // Default: 10%, 2 hours

  // Hue API v2 endpoint
  const response = await fetch('https://api.meethue.com/route/clip/v2/resource/light', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      on: { on: true },
      dimming: { brightness },
      dynamics: { duration: duration * 1000 } // Convert to milliseconds
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Hue API error: ${error}`);
  }

  return await response.json();
}

/**
 * Turn off Hue lights
 */
async function turnOffHueLights(accessToken) {
  const fetch = (await import('node-fetch')).default;

  const response = await fetch('https://api.meethue.com/route/clip/v2/resource/light', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      on: { on: false }
    })
  });

  if (!response.ok) {
    throw new Error('Failed to turn off Hue lights');
  }

  return await response.json();
}

/**
 * Warm up Hue lights (shift to amber)
 * params: { colorTemp: 2000-6500K, duration: seconds }
 */
async function warmupHueLights(accessToken, params) {
  const fetch = (await import('node-fetch')).default;
  const { colorTemp = 2700, duration = 3600 } = params; // Default: 2700K, 1 hour

  // Convert Kelvin to Mired (Hue uses Mired)
  const mired = Math.round(1000000 / colorTemp);

  const response = await fetch('https://api.meethue.com/route/clip/v2/resource/light', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      on: { on: true },
      color_temperature: { mirek: mired },
      dynamics: { duration: duration * 1000 }
    })
  });

  if (!response.ok) {
    throw new Error('Failed to warm up Hue lights');
  }

  return await response.json();
}

/**
 * Control LIFX lights
 */
async function controlLIFXLights(userId, action, params) {
  const accessToken = await lifx.getAccessToken(userId);

  switch (action) {
    case 'dim':
      return await dimLIFXLights(accessToken, params);
    case 'off':
      return await turnOffLIFXLights(accessToken);
    case 'warmup':
      return await warmupLIFXLights(accessToken, params);
    default:
      throw new Error(`Unknown action: ${action}`);
  }
}

/**
 * Dim LIFX lights gradually
 */
async function dimLIFXLights(accessToken, params) {
  const fetch = (await import('node-fetch')).default;
  const { brightness = 0.1, duration = 7200 } = params;

  const response = await fetch('https://api.lifx.com/v1/lights/all/state', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      power: 'on',
      brightness: brightness,
      duration: duration
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`LIFX API error: ${error}`);
  }

  return await response.json();
}

/**
 * Turn off LIFX lights
 */
async function turnOffLIFXLights(accessToken) {
  const fetch = (await import('node-fetch')).default;

  const response = await fetch('https://api.lifx.com/v1/lights/all/state', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      power: 'off',
      duration: 1 // Fade out over 1 second
    })
  });

  if (!response.ok) {
    throw new Error('Failed to turn off LIFX lights');
  }

  return await response.json();
}

/**
 * Warm up LIFX lights (shift to amber)
 */
async function warmupLIFXLights(accessToken, params) {
  const fetch = (await import('node-fetch')).default;
  const { colorTemp = 2700, duration = 3600 } = params;

  const response = await fetch('https://api.lifx.com/v1/lights/all/state', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      power: 'on',
      color: `kelvin:${colorTemp}`,
      duration: duration
    })
  });

  if (!response.ok) {
    throw new Error('Failed to warm up LIFX lights');
  }

  return await response.json();
}

/**
 * Get list of lights
 * GET /lights/list?userId={userId}&provider={provider}
 */
exports.list = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const { userId, provider } = req.query;

  if (!userId || !provider) {
    return res.status(400).json({ error: 'Missing userId or provider' });
  }

  try {
    let lights;

    if (provider === 'hue') {
      const accessToken = await hue.getAccessToken(userId);
      lights = await listHueLights(accessToken);
    } else if (provider === 'lifx') {
      const accessToken = await lifx.getAccessToken(userId);
      lights = await listLIFXLights(accessToken);
    } else {
      return res.status(400).json({ error: 'Invalid provider' });
    }

    res.json({ lights });

  } catch (error) {
    console.error('List lights error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * List Hue lights
 */
async function listHueLights(accessToken) {
  const fetch = (await import('node-fetch')).default;

  const response = await fetch('https://api.meethue.com/route/clip/v2/resource/light', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to list Hue lights');
  }

  const data = await response.json();
  return data.data || [];
}

/**
 * List LIFX lights
 */
async function listLIFXLights(accessToken) {
  const fetch = (await import('node-fetch')).default;

  const response = await fetch('https://api.lifx.com/v1/lights/all', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to list LIFX lights');
  }

  return await response.json();
}
