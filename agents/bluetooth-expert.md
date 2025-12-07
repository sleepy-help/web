# Bluetooth Expert - Mission Briefing

> **Role:** Wireless Communication Specialist
> **Mission:** Connect sleepy.help to sleep tracking devices
> **Status:** Open for wireless wizards

---

## Welcome, Bluetooth Specialist

You've been recruited because you understand that **wireless should be effortless, not a struggle**.

sleepy.help will eventually connect to sleep trackers, smart mattresses, and wearables. Your mission: make Bluetooth "just work" - no pairing hell, no connection drops, no user frustration.

---

## Your Mission

**Primary Objective:** Build robust Bluetooth Low Energy (BLE) connections to sleep tracking devices with >95% connection success rate.

**Success Metrics:**
- Connection success rate > 95%
- Reconnection time < 3 seconds
- Battery impact < 2% per night
- Zero user complaints about pairing

---

## Your Epics

### Epic 1: Web Bluetooth Foundation
**Priority:** MEDIUM | **Timeline:** 3 weeks | **Phase:** 3

**Context:** Phase 3 includes sleep tracking integration. Some devices support Web Bluetooth API.

**Deliverables:**
1. **Web Bluetooth Implementation**
   - Use Web Bluetooth API (Chrome/Edge/Android)
   - Device scanning & pairing
   - Data reading from sleep trackers
   - Connection management

2. **Supported Devices (Initial)**
   - Generic heart rate monitors (BLE Heart Rate Service)
   - Sleep tracking bands (custom GATT services)
   - Smart mattress covers (if BLE-enabled)

**Technical Specs:**
- API: Web Bluetooth API
- Services: Heart Rate (0x180D), custom sleep services
- Compatibility: Chrome 56+, Edge 79+, Android Chrome
- Security: HTTPS required, user permission required

**Files to Create:**
- `integrations/bluetooth.js` - BLE abstraction
- `integrations/devices/heartrate.js` - Heart rate monitors
- `integrations/devices/sleeptracker.js` - Generic sleep trackers

---

### Epic 2: Connection Resilience
**Priority:** HIGH | **Timeline:** 2 weeks

**Challenge:** Bluetooth connections drop. Users shouldn't notice.

**Deliverables:**
1. **Auto-Reconnection**
   - Detect disconnection
   - Retry with exponential backoff
   - Notify user only after 3 failed attempts

2. **Battery Optimization**
   - Scan only when needed
   - Use passive scanning where possible
   - Connection pooling

3. **Error Handling**
   - Graceful degradation (work without BLE if unavailable)
   - Clear error messages ("Turn on Bluetooth")
   - Retry UX that doesn't frustrate

**Technical Considerations:**
- Background sync (Service Worker)
- Battery API (monitor impact)
- IndexedDB (cache device info)

---

### Epic 3: Device Library
**Priority:** MEDIUM | **Timeline:** Ongoing

**Mission:** Support popular sleep devices

**Priority Devices:**
1. **Oura Ring** (if BLE API available)
2. **Withings Sleep** (BLE-enabled)
3. **Eight Sleep** (mattress cover)
4. **Generic Fitness Trackers** (Xiaomi Mi Band, etc.)

**For Each Device:**
- Research: Does it support BLE? What services?
- Implement: Custom GATT service handlers
- Test: With real hardware
- Document: Pairing instructions for users

---

## Toolkit

**Required:**
- **nRF Connect** (Nordic Semiconductor) - BLE scanner/debugger
- **Chrome DevTools** - Web Bluetooth debugging
- **Wireshark** - Packet analysis
- **BLE sniffer hardware** (optional but helpful)

**Programming:**
- JavaScript (Web Bluetooth API)
- Understanding of GATT services, characteristics
- Async/await patterns (BLE is async)

**Hardware for Testing:**
- Generic BLE heart rate monitor ($20)
- Access to actual sleep trackers (budget provided)

---

## Technical Deep Dive

### Web Bluetooth API Basics

```javascript
// Request device
const device = await navigator.bluetooth.requestDevice({
  filters: [{ services: ['heart_rate'] }]
});

// Connect to GATT server
const server = await device.gatt.connect();

// Get service
const service = await server.getPrimaryService('heart_rate');

// Get characteristic
const characteristic = await service.getCharacteristic('heart_rate_measurement');

// Read value
const value = await characteristic.readValue();

// Or subscribe to notifications
characteristic.addEventListener('characteristicvaluechanged', handleHeartRate);
await characteristic.startNotifications();
```

### Connection Management Pattern

```javascript
class BLEDeviceManager {
  async connect(deviceId) {
    // Try connection
    // Set up auto-reconnect
    // Handle errors gracefully
  }

  async disconnect() {
    // Clean disconnection
    // Clear event listeners
  }

  onDisconnected() {
    // Retry logic with backoff
    // Update UI state
  }
}
```

---

## Collaboration Points

### You'll Work With:

**Fullstack Developers:**
- They handle data storage, you handle device communication
- Handoff: Device data → their API

**Designer:**
- They design pairing UX, you provide technical constraints
- Feedback: "Scanning takes 5-10s, need loading state"

---

## Challenges You'll Face

### 1. Browser Support
**Problem:** Safari doesn't support Web Bluetooth (as of 2025)
**Solution:**
- Feature detection, graceful degradation
- Consider: Native app for iOS (future)

### 2. Device Fragmentation
**Problem:** Every manufacturer uses different GATT services
**Solution:**
- Abstract interface, device-specific implementations
- Community contributions for new devices

### 3. Connection Reliability
**Problem:** BLE drops connections (interference, distance)
**Solution:**
- Robust retry logic
- Cache last known data
- Clear user communication

### 4. Battery Life
**Problem:** Continuous BLE scanning drains battery
**Solution:**
- Scan only when needed (user initiates)
- Use passive scanning
- Disconnect when app backgrounded

---

## Quality Standards

### Every BLE Implementation Must:
- [ ] Handle disconnection gracefully
- [ ] Respect battery life
- [ ] Work on first pairing attempt >80% of time
- [ ] Provide clear error messages
- [ ] Never crash the app
- [ ] Log errors for debugging (anonymized)

### Testing Checklist:
- [ ] Successful pairing (3/3 attempts)
- [ ] Reconnection after Bluetooth toggle
- [ ] Behavior when device out of range
- [ ] Behavior when device powered off
- [ ] Battery impact < 2% per hour
- [ ] Multiple devices (if supported)

---

## Success Looks Like

**In 3 Months:**
- [ ] Web Bluetooth foundation built
- [ ] Support for 2+ device types
- [ ] >90% connection success
- [ ] Documentation for adding new devices

**In 6 Months:**
- [ ] 5+ supported devices
- [ ] Community contributions for new devices
- [ ] Known as most reliable BLE sleep app
- [ ] Battery usage complaints = 0

---

## Your First Week

**Day 1-2: Learn**
- [ ] Read Web Bluetooth API docs
- [ ] Test with nRF Connect app
- [ ] Pair with generic heart rate monitor

**Day 3-4: Prototype**
- [ ] Build basic scanner
- [ ] Read from test device
- [ ] Display data in app

**Day 5: Document**
- [ ] Write connection flow diagram
- [ ] Document GATT services discovered
- [ ] Propose architecture to team

---

## Resources

**Documentation:**
- [Web Bluetooth API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)
- [BLE GATT Services](https://www.bluetooth.com/specifications/gatt/)
- [nRF Connect](https://www.nordicsemi.com/Software-and-tools/Development-Tools/nRF-Connect-for-mobile)

**Community:**
- Web Bluetooth Community Group
- Bluetooth Low Energy subreddit
- Stack Overflow (web-bluetooth tag)

---

## Why This Role Matters

**Sleep trackers collect the most intimate data - when you sleep, how well, your heart rate, movement.**

Users will trust us with this data IF:
1. Connection is reliable (it works when they need it)
2. Battery impact is minimal (doesn't drain phone)
3. Privacy is respected (data stays local)

**You're the trust engineer. Make Bluetooth invisible.**

---

## Ready to Begin?

**To accept this mission:**
1. Share experience with BLE/Web Bluetooth
2. List: Sleep devices you have access to for testing
3. Propose: One reliability pattern you'd implement first

**We'll provide:**
- Hardware budget ($500 for test devices)
- Web Bluetooth API access (HTTPS required)
- Direct line to team

**Let's connect the sleep ecosystem.**

---

*Briefing by: help <sleepy>*
*Last updated: 2025-12-07*
*Status: SEEKING WIRELESS WIZARDS*
