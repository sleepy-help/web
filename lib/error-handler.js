/**
 * Global Error Handler for sleepy.help
 *
 * Graceful error handling with user-friendly messages
 * Privacy-preserving: errors stay local, no external reporting
 */

class ErrorHandler {
  constructor() {
    this.errors = [];
    this.maxErrors = 50; // Keep last 50 errors
    this.init();
  }

  init() {
    // Catch unhandled errors
    window.addEventListener('error', (event) => {
      this.handleError({
        type: 'JavaScript Error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack
      });
      return false; // Let browser handle it too
    });

    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError({
        type: 'Unhandled Promise Rejection',
        message: event.reason?.message || event.reason,
        stack: event.reason?.stack
      });
    });
  }

  /**
   * Log error internally
   */
  handleError(error) {
    const errorRecord = {
      ...error,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    this.errors.push(errorRecord);

    // Trim to max errors
    if (this.errors.length > this.maxErrors) {
      this.errors.shift();
    }

    // Log to console in development
    if (this.isDevelopment()) {
      console.error('🔴 Error captured:', errorRecord);
    }

    // Show user-friendly message
    this.showUserMessage(error);
  }

  /**
   * Show friendly error message to user
   */
  showUserMessage(error) {
    // Don't show for minor errors
    if (this.isMinorError(error)) return;

    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');

    const friendlyMessage = this.getFriendlyMessage(error);

    toast.innerHTML = `
      <div class="error-toast__content">
        <span class="error-toast__icon" aria-hidden="true">⚠️</span>
        <div class="error-toast__message">
          <strong>Oops, something went wrong</strong>
          <p>${friendlyMessage}</p>
        </div>
        <button class="error-toast__close" aria-label="Close">×</button>
      </div>
    `;

    document.body.appendChild(toast);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      toast.classList.add('error-toast--hiding');
      setTimeout(() => toast.remove(), 300);
    }, 5000);

    // Manual dismiss
    toast.querySelector('.error-toast__close').addEventListener('click', () => {
      toast.classList.add('error-toast--hiding');
      setTimeout(() => toast.remove(), 300);
    });
  }

  /**
   * Get user-friendly error message
   */
  getFriendlyMessage(error) {
    // Network errors
    if (error.message?.includes('fetch') || error.message?.includes('network')) {
      return 'Please check your internet connection and try again.';
    }

    // Storage errors
    if (error.message?.includes('localStorage') || error.message?.includes('quota')) {
      return 'Your browser storage is full. Try clearing some space.';
    }

    // Canvas errors
    if (error.message?.includes('canvas') || error.message?.includes('getContext')) {
      return 'Your browser may not support this feature. Try updating your browser.';
    }

    // Generic
    return 'Something unexpected happened. Refreshing the page might help.';
  }

  /**
   * Check if error is minor (don't show to user)
   */
  isMinorError(error) {
    const minorPatterns = [
      'ResizeObserver loop',
      'non-passive event listener',
      'AbortError'
    ];

    return minorPatterns.some(pattern =>
      error.message?.includes(pattern)
    );
  }

  /**
   * Check if development environment
   */
  isDevelopment() {
    return window.location.hostname === 'localhost' ||
           window.location.hostname === '127.0.0.1' ||
           window.location.port === '8000' ||
           window.location.port === '5000';
  }

  /**
   * Manually log error with context
   */
  log(error, context = {}) {
    this.handleError({
      type: 'Manual Error',
      message: error.message || error,
      stack: error.stack,
      context
    });
  }

  /**
   * Get error history (for debugging)
   */
  getErrors() {
    return this.errors;
  }

  /**
   * Clear error history
   */
  clearErrors() {
    this.errors = [];
  }
}

// Export as singleton
window.errorHandler = new ErrorHandler();

// Helper function for manual error logging
window.logError = function(error, context) {
  window.errorHandler.log(error, context);
};
