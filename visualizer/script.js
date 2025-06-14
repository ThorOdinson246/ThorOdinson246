/**
 * Particle Class - Yo, check it!
 * Defines the properties and behavior of a single particle.
 * We're defining this class separately to avoid any weird nesting syntax issues.
 */
class Particle {
    /**
     * @param {number} x - Initial X position.
     * @param {number} y - Initial Y position.
     * @param {number} radius - Base radius of the particle.
     * @param {string} color - RGBA color string of the particle.
     * @param {number} z - Z-coordinate for 3D illusion (-1 to 1).
     * @param {object} options - Reference to the main effect's options.
     * @param {number} initialDistFromCenter - The distance from the center at which this particle was initially placed.
     * @param {number} initialAngle - The initial angle of the particle.
     */
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
            this.initialAngle = initialAngle; // Fixed angular position
            this.pulseOffset = Math.random() * Math.PI * 2;
    }
}

/**
* PerplexityParticleEffect Class - Get ready for some particle magic!
*
* This class creates an interactive particle animation on an HTML Canvas.
* Particles move in subtle orbits, pulsate individually, and react elastically
* to mouse/touch interactions, creating a dynamic, spherical visual effect.
*
* It's designed to be modular, so you can customize it with different parameters
* through an options object.
*/
class PerplexityParticleEffect {
    /**
     * @param {object} options - Configuration options for the particle effect.
     * @param {string} options.canvasId - The ID of the HTML canvas element.
     * @param {number} [options.width=window.innerWidth] - Canvas width.
     * @param {number} [options.height=window.innerHeight] - Canvas height.
     * @param {number} [options.numParticles=1000] - Total number of particles.
     * @param {number} [options.maxParticleOrbitRadius=600] - Max radius for individual particle orbits from center.
     * @param {object} [options.particleBaseRadius={min:0.7,max:1.5}] - Min/Max base size of individual particles.
     * @param {string[]} [options.particleColors=['rgba(255,255,255,0.8)',...]] - Array of particle colors (RGBA strings).
     * @param {number} [options.touchInfluenceRadius=80] - Radius of mouse/touch interaction effect.
     * @param {number} [options.touchMaxForce=15] - Maximum force applied by touch.
     * @param {number} [options.touchForceIncrease=0.25] - Rate at which touch force builds up.
     * @param {number} [options.touchForceDecay=0.8] - Rate at which touch force decays after release.
     * @param {number} [options.initialVelocityScale=1.5] - Multiplier for initial random particle velocities.
     * @param {number} [options.friction=0.96] - Damping factor for particle movement.
     * @param {number} [options.springConstant=0.007] - Strength of elastic force pulling particles to orbit.
     * @param {number} [options.orbitSpeed=0.015] - Speed of tangential (circular) particle motion.
     * @param {number} [options.minDesiredSpeed=0.08] - Minimum speed to prevent particles from stopping.
     * @param {number} [options.zVelocityScale=0.005] - Multiplier for random Z-axis velocity.
     * @param {object} [options.displayRadiusScale={min:0.9,max:0.6}] - Scaling for display radius based on Z.
     * @param {object} [options.displayAlphaScale={min:0.4,max:0.4}] - Scaling for display alpha based on Z.
     * @param {number} [options.globalPulseSpeed=0.02] - Speed of the global pulse affecting individual particles.
     * @param {number} [options.individualPulseMagnitude=0.1] - Magnitude of individual particle pulsation.
     * @param {number} [options.returnVelocityScale=1] - Scales how quickly particles snap back.
     * @param {number} [options.vibrationFrequency=0.02] - Speed of the ongoing particle vibration.
     * @param {number} [options.snapTolerance=1] - Pixel tolerance for snap-back.
     * @param {number} [options.sphereRotationSpeed=0.001] - Speed of global sphere rotation in radians/frame.
     * @param {number} [options.sphereScale=0.45] - Scale of the sphere relative to canvas size.
     * @param {number} [options.sphereThickness=0.9] - Thickness of the sphere.
     * @param {number} [options.hollowness=0] - Hollowness of the sphere (0 = full disc, 1 = empty).
     */
    constructor(options) {
            // Default configuration options - tweak these to your liking!
            const defaultOptions = {
                    canvasId: 'particleCanvas',
                    width: window.innerWidth,
                    height: window.innerHeight,
                    numParticles: 1500,         // Overall density
                    maxParticleOrbitRadius: Math.min(window.innerWidth, window.innerHeight) * 0.45, // Adapts to screen size
                    particleBaseRadius: { min: 0.6, max: 1.2 }, // Slightly smaller for finer detail
                    particleColors: [
                            'rgba(255, 255, 255, 0.8)',
                            'rgba(200, 220, 255, 0.7)',
                            'rgba(255, 200, 220, 0.7)',
                            'rgba(180, 255, 255, 0.6)'
                    ],
                    touchInfluenceRadius: 100,  // Good size for interactive push
                    touchMaxForce: 15,          // Increased to ensure a good bounce
                    touchForceIncrease: 0.2,    // Faster force buildup
                    touchForceDecay: 0.92,      // Slower decay, allowing spring to work
                    initialVelocityScale: 0.5,  // Adjusted for XY random speed
                    friction: 0.85,             // Higher damping (removed in updateParticle logic)
                    springConstant: 0.02,       // Lower spring stiffness
                    orbitSpeed: 0.002,          // Slightly faster uniform orbit
                    minDesiredSpeed: 0.0001,    // Extremely low to allow particles to almost settle
                    zVelocityScale: 0.002,      // Adjusted for Z random speed
                    displayRadiusScale: { min: 0.7, max: 0.8 },
                    displayAlphaScale: { min: 0.1, max: 0.6 },
                    globalPulseSpeed: 0.025,    // Increased for faster, more frequent wobble
                    individualPulseMagnitude: 0.01, // Increased for slightly more noticeable wobble
                    returnVelocityScale: 1,     // Scales how quickly particles snap back
                    vibrationFrequency: 0.02,   // Speed of the ongoing particle vibration
                    snapTolerance: 1,           // Pixel tolerance for snap-back
                    sphereRotationSpeed: 0.001, // Speed of global sphere rotation
                    sphereScale: 0.45,          // Scale of the sphere relative to canvas size
                    sphereThickness: 0.9,       // Thickness of the sphere
                    hollowness: 0             // Hollowness of the sphere (0 = full disc, 1 = empty)
            };

            // Merge default options with user-provided options
            this.options = { ...defaultOptions, ...options };

            // Get canvas element and its 2D rendering context
            this.canvas = document.getElementById(this.options.canvasId);
            if (!this.canvas) {
                    console.error(`Canvas with ID '${this.options.canvasId}' not found. Please ensure the HTML element exists.`);
                    return; // Exit constructor if canvas is not found
            }
            this.ctx = this.canvas.getContext('2d');
            if (!this.ctx) {
                    console.error('2D rendering context not found. Your browser might not support Canvas.');
                    return; // Exit constructor if context is not available
            }

            // Set canvas dimensions
            this.width = this.options.width;
            this.height = this.options.height;
            this.canvas.width = this.width;
            this.canvas.height = this.height;

            // Center of the particle sphere on the canvas
            this.sphereCenter = { x: this.width / 2, y: this.height / 2 };
            this.particles = []; // Array to hold all particle objects
            this.globalPulseTime = 0; // Global time counter for pulsation effect
            this.sphereRotation = 0; // Track global sphere rotation

            // Touch/Mouse interaction state variables
            this.touchActive = false;
            this.touchX = 0;
            this.touchY = 0;
            this.touchForce = 0; // Accumulated force based on touch duration

            // Initialize event listeners for interactivity and responsiveness
            this.initEventListeners();
            // Create initial particles
            this.initParticles();
            // Start the animation loop
            this.animate();
    }

    /**
     * Initializes all necessary event listeners (resize, mouse, touch).
     */
    initEventListeners() {
            window.addEventListener('resize', this.handleResize.bind(this));
            this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
            this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
            this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
            // Use { passive: false } for touch events to allow preventDefault() for scrolling
            this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
            this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));
            this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    }

    /**
     * Handles window resize events to adjust canvas dimensions and re-initialize particles.
     */
    handleResize() {
            this.width = this.canvas.width = window.innerWidth;
            this.height = this.canvas.height = window.innerHeight;
            this.sphereCenter.x = this.width / 2;
            this.sphereCenter.y = this.height / 2;
            // Reajusta maxParticleOrbitRadius en caso de redimensionamiento
            this.options.maxParticleOrbitRadius = Math.min(this.width, this.height) * 0.45;
            this.initParticles(); // Re-create particles to fit new dimensions
    }

    /** Handles mouse down event. */
    handleMouseDown(e) {
            this.touchActive = true;
            this.touchX = e.clientX;
            this.touchY = e.clientY;
    }

    /** Handles mouse up event. */
    handleMouseUp() {
            this.touchActive = false;
    }

    /** Handles mouse move event. */
    handleMouseMove(e) {
            if (this.touchActive) {
                    this.touchX = e.clientX;
                    this.touchY = e.clientY;
            }
    }

    /** Handles touch start event. */
    handleTouchStart(e) {
            this.touchActive = true;
            this.touchX = e.touches[0].clientX;
            this.touchY = e.touches[0].clientY;
            e.preventDefault(); // Prevent default touch behavior (e.g., scrolling)
    }

    /** Handles touch end event. */
    handleTouchEnd() {
            this.touchActive = false;
    }

    /** Handles touch move event. */
    handleTouchMove(e) {
            if (this.touchActive) {
                    this.touchX = e.touches[0].clientX;
                    this.touchY = e.touches[0].clientY;
            }
            e.preventDefault(); // Prevent default touch behavior (e.g., scrolling)
    }

    /**
     * Updates the position and forces of a single particle.
     * This method is called for each particle in the animation loop.
     * @param {object} particle - The particle object to update.
     */
    updateParticle(particle) {
            // 1. Compute vibrating target coordinate
            const vib = Math.sin(this.globalPulseTime + particle.pulseOffset)
                    * this.options.individualPulseMagnitude
                    * particle.initialOrbitRadius;
            const targetR = particle.initialOrbitRadius + vib;

            // Use rotated angle for global spin
            const angle = particle.initialAngle + this.sphereRotation;
            const tx = this.sphereCenter.x + Math.cos(angle) * targetR;
            const ty = this.sphereCenter.y + Math.sin(angle) * targetR;

            // 2. Spring + damper toward (tx, ty)
            const dx = particle.x - tx;
            const dy = particle.y - ty;
            const k = this.options.springConstant;
            const c = 2 * Math.sqrt(k);
            const rvs = this.options.returnVelocityScale;
            particle.vx += (-dx * k - c * particle.vx) * rvs;
            particle.vy += (-dy * k - c * particle.vy) * rvs;

            // 3. Optional orbital/tangential motion (preserve existing effect)
            const distToTarget = Math.hypot(dx, dy);
            if (distToTarget < targetR * 0.2) {
                    const tangentX = -dy / targetR;
                    const tangentY = dx / targetR;
                    particle.vx += tangentX * particle.orbitSpeed;
                    particle.vy += tangentY * particle.orbitSpeed;
            }

            // 4. Update position & rest of existing logic
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Apply a very small friction to allow movement
            particle.vx *= 0.99; // Less damping than original
            particle.vy *= 0.99;

            // Ensure a minimum speed for constant motion
            const currentSpeed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (currentSpeed < this.options.minDesiredSpeed) {
                    // Give a tiny, random "kick" if speed drops below the minimum threshold
                    particle.vx += (Math.random() - 0.5) * 0.002; // Slightly stronger kick
                    particle.vy += (Math.random() - 0.5) * 0.002;
            }
    }

    /**
     * Draws a single particle on the canvas.
     * @param {object} particle - The particle object to draw.
     */
    drawParticle(particle) {
            // Calculate scaled radius and alpha based on Z for 3D illusion
            const normalizedZ = (particle.z + 1) / 2; // Normalize Z from [-1, 1] to [0, 1]
            // Scale radius based on Z for depth perception
            const displayRadius = particle.baseRadius * (this.options.displayRadiusScale.min + normalizedZ * this.options.displayRadiusScale.max);

            // Force solid circle
            const displayAlpha = 1;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, displayRadius, 0, Math.PI * 2);

            // Parse existing RGBA string to apply dynamic alpha
            const colorParts = particle.color.match(/\d+(\.\d+)?/g);
            this.ctx.fillStyle = `rgba(${colorParts[0]}, ${colorParts[1]}, ${colorParts[2]}, ${displayAlpha})`;
            this.ctx.fill();
            this.ctx.closePath();
    }

    /**
     * Initializes the array of particles.
     * Clears existing particles and creates new ones based on current options.
     */
    initParticles() {
            this.particles.length = 0; // Clear any existing particles
            const o = this.options;
            const maxR = Math.min(o.width, o.height) * o.sphereScale;
            const minR = maxR * o.hollowness; // Inner cut
            for (let i = 0; i < o.numParticles; i++) {
                    const angle = Math.random() * Math.PI * 2; // Random angle for distribution
                    // Generate a random distance that creates a visually uniform density
                    // This uses sqrt(random) to bias particles towards larger radii, counteracting visual clumping
                    const dist = minR + Math.sqrt(Math.random()) * (maxR - minR) * o.sphereThickness;

                    const x = this.sphereCenter.x + Math.cos(angle) * dist;
                    const y = this.sphereCenter.y + Math.sin(angle) * dist;
                    // Random particle radius within defined range
                    const radius = Math.random() * (this.options.particleBaseRadius.max - this.options.particleBaseRadius.min) + this.options.particleBaseRadius.min;
                    // Randomly select a color from the defined palette
                    const color = this.options.particleColors[Math.floor(Math.random() * this.options.particleColors.length)];
                    const z = (Math.random() * 2) - 1; // Random Z-coordinate for 3D effect

                    // Create a new Particle instance and add it to the array
                    // Pass 'this.options', the calculated 'dist', and 'angle' to the Particle constructor
                    this.particles.push(new Particle(x, y, radius, color, z, this.options, dist, angle));
            }
    }

    /**
     * The main animation loop.
     * Calls itself recursively via requestAnimationFrame.
     */
    animate() {
            // Request the next animation frame, binding 'this' to maintain context
            requestAnimationFrame(this.animate.bind(this));

            // Update global time counter for pulsation
            this.globalPulseTime += this.options.vibrationFrequency;

            // Advance global sphere rotation
            this.sphereRotation += this.options.sphereRotationSpeed;

            // Clear the entire canvas for the new frame
            this.ctx.clearRect(0, 0, this.width, this.height);

            // Apply forces from mouse/touch interaction
            this.applyTouchForce();

            // Update and draw each particle
            this.particles.forEach(particle => {
                    this.updateParticle(particle); // Update particle physics
                    this.drawParticle(particle);   // Draw particle on canvas
            });
    }

    /**
     * Applies force to particles based on mouse/touch interaction.
     * The force builds up while active and decays when inactive.
     */
    applyTouchForce() {
            // Increase touch force if interaction is active
            if (this.touchActive) {
                    this.touchForce = Math.min(this.options.touchMaxForce, this.touchForce + this.options.touchForceIncrease);
            } else {
                    // Decay touch force if interaction is inactive
                    this.touchForce *= this.options.touchForceDecay;
                    if (this.touchForce < 0.1) { // Reset if force is very small
                            this.touchForce = 0;
                    }
            }

            // Only apply force if there's significant touch interaction
            if (this.touchForce > 0) {
                    this.particles.forEach(particle => {
                            const dx = particle.x - this.touchX;
                            const dy = particle.y - this.touchY;
                            const distance = Math.sqrt(dx * dx + dy * dy);

                            // Apply force if particle is within the influence radius and not exactly at the touch point
                            if (distance < this.options.touchInfluenceRadius && distance > 0) {
                                    // Calculate force magnitude with exponential decay: stronger closer to touch point
                                    const forceMagnitude = Math.pow(1 - (distance / this.options.touchInfluenceRadius), 2) * this.touchForce * 0.8;

                                    // Apply force in the direction away from the touch point
                                    const angle = Math.atan2(dy, dx);
                                    particle.vx += Math.cos(angle) * forceMagnitude;
                                    particle.vy += Math.sin(angle) * forceMagnitude;
                            }
                    });
            }
    }

    /**
     * Updates the options of the instance of the particle effect.
     * This allows dynamic changes to the animation's behavior.
     * @param {object} newOptions - New options to apply.
     */
    updateOptions(newOptions) {
            // Merge new options, ensuring existing options are maintained unless overridden
            this.options = { ...this.options, ...newOptions };
            // Update canvas dimensions and center if width/height changed
            this.width = this.options.width;
            this.height = this.options.height;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.sphereCenter = { x: this.width / 2, y: this.height / 2 };
            // Re-initialize particles with the new configuration
            this.initParticles();
    }
}

// --- How to use the PerplexityParticleEffect class ---
// This ensures the DOM is fully loaded before trying to create the animation.
window.addEventListener('load', () => {
    // Instantiate the particle effect with default options, or customize it:
    const myPerplexityEffect = new PerplexityParticleEffect({
            canvasId: 'particleCanvas',
            numParticles: 900,
            maxParticleOrbitRadius: Math.min(window.innerWidth, window.innerHeight) * 0.45,
            particleBaseRadius: { min: 1.6, max: 2 },
            touchInfluenceRadius: 150,
            touchMaxForce: 65,
            touchForceIncrease: 0.9,
            friction: 0.9, // Increased damping
            springConstant: 0.0088, // Much stronger spring for faster return to position
            orbitSpeed: 0.5,
            initialVelocityScale: 0.4,
            minDesiredSpeed: 0.01,
            globalPulseSpeed: 0.35,
            individualPulseMagnitude: 0.25,
            returnVelocityScale: 0.45, // Adjust return speed
            vibrationFrequency: 0.55, // Increase for faster bobble
            sphereRotationSpeed: 0.001, // Adjusted global spin speed
            hollowness:0.05, // Adjusted inner void size
            sphereThickness: 0.9
    });
});