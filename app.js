/* ===================================
   sleepy.help - JavaScript
   Globe clock & sleep calculator
   =================================== */

(function() {
    'use strict';

    // =====================================
    // State Management
    // =====================================
    const state = {
        userLat: null,
        userLon: null,
        timezone: null,
        wakeTime: '07:00',
        bedtime: null,
        sleepCycles: 6,
        sleepHours: 9
    };

    // =====================================
    // Constants
    // =====================================
    const SLEEP_CYCLE_MINUTES = 90; // Average sleep cycle duration
    const FALL_ASLEEP_MINUTES = 15; // Time to fall asleep
    const OPTIMAL_CYCLES = [5, 6]; // 5-6 cycles is ideal

    // =====================================
    // Canvas & Globe
    // =====================================
    const canvas = document.getElementById('globe-clock');
    const ctx = canvas.getContext('2d');
    let animationFrame;

    // Make canvas responsive
    function resizeCanvas() {
        const container = canvas.parentElement;
        const size = Math.min(container.clientWidth - 32, 400);
        canvas.width = size;
        canvas.height = size;
    }

    // Draw the globe clock
    function drawGlobe() {
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 10;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Get current time
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Calculate sun position (0 = midnight, 12 = noon)
        const timeDecimal = hours + minutes / 60 + seconds / 3600;
        const sunAngle = ((timeDecimal - 12) / 24) * Math.PI * 2; // Rotate so noon is at top

        // Draw Earth circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#1a3a52';
        ctx.fill();
        ctx.strokeStyle = '#4a7a9a';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();

        // Draw day/night divide
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(sunAngle);

        // Night side (left half)
        ctx.beginPath();
        ctx.arc(0, 0, radius, Math.PI / 2, -Math.PI / 2, true);
        ctx.fillStyle = '#0a1a2a';
        ctx.fill();

        // Day side (right half)
        ctx.beginPath();
        ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2, true);
        ctx.fillStyle = '#4a9eff';
        ctx.fill();

        // Gradient transition
        const gradient = ctx.createLinearGradient(-radius, 0, radius, 0);
        gradient.addColorStop(0, 'rgba(10, 26, 42, 0.8)');
        gradient.addColorStop(0.45, 'rgba(10, 26, 42, 0)');
        gradient.addColorStop(0.55, 'rgba(74, 158, 255, 0)');
        gradient.addColorStop(1, 'rgba(74, 158, 255, 0.8)');

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.restore();

        // Draw user location marker
        if (state.userLat !== null && state.userLon !== null) {
            drawUserLocation(centerX, centerY, radius, sunAngle);
        }

        // Draw time markers (12, 6 o'clock)
        ctx.save();
        ctx.font = '12px monospace';
        ctx.fillStyle = '#9999b8';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 12 (noon)
        ctx.fillText('12', centerX, centerY - radius - 20);
        // 6
        ctx.fillText('6', centerX, centerY + radius + 20);
        // 9
        ctx.fillText('9', centerX - radius - 20, centerY);
        // 3
        ctx.fillText('3', centerX + radius + 20, centerY);

        ctx.restore();
    }

    // Draw user location on globe
    function drawUserLocation(centerX, centerY, radius, sunAngle) {
        // Calculate position based on timezone offset
        const tzOffset = state.timezone
            ? getTimezoneOffset(state.timezone)
            : -(new Date().getTimezoneOffset() / 60);

        const now = new Date();
        const localHour = now.getUTCHours() + tzOffset;
        const userAngle = ((localHour - 12) / 24) * Math.PI * 2;

        // Simple latitude to Y position (simplified projection)
        const latRadians = (state.userLat * Math.PI) / 180;
        const yOffset = Math.sin(latRadians) * radius * 0.5;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(userAngle);

        // Draw marker
        const markerX = radius * 0.7;
        const markerY = yOffset;

        // Glow effect
        const glow = ctx.createRadialGradient(markerX, markerY, 0, markerX, markerY, 15);
        glow.addColorStop(0, 'rgba(255, 157, 107, 0.8)');
        glow.addColorStop(1, 'rgba(255, 157, 107, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(markerX, markerY, 15, 0, Math.PI * 2);
        ctx.fill();

        // Marker dot
        ctx.fillStyle = '#ff9d6b';
        ctx.beginPath();
        ctx.arc(markerX, markerY, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
    }

    // Get timezone offset (simplified - in production use a library)
    function getTimezoneOffset(timezone) {
        try {
            const date = new Date();
            const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
            const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
            return (tzDate - utcDate) / (1000 * 60 * 60);
        } catch (e) {
            return -(new Date().getTimezoneOffset() / 60);
        }
    }

    // Animation loop
    function animate() {
        drawGlobe();
        updateCurrentTime();
        animationFrame = requestAnimationFrame(animate);
    }

    // =====================================
    // Sleep Calculator
    // =====================================
    function calculateBedtime(wakeTime, cycles) {
        const [wakeHour, wakeMin] = wakeTime.split(':').map(Number);

        // Total minutes to sleep
        const sleepMinutes = cycles * SLEEP_CYCLE_MINUTES;
        const totalMinutes = sleepMinutes + FALL_ASLEEP_MINUTES;

        // Calculate bedtime
        let bedHour = wakeHour;
        let bedMin = wakeMin;

        bedMin -= totalMinutes;

        while (bedMin < 0) {
            bedMin += 60;
            bedHour -= 1;
        }

        while (bedHour < 0) {
            bedHour += 24;
        }

        return {
            bedtime: `${String(bedHour).padStart(2, '0')}:${String(bedMin).padStart(2, '0')}`,
            cycles: cycles,
            hours: Math.floor(sleepMinutes / 60),
            minutes: sleepMinutes % 60
        };
    }

    function updateSleepRecommendation() {
        const wakeTime = document.getElementById('wake-time').value;
        state.wakeTime = wakeTime;

        // Calculate for optimal cycles
        const result = calculateBedtime(wakeTime, state.sleepCycles);

        state.bedtime = result.bedtime;
        state.sleepHours = result.hours;

        // Update UI
        document.getElementById('bedtime-value').textContent = result.bedtime;
        document.getElementById('sleep-cycles').textContent = result.cycles;
        document.getElementById('sleep-hours').textContent =
            result.minutes > 0 ? `${result.hours}h ${result.minutes}m` : `${result.hours}h`;

        // Update stats
        updateSleepStats(result);

        // Save to localStorage
        saveState();
    }

    function updateSleepStats(result) {
        const stats = document.querySelectorAll('.stat');

        // Sleep Quality: Based on cycles (5-6 is optimal)
        const qualityStat = stats[0];
        if (result.cycles >= 5 && result.cycles <= 6) {
            qualityStat.setAttribute('data-status', 'good');
        } else if (result.cycles === 4 || result.cycles === 7) {
            qualityStat.setAttribute('data-status', 'warning');
        } else {
            qualityStat.setAttribute('data-status', 'error');
        }

        // Timing: Based on bedtime (before 11 PM is good)
        const timingStat = stats[1];
        const [bedHour] = state.bedtime.split(':').map(Number);
        if (bedHour <= 23 || bedHour >= 21) {
            timingStat.setAttribute('data-status', 'good');
        } else if (bedHour >= 20 || bedHour <= 1) {
            timingStat.setAttribute('data-status', 'warning');
        } else {
            timingStat.setAttribute('data-status', 'error');
        }

        // Duration: 7.5-9 hours is optimal
        const durationStat = stats[2];
        if (result.hours >= 7.5 && result.hours <= 9) {
            durationStat.setAttribute('data-status', 'good');
        } else if (result.hours >= 6 && result.hours < 7.5 || result.hours > 9) {
            durationStat.setAttribute('data-status', 'warning');
        } else {
            durationStat.setAttribute('data-status', 'error');
        }
    }

    // =====================================
    // Time Display
    // =====================================
    function updateCurrentTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        document.getElementById('current-time-value').textContent = `${hours}:${minutes}`;
    }

    // =====================================
    // Location Services
    // =====================================
    function requestLocation() {
        if (!navigator.geolocation) {
            showManualLocation();
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                state.userLat = position.coords.latitude;
                state.userLon = position.coords.longitude;
                updateLocationDisplay();
                saveState();
            },
            (error) => {
                console.log('Location error:', error);
                showManualLocation();
            }
        );
    }

    function showManualLocation() {
        const manualLocation = document.getElementById('manual-location');
        manualLocation.classList.remove('hidden');
        populateTimezones();
    }

    function populateTimezones() {
        const datalist = document.getElementById('timezone-list');
        const commonTimezones = [
            'America/New_York',
            'America/Chicago',
            'America/Denver',
            'America/Los_Angeles',
            'America/Toronto',
            'Europe/London',
            'Europe/Paris',
            'Europe/Berlin',
            'Asia/Tokyo',
            'Asia/Shanghai',
            'Asia/Dubai',
            'Australia/Sydney',
            'Pacific/Auckland'
        ];

        commonTimezones.forEach(tz => {
            const option = document.createElement('option');
            option.value = tz;
            datalist.appendChild(option);
        });
    }

    function updateLocationDisplay() {
        const locationText = document.getElementById('location-text');
        if (state.userLat && state.userLon) {
            locationText.textContent = `${state.userLat.toFixed(2)}°, ${state.userLon.toFixed(2)}°`;
        } else if (state.timezone) {
            locationText.textContent = state.timezone;
        } else {
            locationText.textContent = 'Unknown';
        }
    }

    // =====================================
    // Local Storage
    // =====================================
    function saveState() {
        try {
            localStorage.setItem('sleepy-help-state', JSON.stringify(state));
        } catch (e) {
            console.log('localStorage not available');
        }
    }

    function loadState() {
        try {
            const saved = localStorage.getItem('sleepy-help-state');
            if (saved) {
                const parsed = JSON.parse(saved);
                Object.assign(state, parsed);

                // Restore UI
                if (state.wakeTime) {
                    document.getElementById('wake-time').value = state.wakeTime;
                }
                updateLocationDisplay();
                updateSleepRecommendation();
            }
        } catch (e) {
            console.log('Could not load state');
        }
    }

    // =====================================
    // PWA Support
    // =====================================
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;

        const installBtn = document.getElementById('install-btn');
        installBtn.classList.remove('hidden');

        installBtn.addEventListener('click', async () => {
            if (!deferredPrompt) return;

            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;

            if (outcome === 'accepted') {
                installBtn.classList.add('hidden');
            }

            deferredPrompt = null;
        });
    });

    // =====================================
    // Event Listeners
    // =====================================
    function initEventListeners() {
        // Wake time change
        document.getElementById('wake-time').addEventListener('change', updateSleepRecommendation);

        // Location button
        document.getElementById('location-btn').addEventListener('click', requestLocation);

        // Manual timezone input
        const timezoneInput = document.getElementById('timezone-input');
        timezoneInput.addEventListener('change', (e) => {
            state.timezone = e.target.value;
            updateLocationDisplay();
            saveState();
        });

        // Window resize
        window.addEventListener('resize', resizeCanvas);
    }

    // =====================================
    // Service Worker Registration
    // =====================================
    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('service-worker.js')
                .then(() => console.log('Service Worker registered'))
                .catch(err => console.log('Service Worker registration failed:', err));
        }
    }

    // =====================================
    // Initialization
    // =====================================
    function init() {
        resizeCanvas();
        initEventListeners();
        loadState();
        updateSleepRecommendation();
        animate();
        registerServiceWorker();

        // Auto-detect timezone
        if (!state.timezone && Intl && Intl.DateTimeFormat) {
            state.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            updateLocationDisplay();
        }
    }

    // Start app when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Cleanup on unload
    window.addEventListener('beforeunload', () => {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
    });
})();
