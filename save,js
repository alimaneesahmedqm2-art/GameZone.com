// ═══════════════════════════════════════════════════════════════
//  SAVE.JS — Persistent save/load system
// ═══════════════════════════════════════════════════════════════

function mkSave() {
  return {
    level: 1,
    xp: 0,
    vc: 0,
    wins: 0,
    losses: 0,
    driftPoints: 0,
    totalDriftPts: 0,
    unlockedTracks: 1,
    ownedCars: ['mustang'],
    selectedCar: 'mustang',
    upgrades: {},          // carId -> {key->level}
    lastLogin: null,
    loginStreak: 0,
    dailyClaimed: false,
    diffRec: {easy:{w:0,l:0}, normal:{w:0,l:0}, hard:{w:0,l:0}, impossible:{w:0,l:0}},
    bossDefeated: [],
    nitroType: 'blue',
    mileage: 0,
    bestTimes: {},         // trackId -> ms
    champProgress: {},     // champId -> racesDone
    adminMode: false,
  };
}

let G;
function loadSave() {
  try {
    const raw = localStorage.getItem('vv_3d_v1');
    G = raw ? JSON.parse(raw) : mkSave();
  } catch(e) { G = mkSave(); }
  // migration
  const def = mkSave();
  Object.keys(def).forEach(k => { if(G[k] === undefined) G[k] = def[k]; });
  // ensure mustang owned
  if(!G.ownedCars.includes('mustang')) G.ownedCars.push('mustang');
  // ensure upgrades obj for each owned car
  G.ownedCars.forEach(id => { if(!G.upgrades[id]) G.upgrades[id] = {}; });
  UPGRADES.forEach(u => {
    G.ownedCars.forEach(id => { if(G.upgrades[id][u.key] === undefined) G.upgrades[id][u.key] = 0; });
  });
}

function saveSave() {
  try { localStorage.setItem('vv_3d_v1', JSON.stringify(G)); }
  catch(e) { console.warn('Save failed', e); }
}

// Get effective car stats with upgrades applied
function getCarStats(carId) {
  const base = CARS[carId];
  if(!base) return null;
  const s = {...base.stats};
  const ups = G.upgrades[carId] || {};
  UPGRADES.forEach(u => {
    const lvl = ups[u.key] || 0;
    for(let i = 0; i < lvl; i++) u.apply(s);
  });
  return s;
}

function addXP(amount) {
  G.xp += amount;
  let leveled = false;
  while(G.level < XP_TABLE.length - 1 && G.xp >= XP_TABLE[G.level]) {
    G.level++;
    G.unlockedTracks = Math.min(TRACKS.length, G.level + 1);
    leveled = true;
  }
  return leveled;
}

function addVC(amount) { G.vc += amount; }
function spendVC(amount) { if(G.vc < amount) return false; G.vc -= amount; return true; }

function ownCar(carId) {
  if(!G.ownedCars.includes(carId)) {
    G.ownedCars.push(carId);
    G.upgrades[carId] = {};
    UPGRADES.forEach(u => { G.upgrades[carId][u.key] = 0; });
  }
}

function checkDailyReward() {
  const now = new Date();
  const today = now.toDateString();
  if(G.lastLogin === today) return false; // already logged in today
  const yesterday = new Date(now - 86400000).toDateString();
  if(G.lastLogin !== yesterday) G.loginStreak = 0; // streak broken
  G.loginStreak = Math.min(7, G.loginStreak + 1);
  G.dailyClaimed = false;
  G.lastLogin = today;
  saveSave();
  return true;
}

function claimDailyReward() {
  if(G.dailyClaimed) return null;
  const reward = DAILY_REWARDS[G.loginStreak - 1] || DAILY_REWARDS[0];
  G.vc += reward.vc;
  if(reward.specialCar) {
    // Give a random unowned rare car on day 7
    const rareCars = Object.values(CARS).filter(c => c.rarity === 'rare' && !G.ownedCars.includes(c.id));
    if(rareCars.length > 0) {
      const car = rareCars[Math.floor(Math.random() * rareCars.length)];
      ownCar(car.id);
      return {...reward, carGiven: car};
    }
  }
  G.dailyClaimed = true;
  saveSave();
  return reward;
}

function adminUnlockAll() {
  G.adminMode = true;
  G.vc = 9999999;
  Object.keys(CARS).forEach(id => {
    ownCar(id);
    UPGRADES.forEach(u => { G.upgrades[id][u.key] = u.maxLevel; });
  });
  G.unlockedTracks = TRACKS.length;
  G.level = 10;
  G.xp = XP_TABLE[10];
  saveSave();
}
