/**
 * Performance Monitoring for sleepy.help
 *
 * Lightweight performance tracking without external dependencies
 * Privacy-preserving: all data stays in memory, no external services
 */

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      pageLoad: null,
      firstPaint: null,
      firstContentfulPaint: null,
      domContentLoaded: null,
      canvasRenderTime: [],
      interactionLatency: []
    };

    this.init();
  }

  init() {
    // Capture page load metrics
    if (window.performance && window.performance.timing) {
      window.addEventListener('load', () => {
        const timing = window.performance.timing;
        this.metrics.pageLoad = timing.loadEventEnd - timing.navigationStart;
        this.metrics.domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
      });
    }

    // Capture paint metrics
    if (window.PerformanceObserver) {
      try {
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-paint') {
              this.metrics.firstPaint = entry.startTime;
            }
            if (entry.name === 'first-contentful-paint') {
              this.metrics.firstContentfulPaint = entry.startTime;
            }
          }
        });
        paintObserver.observe({ entryTypes: ['paint'] });
      } catch (e) {
        // Paint timing not supported
      }
    }
  }

  /**
   * Measure canvas rendering performance
   */
  measureCanvasRender(callback) {
    const start = performance.now();
    const result = callback();
    const end = performance.now();
    const duration = end - start;

    this.metrics.canvasRenderTime.push(duration);

    // Keep only last 100 measurements
    if (this.metrics.canvasRenderTime.length > 100) {
      this.metrics.canvasRenderTime.shift();
    }

    return result;
  }

  /**
   * Get average canvas render time
   */
  getAverageCanvasRenderTime() {
    if (this.metrics.canvasRenderTime.length === 0) return 0;
    const sum = this.metrics.canvasRenderTime.reduce((a, b) => a + b, 0);
    return sum / this.metrics.canvasRenderTime.length;
  }

  /**
   * Check if app is performing well
   * Returns: { healthy: boolean, warnings: string[] }
   */
  healthCheck() {
    const warnings = [];

    // Canvas should render under 16ms (60fps)
    const avgCanvasTime = this.getAverageCanvasRenderTime();
    if (avgCanvasTime > 16) {
      warnings.push(`Canvas rendering slow: ${avgCanvasTime.toFixed(2)}ms (target: <16ms)`);
    }

    // Page load should be under 2 seconds
    if (this.metrics.pageLoad && this.metrics.pageLoad > 2000) {
      warnings.push(`Page load slow: ${this.metrics.pageLoad}ms (target: <2000ms)`);
    }

    return {
      healthy: warnings.length === 0,
      warnings,
      metrics: this.metrics
    };
  }

  /**
   * Get report for console logging
   */
  report() {
    console.group('📊 Performance Report');
    console.log('Page Load:', this.metrics.pageLoad ? `${this.metrics.pageLoad}ms` : 'N/A');
    console.log('First Paint:', this.metrics.firstPaint ? `${this.metrics.firstPaint.toFixed(2)}ms` : 'N/A');
    console.log('First Contentful Paint:', this.metrics.firstContentfulPaint ? `${this.metrics.firstContentfulPaint.toFixed(2)}ms` : 'N/A');
    console.log('DOM Content Loaded:', this.metrics.domContentLoaded ? `${this.metrics.domContentLoaded}ms` : 'N/A');
    console.log('Avg Canvas Render:', this.metrics.canvasRenderTime.length > 0 ? `${this.getAverageCanvasRenderTime().toFixed(2)}ms` : 'N/A');

    const health = this.healthCheck();
    if (health.healthy) {
      console.log('✅ Performance: Healthy');
    } else {
      console.warn('⚠️ Performance Issues:', health.warnings);
    }
    console.groupEnd();
  }
}

// Export as singleton
window.performanceMonitor = new PerformanceMonitor();

// Auto-report on page load (development only)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      window.performanceMonitor.report();
    }, 3000); // Wait 3s for metrics to stabilize
  });
}
