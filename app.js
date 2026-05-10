// ============ STATE ============
let gameState = null;
let timerInterval = null;
let timerSeconds = 300;

// ============ DOM HELPERS ============
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function show(el) { el.classList.remove('hidden'); }
function hide(el) { el.classList.add('hidden'); }

// ============ NAVIGATION ============
$$('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        $$('.nav-btn').forEach(b => b.classList.remove('active'));
        $$('.tab-content').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        $(`#tab-${btn.dataset.tab}`).classList.add('active');
    });
});

// ============ SETUP ============
const playerCountInput = $('#player-count');
const playerNamesList = $('#player-names-list');

function updatePlayerNameInputs() {
    const count = parseInt(playerCountInput.value) || 5;
    const existing = playerNamesList.querySelectorAll('.player-name-input');
    const currentNames = Array.from(existing).map(el => el.querySelector('input').value);

    playerNamesList.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const div = document.createElement('div');
        div.className = 'player-name-input';
        div.innerHTML = `
            <span style="min-width:24px;font-size:0.8rem;color:var(--text-secondary)">${i + 1}.</span>
            <input type="text" placeholder="Jugador ${i + 1}" value="${currentNames[i] || ''}">
            <button class="remove-player" data-idx="${i}">×</button>
        `;
        playerNamesList.appendChild(div);
    }
}

playerCountInput.addEventListener('change', updatePlayerNameInputs);
updatePlayerNameInputs();

$('#add-player-btn').addEventListener('click', () => {
    const current = parseInt(playerCountInput.value) || 5;
    if (current < 25) {
        playerCountInput.value = current + 1;
        updatePlayerNameInputs();
    }
});

playerNamesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-player')) {
        const current = parseInt(playerCountInput.value);
        if (current > 5) {
            playerCountInput.value = current - 1;
            updatePlayerNameInputs();
        }
    }
});

// ============ GAME CREATION ============
$('#create-game-btn').addEventListener('click', createGame);

function createGame() {
    const gameName = $('#game-name').value.trim() || `Partida ${new Date().toLocaleDateString()}`;
    const edition = $('#edition-select').value;
    const playerCount = parseInt(playerCountInput.value);

    const playerInputs = playerNamesList.querySelectorAll('input');
    const playerNames = Array.from(playerInputs).map((inp, i) =>
        inp.value.trim() || `Jugador ${i + 1}`
    );

    const roles = assignRoles(edition, playerCount);
    if (!roles) return;

    const shuffledRoles = shuffleArray([...roles]);

    const players = playerNames.map((name, i) => ({
        id: i,
        name: name,
        role: shuffledRoles[i],
        alive: true,
        statuses: [],
        notes: '',
        hasVoted: false,
        usedDeadVote: false,
        nominations: 0
    }));

    gameState = {
        id: Date.now(),
        name: gameName,
        edition: edition,
        editionName: EDITIONS[edition].name,
        players: players,
        currentPhase: 'night',
        currentRound: 1,
        nightEvents: {},
        dayEvents: {},
        nominations: {},
        executions: {},
        deaths: [],
        timeline: [],
        winner: null,
        createdAt: new Date().toISOString()
    };

    gameState.timeline.push({
        phase: 'setup',
        round: 0,
        text: `Partida creada: ${gameName} (${EDITIONS[edition].name}, ${playerCount} jugadores)`
    });

    renderGameActive();
    saveGameState();
}

function assignRoles(edition, playerCount) {
    const editionData = EDITIONS[edition];
    if (!editionData || edition === 'custom') {
        alert('Para edición personalizada, configura los roles manualmente.');
        return null;
    }

    const dist = ROLE_DISTRIBUTION[playerCount];
    if (!dist) {
        alert('Número de jugadores no válido (5-25)');
        return null;
    }

    const allRoles = editionData.roles;
    const selected = [];

    const pickRoles = (pool, count) => {
        const available = [...pool];
        const picked = [];
        for (let i = 0; i < count; i++) {
            if (available.length === 0) {
                // Allow repeats if we run out
                available.push(...pool);
            }
            const idx = Math.floor(Math.random() * available.length);
            picked.push(available[idx]);
            available.splice(idx, 1);
        }
        return picked;
    };

    selected.push(...pickRoles(allRoles.townsfolk, dist.townsfolk));
    selected.push(...pickRoles(allRoles.outsider, dist.outsider));
    selected.push(...pickRoles(allRoles.minion, dist.minion));
    selected.push(...pickRoles(allRoles.demon, dist.demon));

    return selected;
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ============ RENDER GAME ============
function renderGameActive() {
    hide($('#no-game-section'));
    show($('#game-active-section'));

    $('#active-game-title').textContent = gameState.name;
    $('#active-game-info').textContent = `${gameState.editionName} - ${gameState.players.length} jugadores - Ronda ${gameState.currentRound}`;

    renderRolesAssignment();
    renderGrimoire();
    renderNightPhase();
    renderDayPhase();
    renderPlayersTab();
    renderSummary();
}

function renderRolesAssignment() {
    const list = $('#roles-assignment-list');
    list.innerHTML = '';

    const sorted = [...gameState.players].sort((a, b) => {
        const order = ['demon', 'minion', 'outsider', 'townsfolk'];
        return order.indexOf(getRoleType(a.role)) - order.indexOf(getRoleType(b.role));
    });

    sorted.forEach(p => {
        const type = getRoleType(p.role);
        const div = document.createElement('div');
        div.className = `role-assignment-item ${!p.alive ? 'dead' : ''}`;
        div.innerHTML = `
            <span class="ra-player">${p.name} ${!p.alive ? '💀' : ''}</span>
            <span class="ra-role">
                <button class="show-role-btn" data-player-id="${p.id}">📱 Mostrar</button>
                <span class="role-badge ${type}">${type.substring(0, 3)}</span>
                ${p.role.name}
            </span>
        `;
        div.querySelector('.show-role-btn').addEventListener('click', () => showRoleCard(p));
        list.appendChild(div);
    });
}

function renderGrimoire() {
    const grid = $('#grimoire-grid');
    grid.innerHTML = '';

    gameState.players.forEach(p => {
        const type = getRoleType(p.role);
        const isEvil = type === 'demon' || type === 'minion';
        const token = document.createElement('div');
        token.className = `grimoire-token ${isEvil ? 'evil' : 'good'} ${!p.alive ? 'dead' : ''}`;
        token.innerHTML = `
            <div class="token-name">${p.name}</div>
            <div class="token-role">${p.role.name}</div>
            <button class="show-role-btn" data-player-id="${p.id}">Mostrar Rol</button>
        `;
        token.querySelector('.show-role-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            showRoleCard(p);
        });
        token.addEventListener('click', () => showPlayerModal(p));
        grid.appendChild(token);
    });
}

function getRoleType(role) {
    for (const edition of Object.values(EDITIONS)) {
        for (const [type, roles] of Object.entries(edition.roles)) {
            if (roles.find(r => r.id === role.id)) return type;
        }
    }
    return 'townsfolk';
}

function getAlivePlayerType(role) {
    const type = getRoleType(role);
    return (type === 'demon' || type === 'minion') ? 'evil' : 'good';
}

// ============ NIGHT PHASE ============
function renderNightPhase() {
    if (!gameState) return;

    $('#night-number-display').textContent = gameState.currentRound;
    renderNightOrder();
    renderNightEvents();
    renderNightDeaths();
    updatePlayerSelects();
}

function renderNightOrder() {
    const list = $('#night-order-list');
    list.innerHTML = '';

    const isFirstNight = gameState.currentRound === 1;
    const orderList = isFirstNight ? FIRST_NIGHT_ORDER : OTHER_NIGHT_ORDER;

    const activeRoles = gameState.players
        .filter(p => p.alive)
        .map(p => ({ player: p, role: p.role }));

    const nightKey = `night_${gameState.currentRound}`;
    const doneRoles = gameState.nightEvents[nightKey]?.doneOrder || [];

    let orderNum = 1;

    // Special: Minion/Demon info on first night
    if (isFirstNight) {
        const minionItem = createNightOrderItem(orderNum++, 'Info Secuaces', 'Los Secuaces se conocen entre sí y al Demonio', doneRoles.includes('minion_info'), 'minion_info');
        list.appendChild(minionItem);

        const demonItem = createNightOrderItem(orderNum++, 'Info Demonio', 'El Demonio conoce a sus Secuaces y 3 roles no en juego', doneRoles.includes('demon_info'), 'demon_info');
        list.appendChild(demonItem);
    }

    orderList.forEach(roleId => {
        if (roleId === 'minion_info' || roleId === 'demon_info') return;

        const matchingPlayers = activeRoles.filter(ar => ar.role.id === roleId);
        matchingPlayers.forEach(({ player, role }) => {
            const isDone = doneRoles.includes(`${roleId}_${player.id}`);
            const item = createNightOrderItem(
                orderNum++,
                role.name,
                `${player.name}: ${role.ability}`,
                isDone,
                `${roleId}_${player.id}`
            );
            list.appendChild(item);
        });
    });

    if (list.children.length === 0 || (isFirstNight && list.children.length <= 2)) {
        const empty = document.createElement('p');
        empty.className = 'hint';
        empty.textContent = 'No hay roles con acciones nocturnas activos.';
        list.appendChild(empty);
    }
}

function createNightOrderItem(num, roleName, desc, isDone, key) {
    const div = document.createElement('div');
    div.className = `night-order-item ${isDone ? 'done' : ''}`;
    div.innerHTML = `
        <span class="order-num">${num}</span>
        <span class="role-name">${roleName}</span>
    `;
    div.title = desc;
    div.addEventListener('click', () => {
        div.classList.toggle('done');
        toggleNightOrderDone(key);
    });
    return div;
}

function toggleNightOrderDone(key) {
    const nightKey = `night_${gameState.currentRound}`;
    if (!gameState.nightEvents[nightKey]) {
        gameState.nightEvents[nightKey] = { events: [], deaths: [], doneOrder: [] };
    }
    const done = gameState.nightEvents[nightKey].doneOrder;
    const idx = done.indexOf(key);
    if (idx >= 0) done.splice(idx, 1);
    else done.push(key);
    saveGameState();
}

function renderNightEvents() {
    const list = $('#night-events-list');
    list.innerHTML = '';
    const nightKey = `night_${gameState.currentRound}`;
    const events = gameState.nightEvents[nightKey]?.events || [];

    events.forEach((ev, i) => {
        const div = document.createElement('div');
        div.className = 'event-item';
        div.innerHTML = `
            <span>${ev.player ? `<strong>${ev.player}</strong>: ` : ''}${ev.text}</span>
            <button class="event-delete" data-type="night-event" data-idx="${i}">×</button>
        `;
        list.appendChild(div);
    });
}

function renderNightDeaths() {
    const list = $('#night-deaths-list');
    list.innerHTML = '';
    const nightKey = `night_${gameState.currentRound}`;
    const deaths = gameState.nightEvents[nightKey]?.deaths || [];

    deaths.forEach((d, i) => {
        const div = document.createElement('div');
        div.className = 'death-item';
        div.innerHTML = `
            <span class="skull">💀</span>
            <span><strong>${d.player}</strong> - ${d.cause}</span>
            <button class="event-delete" data-type="night-death" data-idx="${i}">×</button>
        `;
        list.appendChild(div);
    });
}

$('#add-night-event-btn').addEventListener('click', () => {
    const playerSel = $('#night-event-player');
    const desc = $('#night-event-desc');
    if (!desc.value.trim()) return;

    const nightKey = `night_${gameState.currentRound}`;
    if (!gameState.nightEvents[nightKey]) {
        gameState.nightEvents[nightKey] = { events: [], deaths: [], doneOrder: [] };
    }

    const playerName = playerSel.value || null;
    gameState.nightEvents[nightKey].events.push({
        player: playerName,
        text: desc.value.trim()
    });

    gameState.timeline.push({
        phase: 'night',
        round: gameState.currentRound,
        text: `${playerName ? playerName + ': ' : ''}${desc.value.trim()}`
    });

    desc.value = '';
    playerSel.value = '';
    renderNightEvents();
    saveGameState();
});

$('#add-night-death-btn').addEventListener('click', () => {
    const playerSel = $('#night-death-player');
    const cause = $('#night-death-cause');
    if (!playerSel.value) return;

    const nightKey = `night_${gameState.currentRound}`;
    if (!gameState.nightEvents[nightKey]) {
        gameState.nightEvents[nightKey] = { events: [], deaths: [], doneOrder: [] };
    }

    const playerName = playerSel.value;
    const player = gameState.players.find(p => p.name === playerName);
    if (player) {
        player.alive = false;
        player.statuses.push('dead');
    }

    gameState.nightEvents[nightKey].deaths.push({
        player: playerName,
        cause: cause.value.trim() || 'Muerte nocturna'
    });

    gameState.deaths.push({
        player: playerName,
        phase: 'night',
        round: gameState.currentRound,
        cause: cause.value.trim() || 'Muerte nocturna'
    });

    gameState.timeline.push({
        phase: 'night',
        round: gameState.currentRound,
        text: `💀 ${playerName} muere: ${cause.value.trim() || 'Muerte nocturna'}`
    });

    playerSel.value = '';
    cause.value = '';
    renderNightDeaths();
    renderGrimoire();
    renderRolesAssignment();
    updatePlayerSelects();
    renderPlayersTab();
    saveGameState();
});

// Delete events
document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('event-delete')) return;
    const type = e.target.dataset.type;
    const idx = parseInt(e.target.dataset.idx);
    const nightKey = `night_${gameState.currentRound}`;

    if (type === 'night-event') {
        gameState.nightEvents[nightKey].events.splice(idx, 1);
        renderNightEvents();
    } else if (type === 'night-death') {
        const death = gameState.nightEvents[nightKey].deaths[idx];
        const player = gameState.players.find(p => p.name === death.player);
        if (player) {
            player.alive = true;
            player.statuses = player.statuses.filter(s => s !== 'dead');
        }
        gameState.nightEvents[nightKey].deaths.splice(idx, 1);
        gameState.deaths = gameState.deaths.filter(d =>
            !(d.player === death.player && d.phase === 'night' && d.round === gameState.currentRound)
        );
        renderNightDeaths();
        renderGrimoire();
        updatePlayerSelects();
    }
    saveGameState();
});

// Night navigation
$('#prev-night-btn').addEventListener('click', () => {
    if (gameState.currentPhase === 'night' && gameState.currentRound > 1) {
        gameState.currentRound--;
        renderNightPhase();
        renderDayPhase();
        saveGameState();
    }
});

$('#next-night-btn').addEventListener('click', () => {
    gameState.currentRound++;
    gameState.currentPhase = 'night';
    renderNightPhase();
    renderDayPhase();
    saveGameState();
});

// ============ DAY PHASE ============
function renderDayPhase() {
    if (!gameState) return;

    $('#day-number-display').textContent = gameState.currentRound;
    renderNominations();
    updatePlayerSelects();
    renderTodayExecution();
}

$('#advance-phase-btn').addEventListener('click', () => {
    gameState.currentPhase = 'night';
    gameState.currentRound++;
    gameState.timeline.push({
        phase: 'day',
        round: gameState.currentRound - 1,
        text: `Fin del día ${gameState.currentRound - 1}`
    });
    renderNightPhase();
    renderDayPhase();
    saveGameState();

    // Switch to night tab
    $$('.nav-btn').forEach(b => b.classList.remove('active'));
    $$('.tab-content').forEach(t => t.classList.remove('active'));
    $('[data-tab="night"]').classList.add('active');
    $('#tab-night').classList.add('active');
});

// Nominations
$('#add-nomination-btn').addEventListener('click', () => {
    const nominator = $('#nominator-select').value;
    const nominated = $('#nominated-select').value;
    if (!nominator || !nominated) return;

    const dayKey = `day_${gameState.currentRound}`;
    if (!gameState.nominations[dayKey]) {
        gameState.nominations[dayKey] = [];
    }

    gameState.nominations[dayKey].push({
        nominator,
        nominated,
        votes: [],
        voteCount: 0,
        resolved: false
    });

    gameState.timeline.push({
        phase: 'day',
        round: gameState.currentRound,
        text: `${nominator} nomina a ${nominated}`
    });

    $('#nominator-select').value = '';
    $('#nominated-select').value = '';
    renderNominations();
    saveGameState();
});

function renderNominations() {
    const list = $('#nominations-list');
    list.innerHTML = '';
    const dayKey = `day_${gameState.currentRound}`;
    const noms = gameState.nominations[dayKey] || [];

    noms.forEach((nom, i) => {
        const div = document.createElement('div');
        div.className = 'nomination-item';
        div.innerHTML = `
            <span><strong>${nom.nominator}</strong> → <strong>${nom.nominated}</strong></span>
            <span>
                ${nom.resolved ? `✓ ${nom.voteCount} votos` : ''}
                <button class="btn btn-small ${nom.resolved ? 'btn-secondary' : 'btn-primary'}" data-nom-idx="${i}">
                    ${nom.resolved ? 'Ver' : 'Votar'}
                </button>
            </span>
        `;
        div.querySelector('button').addEventListener('click', () => openVoting(i));
        list.appendChild(div);
    });
}

function openVoting(nomIdx) {
    const dayKey = `day_${gameState.currentRound}`;
    const nom = gameState.nominations[dayKey][nomIdx];

    show($('#voting-card'));
    $('#voting-target').textContent = nom.nominated;

    const alivePlayers = gameState.players.filter(p => p.alive);
    const votesNeeded = Math.ceil(alivePlayers.length / 2);
    $('#votes-needed').textContent = votesNeeded;

    const list = $('#voting-players-list');
    list.innerHTML = '';

    gameState.players.forEach(p => {
        if (!p.alive && p.usedDeadVote) return;

        const hasVoted = nom.votes.includes(p.id);
        const div = document.createElement('div');
        div.className = `vote-player-item ${hasVoted ? 'voted' : ''} ${!p.alive ? 'dead-voter' : ''}`;
        div.innerHTML = `
            <span>${p.name} ${!p.alive ? '(muerto)' : ''}</span>
            <span>${hasVoted ? '✓' : '○'}</span>
        `;
        div.addEventListener('click', () => {
            if (hasVoted) {
                nom.votes = nom.votes.filter(id => id !== p.id);
            } else {
                nom.votes.push(p.id);
            }
            nom.voteCount = nom.votes.length;
            openVoting(nomIdx);
            saveGameState();
        });
        list.appendChild(div);
    });

    $('#vote-count').textContent = nom.voteCount;

    $('#resolve-vote-btn').onclick = () => {
        nom.resolved = true;

        // Mark dead voters
        nom.votes.forEach(id => {
            const player = gameState.players.find(p => p.id === id);
            if (player && !player.alive) {
                player.usedDeadVote = true;
            }
        });

        gameState.timeline.push({
            phase: 'day',
            round: gameState.currentRound,
            text: `Votación contra ${nom.nominated}: ${nom.voteCount} votos (necesarios: ${$('#votes-needed').textContent})`
        });

        hide($('#voting-card'));
        renderNominations();
        saveGameState();
    };
}

// Execution
$('#execute-btn').addEventListener('click', () => {
    const playerName = $('#execute-player-select').value;
    if (!playerName) return;

    const player = gameState.players.find(p => p.name === playerName);
    if (player) {
        player.alive = false;
        if (!player.statuses.includes('dead')) player.statuses.push('dead');
    }

    const notes = $('#execution-notes').value.trim();
    const dayKey = `day_${gameState.currentRound}`;
    gameState.executions[dayKey] = {
        player: playerName,
        notes: notes
    };

    gameState.deaths.push({
        player: playerName,
        phase: 'day',
        round: gameState.currentRound,
        cause: `Ejecutado por el pueblo${notes ? ': ' + notes : ''}`
    });

    gameState.timeline.push({
        phase: 'day',
        round: gameState.currentRound,
        text: `⚖️ ${playerName} es ejecutado${notes ? ' (' + notes + ')' : ''}`
    });

    $('#execute-player-select').value = '';
    $('#execution-notes').value = '';
    renderTodayExecution();
    renderGrimoire();
    renderRolesAssignment();
    updatePlayerSelects();
    renderPlayersTab();
    saveGameState();
});

function renderTodayExecution() {
    const display = $('#today-execution');
    const dayKey = `day_${gameState.currentRound}`;
    const exec = gameState.executions[dayKey];

    if (exec) {
        display.innerHTML = `<p style="margin-top:8px;color:var(--danger)">⚖️ <strong>${exec.player}</strong> fue ejecutado${exec.notes ? ' - ' + exec.notes : ''}</p>`;
    } else {
        display.innerHTML = '';
    }
}

// ============ TIMER ============
$('#timer-start').addEventListener('click', () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        $('#timer-start').textContent = 'Iniciar';
    } else {
        timerInterval = setInterval(() => {
            timerSeconds--;
            updateTimerDisplay();
            if (timerSeconds <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                $('#timer-start').textContent = 'Iniciar';
            }
        }, 1000);
        $('#timer-start').textContent = 'Pausa';
    }
});

$('#timer-reset').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timerSeconds = 300;
    updateTimerDisplay();
    $('#timer-start').textContent = 'Iniciar';
});

$('#timer-minus').addEventListener('click', () => {
    timerSeconds = Math.max(0, timerSeconds - 60);
    updateTimerDisplay();
});

$('#timer-plus').addEventListener('click', () => {
    timerSeconds += 60;
    updateTimerDisplay();
});

function updateTimerDisplay() {
    const min = Math.floor(timerSeconds / 60);
    const sec = timerSeconds % 60;
    const display = $('#timer-display');
    display.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;

    display.classList.remove('warning', 'danger');
    if (timerSeconds <= 30) display.classList.add('danger');
    else if (timerSeconds <= 60) display.classList.add('warning');
}

// ============ PLAYERS TAB ============
function renderPlayersTab() {
    if (!gameState) return;

    const list = $('#players-detail-list');
    list.innerHTML = '';

    gameState.players.forEach(p => {
        const type = getRoleType(p.role);
        const isEvil = type === 'demon' || type === 'minion';
        const card = document.createElement('div');
        card.className = `player-card ${isEvil ? 'evil' : ''} ${!p.alive ? 'dead' : ''}`;
        card.innerHTML = `
            <div class="player-card-header">
                <span class="player-card-name">${p.name} ${!p.alive ? '💀' : ''}</span>
                <span class="player-card-role">
                    <span class="role-badge ${type}">${type.substring(0, 3)}</span>
                    ${p.role.name}
                </span>
            </div>
            <div class="player-statuses">
                <span class="status-tag poisoned ${p.statuses.includes('poisoned') ? 'active' : ''}" data-player="${p.id}" data-status="poisoned">Envenenado</span>
                <span class="status-tag drunk ${p.statuses.includes('drunk') ? 'active' : ''}" data-player="${p.id}" data-status="drunk">Borracho</span>
                <span class="status-tag protected ${p.statuses.includes('protected') ? 'active' : ''}" data-player="${p.id}" data-status="protected">Protegido</span>
                <span class="status-tag dead ${p.statuses.includes('dead') ? 'active' : ''}" data-player="${p.id}" data-status="dead">Muerto</span>
                <span class="status-tag no-ability ${p.statuses.includes('no-ability') ? 'active' : ''}" data-player="${p.id}" data-status="no-ability">Sin Habilidad</span>
                <span class="status-tag used-vote ${p.usedDeadVote ? 'active' : ''}" data-player="${p.id}" data-status="used-vote">Voto Usado</span>
            </div>
            <div class="player-notes">
                <textarea placeholder="Notas del narrador..." data-player="${p.id}">${p.notes}</textarea>
            </div>
        `;
        list.appendChild(card);
    });

    // Status toggle handlers
    list.querySelectorAll('.status-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const playerId = parseInt(tag.dataset.player);
            const status = tag.dataset.status;
            const player = gameState.players.find(p => p.id === playerId);

            if (status === 'dead') {
                player.alive = !player.alive;
                if (!player.alive && !player.statuses.includes('dead')) {
                    player.statuses.push('dead');
                } else {
                    player.statuses = player.statuses.filter(s => s !== 'dead');
                    player.alive = true;
                }
            } else if (status === 'used-vote') {
                player.usedDeadVote = !player.usedDeadVote;
            } else {
                if (player.statuses.includes(status)) {
                    player.statuses = player.statuses.filter(s => s !== status);
                } else {
                    player.statuses.push(status);
                }
            }

            renderPlayersTab();
            renderGrimoire();
            renderRolesAssignment();
            updatePlayerSelects();
            saveGameState();
        });
    });

    // Notes handlers
    list.querySelectorAll('textarea').forEach(ta => {
        ta.addEventListener('change', () => {
            const playerId = parseInt(ta.dataset.player);
            const player = gameState.players.find(p => p.id === playerId);
            player.notes = ta.value;
            saveGameState();
        });
    });
}

// ============ PLAYER MODAL ============
function showPlayerModal(player) {
    const type = getRoleType(player.role);
    const modal = $('#modal-body');
    modal.innerHTML = `
        <h3>${player.name}</h3>
        <p><span class="role-badge ${type}">${type}</span> <strong>${player.role.name}</strong></p>
        <p style="margin-top:8px;font-size:0.85rem;color:var(--text-secondary)">${player.role.ability}</p>
        <p style="margin-top:8px">Estado: ${player.alive ? '🟢 Vivo' : '💀 Muerto'}</p>
        ${player.statuses.length ? `<p>Estados: ${player.statuses.join(', ')}</p>` : ''}
        ${player.notes ? `<p style="margin-top:8px"><em>Notas: ${player.notes}</em></p>` : ''}
    `;
    show($('#modal-overlay'));
}

$('#modal-close-btn').addEventListener('click', () => hide($('#modal-overlay')));
$('#modal-overlay').addEventListener('click', (e) => {
    if (e.target === $('#modal-overlay')) hide($('#modal-overlay'));
});

// ============ PLAYER SELECTS ============
function updatePlayerSelects() {
    if (!gameState) return;

    const selects = [
        '#night-event-player',
        '#night-death-player',
        '#nominator-select',
        '#nominated-select',
        '#execute-player-select'
    ];

    selects.forEach(sel => {
        const select = $(sel);
        const currentVal = select.value;
        const firstOption = select.options[0].textContent;

        select.innerHTML = `<option value="">${firstOption}</option>`;

        const players = sel.includes('death') || sel === '#execute-player-select'
            ? gameState.players.filter(p => p.alive)
            : gameState.players;

        players.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.name;
            opt.textContent = `${p.name} ${!p.alive ? '💀' : ''}`;
            select.appendChild(opt);
        });

        if (currentVal) select.value = currentVal;
    });
}

// ============ SUMMARY ============
function renderSummary() {
    if (!gameState) return;

    renderTimeline();
    renderStats();

    if (gameState.winner) {
        $('#winner-display').textContent = gameState.winner === 'good'
            ? '🎉 ¡El Bien ha ganado!'
            : '😈 ¡El Mal ha ganado!';
    }
}

function renderTimeline() {
    const list = $('#timeline-list');
    list.innerHTML = '';

    gameState.timeline.forEach(entry => {
        const div = document.createElement('div');
        div.className = `timeline-entry ${entry.phase}`;
        div.innerHTML = `
            <div class="timeline-phase">${entry.phase === 'night' ? '🌙' : entry.phase === 'day' ? '☀️' : '⚙️'} ${entry.phase} ${entry.round || ''}</div>
            <div class="timeline-text">${entry.text}</div>
        `;
        list.appendChild(div);
    });
}

function renderStats() {
    if (!gameState) return;

    const section = $('#stats-section');
    const alive = gameState.players.filter(p => p.alive);
    const dead = gameState.players.filter(p => !p.alive);
    const aliveGood = alive.filter(p => getAlivePlayerType(p.role) === 'good');
    const aliveEvil = alive.filter(p => getAlivePlayerType(p.role) === 'evil');

    section.innerHTML = `
        <div class="stat-row"><span>Total jugadores</span><span>${gameState.players.length}</span></div>
        <div class="stat-row"><span>Vivos</span><span>${alive.length}</span></div>
        <div class="stat-row"><span>Muertos</span><span>${dead.length}</span></div>
        <div class="stat-row"><span>Buenos vivos</span><span style="color:var(--good)">${aliveGood.length}</span></div>
        <div class="stat-row"><span>Malvados vivos</span><span style="color:var(--evil)">${aliveEvil.length}</span></div>
        <div class="stat-row"><span>Ronda actual</span><span>${gameState.currentRound}</span></div>
        <div class="stat-row"><span>Ejecuciones totales</span><span>${Object.keys(gameState.executions).length}</span></div>
        <div class="stat-row"><span>Votos necesarios</span><span>${Math.ceil(alive.length / 2)}</span></div>
    `;
}

// ============ WINNER ============
$('#win-good-btn').addEventListener('click', () => {
    if (!gameState) return;
    gameState.winner = 'good';
    gameState.timeline.push({ phase: 'end', round: gameState.currentRound, text: '🎉 Victoria del Bien' });
    renderSummary();
    saveGameState();
});

$('#win-evil-btn').addEventListener('click', () => {
    if (!gameState) return;
    gameState.winner = 'evil';
    gameState.timeline.push({ phase: 'end', round: gameState.currentRound, text: '😈 Victoria del Mal' });
    renderSummary();
    saveGameState();
});

// ============ EXPORT ============
$('#export-text-btn').addEventListener('click', () => {
    if (!gameState) return;

    let text = `=== ${gameState.name} ===\n`;
    text += `Edición: ${gameState.editionName}\n`;
    text += `Jugadores: ${gameState.players.length}\n`;
    text += `Resultado: ${gameState.winner === 'good' ? 'Victoria del Bien' : gameState.winner === 'evil' ? 'Victoria del Mal' : 'Sin terminar'}\n\n`;

    text += `--- JUGADORES ---\n`;
    gameState.players.forEach(p => {
        text += `${p.name}: ${p.role.name} (${getRoleType(p.role)}) ${p.alive ? 'VIVO' : 'MUERTO'}\n`;
    });

    text += `\n--- CRONOLOGÍA ---\n`;
    gameState.timeline.forEach(e => {
        text += `[${e.phase} ${e.round || ''}] ${e.text}\n`;
    });

    navigator.clipboard.writeText(text).then(() => {
        alert('Resumen copiado al portapapeles');
    });
});

$('#export-json-btn').addEventListener('click', () => {
    if (!gameState) return;
    const blob = new Blob([JSON.stringify(gameState, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `botc_${gameState.name.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
});

// ============ SAVE / LOAD ============
function saveGameState() {
    if (!gameState) return;
    localStorage.setItem(`botc_game_${gameState.id}`, JSON.stringify(gameState));
    updateSavedGamesList();
}

function updateSavedGamesList() {
    const select = $('#saved-games-select');
    select.innerHTML = '<option value="">-- Seleccionar --</option>';

    const keys = Object.keys(localStorage).filter(k => k.startsWith('botc_game_'));
    keys.forEach(key => {
        try {
            const game = JSON.parse(localStorage.getItem(key));
            const opt = document.createElement('option');
            opt.value = key;
            opt.textContent = `${game.name} (${game.players.length}j, ${new Date(game.createdAt).toLocaleDateString()})`;
            select.appendChild(opt);
        } catch (e) {}
    });
}

$('#load-game-btn').addEventListener('click', () => {
    const key = $('#saved-games-select').value;
    if (!key) return;

    try {
        gameState = JSON.parse(localStorage.getItem(key));
        renderGameActive();
    } catch (e) {
        alert('Error al cargar la partida');
    }
});

$('#delete-game-btn').addEventListener('click', () => {
    const key = $('#saved-games-select').value;
    if (!key) return;
    if (confirm('¿Eliminar esta partida guardada?')) {
        localStorage.removeItem(key);
        updateSavedGamesList();
    }
});

$('#save-game-btn').addEventListener('click', () => {
    saveGameState();
    alert('Partida guardada');
});

$('#end-game-btn').addEventListener('click', () => {
    if (confirm('¿Finalizar la partida? Podrás ver el resumen.')) {
        // Switch to summary tab
        $$('.nav-btn').forEach(b => b.classList.remove('active'));
        $$('.tab-content').forEach(t => t.classList.remove('active'));
        $('[data-tab="summary"]').classList.add('active');
        $('#tab-summary').classList.add('active');
        renderSummary();
    }
});

$('#reassign-roles-btn').addEventListener('click', () => {
    if (confirm('¿Reasignar todos los roles aleatoriamente?')) {
        const edition = gameState.edition;
        const roles = assignRoles(edition, gameState.players.length);
        if (roles) {
            const shuffled = shuffleArray([...roles]);
            gameState.players.forEach((p, i) => {
                p.role = shuffled[i];
            });
            renderGameActive();
            saveGameState();
        }
    }
});

// ============ ROLE CARD FULLSCREEN ============
function showRoleCard(player) {
    const type = getRoleType(player.role);
    const typeNames = {
        townsfolk: 'Aldeano',
        outsider: 'Forastero',
        minion: 'Secuaz',
        demon: 'Demonio'
    };

    const rcTeam = $('#rc-team');
    rcTeam.textContent = typeNames[type] || type;
    rcTeam.className = `role-card-team ${type}`;

    $('#rc-icon').textContent = player.role.icon || '🎭';
    $('#rc-name').textContent = player.role.name;
    $('#rc-ability').textContent = player.role.abilityFull || player.role.ability;

    // Reminder text based on type
    const reminders = {
        townsfolk: 'Eres BUENO. Tu objetivo es encontrar y ejecutar al Demonio.',
        outsider: 'Eres BUENO, pero tu habilidad puede complicar las cosas para tu equipo.',
        minion: 'Eres MALVADO. Conoces al Demonio y a los otros Secuaces. Protege al Demonio.',
        demon: 'Eres MALVADO. Debes matar cada noche sin ser descubierto. Si mueres, el Bien gana.'
    };
    $('#rc-reminder').textContent = reminders[type] || '';

    show($('#role-card-fullscreen'));
}

$('#rc-close').addEventListener('click', () => {
    hide($('#role-card-fullscreen'));
});

// Also close with tap anywhere on the background
$('#role-card-fullscreen').addEventListener('click', (e) => {
    if (e.target === $('#role-card-fullscreen')) {
        hide($('#role-card-fullscreen'));
    }
});

// ============ INIT ============
updateSavedGamesList();

// Check for active game in localStorage
const lastActiveKey = Object.keys(localStorage).find(k => k.startsWith('botc_game_'));
if (lastActiveKey) {
    // Don't auto-load, just show saved games option
}
