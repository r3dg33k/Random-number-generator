// State Management
const state = {
    mode: 'solo', // 'solo' or 'multi'
    min: 1,
    max: 10,
    count: 1,
    noDuplicates: false,
    isGenerating: false,
    players: [],
    currentPlayer: 0
};

// DOM Elements
const elements = {
    modeScreen: document.getElementById('modeScreen'),
    gameScreen: document.getElementById('gameScreen'),
    soloBtn: document.getElementById('soloModeBtn'),
    multiBtn: document.getElementById('multiModeBtn'),
    backBtn: document.getElementById('backBtn'),
    generateBtn: document.getElementById('generateBtn'),
    resultsGrid: document.getElementById('resultsGrid'),
    inputs: {
        min: document.getElementById('minVal'),
        max: document.getElementById('maxVal'),
        count: document.getElementById('numCount'),
        noDuplicates: document.getElementById('noDuplicates')
    }
};

// Sound Effects (Simple oscillator-based for no assets dependency)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'tick') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
    }
}

// Core RNG Logic
function getSecureRandom(min, max) {
    const range = max - min + 1;
    const bytesNeeded = Math.ceil(Math.log2(range) / 8);
    const maxValid = Math.pow(256, bytesNeeded) - (Math.pow(256, bytesNeeded) % range);
    const array = new Uint8Array(bytesNeeded);

    while (true) {
        window.crypto.getRandomValues(array);
        let value = 0;
        for (let i = 0; i < bytesNeeded; i++) {
            value = (value << 8) + array[i];
        }

        if (value < maxValid) {
            return min + (value % range);
        }
    }
}

function generateNumbers() {
    const { min, max, count, noDuplicates } = state;

    // Validation
    if (min >= max) {
        alert("Min value must be less than Max value");
        return null;
    }

    if (noDuplicates && (max - min + 1) < count) {
        alert(`Cannot generate ${count} unique numbers in range ${min}-${max}`);
        return null;
    }

    const numbers = [];
    const used = new Set();

    for (let i = 0; i < count; i++) {
        let num;
        if (noDuplicates) {
            do {
                num = getSecureRandom(min, max);
            } while (used.has(num));
            used.add(num);
        } else {
            num = getSecureRandom(min, max);
        }
        numbers.push(num);
    }

    return numbers;
}

// UI Updates
function updateGrid() {
    elements.resultsGrid.innerHTML = '';
    for (let i = 0; i < state.count; i++) {
        const card = document.createElement('div');
        card.className = 'number-card';
        card.innerHTML = `
            <span class="number-label">RESULT ${i + 1}</span>
            <div class="number-value empty">?</div>
        `;
        elements.resultsGrid.appendChild(card);
    }
}

async function animateGeneration(finalNumbers) {
    if (state.isGenerating || !finalNumbers) return;
    state.isGenerating = true;
    elements.generateBtn.disabled = true;

    const cards = document.querySelectorAll('.number-card');

    // Animate each card
    const promises = Array.from(cards).map((card, index) => {
        return new Promise(resolve => {
            const valueEl = card.querySelector('.number-value');
            card.classList.add('generating');

            let ticks = 0;
            const maxTicks = 10 + (index * 2); // Stagger effect

            const interval = setInterval(() => {
                valueEl.textContent = Math.floor(Math.random() * 99);
                valueEl.classList.remove('empty');
                playSound('tick');

                ticks++;
                if (ticks >= maxTicks) {
                    clearInterval(interval);
                    valueEl.textContent = finalNumbers[index];
                    card.classList.remove('generating');
                    card.classList.add('active');
                    resolve();
                }
            }, 50);
        });
    });

    await Promise.all(promises);
    playSound('success');
    state.isGenerating = false;
    elements.generateBtn.disabled = false;
}

// Event Listeners
function init() {
    // Mode Selection
    elements.soloBtn.addEventListener('click', () => {
        state.mode = 'solo';
        switchScreen('game');
        updateGrid();
    });

    elements.multiBtn.addEventListener('click', () => {
        state.mode = 'multi';
        // For now, multi behaves like solo but we can expand later
        switchScreen('game');
        updateGrid();
    });

    elements.backBtn.addEventListener('click', () => {
        switchScreen('mode');
    });

    // Inputs
    elements.inputs.count.addEventListener('change', (e) => {
        let val = parseInt(e.target.value);
        if (val < 1) val = 1;
        if (val > 12) val = 12; // Cap at 12 for UI sanity
        state.count = val;
        e.target.value = val;
        updateGrid();
    });

    elements.inputs.min.addEventListener('change', (e) => state.min = parseInt(e.target.value));
    elements.inputs.max.addEventListener('change', (e) => state.max = parseInt(e.target.value));
    elements.inputs.noDuplicates.addEventListener('change', (e) => state.noDuplicates = e.target.checked);

    // Generate
    elements.generateBtn.addEventListener('click', () => {
        const numbers = generateNumbers();
        if (numbers) animateGeneration(numbers);
    });
}

function switchScreen(screenName) {
    if (screenName === 'game') {
        elements.modeScreen.style.display = 'none';
        elements.gameScreen.classList.add('active');
    } else {
        elements.gameScreen.classList.remove('active');
        setTimeout(() => {
            elements.modeScreen.style.display = 'flex';
        }, 100);
    }
}

// Start
init();
