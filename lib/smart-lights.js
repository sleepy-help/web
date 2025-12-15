/**
 * Smart Lights Integration for sleepy.help
 *
 * Phase 2: Frontend integration for Philips Hue and LIFX
 * Handles OAuth flows and light control from the browser
 */

class SmartLights {
  constructor() {
    this.userId = this.getUserId();
    this.hueConnected = false;
    this.lifxConnected = false;
    this.init();
  }

  /**
   * Initialize smart lights integration
   */
  async init() {
    // Check connection status from localStorage
    this.hueConnected = localStorage.getItem('hue_connected') === 'true';
    this.lifxConnected = localStorage.getItem('lifx_connected') === 'true';

    // Check URL for OAuth callbacks
    this.handleOAuthCallback();
  }

  /**
   * Get or generate user ID
   */
  getUserId() {
    let userId = localStorage.getItem('user_id');
    if (!userId) {
      userId = this.generateUserId();
      localStorage.setItem('user_id', userId);
    }
    return userId;
  }

  /**
   * Generate unique user ID
   */
  generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  /**
   * Connect to Philips Hue
   */
  connectHue() {
    // Redirect to backend OAuth start endpoint
    window.location.href = `/hueOAuthStart?userId=${this.userId}`;
  }

  /**
   * Connect to LIFX
   */
  connectLIFX() {
    window.location.href = `/lifxOAuthStart?userId=${this.userId}`;
  }

  /**
   * Disconnect from Hue
   */
  async disconnectHue() {
    try {
      const response = await fetch(`/hueDisconnect?userId=${this.userId}`);
      if (response.ok) {
        this.hueConnected = false;
        localStorage.setItem('hue_connected', 'false');
        this.showMessage('Hue disconnected', 'success');
      }
    } catch (error) {
      this.showMessage('Failed to disconnect Hue', 'error');
      window.logError(error, { component: 'SmartLights', action: 'disconnectHue' });
    }
  }

  /**
   * Disconnect from LIFX
   */
  async disconnectLIFX() {
    try {
      const response = await fetch(`/lifxDisconnect?userId=${this.userId}`);
      if (response.ok) {
        this.lifxConnected = false;
        localStorage.setItem('lifx_connected', 'false');
        this.showMessage('LIFX disconnected', 'success');
      }
    } catch (error) {
      this.showMessage('Failed to disconnect LIFX', 'error');
      window.logError(error, { component: 'SmartLights', action: 'disconnectLIFX' });
    }
  }

  /**
   * Handle OAuth callback from URL
   */
  handleOAuthCallback() {
    const params = new URLSearchParams(window.location.search);

    // Check for Hue callback
    if (params.has('hue')) {
      if (params.get('hue') === 'connected') {
        this.hueConnected = true;
        localStorage.setItem('hue_connected', 'true');
        this.showMessage('Hue connected successfully!', 'success');
      } else {
        this.showMessage('Failed to connect Hue', 'error');
      }
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    }

    // Check for LIFX callback
    if (params.has('lifx')) {
      if (params.get('lifx') === 'connected') {
        this.lifxConnected = true;
        localStorage.setItem('lifx_connected', 'true');
        this.showMessage('LIFX connected successfully!', 'success');
      } else {
        this.showMessage('Failed to connect LIFX', 'error');
      }
      window.history.replaceState({}, '', window.location.pathname);
    }
  }

  /**
   * Control lights
   * @param {string} provider - 'hue' or 'lifx'
   * @param {string} action - 'dim', 'off', 'warmup'
   * @param {object} params - Action parameters
   */
  async controlLights(provider, action, params = {}) {
    try {
      const response = await fetch('/controlLights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: this.userId,
          provider,
          action,
          params
        })
      });

      if (!response.ok) {
        throw new Error('Light control failed');
      }

      const result = await response.json();
      return result;

    } catch (error) {
      window.logError(error, {
        component: 'SmartLights',
        action: 'controlLights',
        provider,
        actionType: action
      });
      throw error;
    }
  }

  /**
   * Start bedtime routine
   * Gradually dim lights over 2 hours, shift to warm colors
   */
  async startBedtimeRoutine() {
    if (!this.hueConnected && !this.lifxConnected) {
      this.showMessage('Please connect smart lights first', 'warning');
      return;
    }

    try {
      const promises = [];

      // Start Hue routine
      if (this.hueConnected) {
        promises.push(
          this.controlLights('hue', 'warmup', {
            colorTemp: 2700,
            duration: 3600 // 1 hour to warm up
          }).then(() =>
            this.controlLights('hue', 'dim', {
              brightness: 10,
              duration: 7200 // 2 hours to dim
            })
          )
        );
      }

      // Start LIFX routine
      if (this.lifxConnected) {
        promises.push(
          this.controlLights('lifx', 'warmup', {
            colorTemp: 2700,
            duration: 3600
          }).then(() =>
            this.controlLights('lifx', 'dim', {
              brightness: 0.1,
              duration: 7200
            })
          )
        );
      }

      await Promise.all(promises);
      this.showMessage('Bedtime routine started', 'success');

    } catch (error) {
      this.showMessage('Failed to start bedtime routine', 'error');
      window.logError(error, { component: 'SmartLights', action: 'bedtimeRoutine' });
    }
  }

  /**
   * Turn off all lights
   */
  async turnOffAllLights() {
    try {
      const promises = [];

      if (this.hueConnected) {
        promises.push(this.controlLights('hue', 'off'));
      }

      if (this.lifxConnected) {
        promises.push(this.controlLights('lifx', 'off'));
      }

      await Promise.all(promises);
      this.showMessage('Lights turned off', 'success');

    } catch (error) {
      this.showMessage('Failed to turn off lights', 'error');
      window.logError(error, { component: 'SmartLights', action: 'turnOff' });
    }
  }

  /**
   * Get list of lights
   * @param {string} provider - 'hue' or 'lifx'
   */
  async getLights(provider) {
    try {
      const response = await fetch(
        `/listLights?userId=${this.userId}&provider=${provider}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch lights');
      }

      const data = await response.json();
      return data.lights;

    } catch (error) {
      window.logError(error, { component: 'SmartLights', action: 'getLights', provider });
      throw error;
    }
  }

  /**
   * Check if any lights are connected
   */
  isConnected() {
    return this.hueConnected || this.lifxConnected;
  }

  /**
   * Show message to user
   */
  showMessage(message, type = 'info') {
    // Create simple toast notification
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');

    document.body.appendChild(toast);

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      toast.classList.add('toast--hiding');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// Export as singleton
window.smartLights = new SmartLights();
