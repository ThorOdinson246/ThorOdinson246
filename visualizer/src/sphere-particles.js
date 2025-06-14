/**
 * Particle Class
 * Defines the properties and behavior of a single particle.
 */
export class Particle {
    constructor(x, y, radius, color, z, options, initialDistFromCenter, initialAngle) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.baseRadius = radius;
        this.color = color;
        this.vx = (Math.random() - 0.5) * options.initialVelocityScale;
        this.vy = (Math.random() - 0.5) * options.initialVelocityScale;
        this.vz = (Math.random() - 0.5) * options.zVelocityScale;
        this.friction = options.friction;
        this.springConstant = options.springConstant;
        this.orbitSpeed = options.orbitSpeed;
        this.initialOrbitRadius = initialDistFromCenter;
        this.initialAngle = initialAngle;
        this.pulseOffset = Math.random() * Math.PI * 2;
    }
}

/**
 * SphereParticleEffect Class
 * Creates an interactive, audio-reactive particle animation.
 */
export class SphereParticleEffect {
    constructor(containerOrId, options = {}) {
        // --- merge defaults ---
        const defaultOptions = {
            canvasId: 'particleCanvas',
            width: window.innerWidth,
            height: window.innerHeight,
            numParticles: 1500,
            maxParticleOrbitRadius: Math.min(window.innerWidth, window.innerHeight) * 0.45,
            particleBaseRadius: { min: 0.6, max: 1.2 },
            particleColors: ['rgba(3, 218, 198, 1)', 'rgba(224, 224, 224, 1)'],
            touchInfluenceRadius: 100,
            touchMaxForce: 15,
            touchForceIncrease: 0.2,
            touchForceDecay: 0.92,
            initialVelocityScale: 0.5,
            friction: 0.85,
            springConstant: 0.02,
            orbitSpeed: 0.002,
            minDesiredSpeed: 0.0001,
            zVelocityScale: 0.002,
            displayRadiusScale: { min: 0.7, max: 0.8 },
            globalPulseSpeed: 0.025,
            returnVelocityScale: 1,
            vibrationFrequency: 0.02,
            sphereRotationSpeed: 0.001,
            sphereScale: 0.45,
            sphereThickness: 0.9,
            hollowness: 0,
            // --- Visualizer Options ---
            enableVisualizer: false, // Set to true to show the button and enable the feature
            visualizerMaxHollowness: 0.95,
            audioSmoothing: 0.6,
            highVolumeColor: 'rgba(3, 218, 198, 1)',
            highVolumeThreshold: 0.5,
            minPulseMagnitude: 0.05,
            maxPulseMagnitude: 0.25,
        };

        this.options = { ...defaultOptions, ...options };

        // --- resolve container ---
        if (typeof containerOrId === 'string') {
            this.container = document.getElementById(containerOrId);
        } else {
            this.container = containerOrId;
        }

        // --- create & append canvas ---
        this.canvas = document.createElement('canvas');
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.visualizerMode = false;
        this.audioContext = null;
        this.analyser = null;
        this.audioDataArray = null;
        this.smoothedAudioLevel = 0;
        this.baseHollowness = this.options.hollowness;
        this.toggleButton = null;

        this.setupCanvas();
        this.sphereCenter = { x: this.width / 2, y: this.height / 2 };
        this.particles = [];
        this.globalPulseTime = 0;
        this.sphereRotation = 0;
        this.touchActive = false;
        this.touchX = 0;
        this.touchY = 0;
        this.touchForce = 0;

        this.initEventListeners();
        this.initParticles();
        this.animate();
    }

    setupCanvas() {
        this.width = this.canvas.width = this.options.width;
        this.height = this.canvas.height = this.options.height;
    }

    async initAudioVisualizer() {
        if (this.audioContext) return;
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const source = this.audioContext.createMediaStreamSource(stream);
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256;
            this.analyser.smoothingTimeConstant = 0.3;
            const bufferLength = this.analyser.frequencyBinCount;
            this.audioDataArray = new Uint8Array(bufferLength);
            source.connect(this.analyser);
        } catch (err) {
            console.error("Microphone access was denied.", err);
            alert("Microphone access is required. Please allow access and try again.");
            this.visualizerMode = false;
            this.updateToggleButton();
        }
    }

    toggleVisualizerMode() {
        this.visualizerMode = !this.visualizerMode;
        if (this.visualizerMode && !this.audioContext) {
            this.initAudioVisualizer();
        }
        this.updateToggleButton();
    }
    
    updateToggleButton() {
        if (this.toggleButton) { // Only run if the button exists
            this.toggleButton.textContent = this.visualizerMode ? 'Turn Off Visualizer' : 'Turn On Visualizer';
            this.toggleButton.style.backgroundColor = this.visualizerMode ? 'rgba(3, 218, 198, 0.4)' : 'rgba(52, 73, 94, 0.8)';
        }
    }
    
    processAudio() {
        if (!this.visualizerMode || !this.analyser) {
            this.smoothedAudioLevel *= this.options.audioSmoothing;
            return;
        }
        this.analyser.getByteFrequencyData(this.audioDataArray);
        let sum = 0;
        for (let i = 0; i < this.audioDataArray.length; i++) {
            sum += this.audioDataArray[i];
        }
        const average = sum / this.audioDataArray.length;
        const normalizedLevel = average / 255;
        this.smoothedAudioLevel = this.smoothedAudioLevel * this.options.audioSmoothing + normalizedLevel * (1 - this.options.audioSmoothing);
    }

    initEventListeners() {
        window.addEventListener('resize', this.handleResize.bind(this));
        this.canvas.addEventListener('mousedown', (e) => this.handleInteractionStart(e.clientX, e.clientY));
        this.canvas.addEventListener('mouseup', () => this.handleInteractionEnd());
        this.canvas.addEventListener('mousemove', (e) => this.handleInteractionMove(e.clientX, e.clientY));
        this.canvas.addEventListener('mouseleave', () => this.handleInteractionEnd());
        this.canvas.addEventListener('touchstart', (e) => { e.preventDefault(); this.handleInteractionStart(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });
        this.canvas.addEventListener('touchend', () => this.handleInteractionEnd());
        this.canvas.addEventListener('touchmove', (e) => { e.preventDefault(); this.handleInteractionMove(e.touches[0].clientX, e.touches[0].clientY); }, { passive: false });
    }

    handleInteractionStart(x, y) { this.touchActive = true; this.touchX = x; this.touchY = y; }
    handleInteractionEnd() { this.touchActive = false; }
    handleInteractionMove(x, y) { if (this.touchActive) { this.touchX = x; this.touchY = y; } }

    handleResize() {
        this.options.width = window.innerWidth;
        this.options.height = window.innerHeight;
        this.setupCanvas();
        this.sphereCenter = { x: this.width / 2, y: this.height / 2 };
        this.options.maxParticleOrbitRadius = Math.min(this.width, this.height) * this.options.sphereScale;
        this.initParticles();
    }

    updateParticle(particle, initialMinR, maxR, dynamicMinR, dynamicPulseMagnitude) {
        const initialRange = maxR - initialMinR;
        const dynamicRange = maxR - dynamicMinR;
        const relativePos = initialRange > 0 ? (particle.initialOrbitRadius - initialMinR) / initialRange : 0;
        const newTargetOrbitRadius = dynamicMinR + (relativePos * dynamicRange);
        const vib = Math.sin(this.globalPulseTime + particle.pulseOffset) * dynamicPulseMagnitude * newTargetOrbitRadius;
        const targetR = newTargetOrbitRadius + vib;
        const angle = particle.initialAngle + this.sphereRotation;
        const tx = this.sphereCenter.x + Math.cos(angle) * targetR;
        const ty = this.sphereCenter.y + Math.sin(angle) * targetR;
        const dx = particle.x - tx;
        const dy = particle.y - ty;
        const k = this.options.springConstant;
        const c = 2 * Math.sqrt(k);
        const rvs = this.options.returnVelocityScale;
        particle.vx += (-dx * k - c * particle.vx) * rvs;
        particle.vy += (-dy * k - c * particle.vy) * rvs;
        const distToTarget = Math.hypot(dx, dy);
        if (distToTarget < targetR * 0.2) {
            const tangentX = -dy / targetR;
            const tangentY = dx / targetR;
            particle.vx += tangentX * particle.orbitSpeed;
            particle.vy += tangentY * particle.orbitSpeed;
        }
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.99;
        particle.vy *= 0.99;
        const currentSpeed = Math.hypot(particle.vx, particle.vy);
        if (currentSpeed < this.options.minDesiredSpeed) {
            particle.vx += (Math.random() - 0.5) * 0.002;
            particle.vy += (Math.random() - 0.5) * 0.002;
        }
    }

    drawParticle(particle) {
        let finalColor;
        if (this.visualizerMode && this.smoothedAudioLevel > this.options.highVolumeThreshold) {
            finalColor = this.options.highVolumeColor;
        } else {
            finalColor = particle.color;
        }
        const normalizedZ = (particle.z + 1) / 2;
        const displayRadius = particle.baseRadius * (this.options.displayRadiusScale.min + normalizedZ * this.options.displayRadiusScale.max);
        const colorParts = finalColor.match(/\d+(\.\d+)?/g);
        this.ctx.fillStyle = `rgba(${colorParts[0]}, ${colorParts[1]}, ${colorParts[2]}, 1)`;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, displayRadius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    initParticles() {
        this.particles.length = 0;
        const o = this.options;
        const maxR = Math.min(o.width, o.height) * o.sphereScale;
        const minR = maxR * this.baseHollowness;
        for (let i = 0; i < o.numParticles; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = minR + Math.sqrt(Math.random()) * (maxR - minR) * o.sphereThickness;
            const x = this.sphereCenter.x + Math.cos(angle) * dist;
            const y = this.sphereCenter.y + Math.sin(angle) * dist;
            const radius = o.particleBaseRadius.min + Math.random() * (o.particleBaseRadius.max - o.particleBaseRadius.min);
            const color = o.particleColors[Math.floor(Math.random() * o.particleColors.length)];
            const z = (Math.random() * 2) - 1;
            this.particles.push(new Particle(x, y, radius, color, z, o, dist, angle));
        }
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        if (this.options.enableVisualizer) {
             this.processAudio();
        }
        const dynamicHollowness = this.baseHollowness + this.smoothedAudioLevel * (this.options.visualizerMaxHollowness - this.baseHollowness);
        const dynamicPulseMagnitude = this.options.minPulseMagnitude + (this.smoothedAudioLevel * (this.options.maxPulseMagnitude - this.options.minPulseMagnitude));
        this.globalPulseTime += this.options.vibrationFrequency;
        this.sphereRotation += this.options.sphereRotationSpeed;
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.applyTouchForce();
        const o = this.options;
        const maxR = Math.min(o.width, o.height) * o.sphereScale;
        const initialMinR = maxR * this.baseHollowness;
        const dynamicMinR = maxR * dynamicHollowness;
        this.particles.forEach(particle => {
            this.updateParticle(particle, initialMinR, maxR, dynamicMinR, dynamicPulseMagnitude);
            this.drawParticle(particle);
        });
    }

    applyTouchForce() {
        if (this.touchActive) {
            this.touchForce = Math.min(this.options.touchMaxForce, this.touchForce + this.options.touchForceIncrease);
        } else {
            this.touchForce *= this.options.touchForceDecay;
        }
        if (this.touchForce > 0.1) {
            this.particles.forEach(particle => {
                const dx = particle.x - this.touchX;
                const dy = particle.y - this.touchY;
                const distance = Math.hypot(dx, dy);
                if (distance < this.options.touchInfluenceRadius && distance > 0) {
                    const forceMagnitude = Math.pow(1 - (distance / this.options.touchInfluenceRadius), 2) * this.touchForce;
                    const angle = Math.atan2(dy, dx);
                    particle.vx += Math.cos(angle) * forceMagnitude;
                    particle.vy += Math.sin(angle) * forceMagnitude;
                }
            });
        }
    }
}
