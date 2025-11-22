// State Management
const state = {
    mode: 'solo', // 'solo' or 'multi'
    min: 1,
    max: 10,
    count: 1,
    noDuplicates: false,
    isGenerating: false,
    players: [],
    currentPlayerIndex: 0
};

const PLAYER_COLORS = [
    '#ef4444', '#f59e0b', '#10b981', '#3b82f6',
    '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'
];

// DOM Elements
const elements = {
    modeScreen: document.getElementById('modeScreen'),
    setupScreen: document.getElementById('setupScreen'),
    gameScreen: document.getElementById('gameScreen'),

    // Buttons
    soloBtn: document.getElementById('soloModeBtn'),
    multiBtn: document.getElementById('multiModeBtn'),
    backBtn: document.getElementById('backBtn'),
    generateBtn: document.getElementById('generateBtn'),
    addPlayerBtn: document.getElementById('addPlayerBtn'),
    startGameBtn: document.getElementById('startGameBtn'),
    cancelSetupBtn: document.getElementById('cancelSetupBtn'),
    nextPlayerBtn: document.getElementById('nextPlayerBtn'),

    // Display Areas
    resultsGrid: document.getElementById('resultsGrid'),
    playerChips: document.getElementById('playerChips'),
    multiplayerHeader: document.getElementById('multiplayerHeader'),
    totalDisplay: document.getElementById('totalDisplay'),
    totalValue: document.getElementById('totalValue'),
    currentPlayerDot: document.getElementById('currentPlayerDot'),
    currentPlayerName: document.getElementById('currentPlayerName'),

    // Inputs
    inputs: {
        min: document.getElementById('minVal'),
        max: document.getElementById('maxVal'),
        count: document.getElementById('numCount'),
        noDuplicates: document.getElementById('noDuplicates'),
        setupNumPlayers: document.getElementById('setupNumPlayers'),
        playerInitials: document.getElementById('playerInitials')
    }
};

// Sound Effects
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

// Player Management
function updatePlayerChips() {
    elements.playerChips.innerHTML = '';
    state.players.forEach(player => {
        const chip = document.createElement('div');
        chip.className = 'player-chip';
        chip.innerHTML = `
            <div class="player-chip-dot" style="background: ${player.color}"></div>
            <span>${player.initials}</span>
        `;
        elements.playerChips.appendChild(chip);
    });
}

function addPlayer() {
    const initials = elements.inputs.playerInitials.value.trim().toUpperCase();
    const maxPlayers = parseInt(elements.inputs.setupNumPlayers.value);

    if (!initials) return;
    if (state.players.length >= maxPlayers) {
        alert(`Maximum ${maxPlayers} players allowed.`);
        return;
    }

    state.players.push({
        initials: initials,
        color: PLAYER_COLORS[state.players.length % PLAYER_COLORS.length]
    });

    elements.inputs.playerInitials.value = '';
    updatePlayerChips();
    elements.inputs.playerInitials.focus();
}

function updateCurrentPlayerUI() {
    const player = state.players[state.currentPlayerIndex];
    elements.currentPlayerName.textContent = player.initials;
    elements.currentPlayerDot.style.background = player.color;
    elements.currentPlayerDot.style.boxShadow = `0 0 15px ${player.color}`;

    // Reset for new turn
    elements.nextPlayerBtn.style.display = 'none';
    elements.generateBtn.style.display = 'flex';
    elements.totalDisplay.style.display = 'none';
    updateGrid(); // Clears numbers
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

    const promises = Array.from(cards).map((card, index) => {
        return new Promise(resolve => {
            const valueEl = card.querySelector('.number-value');
            card.classList.add('generating');

            let ticks = 0;
            const maxTicks = 10 + (index * 2);

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

    // Show Total
    const total = finalNumbers.reduce((a, b) => a + b, 0);
    elements.totalValue.textContent = total;
    elements.totalDisplay.style.display = 'flex';

    // Multiplayer Turn Logic
    if (state.mode === 'multi') {
        elements.generateBtn.style.display = 'none';
        elements.nextPlayerBtn.style.display = 'flex';
    }
}

// Event Listeners
function init() {
    // Mode Selection
    elements.soloBtn.addEventListener('click', () => {
        state.mode = 'solo';
        elements.modeScreen.style.display = 'none';
        elements.gameScreen.classList.add('active');
        elements.multiplayerHeader.style.display = 'none';
        updateGrid();
    });

    elements.multiBtn.addEventListener('click', () => {
        state.mode = 'multi';
        state.players = [];
        updatePlayerChips();
        elements.modeScreen.style.display = 'none';
        elements.setupScreen.style.display = 'flex';
    });

    // Setup Screen
    elements.addPlayerBtn.addEventListener('click', addPlayer);
    elements.inputs.playerInitials.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addPlayer();
    });

    elements.startGameBtn.addEventListener('click', () => {
        const required = parseInt(elements.inputs.setupNumPlayers.value);
        if (state.players.length < required) {
            alert(`Please add all ${required} players.`);
            return;
        }
        elements.setupScreen.style.display = 'none';
        elements.gameScreen.classList.add('active');
        elements.multiplayerHeader.style.display = 'flex';
        state.currentPlayerIndex = 0;
        updateCurrentPlayerUI();
    });

    elements.cancelSetupBtn.addEventListener('click', () => {
        elements.setupScreen.style.display = 'none';
        elements.modeScreen.style.display = 'flex';
    });

    // Game Controls
    elements.backBtn.addEventListener('click', () => {
        if (confirm('Return to menu?')) {
            location.reload();
        }
    });

    elements.inputs.count.addEventListener('change', (e) => {
        let val = parseInt(e.target.value);
        if (val < 1) val = 1;
        if (val > 12) val = 12;
        state.count = val;
        e.target.value = val;
        updateGrid();
    });

    elements.inputs.min.addEventListener('change', (e) => state.min = parseInt(e.target.value));
    elements.inputs.max.addEventListener('change', (e) => state.max = parseInt(e.target.value));
    elements.inputs.noDuplicates.addEventListener('change', (e) => state.noDuplicates = e.target.checked);

    elements.generateBtn.addEventListener('click', () => {
        const numbers = generateNumbers();
        if (numbers) animateGeneration(numbers);
    });

    elements.nextPlayerBtn.addEventListener('click', () => {
        state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
        updateCurrentPlayerUI();
    });
}

// Wake Lock Implementation
let wakeLock = null;

async function requestWakeLock() {
    try {
        if ('wakeLock' in navigator) {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('Wake Lock is active');

            wakeLock.addEventListener('release', () => {
                console.log('Wake Lock released');
            });
        }
    } catch (err) {
        console.error(`${err.name}, ${err.message}`);
    }
}

// Handle visibility change to re-acquire lock
document.addEventListener('visibilitychange', async () => {
    if (wakeLock !== null && document.visibilityState === 'visible') {
        await requestWakeLock();
    }
});

init();

// Request lock on start
requestWakeLock();
