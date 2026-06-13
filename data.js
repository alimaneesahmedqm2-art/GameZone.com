// ═══════════════════════════════════════════════════════════════
//  DATA.JS — All game constants, car definitions, track definitions
// ═══════════════════════════════════════════════════════════════

const CARS = {
  mustang: {
    id:'mustang', name:'Mustang GT', brand:'Ford',
    emoji:'🏎️', color:0x003399,
    rarity:'common', tier:1, price:0,
    stats:{topSpeed:180, acceleration:70, handling:65, braking:70, weight:85},
    description:'The classic American muscle. Free for all racers.',
    bodyColor:'#003399', accentColor:'#ffffff',
    widthR:0.95, heightR:0.42, lengthR:2.0,
  },
  gtr: {
    id:'gtr', name:'GT-R R35', brand:'Nissan',
    emoji:'🚗', color:0xcccccc,
    rarity:'rare', tier:2, price:500,
    stats:{topSpeed:310, acceleration:85, handling:82, braking:88, weight:78},
    description:'The Godzilla of Japan. Legendary AWD performance.',
    bodyColor:'#cccccc', accentColor:'#ff0000',
    widthR:0.98, heightR:0.40, lengthR:2.05,
  },
  supra: {
    id:'supra', name:'Supra MK4', brand:'Toyota',
    emoji:'🚙', color:0xff6600,
    rarity:'rare', tier:2, price:700,
    stats:{topSpeed:290, acceleration:82, handling:80, braking:84, weight:75},
    description:'2JZ legend. Tune it to infinity.',
    bodyColor:'#ff6600', accentColor:'#000000',
    widthR:0.92, heightR:0.41, lengthR:1.95,
  },
  camaro: {
    id:'camaro', name:'Camaro ZL1', brand:'Chevrolet',
    emoji:'🚘', color:0xff4400,
    rarity:'rare', tier:2, price:900,
    stats:{topSpeed:298, acceleration:88, handling:72, braking:80, weight:88},
    description:'Raw American power with supercharger howl.',
    bodyColor:'#ff4400', accentColor:'#ffff00',
    widthR:1.0, heightR:0.43, lengthR:2.1,
  },
  corvette: {
    id:'corvette', name:'Corvette ZR1', brand:'Chevrolet',
    emoji:'🏁', color:0xff0000,
    rarity:'epic', tier:3, price:1500,
    stats:{topSpeed:340, acceleration:92, handling:85, braking:90, weight:72},
    description:'Mid-engine American supercar. Track destroyer.',
    bodyColor:'#ff0000', accentColor:'#ffffff',
    widthR:0.95, heightR:0.38, lengthR:2.05,
  },
  demon: {
    id:'demon', name:'Challenger Demon', brand:'Dodge',
    emoji:'😈', color:0x220022,
    rarity:'epic', tier:3, price:1800,
    stats:{topSpeed:330, acceleration:98, handling:68, braking:82, weight:92},
    description:'840hp. The fastest production muscle ever made.',
    bodyColor:'#220022', accentColor:'#ff00ff',
    widthR:1.02, heightR:0.44, lengthR:2.15,
  },
  porsche: {
    id:'porsche', name:'911 Turbo S', brand:'Porsche',
    emoji:'🇩🇪', color:0xffffff,
    rarity:'epic', tier:3, price:2500,
    stats:{topSpeed:320, acceleration:90, handling:92, braking:94, weight:70},
    description:'Precision engineering from Stuttgart. Perfect all-rounder.',
    bodyColor:'#ffffff', accentColor:'#ff0000',
    widthR:0.90, heightR:0.38, lengthR:1.90,
  },
  huracan: {
    id:'huracan', name:'Huracán EVO', brand:'Lamborghini',
    emoji:'🐂', color:0xffcc00,
    rarity:'legendary', tier:4, price:5000,
    stats:{topSpeed:380, acceleration:95, handling:90, braking:92, weight:65},
    description:'The bull is unleashed. AWD Italian fury.',
    bodyColor:'#ffcc00', accentColor:'#000000',
    widthR:0.96, heightR:0.36, lengthR:1.98,
  },
  ferrari: {
    id:'ferrari', name:'Ferrari 488', brand:'Ferrari',
    emoji:'🐴', color:0xdd0000,
    rarity:'legendary', tier:4, price:7000,
    stats:{topSpeed:390, acceleration:94, handling:93, braking:95, weight:62},
    description:'The prancing horse at full gallop. Mid-engine perfection.',
    bodyColor:'#dd0000', accentColor:'#ffff00',
    widthR:0.94, heightR:0.36, lengthR:1.96,
  },
  mclaren: {
    id:'mclaren', name:'McLaren 720S', brand:'McLaren',
    emoji:'🦋', color:0xff6600,
    rarity:'legendary', tier:4, price:9000,
    stats:{topSpeed:400, acceleration:96, handling:94, braking:96, weight:58},
    description:'Carbon fibre butterfly. Aerodynamic masterpiece.',
    bodyColor:'#ff6600', accentColor:'#000000',
    widthR:0.93, heightR:0.34, lengthR:1.94,
  },
  chiron: {
    id:'chiron', name:'Bugatti Chiron', brand:'Bugatti',
    emoji:'💎', color:0x003366,
    rarity:'mythic', tier:5, price:15000,
    stats:{topSpeed:490, acceleration:99, handling:88, braking:95, weight:80},
    description:'Quad-turbo 8L W16. 1500hp. Physics-defying.',
    bodyColor:'#003366', accentColor:'#aaaaaa',
    widthR:1.0, heightR:0.38, lengthR:2.10,
  },
  jesko: {
    id:'jesko', name:'Koenigsegg Jesko', brand:'Koenigsegg',
    emoji:'👑', color:0x111111,
    rarity:'mythic', tier:5, price:20000,
    stats:{topSpeed:480, acceleration:99, handling:96, braking:97, weight:55},
    description:'300mph capable. Active aero. Swedish perfection.',
    bodyColor:'#111111', accentColor:'#ffaa00',
    widthR:0.94, heightR:0.34, lengthR:1.98,
  },
  vortexX1: {
    id:'vortexX1', name:'Vortex X1', brand:'Vortex',
    emoji:'⚡', color:0x00ffff,
    rarity:'mythic', tier:5, price:50000,
    stats:{topSpeed:520, acceleration:100, handling:99, braking:99, weight:45},
    description:'SECRET. The forbidden machine. Built in another dimension.',
    bodyColor:'#00ffff', accentColor:'#ff00ff',
    widthR:0.92, heightR:0.32, lengthR:1.92,
  },
};

const TRACKS = [
  {id:'city',      name:'City Sprint',       emoji:'🌆', laps:3, unlockLevel:1,
   env:{sky:0x1a1a2e, road:'#2a2a3e', grass:'#1a301a', wall:'#445566', fog:0x1a1a2e, fogNear:80, fogFar:300, ambient:0x112244, sun:0x4466aa},
   special:null},
  {id:'desert',    name:'Desert Dash',        emoji:'🏜️', laps:3, unlockLevel:1,
   env:{sky:0x8b6914, road:'#5a4520', grass:'#9a7030', wall:'#806540', fog:0xddaa55, fogNear:100, fogFar:400, ambient:0x886633, sun:0xffdd88},
   special:null},
  {id:'coastal',   name:'Coastal Highway',    emoji:'🌊', laps:3, unlockLevel:2,
   env:{sky:0x102030, road:'#283848', grass:'#1a3040', wall:'#356880', fog:0x102030, fogNear:80, fogFar:350, ambient:0x224466, sun:0x88aacc},
   special:null},
  {id:'mountain',  name:'Mountain Run',       emoji:'⛰️', laps:3, unlockLevel:2,
   env:{sky:0x202020, road:'#3a3a3a', grass:'#2a3a2a', wall:'#555', fog:0x444, fogNear:60, fogFar:280, ambient:0x334433, sun:0x888888},
   special:null},
  {id:'neon',      name:'Neon City Nights',   emoji:'🌃', laps:3, unlockLevel:3,
   env:{sky:0x05050f, road:'#0d0d1a', grass:'#0a0a18', wall:'#330066', fog:0x05050f, fogNear:50, fogFar:220, ambient:0x220044, sun:0x8800ff},
   special:'neon'},
  {id:'industrial',name:'Industrial Rush',    emoji:'🏭', laps:3, unlockLevel:3,
   env:{sky:0x111111, road:'#333', grass:'#2a2a22', wall:'#444', fog:0x111, fogNear:70, fogFar:300, ambient:0x333322, sun:0x888866},
   special:null},
  {id:'frozen',    name:'Frozen Circuit',     emoji:'❄️', laps:3, unlockLevel:4,
   env:{sky:0xd0e8f8, road:'#c0d8ee', grass:'#a0c8e0', wall:'#8aaabb', fog:0xd0e8f8, fogNear:80, fogFar:350, ambient:0x88aabb, sun:0xffffff},
   special:'ice'},
  {id:'volcano',   name:'Volcano Pass',       emoji:'🌋', laps:3, unlockLevel:5,
   env:{sky:0x150a0a, road:'#2a1818', grass:'#3a1a10', wall:'#774422', fog:0x150a0a, fogNear:50, fogFar:250, ambient:0x442211, sun:0xff4400},
   special:'heat'},
  {id:'skyway',    name:'Skyway Raceway',     emoji:'☁️', laps:3, unlockLevel:6,
   env:{sky:0x8ab4e0, road:'#2038f0', grass:'#c0d8f8', wall:'#4466ff', fog:0x8ab4e0, fogNear:100, fogFar:450, ambient:0x6688aa, sun:0xffffff},
   special:null},
  {id:'vortex',    name:'Vortex Core',        emoji:'⚡', laps:3, unlockLevel:7,
   env:{sky:0x000008, road:'#050a14', grass:'#030810', wall:'#003366', fog:0x000008, fogNear:40, fogFar:200, ambient:0x001133, sun:0x0044ff},
   special:'vortex'},
  {id:'sandstorm', name:'Sandstorm Valley',   emoji:'🌪️', laps:3, unlockLevel:7,
   env:{sky:0xc8a060, road:'#8a6a30', grass:'#a08040', wall:'#907050', fog:0xc8a060, fogNear:20, fogFar:120, ambient:0x886644, sun:0xddaa44},
   special:'sandstorm'},
  {id:'ice',       name:'Ice Kingdom',        emoji:'🧊', laps:3, unlockLevel:8,
   env:{sky:0xaaddff, road:'#88ccee', grass:'#aaddff', wall:'#66aabb', fog:0xaaddff, fogNear:80, fogFar:380, ambient:0x88bbcc, sun:0xffffff},
   special:'blizzard'},
  {id:'thunder',   name:'Thunder Circuit',    emoji:'⚡🌩️', laps:3, unlockLevel:8,
   env:{sky:0x111122, road:'#222233', grass:'#111122', wall:'#334455', fog:0x111122, fogNear:50, fogFar:250, ambient:0x112233, sun:0x4455ff},
   special:'thunder'},
  {id:'tokyo',     name:'Cyber Tokyo',        emoji:'🗼', laps:3, unlockLevel:9,
   env:{sky:0x05051a, road:'#0a0a20', grass:'#080818', wall:'#003366', fog:0x05051a, fogNear:40, fogFar:200, ambient:0x110033, sun:0xff00ff},
   special:'cyber'},
  {id:'space',     name:'Space Highway',      emoji:'🌌', laps:3, unlockLevel:10,
   env:{sky:0x000000, road:'#111122', grass:'#000011', wall:'#222244', fog:0x000000, fogNear:60, fogFar:300, ambient:0x112244, sun:0x4466ff},
   special:'space'},
];

const UPGRADES = [
  {key:'engine',    name:'ENGINE',      desc:'Top Speed +12',    cost:50,  apply:s=>{s.topSpeed+=12;},        maxLevel:5},
  {key:'turbo',     name:'TURBO',       desc:'Acceleration +10', cost:60,  apply:s=>{s.acceleration+=10;},    maxLevel:5},
  {key:'brakes',    name:'BRAKES',      desc:'Braking +10',      cost:40,  apply:s=>{s.braking+=10;},         maxLevel:5},
  {key:'suspension',name:'SUSPENSION',  desc:'Handling +10',     cost:45,  apply:s=>{s.handling+=10;},        maxLevel:5},
  {key:'transmission',name:'TRANSMISSION',desc:'Acceleration +8',cost:55,  apply:s=>{s.acceleration+=8;},     maxLevel:5},
  {key:'weight',    name:'WT. REDUCTION',desc:'Speed +6, Accel+6',cost:65,  apply:s=>{s.topSpeed+=6;s.acceleration+=6;},maxLevel:5},
  {key:'ecu',       name:'ECU TUNE',    desc:'Horsepower +15',   cost:80,  apply:s=>{s.topSpeed+=8;s.acceleration+=7;},maxLevel:5},
  {key:'twinturbo', name:'TWIN TURBO',  desc:'Massive Speed +20',cost:120, apply:s=>{s.topSpeed+=20;s.acceleration+=5;},maxLevel:3},
];

const CHAMPIONSHIPS = [
  {id:'bronze', name:'Bronze Cup',       icon:'🥉', races:5,  reqLevel:1,  reward:{vc:500,  xp:200}},
  {id:'silver', name:'Silver Cup',       icon:'🥈', races:7,  reqLevel:3,  reward:{vc:1000, xp:400}},
  {id:'gold',   name:'Gold Cup',         icon:'🥇', races:10, reqLevel:5,  reward:{vc:2500, xp:800}},
  {id:'vortex', name:'Vortex Championship',icon:'🏆',races:15, reqLevel:8,  reward:{vc:8000, xp:2000, car:'vortexX1'}},
];

const BOSS_RACERS = [
  {level:2,  name:'Street Rookie',  emoji:'😤', aiTop:3.5, aiAcc:.018, reward:{vc:200, xp:50}},
  {level:4,  name:'Desert King',    emoji:'🤠', aiTop:4.2, aiAcc:.022, reward:{vc:400, xp:100}},
  {level:6,  name:'Night Phantom',  emoji:'👻', aiTop:4.8, aiAcc:.026, reward:{vc:700, xp:180}},
  {level:8,  name:'Vortex Hunter',  emoji:'🎯', aiTop:5.5, aiAcc:.032, reward:{vc:1200,xp:300}},
  {level:10, name:'Vortex Champion',emoji:'👑', aiTop:6.2, aiAcc:.040, reward:{vc:3000,xp:600, car:'vortexX1'}},
];

const DAILY_REWARDS = [
  {day:1, vc:100,  label:'100 Vort Coins'},
  {day:2, vc:200,  label:'200 Vort Coins'},
  {day:3, vc:300,  label:'300 Vort Coins'},
  {day:4, vc:500,  label:'500 Vort Coins + Nitro Upgrade'},
  {day:5, vc:750,  label:'750 Vort Coins'},
  {day:6, vc:1000, label:'1,000 Vort Coins'},
  {day:7, vc:2000, label:'2,000 VC + Mystery Car', specialCar:true},
];

const DIFFS = {
  easy:       {vc:10,  xp:15,  aiTop:2.2, aiAcc:.012, label:'EASY',       color:'#00ff88'},
  normal:     {vc:20,  xp:30,  aiTop:3.2, aiAcc:.016, label:'NORMAL',     color:'#00d4ff'},
  hard:       {vc:40,  xp:60,  aiTop:4.2, aiAcc:.022, label:'HARD',       color:'#ff9900'},
  impossible: {vc:100, xp:150, aiTop:5.5, aiAcc:.032, label:'IMPOSSIBLE', color:'#ff3c3c'},
};

const XP_TABLE = [0,100,250,450,700,1000,1400,1900,2500,3200,5000,9e7];

const NITRO_TYPES = {
  blue:   {name:'BLUE',   color:'#00d4ff', boost:0.015, duration:3},
  purple: {name:'PURPLE', color:'#aa44ff', boost:0.025, duration:4},
  gold:   {name:'GOLD',   color:'#ffd700', boost:0.045, duration:5},
};

const AI_NAMES = ['Shadow','Blaze','Viper','Storm','Phantom','Razor','Ghost','Thunder'];
const AI_COLORS = [0xff3c3c, 0xff9900, 0xcc44ff, 0x00ff88, 0xff44aa, 0x44aaff];
