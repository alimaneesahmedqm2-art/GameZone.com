// ═══════════════════════════════════════════════════════════════
//  UI.JS — All screen/modal/menu rendering logic
// ═══════════════════════════════════════════════════════════════

let currentSection = 'home';
let selectedTrackId = null;
let garageCarId = null;
let dealerFilter = 'all';

// ─── TOAST ───
function toast(msg, type='') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'show' + (type ? ' ' + type : '');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.className = '', 2800);
}

// ─── NAV ───
function showSection(id) {
  currentSection = id;
  document.querySelectorAll('.home-section').forEach(s => s.classList.add('hidden'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const sec = document.getElementById('section-' + id);
  if(sec) sec.classList.remove('hidden');
  const btn = [...document.querySelectorAll('.nav-btn')].find(b => b.textContent.trim().toLowerCase() === id || b.getAttribute('onclick')?.includes("'"+id+"'"));
  if(btn) btn.classList.add('active');
  if(id === 'garage') renderGarage();
  if(id === 'dealership') renderDealership();
  if(id === 'championships') renderChampionships();
}

function updateNavStats() {
  document.getElementById('nav-vc').textContent = G.vc.toLocaleString();
  document.getElementById('nav-lv').textContent = G.level;
}

// ─── HOME ───
function updateHomeStats() {
  document.getElementById('qs-wins').textContent = G.wins;
  document.getElementById('qs-cars').textContent = G.ownedCars.length;
  document.getElementById('qs-drift').textContent = G.totalDriftPts.toLocaleString();
  document.getElementById('qs-level').textContent = G.level;
  updateNavStats();

  // Boss banner
  const boss = BOSS_RACERS.find(b => b.level === G.level && !G.bossDefeated.includes(b.level));
  const bb = document.getElementById('boss-banner');
  if(boss) {
    bb.classList.remove('hidden');
    document.getElementById('boss-name-lbl').textContent = boss.emoji + ' ' + boss.name.toUpperCase();
  } else {
    bb.classList.add('hidden');
  }
}

function checkAndShowDailyReward() {
  const isNew = checkDailyReward();
  const banner = document.getElementById('daily-reward-banner');
  if(!G.dailyClaimed) {
    banner.classList.remove('hidden');
    const reward = DAILY_REWARDS[Math.min(G.loginStreak-1, DAILY_REWARDS.length-1)];
    document.getElementById('daily-sub-text').textContent =
      `Day ${G.loginStreak} — ${reward ? reward.label : '100 Vort Coins'}`;
  } else {
    banner.classList.add('hidden');
  }
}

function claimDailyRewardUI() {
  const result = claimDailyReward();
  if(!result) { toast('Already claimed today!', 'err'); return; }
  document.getElementById('daily-reward-banner').classList.add('hidden');
  if(result.carGiven) {
    toast(`🎁 Day ${G.loginStreak} reward! +${result.vc} VC & ${result.carGiven.name}!`, 'gold');
  } else {
    toast(`🎁 Day ${G.loginStreak} reward! +${result.vc} VC claimed!`, 'win');
  }
  updateNavStats();
  updateHomeStats();
}

// ─── GARAGE ───
function renderGarage() {
  if(!garageCarId || !G.ownedCars.includes(garageCarId)) garageCarId = G.selectedCar;
  const car = CARS[garageCarId];
  const stats = getCarStats(garageCarId);
  if(!car || !stats) return;

  document.getElementById('g-car-name').textContent = car.name;
  const rarityEl = document.getElementById('g-rarity');
  rarityEl.textContent = car.rarity.toUpperCase();
  rarityEl.className = 'garage-rarity ' + car.rarity;

  // Draw car preview
  const show = document.getElementById('garage-car-show');
  show.style.fontSize = '7rem';
  show.textContent = car.emoji;

  // Stats
  const statsEl = document.getElementById('g-stats');
  const maxStat = 520;
  statsEl.innerHTML = `
    <div class="g-stat"><label>TOP SPEED</label><div class="g-bar"><div class="g-fill" style="width:${Math.min(100,stats.topSpeed/maxStat*100)}%"></div></div><div class="g-val">${stats.topSpeed} km/h</div></div>
    <div class="g-stat"><label>ACCELERATION</label><div class="g-bar"><div class="g-fill" style="width:${stats.acceleration}%"></div></div><div class="g-val">${stats.acceleration}</div></div>
    <div class="g-stat"><label>HANDLING</label><div class="g-bar"><div class="g-fill" style="width:${stats.handling}%"></div></div><div class="g-val">${stats.handling}</div></div>
    <div class="g-stat"><label>BRAKING</label><div class="g-bar"><div class="g-fill" style="width:${stats.braking}%"></div></div><div class="g-val">${stats.braking}</div></div>
  `;

  // Upgrades
  const uEl = document.getElementById('g-upgrades');
  uEl.innerHTML = '';
  const ups = G.upgrades[garageCarId] || {};
  UPGRADES.forEach(u => {
    const lvl = ups[u.key] || 0;
    const max = u.maxLevel;
    const maxed = lvl >= max;
    const cost = u.cost * (lvl + 1);
    const canAfford = G.vc >= cost;
    const dots = Array.from({length:max}, (_,i) =>
      `<div class="upg-dot-sm ${i < lvl ? (maxed ? 'max' : 'on') : ''}"></div>`).join('');
    uEl.innerHTML += `
      <div class="upg-row">
        <div><div class="upg-row-name">${u.name}</div><div class="upg-dots-sm">${dots}</div></div>
        <div style="text-align:right">
          ${maxed ? '<span style="color:var(--gold);font-family:Orbitron,monospace;font-size:.62rem">MAX</span>' :
            `<button class="upg-btn" style="background:none;border:1px solid ${canAfford?'var(--accent)':'var(--dim)'};color:${canAfford?'var(--accent)':'var(--dim)'};font-family:Orbitron,monospace;font-size:.6rem;padding:4px 8px;border-radius:4px;cursor:${canAfford?'pointer':'not-allowed'}" onclick="buyUpgrade('${garageCarId}','${u.key}')">${cost} VC</button>`}
        </div>
      </div>`;
  });

  // Select button
  const selbtn = document.getElementById('g-select-btn');
  if(G.selectedCar === garageCarId) {
    selbtn.textContent = '✅ SELECTED';
    selbtn.style.opacity = '.5';
    selbtn.disabled = true;
  } else {
    selbtn.textContent = 'SELECT CAR';
    selbtn.style.opacity = '1';
    selbtn.disabled = false;
  }

  // Owned cars row
  const row = document.getElementById('owned-cars-row');
  row.innerHTML = '';
  G.ownedCars.forEach(id => {
    const c = CARS[id];
    if(!c) return;
    const el = document.createElement('div');
    el.className = 'owned-car-thumb' + (id === garageCarId ? ' active' : '');
    el.innerHTML = `${c.emoji}<small>${c.name.split(' ')[0]}</small>`;
    el.onclick = () => { garageCarId = id; renderGarage(); };
    row.appendChild(el);
  });
}

function selectCurrentGarageCar() {
  if(!garageCarId) return;
  G.selectedCar = garageCarId;
  saveSave();
  renderGarage();
  toast(`${CARS[garageCarId].name} selected!`, 'win');
}

function buyUpgrade(carId, key) {
  const u = UPGRADES.find(x => x.key === key);
  if(!u) return;
  const ups = G.upgrades[carId] || {};
  const lvl = ups[key] || 0;
  if(lvl >= u.maxLevel) return;
  const cost = u.cost * (lvl + 1);
  if(!spendVC(cost)) { toast('Not enough Vort Coins!', 'err'); return; }
  if(!G.upgrades[carId]) G.upgrades[carId] = {};
  G.upgrades[carId][key] = lvl + 1;
  saveSave();
  renderGarage();
  updateNavStats();
  toast(`${u.name} upgraded to Lv${lvl+1}!`, 'win');
}

// ─── DEALERSHIP ───
function renderDealership() {
  const grid = document.getElementById('dealer-grid');
  grid.innerHTML = '';
  Object.values(CARS).forEach(car => {
    if(dealerFilter !== 'all' && car.rarity !== dealerFilter) return;
    const owned = G.ownedCars.includes(car.id);
    const canAfford = G.vc >= car.price;
    const rarityColors = {common:'#aaa',rare:'#4488ff',epic:'#aa44ff',legendary:'#ffd700',mythic:'#ff44aa'};
    const rc = rarityColors[car.rarity] || '#aaa';
    const card = document.createElement('div');
    card.className = `dealer-card ${car.rarity}${owned?' owned':''}`;
    card.innerHTML = `
      <div class="car-emoji-big">${car.emoji}</div>
      <div class="car-name-big">${car.name}</div>
      <div class="car-brand">${car.brand}</div>
      <div class="car-rarity-badge" style="color:${rc};border:1px solid ${rc};background:${rc}15">${car.rarity.toUpperCase()}</div>
      <div class="mini-stats">
        <div class="mini-stat">Speed: <b>${car.stats.topSpeed}</b></div>
        <div class="mini-stat">Accel: <b>${car.stats.acceleration}</b></div>
        <div class="mini-stat">Handle: <b>${car.stats.handling}</b></div>
        <div class="mini-stat">Brake: <b>${car.stats.braking}</b></div>
      </div>
      <div class="mini-stat" style="margin-bottom:10px;font-size:.76rem;color:var(--dim);line-height:1.3">${car.description}</div>
      <div class="dealer-price ${car.price===0?'free':''}">${car.price===0?'FREE':'🪙 '+car.price.toLocaleString()+' VC'}</div>
      <button class="buy-btn ${owned?'owned':''}" ${owned?'disabled':''} onclick="buyCar('${car.id}')">
        ${owned?'✅ OWNED':car.price===0?'CLAIM FREE':`BUY — ${car.price.toLocaleString()} VC`}
      </button>`;
    grid.appendChild(card);
  });
}

function filterDealer(filter) {
  dealerFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  event.currentTarget.classList.add('active');
  renderDealership();
}

function buyCar(carId) {
  const car = CARS[carId];
  if(!car) return;
  if(G.ownedCars.includes(carId)) { toast('Already owned!'); return; }
  if(car.price > 0 && !spendVC(car.price)) { toast('Not enough Vort Coins!', 'err'); return; }
  ownCar(carId);
  G.selectedCar = carId;
  saveSave();
  renderDealership();
  updateNavStats();
  toast(`🎉 ${car.name} acquired!`, 'gold');
}

// ─── CHAMPIONSHIPS ───
function renderChampionships() {
  const grid = document.getElementById('cup-grid');
  grid.innerHTML = '';
  CHAMPIONSHIPS.forEach(cup => {
    const locked = G.level < cup.reqLevel;
    const progress = G.champProgress[cup.id] || 0;
    const card = document.createElement('div');
    card.className = 'cup-card';
    card.style.opacity = locked ? '0.4' : '1';
    card.innerHTML = `
      <div class="cup-icon">${cup.icon}</div>
      <div class="cup-name">${cup.name}</div>
      <div class="cup-races">${cup.races} races · Req. Level ${cup.reqLevel}</div>
      <div class="cup-reward">🪙 ${cup.reward.vc.toLocaleString()} VC + ${cup.reward.xp} XP${cup.reward.car?'<br>🚗 '+CARS[cup.reward.car]?.name:''}</div>
      <div style="font-size:.75rem;color:var(--dim);margin-bottom:12px">Progress: ${progress}/${cup.races}</div>
      ${locked ? '<div style="color:var(--dim);font-size:.72rem;font-family:Orbitron,monospace">🔒 LOCKED</div>' :
        `<button class="btn-primary small" onclick="startChampionship('${cup.id}')">
          ${progress >= cup.races ? 'COMPLETED ✅' : 'ENTER'}
        </button>`}
    `;
    grid.appendChild(card);
  });
}

function startChampionship(id) {
  const cup = CHAMPIONSHIPS.find(c => c.id === id);
  if(!cup) return;
  if(G.level < cup.reqLevel) { toast('Level too low!', 'err'); return; }
  toast(`${cup.name} starting! Race ${(G.champProgress[cup.id]||0)+1} of ${cup.races}`, '');
  // Open race select for first available track
  showRaceSelect();
}

// ─── RACE SELECT ───
function showRaceSelect() {
  document.getElementById('race-select-modal').classList.remove('hidden');
  document.getElementById('diff-select').classList.add('hidden');
  renderTrackSelect();
}

function closeRaceSelect() {
  document.getElementById('race-select-modal').classList.add('hidden');
  selectedTrackId = null;
}

function renderTrackSelect() {
  const grid = document.getElementById('track-select-grid');
  grid.innerHTML = '';
  TRACKS.forEach((t, i) => {
    const locked = i >= G.unlockedTracks;
    const card = document.createElement('div');
    card.className = 'track-sel-card' + (locked?' locked':'');
    card.innerHTML = `
      <div class="track-sel-emoji">${t.emoji}</div>
      <div class="track-sel-name">${t.name}</div>
      <div class="track-sel-status ${locked?'':'ok'}">${locked?'🔒 Lv'+t.unlockLevel:'✅ AVAILABLE'}</div>
    `;
    if(!locked) card.onclick = () => selectTrack(t.id, card);
    grid.appendChild(card);
  });
}

function selectTrack(id, el) {
  selectedTrackId = id;
  document.querySelectorAll('.track-sel-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  const track = TRACKS.find(t => t.id === id);
  document.getElementById('diff-track-label').textContent = track.emoji + ' ' + track.name.toUpperCase();
  document.getElementById('diff-select').classList.remove('hidden');
}

function backToTrackSelect() {
  document.getElementById('diff-select').classList.add('hidden');
  selectedTrackId = null;
}

// ─── ADMIN ───
function openAdmin() {
  document.getElementById('admin-modal').classList.remove('hidden');
  document.getElementById('admin-input').value = '';
  document.getElementById('admin-msg').textContent = '';
  document.getElementById('admin-msg').className = 'admin-msg';
}

function closeAdmin() {
  document.getElementById('admin-modal').classList.add('hidden');
}

function checkAdmin() {
  const val = document.getElementById('admin-input').value.trim();
  const msg = document.getElementById('admin-msg');
  if(val === 'lillim') {
    adminUnlockAll();
    msg.textContent = '✅ ADMIN ACCESS GRANTED — ALL UNLOCKED!';
    msg.className = 'admin-msg ok';
    updateNavStats();
    updateHomeStats();
    setTimeout(() => { closeAdmin(); renderDealership(); renderGarage(); }, 1800);
    toast('🔓 ADMIN MODE — All cars, tracks & VC unlocked!', 'gold');
  } else {
    msg.textContent = 'Whoops! Ask admin for the secret code 😅';
    msg.className = 'admin-msg err';
    document.getElementById('admin-input').value = '';
  }
}

// ─── BOSS ───
function startBossRace() {
  const boss = BOSS_RACERS.find(b => b.level === G.level && !G.bossDefeated.includes(b.level));
  if(!boss) return;
  // Pick first available track
  selectedTrackId = TRACKS[Math.min(G.unlockedTracks-1, TRACKS.length-1)].id;
  beginRace('impossible', true, boss);
}
