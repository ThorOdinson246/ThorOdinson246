import { SphereParticleEffect } from './src/sphere-particles.js';

const effect = new SphereParticleEffect('visualizerContainer', {
    enableVisualizer: false,
    numParticles: 500,
    particleBaseRadius: { min: 2.0, max: 2.8 },
    touchInfluenceRadius: 200,
    touchMaxForce: 100,
    touchForceIncrease: 0.9,
    friction: 0.2,
    springConstant: 0.018,
    orbitSpeed: 0.5,
    initialVelocityScale: 0.4,
    minDesiredSpeed: 0.01,
    returnVelocityScale: 0.45,
    vibrationFrequency: 0.55,
    sphereRotationSpeed: 0.001,
    hollowness: 0.0,
    sphereThickness: 0.8,
    audioSmoothing: 0.1,
    highVolumeThreshold: 0.6,
    minPulseMagnitude: 0.05,
    maxPulseMagnitude: 0.45,
});

// cache defaults
const initialOptions = JSON.parse(JSON.stringify(effect.options));

// toggle sidebar
const toggleBtn = document.getElementById('menuToggle');
const overlay   = document.getElementById('controlsOverlay');
toggleBtn.addEventListener('click', () => overlay.classList.toggle('open'));

// --- add guide popup ---
const guideBtn = document.getElementById('guideBtn');
const guideModal = document.getElementById('guideModal');
const closeGuide = document.getElementById('closeGuide');
guideBtn.addEventListener('click', () => {
    guideModal.classList.add('open');
});
closeGuide.addEventListener('click', () => {
    guideModal.classList.remove('open');
});

// bind controls
overlay.querySelectorAll('[data-option]').forEach(input => {
    input.addEventListener('input', e => {
        const path = e.target.dataset.option.split('.');
        const val  = e.target.type === 'checkbox'
                   ? e.target.checked
                   : e.target.type === 'color'
                     ? e.target.value
                     : parseFloat(e.target.value);

        // special case: visualizer toggle
        if (path[0] === 'enableVisualizer') {
            effect.options.enableVisualizer = val;
            effect.toggleVisualizerMode();
            return;
        }

        // descend into options
        let obj = effect.options;
        while (path.length > 1) obj = obj[path.shift()];
        obj[path[0]] = val;

        if (path[0] === 'hollowness') effect.baseHollowness = effect.options.hollowness;
        effect.initParticles();
    });
});

// reset handler
document.getElementById('resetBtn').addEventListener('click', () => {
    // restore effect state
    effect.options = JSON.parse(JSON.stringify(initialOptions));
    effect.baseHollowness = effect.options.hollowness;
    effect.initParticles();

    // restore UI values
    overlay.querySelectorAll('[data-option]').forEach(input => {
        const path = input.dataset.option.split('.');
        let val  = initialOptions;
        path.forEach(p => val = val[p]);
        if (input.type === 'checkbox')  input.checked = val;
        else                            input.value   = val;
    });
});

// export handler
document.getElementById('exportBtn').addEventListener('click', () => {
    const cfg = JSON.stringify(effect.options, null, 2);
    navigator.clipboard.writeText(cfg)
        .then(() => alert('Settings copied to clipboard'));
});
