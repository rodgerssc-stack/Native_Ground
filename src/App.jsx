import { useState } from "react";

// ── BETA PASSWORD ─────────────────────────────────────────────────────────────
const BETA_PASSWORD = "NativeGround2024";

const GATE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  .gate-wrap{min-height:100vh;background:linear-gradient(160deg,#141f10,#1c2e18,#243a1c);display:flex;align-items:center;justify-content:center;padding:20px;font-family:'DM Sans',sans-serif}
  .gate-box{background:#f4f0e4;border-radius:4px;padding:48px 40px 40px;max-width:420px;width:100%;box-shadow:0 32px 80px rgba(0,0,0,.5);text-align:center}
  .gate-icon{font-size:52px;margin-bottom:16px}
  .gate-title{font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:700;color:#1a1e14;margin-bottom:4px;letter-spacing:-.5px}
  .gate-title span{color:#5a8c3a}
  .gate-sub{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:15px;color:#7a7260;margin-bottom:8px}
  .gate-divider{width:40px;height:2px;background:linear-gradient(90deg,#5a8c3a,#8a6e1a);margin:16px auto 28px}
  .gate-label{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#7a7260;margin-bottom:8px;text-align:left}
  .gate-input{width:100%;border:1.5px solid #ddd6c0;border-radius:3px;padding:13px 14px;font-family:'DM Sans',sans-serif;font-size:14px;color:#1a1e14;outline:none;margin-bottom:14px;background:white;transition:border-color .2s;letter-spacing:1px}
  .gate-input:focus{border-color:#5a8c3a}
  .gate-btn{width:100%;background:#2a4a1e;color:#c8ddb8;border:none;border-radius:3px;padding:14px;font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;transition:background .2s;margin-bottom:16px}
  .gate-btn:hover{background:#3a6a2e}
  .gate-error{color:#b03020;font-size:12px;margin-bottom:10px;padding:8px;background:#fff0ee;border-radius:2px;border:1px solid #f0c0b8}
  .gate-note{font-size:11px;color:#a09070;line-height:1.7}
`;

function BetaGate({ onUnlock }) {
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function tryUnlock() {
    if (pwd === BETA_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setPwd("");
      setTimeout(() => { setError(false); setShake(false); }, 2500);
    }
  }

  return (
    <div>
      <style>{GATE_CSS}</style>
      <div className="gate-wrap">
        <div className="gate-box">
          <div className="gate-icon">🌿</div>
          <div className="gate-title">Native <span>Ground</span></div>
          <div className="gate-sub">Discover · Identify · Restore</div>
          <div className="gate-divider"/>
          <div className="gate-label">Beta Access Code</div>
          <input
            className="gate-input"
            type="password"
            placeholder="Enter access code"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            onKeyDown={e => e.key === "Enter" && tryUnlock()}
            autoFocus
          />
          {error && <div className="gate-error">Incorrect code — please check and try again</div>}
          <button className="gate-btn" onClick={tryUnlock}>
            Enter Native Ground
          </button>
          <div className="gate-note">
            Private beta — by invitation only.<br/>
            Contact the Native Ground team for access.
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CONSTANTS ─────────────────────────────────────────────────────────────────

const STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming"
];

const PLANT_CATEGORIES = [
  { id:"all",       label:"All Plants",        icon:"🌿", color:"#4a6741" },
  { id:"wildflower",label:"Wildflowers",        icon:"✿",  color:"#c0692a" },
  { id:"tree",      label:"Trees & Shrubs",     icon:"🌲", color:"#2d6b3a" },
  { id:"fern",      label:"Ferns & Mosses",     icon:"🌿", color:"#3a7a55" },
  { id:"grass",     label:"Grasses & Sedges",   icon:"⌇",  color:"#7a6830" },
  { id:"mushroom",  label:"Mushrooms & Fungi",  icon:"🍄", color:"#8a5a28" },
];

const WILDLIFE_CATEGORIES = [
  { id:"all",       label:"All Wildlife",       icon:"🌎", color:"#4a6741" },
  { id:"mammal",    label:"Mammals",            icon:"🦌", color:"#7a4a28" },
  { id:"bird",      label:"Birds",              icon:"🐦", color:"#2a5a8a" },
  { id:"fish",      label:"Fish",               icon:"🐟", color:"#2a6a7a" },
  { id:"reptile",   label:"Reptiles",           icon:"🦎", color:"#5a7a28" },
  { id:"amphibian", label:"Amphibians",         icon:"🐸", color:"#3a7a3a" },
  { id:"insect",    label:"Insects & Inverts",  icon:"🦋", color:"#7a3a6a" },
];

const INVASIVE_CATEGORIES = [
  { id:"all",       label:"All Invasive",       icon:"⚠️", color:"#b03020" },
  { id:"plant",     label:"Invasive Plants",    icon:"🌱", color:"#8a4a10" },
  { id:"animal",    label:"Invasive Animals",   icon:"🐍", color:"#6a3a20" },
  { id:"insect",    label:"Invasive Insects",   icon:"🪲", color:"#7a3a10" },
  { id:"aquatic",   label:"Aquatic Invasives",  icon:"🐠", color:"#2a5a7a" },
];

const HABITATS = [
  "Any Habitat","Forest","Wetland","Prairie / Grassland","Desert",
  "Mountain / Alpine","Coastal","Riparian (Stream/River)","Lake / Pond","Tundra"
];

const SEASONS = ["Any Season","Spring","Summer","Fall","Winter"];

const PROPERTY_TYPES = [
  { id:"backyard",  label:"Backyard / Residential", icon:"🏡", desc:"Urban or suburban yards, gardens, patios" },
  { id:"farm",      label:"Farm / Agricultural",    icon:"🌾", desc:"Cropland, pasture, hedgerows, field edges" },
  { id:"woodland",  label:"Woodland / Forest",      icon:"🌳", desc:"Private woodlots, forest edges, understory" },
  { id:"wetland",   label:"Wetland / Riparian",     icon:"💧", desc:"Pond edges, stream banks, marshes, bogs" },
  { id:"prairie",   label:"Prairie / Grassland",    icon:"🌾", desc:"Open fields, meadows, restored prairie" },
  { id:"coastal",   label:"Coastal / Shoreline",    icon:"🌊", desc:"Beach, dune, estuary, tidal marsh" },
];

const PROPERTY_SIZES = [
  "Under ¼ acre","¼ – 1 acre","1 – 5 acres","5 – 20 acres","20 – 100 acres","100+ acres"
];

const TABS = ["Native","Invasive","Wildlife","AI Identifier","About"];

const AI_ID_MODES = [
  { id:"photo", label:"Photo ID", icon:"📷", desc:"Upload or take a photo" },
  { id:"text",  label:"Describe It", icon:"✏️",  desc:"Describe what you saw" },
];

const NATIVE_FEATURED = [
  { state:"Pennsylvania", category:"wildflower", label:"PA Wildflowers" },
  { state:"Texas",        category:"tree",       label:"Texas Trees" },
  { state:"Oregon",       category:"fern",       label:"Oregon Ferns" },
  { state:"California",   category:"mushroom",   label:"California Fungi" },
  { state:"Florida",      category:"wildflower", label:"Florida Wildflowers" },
  { state:"Montana",      category:"grass",      label:"Montana Grasses" },
];

const WILDLIFE_FEATURED = [
  { state:"California", category:"bird",      label:"California Birds" },
  { state:"Florida",    category:"reptile",   label:"Florida Reptiles" },
  { state:"Montana",    category:"mammal",    label:"Montana Mammals" },
  { state:"Alaska",     category:"fish",      label:"Alaska Fish" },
  { state:"Minnesota",  category:"amphibian", label:"Minnesota Amphibians" },
  { state:"Texas",      category:"insect",    label:"Texas Insects" },
];

const INVASIVE_FEATURED = [
  { state:"Florida",      category:"animal",  label:"Florida Invasives" },
  { state:"Great Lakes",  category:"aquatic", label:"Great Lakes Invaders" },
  { state:"Southeast",    category:"plant",   label:"Southeast Invasive Plants" },
  { state:"Pennsylvania", category:"all",     label:"PA Invasive Species" },
  { state:"California",   category:"plant",   label:"California Invasive Plants" },
  { state:"Northeast",    category:"insect",  label:"Northeast Invasive Insects" },
];

const EXAMPLE_QUERIES = [
  "Large brown bird soaring on thermals, white head and tail, near a river in Montana",
  "Small orange and black butterfly on milkweed in an Illinois meadow in August",
  "Bright red wildflower spike along a Florida wetland edge in summer",
  "Tan mushroom with white gills growing on a dead oak log in Pennsylvania",
  "Striped black and tan mammal, size of a housecat, digging in an Ohio backyard",
];

// ── MONETIZATION ─────────────────────────────────────────────────────────────

const PRO_PRICE_MONTHLY = 2.99;
const PRO_PRICE_YEARLY  = 20;
const FREE_AI_LIMIT     = 3; // free identifications per session

const PRO_FEATURES = [
  { icon:"♾️", text:"Unlimited AI identifications" },
  { icon:"📷", text:"Unlimited photo identifications" },
  { icon:"🌿", text:"Unlimited habitat plans" },
  { icon:"🚫", text:"Completely ad-free experience" },
  { icon:"⚡", text:"Priority AI response speed" },
  { icon:"📥", text:"Download & save habitat plans" },
];

// ── CSS VAR HELPERS (used in inline styles inside JSX) ───────────────────────
const var_advisor_light = "var(--advisor-light)";
const var_stone = "var(--stone)";

// ── STYLES ────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --ink:#1a1e14;--paper:#f4f0e4;--cream:#ebe4cf;
  --moss:#2a4a1e;--fern:#4a7c38;--gold:#8a6e1a;
  --earth:#6b4c2a;--sage:#7a9c68;--clay:#c4784a;
  --mist:#ddd6c0;--stone:#7a7260;--white:#fff;
  --advisor:#1a3828;--advisor-light:#e4f0e8;
  --ng-dark:#1c2e18;--ng-mid:#243a1c;--ng-accent:#5a8c3a;
}
body{background:var(--paper);font-family:'DM Sans',sans-serif;color:var(--ink);min-height:100vh}

/* HEADER */
.hdr{background:linear-gradient(160deg,#141f10 0%,#1c2e18 45%,#243a1c 80%,#1e3018 100%);color:#e4dcc4;padding:0;position:relative;overflow:hidden}
.hdr-grain{position:absolute;inset:0;opacity:.05;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");pointer-events:none}
.hdr-roots{position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,#5a8c3a 20%,#8a6e1a 50%,#5a8c3a 80%,transparent);opacity:.6}
.hdr-inner{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;padding:22px 40px 20px}
.hdr-left{display:flex;flex-direction:column}
.hdr-brand{display:flex;flex-direction:column}
.hdr-eyebrow{font-size:9px;letter-spacing:4px;text-transform:uppercase;color:#7aaa5a;margin-bottom:3px;font-weight:500}
.hdr-title{font-family:'Cormorant Garamond',serif;font-size:clamp(26px,5vw,46px);font-weight:700;line-height:1.0;color:#f0e8d0;letter-spacing:-.5px}
.hdr-title span{color:#8ac870}
.hdr-sub{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:13px;color:#6a9a50;margin-top:3px}
.hdr-right{display:flex;flex-direction:column;align-items:flex-end;gap:10px}
.hdr-stats{display:flex;gap:20px;flex-wrap:wrap}
.hdr-stat-num{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:#b8d8a0;line-height:1}
.hdr-stat-lbl{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#6a9a50;margin-top:2px}

/* TABS */
.tabs{background:#162412;display:flex;padding:0 40px;border-bottom:1px solid rgba(90,140,58,.2);overflow-x:auto}
.tab-btn{background:none;border:none;padding:13px 20px;font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(184,216,160,.4);cursor:pointer;border-bottom:2px solid transparent;transition:all .2s;white-space:nowrap;flex-shrink:0}
.tab-btn.active{color:#b8d8a0;border-bottom-color:#5a8c3a}
.tab-btn:hover:not(.active){color:rgba(184,216,160,.75)}

/* CONTROLS */
.controls{background:var(--cream);padding:14px 40px;display:flex;gap:10px;flex-wrap:wrap;align-items:center;border-bottom:1px solid var(--mist)}
.search-wrap{position:relative;flex:1;min-width:180px}
.s-ico{position:absolute;left:11px;top:50%;transform:translateY(-50%);color:var(--stone);font-size:13px;pointer-events:none}
.srch{width:100%;background:white;border:1px solid #ccc5b0;border-radius:3px;padding:9px 12px 9px 32px;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--ink);outline:none;transition:border-color .2s}
.srch:focus{border-color:#7faa6e}
.fsel{background:white;border:1px solid #ccc5b0;border-radius:3px;padding:9px 26px 9px 11px;font-family:'DM Sans',sans-serif;font-size:12px;color:var(--ink);outline:none;cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%237a7060'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 8px center}
.go-btn{background:var(--moss);color:#c8ddb8;border:none;border-radius:3px;padding:9px 18px;font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;white-space:nowrap;transition:background .2s}
.go-btn:hover:not(:disabled){background:#3d7a33}
.go-btn:disabled{opacity:.4;cursor:not-allowed}

/* CATEGORY PILLS */
.cat-strip{padding:12px 40px;background:var(--paper);border-bottom:1px solid var(--mist);display:flex;gap:7px;flex-wrap:wrap}
.cat-pill{display:flex;align-items:center;gap:4px;padding:5px 12px;border-radius:20px;font-size:11px;font-weight:500;cursor:pointer;border:1.5px solid transparent;transition:all .15s;white-space:nowrap}
.cat-pill.active{color:white}
.cat-pill:not(.active){background:white;border-color:#d4ccbc;color:var(--stone)}
.cat-pill:not(.active):hover{border-color:#9ab882}

/* FEATURED */
.featured{padding:18px 40px 8px}
.section-label{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:var(--stone);margin-bottom:10px}
.feat-chips{display:flex;gap:7px;flex-wrap:wrap}
.feat-chip{background:white;border:1px solid #d4ccbc;border-radius:3px;padding:6px 12px;font-size:12px;cursor:pointer;color:var(--ink);transition:all .15s}
.feat-chip:hover{border-color:#7faa6e;background:var(--cream)}

/* RESULTS */
.results-meta{padding:12px 40px 0;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px}
.results-count{font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--stone)}
.load-more-btn{background:none;border:1px solid #ccc5b0;border-radius:3px;padding:6px 16px;font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--stone);cursor:pointer;transition:border-color .15s}
.load-more-btn:hover{border-color:#7faa6e;color:var(--ink)}

/* GRID */
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(265px,1fr));gap:16px;padding:14px 40px 40px}
.card{background:white;border-radius:2px;overflow:hidden;cursor:pointer;transition:transform .2s,box-shadow .2s;box-shadow:0 1px 4px rgba(0,0,0,.07);border:1px solid rgba(0,0,0,.05)}
.card:hover{transform:translateY(-4px);box-shadow:0 12px 30px rgba(0,0,0,.13)}
.card-img-wrap{position:relative;height:158px;background:var(--cream);overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:52px}
.card-bar{height:4px}
.card-body{padding:13px 15px 9px}
.cpill{display:inline-flex;align-items:center;gap:4px;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;font-weight:600;padding:2px 7px;border-radius:2px;margin-bottom:8px;background:var(--cream);color:var(--stone)}
.card-name{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;line-height:1.2;color:var(--ink);margin-bottom:2px}
.card-latin{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:11px;color:var(--stone);margin-bottom:7px}
.card-desc{font-size:12px;color:#5a5040;line-height:1.6;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.card-foot{display:flex;gap:5px;padding:8px 15px 11px;border-top:1px solid var(--mist);flex-wrap:wrap}
.tag{font-size:10px;padding:2px 7px;border-radius:2px;background:var(--cream);color:#6a5f4a;white-space:nowrap}

/* SKELETON */
.sk-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(265px,1fr));gap:16px;padding:14px 40px 40px}
.sk-card{background:white;border-radius:2px;height:270px;border:1px solid rgba(0,0,0,.05);overflow:hidden}
.sk-ph{height:158px;background:linear-gradient(90deg,#ede8d6 25%,#e4dfc8 50%,#ede8d6 75%);background-size:200% 100%;animation:shimmer 1.4s infinite}
.sk-body{padding:13px 15px}
.sk-line{height:9px;border-radius:2px;background:linear-gradient(90deg,#ede8d6 25%,#e4dfc8 50%,#ede8d6 75%);background-size:200% 100%;animation:shimmer 1.4s infinite;margin-bottom:8px}
@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}

/* STATE BOX */
.state-box{grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--stone)}
.state-ico{font-size:44px;margin-bottom:12px}
.state-t{font-family:'Cormorant Garamond',serif;font-size:22px;margin-bottom:8px;color:var(--ink)}
.state-s{font-size:13px;line-height:1.7;max-width:380px;margin:0 auto}

/* MODAL */
.overlay{position:fixed;inset:0;background:rgba(8,14,6,.82);z-index:300;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(4px)}
.modal{background:var(--paper);max-width:860px;width:100%;border-radius:2px;box-shadow:0 48px 120px rgba(0,0,0,.55);height:90vh;overflow:hidden;position:relative;display:flex;flex-direction:column}
.modal-ph{height:240px;display:flex;align-items:center;justify-content:center;font-size:76px;flex-shrink:0}
.modal-close{position:absolute;top:12px;right:12px;background:rgba(0,0,0,.4);backdrop-filter:blur(4px);border:none;cursor:pointer;color:white;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:10;font-size:16px;transition:background .15s}
.modal-close:hover{background:rgba(0,0,0,.7)}
.modal-hdr{padding:18px 28px 0;border-bottom:1px solid var(--mist);flex-shrink:0}
.modal-name{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:700;color:var(--ink);margin-bottom:2px}
.modal-latin{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:16px;color:var(--stone);margin-bottom:12px}
.modal-body{padding:18px 26px 28px}
.modal-desc{font-size:14px;line-height:1.85;color:#3e3428;margin-bottom:20px}
.fact-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:20px}
.fact{background:white;border:1px solid var(--mist);border-radius:2px;padding:11px 13px}
.fact-lbl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--stone);margin-bottom:3px}
.fact-val{font-family:'Cormorant Garamond',serif;font-size:14px;color:var(--ink);line-height:1.35}
.did-you-know{background:#f0f8ec;border:1px solid #c8ddb8;border-radius:2px;padding:12px 14px;margin-bottom:14px}
.cons-badge{display:inline-block;padding:2px 9px;border-radius:2px;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;font-weight:600;margin-bottom:12px}
.c-lc{background:#e8f5e0;color:#2d6b1a}.c-nt{background:#fff8e0;color:#8a6a00}
.c-vu{background:#fff0d0;color:#a05000}.c-en{background:#ffe8d8;color:#b03000}
.c-cr{background:#ffd8d8;color:#b00000}

/* FIELD GUIDE TABS */
.fg-tabs{display:flex;overflow-x:auto;background:white;border-bottom:2px solid var(--mist);padding:0 28px;gap:0;flex-shrink:0}
.fg-tabs::-webkit-scrollbar{height:0}
.fg-tab{padding:13px 18px;font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--stone);cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-2px;white-space:nowrap;transition:all .15s;flex-shrink:0;font-weight:500}
.fg-tab.active{color:var(--moss);border-bottom-color:var(--moss);font-weight:700}
.fg-tab:hover:not(.active){color:var(--ink)}
.fg-body{padding:22px 28px 32px;overflow-y:auto;flex:1}
.fg-section{margin-bottom:22px}
.fg-section-title{font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:600;color:var(--moss);margin-bottom:12px;padding-bottom:6px;border-bottom:1px solid var(--mist);display:flex;align-items:center;gap:7px}
.fg-overview{font-size:15px;line-height:1.9;color:#3e3428}
.fg-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.fg-fact{background:white;border:1px solid var(--mist);border-radius:2px;padding:14px 16px}
.fg-fact.full{grid-column:1/-1}
.fg-fact-lbl{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--stone);margin-bottom:5px}
.fg-fact-val{font-size:14px;color:var(--ink);line-height:1.65}
.fg-highlight{background:#f0f8ec;border:1px solid #c8ddb8;border-radius:2px;padding:14px 16px;margin-top:14px}
.fg-highlight-lbl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--moss);margin-bottom:6px;font-weight:600}
.fg-highlight-val{font-size:13px;color:#2a3820;line-height:1.75}
.fg-tip-list{display:flex;flex-direction:column;gap:0}
.fg-tip{display:flex;gap:10px;padding:9px 0;border-bottom:1px solid var(--mist);font-size:13px;color:#3e3428;line-height:1.65}
.fg-tip:last-child{border-bottom:none}
.fg-tip-dot{width:6px;height:6px;border-radius:50%;background:var(--moss);flex-shrink:0;margin-top:7px}
.fg-state-chips{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}
.fg-state-chip{background:var(--cream);border:1px solid var(--mist);border-radius:2px;padding:3px 8px;font-size:11px;color:var(--ink)}
.fg-cons-row{display:flex;gap:8px;align-items:center;margin-bottom:14px;flex-wrap:wrap}
.fg-trend-up{color:#2d6b1a;background:#e8f5e0;padding:3px 9px;border-radius:2px;font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase}
.fg-trend-down{color:#b03000;background:#ffe8d8;padding:3px 9px;border-radius:2px;font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase}
.fg-trend-stable{color:#8a6a00;background:#fff8e0;padding:3px 9px;border-radius:2px;font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase}
.photo-nav-btn{position:absolute;top:50%;transform:translateY(-50%);background:rgba(0,0,0,.45);border:none;color:white;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;transition:background .15s;backdrop-filter:blur(2px);z-index:5}
.photo-nav-btn:hover{background:rgba(0,0,0,.7)}
.photo-counter-badge{position:absolute;bottom:10px;right:12px;background:rgba(0,0,0,.5);color:white;font-size:10px;padding:3px 9px;border-radius:10px;backdrop-filter:blur(2px)}
.photo-attr-bar{background:#111;color:rgba(255,255,255,.5);font-size:9px;padding:5px 12px;display:flex;justify-content:space-between;align-items:center;min-height:22px}
.photo-attr-bar a{color:rgba(255,255,255,.5);text-decoration:none}
.photo-attr-bar a:hover{color:rgba(255,255,255,.8)}
.photo-thumbs-row{display:flex;gap:4px;padding:6px 12px 8px;background:#111;flex-wrap:wrap}
.photo-thumb-btn{width:48px;height:38px;border-radius:2px;overflow:hidden;cursor:pointer;border:2px solid transparent;transition:border-color .15s;flex-shrink:0}
.photo-thumb-btn.active{border-color:var(--fern)}
.photo-thumb-btn img{width:100%;height:100%;object-fit:cover}

/* HABITAT MODAL SECTION */
.habitat-section{margin-top:20px;border-top:2px solid var(--mist);padding-top:18px}
.habitat-section-title{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:600;color:var(--advisor);margin-bottom:4px;display:flex;align-items:center;gap:7px}
.habitat-section-sub{font-size:11px;color:var(--stone);margin-bottom:12px}
.habitat-quick-btns{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:14px}
.hq-btn{font-size:11px;padding:5px 11px;background:var(--advisor-light);border:1px solid #b8dcd4;border-radius:2px;cursor:pointer;color:var(--advisor);transition:all .15s;font-weight:500}
.hq-btn:hover{background:#d4eee8;border-color:#7fbfb0}
.hq-btn.active{background:var(--advisor);color:#c8eee8;border-color:var(--advisor)}
.habitat-result{background:white;border:1px solid #b8dcd4;border-radius:3px;padding:18px;font-size:13px;line-height:1.85;color:#2a3830;margin-top:10px}
.hab-heading{font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:600;color:var(--advisor);margin:12px 0 5px}
.hab-heading:first-child{margin-top:0}

/* ══ HABITAT ADVISOR TAB ══ */
.advisor-wrap{padding:0}
.advisor-hero{background:linear-gradient(135deg,#1a3a4a 0%,#1e4a38 100%);padding:28px 40px 24px;color:#e0f0ea}
.advisor-hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(22px,4vw,36px);font-weight:700;color:#e8f8f0;margin-bottom:4px}
.advisor-hero-sub{font-size:13px;color:#7fc8a8;font-style:italic;font-family:'Cormorant Garamond',serif;margin-bottom:0}
.advisor-form{padding:24px 40px;background:var(--cream);border-bottom:1px solid var(--mist)}
.advisor-form-title{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:var(--stone);margin-bottom:14px}
.advisor-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-bottom:16px}
.advisor-field{display:flex;flex-direction:column;gap:4px}
.advisor-label{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--stone)}
.advisor-input{background:white;border:1px solid #ccc5b0;border-radius:3px;padding:9px 11px;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--ink);outline:none;transition:border-color .2s}
.advisor-input:focus{border-color:#7fbfb0}
.advisor-fsel{background:white;border:1px solid #ccc5b0;border-radius:3px;padding:9px 26px 9px 11px;font-family:'DM Sans',sans-serif;font-size:12px;color:var(--ink);outline:none;cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%237a7060'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 8px center;width:100%}
.property-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(155px,1fr));gap:8px;margin-bottom:16px}
.prop-card{background:white;border:2px solid #d4ccbc;border-radius:3px;padding:11px 13px;cursor:pointer;transition:all .15s}
.prop-card:hover{border-color:#7fbfb0;background:#f0faf6}
.prop-card.active{border-color:var(--advisor);background:var(--advisor-light)}
.prop-card-icon{font-size:22px;margin-bottom:5px}
.prop-card-label{font-size:12px;font-weight:500;color:var(--ink);margin-bottom:2px}
.prop-card-desc{font-size:10px;color:var(--stone);line-height:1.4}
.advisor-btn{background:var(--advisor);color:#c8eee8;border:none;border-radius:2px;padding:11px 26px;font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:background .2s}
.advisor-btn:hover:not(:disabled){background:#265a6a}
.advisor-btn:disabled{opacity:.4;cursor:not-allowed}
.advisor-examples{padding:16px 40px 0}
.advisor-result{padding:24px 40px 40px}
.plan-header{background:linear-gradient(135deg,#1a3a4a,#1e4a38);border-radius:3px;padding:20px 24px;margin-bottom:20px;color:#e0f0ea}
.plan-header-title{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:#e8f8f0;margin-bottom:4px}
.plan-header-meta{font-size:12px;color:#7fc8a8;display:flex;gap:16px;flex-wrap:wrap}
.plan-sections{display:flex;flex-direction:column;gap:14px}
.plan-section{background:white;border:1px solid var(--mist);border-radius:3px;overflow:hidden}
.plan-section-hdr{padding:13px 18px;border-bottom:1px solid var(--mist);display:flex;align-items:center;gap:9px;cursor:pointer;user-select:none}
.plan-section-hdr:hover{background:var(--cream)}
.plan-section-icon{font-size:18px}
.plan-section-title{font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:600;color:var(--ink);flex:1}
.plan-section-toggle{color:var(--stone);font-size:12px}
.plan-section-body{padding:14px 18px 18px;font-size:13px;line-height:1.85;color:#3a3020}
.plan-section-body.collapsed{display:none}
.action-item{display:flex;gap:10px;padding:8px 0;border-bottom:1px solid #f0ebe0}
.action-item:last-child{border-bottom:none}
.action-dot{width:8px;height:8px;border-radius:50%;background:var(--advisor);flex-shrink:0;margin-top:6px}
.action-text{font-size:13px;line-height:1.7;color:#3a3020}
.season-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:4px}
.season-card{background:var(--cream);border-radius:2px;padding:10px 13px}
.season-name{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--stone);margin-bottom:5px}
.season-actions{font-size:12px;color:#3a3020;line-height:1.65}
.cert-chips{display:flex;flex-wrap:wrap;gap:7px;margin-top:6px}
.cert-chip{background:var(--advisor-light);border:1px solid #b8dcd4;border-radius:2px;padding:4px 10px;font-size:11px;color:var(--advisor)}

/* AI TAB */
.ai-wrap{padding:26px 40px;max-width:740px}
.ai-title{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:700;margin-bottom:5px}
.ai-sub{font-size:13px;color:var(--stone);margin-bottom:20px;line-height:1.7}

/* Mode toggle */
.ai-mode-toggle{display:flex;gap:0;margin-bottom:20px;border:1.5px solid #ccc5b0;border-radius:4px;overflow:hidden;width:fit-content}
.ai-mode-btn{padding:9px 22px;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;cursor:pointer;border:none;background:white;color:var(--stone);transition:all .15s;display:flex;align-items:center;gap:6px}
.ai-mode-btn.active{background:var(--moss);color:#c8ddb8}
.ai-mode-btn:not(.active):hover{background:var(--cream)}

/* Photo drop zone */
.photo-dropzone{border:2px dashed #ccc5b0;border-radius:4px;padding:32px 20px;text-align:center;cursor:pointer;transition:all .2s;background:white;margin-bottom:12px;position:relative}
.photo-dropzone:hover,.photo-dropzone.drag-over{border-color:#7faa6e;background:#f5fbf3}
.photo-dropzone-icon{font-size:36px;margin-bottom:8px}
.photo-dropzone-title{font-size:14px;font-weight:500;color:var(--ink);margin-bottom:4px}
.photo-dropzone-sub{font-size:12px;color:var(--stone)}
.photo-dropzone-actions{display:flex;gap:10px;justify-content:center;margin-top:14px;flex-wrap:wrap}
.photo-action-btn{padding:8px 18px;border-radius:3px;font-family:'DM Sans',sans-serif;font-size:12px;cursor:pointer;display:flex;align-items:center;gap:6px;transition:all .15s}
.photo-action-upload{background:var(--moss);color:#c8ddb8;border:none}
.photo-action-upload:hover{background:#3d7a33}
.photo-action-camera{background:white;color:var(--ink);border:1px solid #ccc5b0}
.photo-action-camera:hover{border-color:#7faa6e;background:var(--cream)}

/* Image preview */
.photo-preview-wrap{position:relative;margin-bottom:12px;border-radius:4px;overflow:hidden;border:1px solid #ccc5b0}
.photo-preview{width:100%;max-height:320px;object-fit:contain;display:block;background:#1a1a1a}
.photo-preview-bar{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--cream);border-top:1px solid #ccc5b0}
.photo-preview-label{font-size:11px;color:var(--stone)}
.photo-clear-btn{background:none;border:1px solid #ccc5b0;border-radius:2px;padding:3px 10px;font-size:11px;cursor:pointer;color:var(--stone);transition:all .15s}
.photo-clear-btn:hover{border-color:#c07060;color:#b03020}
.photo-notes{width:100%;background:white;border:1px solid #ccc5b0;border-radius:3px;padding:10px 12px;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--ink);resize:none;outline:none;line-height:1.5;transition:border-color .2s;margin-bottom:10px;height:60px}
.photo-notes:focus{border-color:#7faa6e}

.ex-label{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--stone);margin-bottom:9px}
.ex-chips{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:18px}
.ex-chip{font-size:11px;padding:5px 10px;background:white;border:1px solid #ccc5b0;border-radius:2px;cursor:pointer;color:#5a5040;transition:border-color .15s;line-height:1.4}
.ex-chip:hover{border-color:#7faa6e}
.ai-textarea{width:100%;min-height:100px;background:white;border:1px solid #ccc5b0;border-radius:3px;padding:13px;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--ink);resize:vertical;outline:none;line-height:1.65;transition:border-color .2s;margin-bottom:10px}
.ai-textarea:focus{border-color:#7faa6e}
.ai-btn{background:var(--moss);color:#c8ddb8;border:none;border-radius:2px;padding:10px 22px;font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:background .2s}
.ai-btn:hover:not(:disabled){background:#3d7a33}
.ai-btn:disabled{opacity:.45;cursor:not-allowed}
.ai-result{background:white;border:1px solid #ccc5b0;border-radius:3px;padding:22px;font-size:13px;line-height:1.85;color:#3a3020;margin-top:16px}
.ai-result-heading{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:600;color:var(--moss);margin:14px 0 5px}
.ai-result-heading:first-child{margin-top:0}

/* ABOUT */
.about-wrap{padding:28px 40px;max-width:680px}
.about-wrap h2{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:700;margin-bottom:10px}
.about-wrap h3{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:600;margin:18px 0 7px;color:var(--moss)}
.about-wrap p{font-size:13px;line-height:1.8;color:#4a3e2c;margin-bottom:9px}
.about-cats{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px;margin:12px 0}
.about-cat{background:white;border:1px solid var(--mist);border-radius:2px;padding:11px 13px;display:flex;align-items:center;gap:9px}
.about-cat-icon{font-size:20px}
.about-cat-name{font-size:12px;font-weight:500}

/* SPINNER */
.spinner{display:inline-block;width:13px;height:13px;border:2px solid rgba(200,221,184,.3);border-top-color:#c8ddb8;border-radius:50%;animation:spin .7s linear infinite;vertical-align:middle;margin-right:7px}
.spinner-teal{border-color:rgba(127,191,176,.3);border-top-color:#7fbfb0}
@keyframes spin{to{transform:rotate(360deg)}}


/* ── GENERIC AD SLOTS ── */
/* Replace .ad-slot-inner content with your ad network tag (e.g. AdSense) */
.ad-slot{background:white;border:1px solid var(--mist);border-radius:3px;overflow:hidden;position:relative}
.ad-slot-label{font-size:8px;letter-spacing:2px;text-transform:uppercase;color:#b0a898;text-align:center;padding:4px 0 2px;border-bottom:1px solid var(--mist)}
.ad-slot-inner{display:flex;flex-direction:column;align-items:center;justify-content:center;background:#faf8f2;color:#c0b8a8;font-size:11px;letter-spacing:.5px;gap:6px}
.ad-slot-icon{font-size:28px;opacity:.35}
.ad-slot-text{font-size:10px;color:#c0b8a8;letter-spacing:1px;text-transform:uppercase}

/* grid ad — fills one card slot */
.ad-slot-card{height:260px}
.ad-slot-card .ad-slot-inner{height:calc(100% - 22px)}

/* banner ad — full width strip below results */
.ad-slot-banner{margin:0 40px 10px}
.ad-slot-banner .ad-slot-inner{height:90px;flex-direction:row;gap:14px}
.ad-slot-banner .ad-slot-icon{font-size:22px}

/* sidebar/inline — used below AI results */
.ad-slot-inline{margin-top:16px}
.ad-slot-inline .ad-slot-inner{height:80px;flex-direction:row;gap:12px}

@media(max-width:640px){
  .ad-slot-banner{margin-left:18px;margin-right:18px}
  .ad-slot-banner .ad-slot-inner{height:70px}
}

/* ── PHOTO GALLERY (iNaturalist) ── */
.photo-gallery{margin-bottom:0}
.photo-main{position:relative;height:240px;background:#111;border-radius:3px 3px 0 0;overflow:hidden}
.photo-main img{width:100%;height:100%;object-fit:cover;display:block;transition:opacity .3s}
.photo-main-ph{width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;background:var(--cream)}
.photo-main-ph-icon{font-size:52px;opacity:.4}
.photo-main-ph-text{font-size:11px;color:var(--stone);letter-spacing:1px}
.photo-nav{position:absolute;top:50%;transform:translateY(-50%);background:rgba(0,0,0,.45);border:none;color:white;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:background .15s;backdrop-filter:blur(2px)}
.photo-nav:hover{background:rgba(0,0,0,.7)}
.photo-nav-prev{left:10px}
.photo-nav-next{right:10px}
.photo-counter{position:absolute;bottom:8px;right:10px;background:rgba(0,0,0,.5);color:white;font-size:10px;padding:2px 8px;border-radius:10px;backdrop-filter:blur(2px)}
.photo-attr{background:#111;color:rgba(255,255,255,.5);font-size:9px;padding:5px 10px;letter-spacing:.5px;display:flex;justify-content:space-between;align-items:center;border-radius:0 0 3px 3px;min-height:24px}
.photo-attr a{color:rgba(255,255,255,.5);text-decoration:none}
.photo-attr a:hover{color:rgba(255,255,255,.8)}
.photo-thumbs{display:flex;gap:5px;margin-top:6px;flex-wrap:wrap}
.photo-thumb{width:52px;height:40px;border-radius:2px;overflow:hidden;cursor:pointer;border:2px solid transparent;transition:border-color .15s;flex-shrink:0}
.photo-thumb.active{border-color:var(--fern)}
.photo-thumb img{width:100%;height:100%;object-fit:cover}
.inat-credit{font-size:10px;color:var(--stone);margin-top:5px;display:flex;align-items:center;gap:5px}
.inat-credit a{color:var(--fern);text-decoration:none}
.inat-credit a:hover{text-decoration:underline}

/* ── GBIF OCCURRENCE DATA ── */
.gbif-section{margin-top:20px;border-top:2px solid var(--mist);padding-top:16px}
.gbif-title{font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:600;color:var(--ink);margin-bottom:12px;display:flex;align-items:center;gap:7px}
.gbif-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px}
.gbif-stat{background:var(--cream);border-radius:2px;padding:10px 12px;text-align:center}
.gbif-stat-num{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:var(--moss);line-height:1}
.gbif-stat-lbl{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:var(--stone);margin-top:3px}
.gbif-top-states{margin-bottom:14px}
.gbif-sub-label{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--stone);margin-bottom:8px}
.state-bars{display:flex;flex-direction:column;gap:5px}
.state-bar-row{display:flex;align-items:center;gap:8px}
.state-bar-name{font-size:11px;color:var(--ink);width:110px;flex-shrink:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.state-bar-track{flex:1;height:8px;background:var(--mist);border-radius:4px;overflow:hidden}
.state-bar-fill{height:100%;background:var(--fern);border-radius:4px;transition:width .4s}
.state-bar-count{font-size:10px;color:var(--stone);width:45px;text-align:right;flex-shrink:0}
.gbif-recent{margin-top:14px}
.recent-sighting{display:flex;align-items:flex-start;gap:10px;padding:7px 0;border-bottom:1px solid var(--mist)}
.recent-sighting:last-child{border-bottom:none}
.recent-dot{width:7px;height:7px;border-radius:50%;background:var(--fern);flex-shrink:0;margin-top:5px}
.recent-body{flex:1}
.recent-place{font-size:12px;color:var(--ink);font-weight:500}
.recent-meta{font-size:10px;color:var(--stone);margin-top:1px}
.recent-meta a{color:var(--fern);text-decoration:none}
.recent-meta a:hover{text-decoration:underline}
.gbif-footer{font-size:10px;color:var(--stone);margin-top:10px}
.gbif-footer a{color:var(--fern);text-decoration:none}
.gbif-footer a:hover{text-decoration:underline}

/* ── PRO BADGE in header ── */
.pro-badge{display:inline-flex;align-items:center;gap:5px;background:linear-gradient(135deg,#7a6010,#a08820);color:#f8f0d0;border-radius:3px;padding:3px 10px;font-size:10px;font-weight:700;letter-spacing:1px;cursor:pointer;transition:opacity .15s}
.pro-badge:hover{opacity:.9}
.free-badge{display:inline-flex;align-items:center;gap:5px;background:rgba(90,140,58,.15);border:1px solid rgba(90,140,58,.3);color:#b8d8a0;border-radius:3px;padding:3px 10px;font-size:10px;font-weight:600;letter-spacing:.5px;cursor:pointer;transition:all .15s}
.free-badge:hover{background:rgba(90,140,58,.25)}

/* ── UPGRADE MODAL ── */
.upgrade-overlay{position:fixed;inset:0;background:rgba(5,10,5,.88);z-index:500;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(6px)}
.upgrade-modal{background:var(--paper);max-width:520px;width:100%;border-radius:3px;overflow:hidden;box-shadow:0 48px 120px rgba(0,0,0,.6)}
.upgrade-hero{background:linear-gradient(135deg,#141f10,#1c2e18);padding:28px 32px 24px;color:#e4dcc4;text-align:center}
.upgrade-hero-icon{font-size:40px;margin-bottom:10px}
.upgrade-hero-title{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700;color:#f5eedb;margin-bottom:4px}
.upgrade-hero-sub{font-size:13px;color:#7faa6e;font-style:italic}
.upgrade-body{padding:24px 32px 30px}
.upgrade-features{display:flex;flex-direction:column;gap:8px;margin-bottom:22px}
.upgrade-feature{display:flex;align-items:center;gap:12px;font-size:13px;color:#3a3020}
.upgrade-feature-icon{font-size:18px;width:24px;text-align:center;flex-shrink:0}
.upgrade-plans{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px}
.upgrade-plan{border:2px solid #d4ccbc;border-radius:3px;padding:14px 16px;cursor:pointer;transition:all .15s;text-align:center}
.upgrade-plan:hover{border-color:#7faa6e}
.upgrade-plan.selected{border-color:var(--moss);background:#f0f8ec}
.upgrade-plan-period{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--stone);margin-bottom:4px}
.upgrade-plan-price{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;color:var(--ink)}
.upgrade-plan-sub{font-size:11px;color:var(--stone);margin-top:2px}
.upgrade-plan-badge{background:#c8ddb8;color:var(--moss);font-size:9px;font-weight:700;letter-spacing:1px;padding:2px 7px;border-radius:10px;display:inline-block;margin-top:5px}
.upgrade-cta{width:100%;background:var(--moss);color:#c8ddb8;border:none;border-radius:2px;padding:13px;font-family:'DM Sans',sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:background .2s;margin-bottom:10px}
.upgrade-cta:hover{background:#3d7a33}
.upgrade-close{display:block;text-align:center;font-size:12px;color:var(--stone);cursor:pointer;padding:4px}
.upgrade-close:hover{color:var(--ink)}
.upgrade-modal-close{position:absolute;top:12px;right:14px;background:none;border:none;cursor:pointer;color:rgba(232,223,196,.5);font-size:18px}
.upgrade-modal-close:hover{color:#e8dfc4}

/* ── LIMIT WARNING ── */
.limit-warn{background:#fff8e8;border:1px solid #e8c870;border-radius:3px;padding:12px 16px;margin-bottom:14px;display:flex;align-items:center;gap:10px;font-size:12px;color:#7a5a00}
.limit-warn-icon{font-size:18px;flex-shrink:0}
.limit-warn-link{color:var(--moss);font-weight:600;cursor:pointer;text-decoration:underline}

@media(max-width:640px){
  .upgrade-plans{grid-template-columns:1fr}
  .upgrade-body{padding:20px 20px 24px}
  .upgrade-hero{padding:22px 20px 18px}
  .banner-ad{flex-wrap:wrap}
}
`;

// ── HELPERS ───────────────────────────────────────────────────────────────────

function getCatMeta(id, context="native") {
  const list = context==="wildlife" ? WILDLIFE_CATEGORIES :
               context==="invasive" ? INVASIVE_CATEGORIES :
               PLANT_CATEGORIES;
  return list.find(c=>c.id===id) || list[0];
}

// Legacy CATEGORIES alias for modal which uses selected.category
const CATEGORIES = [...PLANT_CATEGORIES, ...WILDLIFE_CATEGORIES.slice(1), ...INVASIVE_CATEGORIES.slice(1)];

function ConsBadge({status}) {
  if (!status) return null;
  const m = {"LC":"c-lc","Least Concern":"c-lc","NT":"c-nt","Near Threatened":"c-nt",
    "VU":"c-vu","Vulnerable":"c-vu","EN":"c-en","Endangered":"c-en","CR":"c-cr","Critically Endangered":"c-cr"};
  return <span className={`cons-badge ${m[status]||"c-lc"}`}>{status}</span>;
}

function Spinner({teal}) {
  return <span className={`spinner${teal?" spinner-teal":""}`}/>;
}

function SkeletonGrid({count=9}) {
  return (
    <div className="sk-grid">
      {Array.from({length:count}).map((_,i)=>(
        <div key={i} className="sk-card">
          <div className="sk-ph"/>
          <div className="sk-body">
            <div className="sk-line" style={{width:"38%",height:7}}/>
            <div className="sk-line" style={{width:"72%",height:13,marginBottom:5}}/>
            <div className="sk-line" style={{width:"52%",height:9,marginBottom:12}}/>
            <div className="sk-line" style={{width:"100%"}}/>
            <div className="sk-line" style={{width:"88%"}}/>
            <div className="sk-line" style={{width:"76%"}}/>
          </div>
        </div>
      ))}
    </div>
  );
}

async function callClaude(system, user, maxTokens=2000) {
  const res = await fetch("/api/claude", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      model:"claude-sonnet-4-20250514",
      max_tokens: maxTokens,
      system,
      messages:[{role:"user",content:user}]
    })
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.content?.map(b=>b.text||"").join("")||"";
}

// Parse AI markdown into structured sections for habitat plan
function parsePlan(text) {
  const sections = [];
  const lines = text.split("\n");
  let current = null;
  for (const line of lines) {
    const h = line.match(/^#{1,3}\s+(.+)/) || line.match(/^\*\*(.+)\*\*\s*$/);
    if (h) {
      if (current) sections.push(current);
      current = { title: h[1].replace(/\*\*/g,""), lines:[] };
    } else if (current && line.trim()) {
      current.lines.push(line.replace(/^[-•*]\s*/,"").replace(/\*\*(.*?)\*\*/g,"$1"));
    }
  }
  if (current) sections.push(current);
  return sections;
}

const SECTION_ICONS = {
  "Plant":"🌱","Native Plant":"🌱","Vegetation":"🌱","Planting":"🌱",
  "Water":"💧","Wetland":"💧","Riparian":"💧",
  "Shelter":"🏠","Nesting":"🐣","Structure":"🏠",
  "Remove":"🚫","Invasive":"🚫","Eliminate":"🚫",
  "Season":"📅","Calendar":"📅","Timing":"📅",
  "Food":"🍎","Forage":"🍎","Feeding":"🍎",
  "Soil":"🪱","Ground":"🪱","Brush":"🪱",
  "Certif":"🏅","Program":"🏅","Partner":"🏅",
  "Quick":"⚡","Immediate":"⚡","Priority":"⚡",
  "Long":"🗓","Multi":"🗓","Year":"🗓",
};
function sectionIcon(title) {
  for (const [k,v] of Object.entries(SECTION_ICONS)) {
    if (title.toLowerCase().includes(k.toLowerCase())) return v;
  }
  return "🌿";
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

function FieldGuide() {
  const [tab, setTab] = useState("Native");

  // ── MONETIZATION STATE ───────────────────────────────────────────────────
  const [isPro, setIsPro] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [upgradePlan, setUpgradePlan] = useState("yearly");
  const [aiUsageCount, setAiUsageCount] = useState(0);

  function openUpgrade() { setShowUpgrade(true); }
  function activatePro() { setIsPro(true); setShowUpgrade(false); }

  // Shared search state — used across Native, Wildlife, Invasive tabs
  const [activeState, setActiveState] = useState("Pennsylvania");
  const [catId, setCatId] = useState("all");
  const [habitat, setHabitat] = useState("Any Habitat");
  const [season, setSeason] = useState("Any Season");
  const [searchText, setSearchText] = useState("");
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Invasive state
  const [invCatId, setInvCatId] = useState("all");
  const [invSpecies, setInvSpecies] = useState([]);
  const [invLoading, setInvLoading] = useState(false);
  const [invHasSearched, setInvHasSearched] = useState(false);
  const [invSearchText, setInvSearchText] = useState("");
  const [invHasMore, setInvHasMore] = useState(false);
  const [invLoadingMore, setInvLoadingMore] = useState(false);
  const [invPage, setInvPage] = useState(1);

  // Wildlife state
  const [wldCatId, setWldCatId] = useState("all");
  const [wldSpecies, setWldSpecies] = useState([]);
  const [wldLoading, setWldLoading] = useState(false);
  const [wldHasSearched, setWldHasSearched] = useState(false);
  const [wldSearchText, setWldSearchText] = useState("");
  const [wldHasMore, setWldHasMore] = useState(false);
  const [wldLoadingMore, setWldLoadingMore] = useState(false);
  const [wldPage, setWldPage] = useState(1);

  // Modal
  const [selected, setSelected] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailData, setDetailData] = useState(null);
  // iNaturalist photos
  const [inatPhotos, setInatPhotos] = useState([]);
  const [inatLoading, setInatLoading] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  // GBIF occurrence data
  const [gbifData, setGbifData] = useState(null);
  const [gbifLoading, setGbifLoading] = useState(false);
  // Per-species habitat tip in modal
  const [modalHabProp, setModalHabProp] = useState("backyard");
  const [modalHabResult, setModalHabResult] = useState("");
  const [modalHabLoading, setModalHabLoading] = useState(false);

  // Habitat Advisor
  const [habState, setHabState] = useState("Pennsylvania");
  const [habSpecies, setHabSpecies] = useState("");
  const [habPropType, setHabPropType] = useState("backyard");
  const [habSize, setHabSize] = useState("1 – 5 acres");
  const [habGoals, setHabGoals] = useState("");
  const [habLoading, setHabLoading] = useState(false);
  const [habPlan, setHabPlan] = useState(null);
  const [openSections, setOpenSections] = useState({});

  // AI ID
  const [aiMode, setAiMode] = useState("photo");
  const [aiState, setAiState] = useState("All States");
  const [aiQuery, setAiQuery] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiImage, setAiImage] = useState(null);       // { base64, mediaType, previewUrl }
  const [aiImageNotes, setAiImageNotes] = useState("");
  const fileInputRef = useState(null);
  const cameraInputRef = useState(null);

  const PAGE_SIZE = 12;

  // ── BROWSE ─────────────────────────────────────────────────────────────────

  async function fetchSpecies(loadMore=false) {
    if (loading||loadingMore) return;
    const currentPage = loadMore ? page+1 : 1;
    if (!loadMore) { setLoading(true); setSpecies([]); setPage(1); setCardPhotos({}); }
    else setLoadingMore(true);
    const cm = getCatMeta(catId, "native");
    const catLabel = catId==="all" ? "native plants (wildflowers, trees, shrubs, ferns, mosses, grasses, sedges, mushrooms, fungi)" : cm.label.toLowerCase();
    const sc = searchText.trim() ? ` matching "${searchText.trim()}"` : "";
    const hc = habitat!=="Any Habitat" ? ` in ${habitat} habitat` : "";
    const snc = season!=="Any Season" ? ` active in ${season}` : "";
    const offset = (currentPage-1)*PAGE_SIZE;
    try {
      const raw = await callClaude(
        "You are an expert botanist and field naturalist specializing in native US plants. Return ONLY valid JSON array, no markdown.",
        `List ${PAGE_SIZE} native ${catLabel} species${sc} found in ${activeState}${hc}${snc}. Skip first ${offset} results.
Return JSON array of ${PAGE_SIZE} objects: {name,latin,category,description,habitat,season,size,color,conservation}
category must be one of: wildflower|tree|fern|grass|mushroom
description: 2 vivid sentences with key identification features. Return ONLY the array.`,
        3000
      );
      const parsed = JSON.parse(raw.replace(/```json|```/g,"").trim());
      if (loadMore) { setSpecies(prev=>[...prev,...parsed]); setPage(currentPage); }
      else setSpecies(parsed);
      setHasMore(parsed.length===PAGE_SIZE);
      setHasSearched(true);
      fetchCardPhotos(parsed);
    } catch(e) { if(!loadMore) setSpecies([]); }
    setLoading(false); setLoadingMore(false);
  }

  async function fetchWildlife(loadMore=false) {
    if (wldLoading||wldLoadingMore) return;
    const currentPage = loadMore ? wldPage+1 : 1;
    if (!loadMore) { setWldLoading(true); setWldSpecies([]); setWldPage(1); setCardPhotos({}); }
    else setWldLoadingMore(true);
    const cm = getCatMeta(wldCatId, "wildlife");
    const catLabel = wldCatId==="all" ? "native wildlife (mammals, birds, fish, reptiles, amphibians, insects)" : cm.label.toLowerCase();
    const sc = wldSearchText.trim() ? ` matching "${wldSearchText.trim()}"` : "";
    const hc = habitat!=="Any Habitat" ? ` in ${habitat} habitat` : "";
    const snc = season!=="Any Season" ? ` active in ${season}` : "";
    const offset = (currentPage-1)*PAGE_SIZE;
    try {
      const raw = await callClaude(
        "You are an expert wildlife biologist specializing in native US fauna. Return ONLY valid JSON array, no markdown.",
        `List ${PAGE_SIZE} native ${catLabel} species${sc} found in ${activeState}${hc}${snc}. Skip first ${offset} results.
Return JSON array of ${PAGE_SIZE} objects: {name,latin,category,description,habitat,season,size,color,conservation}
category must be one of: mammal|bird|fish|reptile|amphibian|insect
description: 2 vivid sentences with key identification features. Return ONLY the array.`,
        3000
      );
      const parsed = JSON.parse(raw.replace(/```json|```/g,"").trim());
      if (loadMore) { setWldSpecies(prev=>[...prev,...parsed]); setWldPage(currentPage); }
      else setWldSpecies(parsed);
      setWldHasMore(parsed.length===PAGE_SIZE);
      setWldHasSearched(true);
      fetchCardPhotos(parsed);
    } catch(e) { if(!loadMore) setWldSpecies([]); }
    setWldLoading(false); setWldLoadingMore(false);
  }

  async function fetchInvasive(loadMore=false) {
    if (invLoading||invLoadingMore) return;
    const currentPage = loadMore ? invPage+1 : 1;
    if (!loadMore) { setInvLoading(true); setInvSpecies([]); setInvPage(1); setCardPhotos({}); }
    else setInvLoadingMore(true);
    const cm = getCatMeta(invCatId, "invasive");
    const catLabel = invCatId==="all" ? "invasive species (plants and animals)" :
                     invCatId==="plant" ? "invasive plants" :
                     invCatId==="animal" ? "invasive animals" :
                     invCatId==="insect" ? "invasive insects" :
                     invCatId==="aquatic" ? "invasive aquatic species" : "invasive species";
    const sc = invSearchText.trim() ? ` matching "${invSearchText.trim()}"` : "";
    const offset = (currentPage-1)*PAGE_SIZE;
    try {
      const raw = await callClaude(
        "You are an expert invasive species biologist. Return ONLY valid JSON array, no markdown.",
        `List ${PAGE_SIZE} ${catLabel}${sc} found in or threatening ${activeState}. Skip first ${offset} results.
Return JSON array of ${PAGE_SIZE} objects: {name,latin,category,description,origin,spread,impact,control,size,color}
category must be one of: plant|animal|insect|aquatic
description: 2 sentences describing appearance and how to identify it.
origin: where this species came from originally.
spread: how it spreads and where it has established in the US.
impact: the ecological or economic damage it causes.
control: recommended removal or control methods.
Return ONLY the array.`,
        3000
      );
      const parsed = JSON.parse(raw.replace(/```json|```/g,"").trim());
      if (loadMore) { setInvSpecies(prev=>[...prev,...parsed]); setInvPage(currentPage); }
      else setInvSpecies(parsed);
      setInvHasMore(parsed.length===PAGE_SIZE);
      setInvHasSearched(true);
      fetchCardPhotos(parsed);
    } catch(e) { if(!loadMore) setInvSpecies([]); }
    setInvLoading(false); setInvLoadingMore(false);
  }

  async function fetchDetail(sp) {
    setDetailLoading(true); setDetailData(null); setModalHabResult(""); setModalHabProp("backyard");
    try {
      const raw = await callClaude(
        "You are a professional field naturalist and wildlife biologist with expertise across all US native species. Return ONLY valid JSON, no markdown, no explanation.",
        `Create a comprehensive field guide entry for ${sp.name} (${sp.latin}), a native US species in the category: ${sp.category}.

Return a single JSON object with ALL of these fields populated in detail:
{
  "overview": "3-4 sentence compelling introduction to this species covering what makes it distinctive and ecologically important",
  "identification": {
    "size": "precise measurements — length, wingspan, weight as appropriate for this species type",
    "coloration": "detailed description of colors and patterns, including seasonal/sex/age variations",
    "markings": "specific distinguishing marks, patterns, features that set it apart",
    "shape": "body shape, proportions, distinctive physical features",
    "voice": "calls, songs, or sounds if applicable — describe precisely",
    "seasonal_variation": "how appearance changes by season if applicable"
  },
  "range": {
    "native_states": "comprehensive list of US states where this species is native",
    "core_range": "description of where it is most commonly found",
    "migration": "migration patterns if applicable, or year-round resident status",
    "elevation": "elevation range if applicable"
  },
  "habitat": {
    "preferred": "detailed preferred habitat description",
    "microhabitat": "specific microhabitat requirements within broader habitat",
    "nesting_denning": "nesting, denning, or roosting specifics",
    "territory": "territory size and behavior if applicable"
  },
  "behavior": {
    "activity": "daily and seasonal activity patterns",
    "feeding": "detailed diet and feeding behavior",
    "social": "social structure, group behavior, interactions",
    "defense": "defense mechanisms, predator avoidance"
  },
  "reproduction": {
    "season": "breeding/flowering season with specific months",
    "courtship": "courtship behavior or pollination mechanism",
    "young": "eggs/seeds/young — numbers, incubation/gestation, development",
    "lifespan": "typical lifespan in wild and captivity if known"
  },
  "conservation": {
    "status": "LC or NT or VU or EN or CR",
    "population_trend": "increasing, stable, or decreasing",
    "threats": "detailed current threats",
    "protected": "any legal protections or special status by state",
    "what_you_can_do": "specific actions observers can take to help"
  },
  "field_notes": {
    "best_time": "best time of day and year to observe",
    "best_places": "types of places most likely to find this species in the US",
    "tips": "3-4 expert field identification tips",
    "similar_species": "2-3 most commonly confused species and exactly how to tell them apart",
    "interesting_fact": "one remarkable or surprising fact about this species"
  }
}

Be thorough and scientifically accurate. Every field must be populated with real, specific information.`,
        2500
      );
      setDetailData(JSON.parse(raw.replace(/```json|```/g,"").trim()));
    } catch(e) { setDetailData(null); }
    setDetailLoading(false);
  }

  // Fetch photos from iNaturalist API
  // Card photos from iNaturalist
  const [cardPhotos, setCardPhotos] = useState({});

  async function fetchCardPhotos(speciesList) {
    // Fetch one photo per species using iNaturalist taxon default photo
    const newPhotos = {};
    await Promise.all(speciesList.map(async (sp) => {
      try {
        const res = await fetch(
          `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(sp.latin)}&rank=species&per_page=1`
        );
        const data = await res.json();
        const taxon = data.results?.[0];
        if (taxon?.default_photo?.medium_url) {
          newPhotos[sp.latin] = taxon.default_photo.medium_url;
        } else if (taxon?.default_photo?.square_url) {
          newPhotos[sp.latin] = taxon.default_photo.square_url.replace("square","medium");
        }
      } catch(e) {}
    }));
    setCardPhotos(prev => ({...prev, ...newPhotos}));
  }

  async function fetchInatPhotos(sp) {
    setInatLoading(true); setInatPhotos([]); setActivePhoto(0);
    try {
      // Search for the taxon by Latin name
      const taxonRes = await fetch(
        `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(sp.latin)}&rank=species&per_page=1`
      );
      const taxonData = await taxonRes.json();
      const taxon = taxonData.results?.[0];
      if (!taxon) { setInatLoading(false); return; }

      // Fetch observations with photos, quality_grade research
      const obsRes = await fetch(
        `https://api.inaturalist.org/v1/observations?taxon_id=${taxon.id}&quality_grade=research&photos=true&per_page=8&order_by=votes`
      );
      const obsData = await obsRes.json();
      const photos = [];
      for (const obs of obsData.results || []) {
        for (const photo of obs.photos || []) {
          const url = photo.url?.replace("square", "medium");
          if (url && !photos.find(p => p.url === url)) {
            photos.push({
              url,
              attribution: photo.attribution || "",
              observer: obs.user?.login || "iNaturalist",
              place: obs.place_guess || "",
              date: obs.observed_on || "",
              obsUrl: `https://www.inaturalist.org/observations/${obs.id}`,
            });
          }
        }
        if (photos.length >= 6) break;
      }

      // Also grab the taxon default photo
      if (taxon.default_photo?.medium_url) {
        const def = {
          url: taxon.default_photo.medium_url,
          attribution: taxon.default_photo.attribution || "",
          observer: "iNaturalist",
          place: "", date: "",
          obsUrl: `https://www.inaturalist.org/taxa/${taxon.id}`,
        };
        if (!photos.find(p => p.url === def.url)) photos.unshift(def);
      }

      setInatPhotos(photos);
    } catch(e) { setInatPhotos([]); }
    setInatLoading(false);
  }

  // Fetch occurrence data from GBIF
  async function fetchGbif(sp) {
    setGbifLoading(true); setGbifData(null);
    try {
      // Match species name to GBIF backbone
      const matchRes = await fetch(
        `https://api.gbif.org/v1/species/match?name=${encodeURIComponent(sp.latin)}&strict=false`
      );
      const matchData = await matchRes.json();
      const usageKey = matchData.usageKey || matchData.speciesKey;
      if (!usageKey) { setGbifLoading(false); return; }

      // Fetch occurrence counts by US state (stateProvince facet)
      const [occRes, facetRes] = await Promise.all([
        fetch(`https://api.gbif.org/v1/occurrence/search?taxonKey=${usageKey}&country=US&limit=0`),
        fetch(`https://api.gbif.org/v1/occurrence/search?taxonKey=${usageKey}&country=US&limit=0&facet=stateProvince&facetLimit=15`)
      ]);
      const occData = await occRes.json();
      const facetData = await facetRes.json();

      // Recent observations (last 5)
      const recentRes = await fetch(
        `https://api.gbif.org/v1/occurrence/search?taxonKey=${usageKey}&country=US&limit=5&hasCoordinate=true&order=DESC&orderBy=eventDate`
      );
      const recentData = await recentRes.json();

      const stateFacets = (facetData.facets?.[0]?.counts || [])
        .filter(f => f.name && f.name.length > 1)
        .slice(0, 10)
        .map(f => ({ state: f.name, count: f.count }));

      setGbifData({
        totalOccurrences: occData.count || 0,
        usKey: usageKey,
        topStates: stateFacets,
        recentSightings: (recentData.results || []).map(o => ({
          date: o.eventDate?.slice(0,10) || o.year || "Unknown",
          place: [o.stateProvince, o.country].filter(Boolean).join(", ") || "USA",
          lat: o.decimalLatitude,
          lng: o.decimalLongitude,
          recorder: o.institutionCode || o.datasetName || "Citizen Science",
          gbifUrl: `https://www.gbif.org/occurrence/${o.key}`,
        })),
      });
    } catch(e) { setGbifData(null); }
    setGbifLoading(false);
  }

  async function fetchModalHabitat(sp, propType) {
    setModalHabLoading(true); setModalHabResult("");
    const prop = PROPERTY_TYPES.find(p=>p.id===propType);
    try {
      const result = await callClaude(
        "You are an expert habitat restoration ecologist. Be practical and specific.",
        `Give 5 concise habitat improvement tips for supporting ${sp.name} (${sp.latin}) on a ${prop.label} property in ${selected?._state||"the eastern USA"}.
Use this format - just a numbered list, no headers, each item 1-2 sentences:
1. [tip]
2. [tip]
...`,
        600
      );
      setModalHabResult(result.trim());
    } catch(e) { setModalHabResult("Unable to load tips. Please try again."); }
    setModalHabLoading(false);
  }

  const [detailTab, setDetailTab] = useState("overview");

  function openModal(sp) {
    setSelected(sp);
    setDetailData(null);
    setInatPhotos([]);
    setGbifData(null);
    setActivePhoto(0);
    setModalHabResult("");
    setDetailTab("overview");
    // Fire all three data sources in parallel
    fetchDetail(sp);
    fetchInatPhotos(sp);
    fetchGbif(sp);
  }

  // ── HABITAT ADVISOR ────────────────────────────────────────────────────────

  async function generatePlan() {
    if (!habSpecies.trim()||habLoading) return;
    setHabLoading(true); setHabPlan(null); setOpenSections({});
    const prop = PROPERTY_TYPES.find(p=>p.id===habPropType);
    const goalsClause = habGoals.trim() ? ` Additional goals: ${habGoals.trim()}.` : "";
    try {
      const result = await callClaude(
        `You are a senior habitat restoration ecologist and wildlife biologist specializing in native species habitat improvement across the United States. Provide detailed, practical, science-based recommendations tailored to the specific species, location, property type, and size.`,
        `Create a comprehensive habitat improvement plan for:
- Target species: ${habSpecies}
- Location: ${habState}
- Property type: ${prop.label} (${prop.desc})
- Property size: ${habSize}${goalsClause}

Structure your plan with these clearly marked sections using ## headers:

## Quick Wins (First 30 Days)
## Native Plantings to Add
## Invasive Species to Remove
## Water & Moisture Features
## Shelter, Nesting & Cover
## Food Sources & Foraging
## Seasonal Action Calendar
## Long-Term Management (Years 2–5)
## Certifications & Programs

For each section, give specific, actionable recommendations appropriate for ${habState} and the ${prop.label} context. Include specific plant species names, structures, dimensions where relevant. Be concise but thorough.`,
        2800
      );
      const sections = parsePlan(result);
      setHabPlan({ raw: result, sections, species: habSpecies, state: habState, prop: prop.label, size: habSize });
      // open first 3 sections by default
      const init = {};
      sections.slice(0,3).forEach((_,i) => { init[i] = true; });
      setOpenSections(init);
    } catch(e) { setHabPlan({ error: true }); }
    setHabLoading(false);
  }

  function applyHabExample(ex) {
    setHabSpecies(ex.species); setHabState(ex.state); setHabPropType(ex.property); setHabSize(ex.size);
  }

  function toggleSection(i) {
    setOpenSections(prev => ({...prev, [i]: !prev[i]}));
  }

  // ── AI IDENTIFIER ──────────────────────────────────────────────────────────

  function handleImageFile(file) {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const base64 = dataUrl.split(",")[1];
      const mediaType = file.type;
      setAiImage({ base64, mediaType, previewUrl: dataUrl });
      setAiResult("");
    };
    reader.readAsDataURL(file);
  }

  function clearImage() {
    setAiImage(null); setAiResult(""); setAiImageNotes("");
  }

  async function runAI() {
    const hasImage = aiMode === "photo" && aiImage;
    const hasText  = aiMode === "text"  && aiQuery.trim();
    if ((!hasImage && !hasText) || aiLoading) return;
    if (!isPro && aiUsageCount >= FREE_AI_LIMIT) { openUpgrade(); return; }
    setAiLoading(true); setAiResult("");
    setAiUsageCount(c => c + 1);

    const sc = aiState !== "All States" ? ` in ${aiState}` : " in the USA";
    const systemPrompt = "You are an expert field naturalist and taxonomist with encyclopedic knowledge of ALL native US species — plants, mammals, birds, fish, reptiles, amphibians, insects, and invertebrates. Provide precise, practical identification help.";

    const responseFormat = `
Respond with:
**Most Likely Match**
Common name, Latin name, category. 3-4 sentences explaining why this matches, citing specific visible features.

**Distinguishing Features**
Key features that confirm this ID and separate it from look-alikes.

**Other Possibilities**
2-3 alternative species with brief reasoning and how to distinguish them.

**Field Notes**
Best time/place to observe. Behavior or seasonal cues that help confirm the ID.

**Conservation Status**
IUCN/NatureServe status and any population trend notes.`;

    try {
      let messages;
      if (hasImage) {
        const notesClause = aiImageNotes.trim() ? ` Additional context: ${aiImageNotes.trim()}.` : "";
        messages = [{
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: aiImage.mediaType, data: aiImage.base64 } },
            { type: "text", text: `Please identify the native US species shown in this photo. Location context: ${aiState !== "All States" ? aiState : "USA"}.${notesClause}${responseFormat}` }
          ]
        }];
      } else {
        messages = [{
          role: "user",
          content: `A naturalist${sc} observes: "${aiQuery}"${responseFormat}`
        }];
      }

      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1200, system: systemPrompt, messages })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      setAiResult(data.content?.map(b => b.text || "").join("") || "");
    } catch(e) { setAiResult("Error connecting to AI. Please try again."); }
    setAiLoading(false);
  }

  function renderAiResult(text) {
    return text.split("\n").map((line,i) => {
      if (line.startsWith("**")&&line.endsWith("**"))
        return <div key={i} className="ai-result-heading">{line.replace(/\*\*/g,"")}</div>;
      if (line.match(/\*\*(.*?)\*\*/)) {
        const parts = line.split(/(\*\*.*?\*\*)/);
        return <div key={i}>{parts.map((p,j)=>p.match(/^\*\*.*\*\*$/) ? <strong key={j}>{p.replace(/\*\*/g,"")}</strong> : p)}</div>;
      }
      if (!line.trim()) return <div key={i} style={{height:8}}/>;
      return <div key={i}>{line}</div>;
    });
  }

  // ── GENERIC AD COMPONENT ─────────────────────────────────────────────────
  // Swap .ad-slot-inner contents for your ad network script tag (AdSense etc.)
  // when ready. isPro users never see ads.

  function AdSlotCard() {
    if (isPro) return null;
    return (
      <div className="ad-slot ad-slot-card">
        <div className="ad-slot-label">Advertisement</div>
        <div className="ad-slot-inner">
          {/* ↓ Replace this block with your ad network tag */}
          <div className="ad-slot-icon">🌿</div>
          <div className="ad-slot-text">Ad space · 250 × 230</div>
          {/* ↑ End replacement block */}
        </div>
      </div>
    );
  }

  function AdSlotBanner() {
    if (isPro) return null;
    return (
      <div className="ad-slot ad-slot-banner">
        <div className="ad-slot-label">Advertisement</div>
        <div className="ad-slot-inner">
          {/* ↓ Replace this block with your ad network tag */}
          <div className="ad-slot-icon">🌿</div>
          <div className="ad-slot-text">Banner ad space · 728 × 90</div>
          {/* ↑ End replacement block */}
        </div>
      </div>
    );
  }

  function AdSlotInline() {
    if (isPro) return null;
    return (
      <div className="ad-slot ad-slot-inline">
        <div className="ad-slot-label">Advertisement</div>
        <div className="ad-slot-inner">
          {/* ↓ Replace this block with your ad network tag */}
          <div className="ad-slot-icon">🌿</div>
          <div className="ad-slot-text">Inline ad space · 468 × 60</div>
          {/* ↑ End replacement block */}
        </div>
      </div>
    );
  }

  // ── MONETIZATION COMPONENTS ───────────────────────────────────────────────

  function UpgradeModal() {
    if (!showUpgrade) return null;
    const monthlyTotal = (PRO_PRICE_MONTHLY * 12).toFixed(0);
    const yearlySaving = (monthlyTotal - PRO_PRICE_YEARLY).toFixed(0);
    return (
      <div className="upgrade-overlay" onClick={()=>setShowUpgrade(false)}>
        <div className="upgrade-modal" onClick={e=>e.stopPropagation()} style={{position:"relative"}}>
          <button className="upgrade-modal-close" onClick={()=>setShowUpgrade(false)}>✕</button>
          <div className="upgrade-hero">
            <div className="upgrade-hero-icon">🌿</div>
            <div className="upgrade-hero-title">Native Ground Pro</div>
            <div className="upgrade-hero-sub">Unlimited access · Ad-free · Full features</div>
          </div>
          <div className="upgrade-body">
            <div className="upgrade-features">
              {PRO_FEATURES.map((f,i)=>(
                <div key={i} className="upgrade-feature">
                  <span className="upgrade-feature-icon">{f.icon}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
            <div className="upgrade-plans">
              <div className={`upgrade-plan${upgradePlan==="monthly"?" selected":""}`} onClick={()=>setUpgradePlan("monthly")}>
                <div className="upgrade-plan-period">Monthly</div>
                <div className="upgrade-plan-price">{"$"+PRO_PRICE_MONTHLY}</div>
                <div className="upgrade-plan-sub">per month</div>
              </div>
              <div className={`upgrade-plan${upgradePlan==="yearly"?" selected":""}`} onClick={()=>setUpgradePlan("yearly")}>
                <div className="upgrade-plan-period">Annual</div>
                <div className="upgrade-plan-price">{"$"+PRO_PRICE_YEARLY}</div>
                <div className="upgrade-plan-sub">per year</div>
                <div className="upgrade-plan-badge">Save {"$"}{yearlySaving}</div>
              </div>
            </div>
            {/* Demo: clicking activates Pro without real payment */}
            <button className="upgrade-cta" onClick={activatePro}>
              Start Pro — {upgradePlan==="yearly" ? "$"+PRO_PRICE_YEARLY+"/yr" : "$"+PRO_PRICE_MONTHLY+"/mo"}
            </button>
            <div className="upgrade-close" onClick={()=>setShowUpgrade(false)}>
              Continue with free version
            </div>
          </div>
        </div>
      </div>
    );
  }

  const remainingFree = Math.max(0, FREE_AI_LIMIT - aiUsageCount);

  // ── RENDER ────────────────────────────────────────────────────────────────

  return (
    <div>
      <style>{CSS}</style>

      <UpgradeModal/>

      {/* HEADER */}
      <div className="hdr">
        <div className="hdr-grain"/>
        <div className="hdr-roots"/>
        <div className="hdr-inner">
          <div className="hdr-left">
            <div className="hdr-brand">
              <div className="hdr-eyebrow">Native Species · USA Field Guide</div>
              <div className="hdr-title">Native <span>Ground</span></div>
              <div className="hdr-sub">Discover · Identify · Restore</div>
            </div>
          </div>
          <div className="hdr-right">
            {isPro
              ? <div className="pro-badge">🌿 Pro Member</div>
              : <div className="free-badge" onClick={openUpgrade}>✦ Upgrade to Pro</div>
            }
            <div className="hdr-stats">
              {[["Native","Plants"],["Invasive","Species"],["Wildlife","Animals"],["AI","Powered"]].map(([n,l])=>(
                <div key={l} style={{textAlign:"center"}}>
                  <div className="hdr-stat-num">{n}</div>
                  <div className="hdr-stat-lbl">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs">
        {TABS.map(t=>(
          <button key={t} className={`tab-btn${tab===t?" active":""}`} onClick={()=>setTab(t)}>{t}</button>
        ))}
      </div>

      {/* ══ NATIVE TAB ══════════════════════════════════════════════════════ */}
      {tab==="Native" && <>
        <div className="controls">
          <div className="search-wrap">
            <span className="s-ico">⌕</span>
            <input className="srch" placeholder="Search native plants…" value={searchText}
              onChange={e=>setSearchText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&fetchSpecies()}/>
          </div>
          <select className="fsel" value={activeState} onChange={e=>setActiveState(e.target.value)}>
            {STATES.map(s=><option key={s}>{s}</option>)}
          </select>
          <select className="fsel" value={habitat} onChange={e=>setHabitat(e.target.value)}>
            {HABITATS.map(h=><option key={h}>{h}</option>)}
          </select>
          <select className="fsel" value={season} onChange={e=>setSeason(e.target.value)}>
            {SEASONS.map(s=><option key={s}>{s}</option>)}
          </select>
          <button className="go-btn" onClick={()=>fetchSpecies()} disabled={loading}>
            {loading?<><Spinner/>Loading…</>:"Discover"}
          </button>
        </div>
        <div className="cat-strip">
          {PLANT_CATEGORIES.map(c=>(
            <div key={c.id} className={`cat-pill${catId===c.id?" active":""}`}
              style={catId===c.id?{background:c.color,borderColor:c.color}:{}}
              onClick={()=>setCatId(c.id)}>{c.icon} {c.label}</div>
          ))}
        </div>
        {!hasSearched && (
          <div className="featured">
            <div className="section-label">Featured Collections</div>
            <div className="feat-chips">
              {NATIVE_FEATURED.map(f=>(
                <div key={f.label} className="feat-chip"
                  onClick={()=>{ setActiveState(f.state); setCatId(f.category); setHasSearched(false); setTimeout(()=>fetchSpecies(),50); }}>
                  {getCatMeta(f.category,"native").icon} {f.label}
                </div>
              ))}
            </div>
          </div>
        )}
        {loading && <SkeletonGrid count={PAGE_SIZE}/>}
        {!loading && hasSearched && <>
          <div className="results-meta">
            <div className="results-count">{species.length} species · {activeState} · {getCatMeta(catId,"native").label}</div>
          </div>
          <div className="grid">
            {species.length===0 ? (
              <div className="state-box"><div className="state-ico">🔍</div><div className="state-t">No species found</div><div className="state-s">Try adjusting your filters.</div></div>
            ) : species.reduce((acc,sp,i)=>{
              const cm=getCatMeta(sp.category,"native");
              acc.push(
                <div key={`sp-${i}`} className="card" onClick={()=>openModal(sp)}>
                  <div className="card-img-wrap">
                    {cardPhotos[sp.latin]
                      ? <img src={cardPhotos[sp.latin]} alt={sp.name} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}}/>
                      : null}
                    <div style={{display:cardPhotos[sp.latin]?"none":"flex",width:"100%",height:"100%",alignItems:"center",justifyContent:"center",fontSize:"52px",background:"var(--cream)",flexDirection:"column",gap:"6px"}}>
                      <span>{cm.icon}</span>
                      <span style={{fontSize:"10px",color:"var(--stone)",letterSpacing:"1px"}}>Loading photo…</span>
                    </div>
                  </div>
                  <div className="card-bar" style={{background:cm.color}}/>
                  <div className="card-body">
                    <div className="cpill">{cm.icon} {cm.label}</div>
                    <div className="card-name">{sp.name}</div>
                    <div className="card-latin">{sp.latin}</div>
                    <div className="card-desc">{sp.description}</div>
                  </div>
                  <div className="card-foot">
                    {sp.season&&<span className="tag">📅 {sp.season}</span>}
                    {sp.habitat&&<span className="tag">🏕 {sp.habitat}</span>}
                    {sp.size&&<span className="tag">📏 {sp.size}</span>}
                  </div>
                </div>
              );
              if ((i+1)%6===0) acc.push(<AdSlotCard key={`ad-${i}`}/>);
              return acc;
            },[])}
          </div>
          {hasMore&&<div style={{textAlign:"center",padding:"0 0 20px"}}>
            <button className="load-more-btn" onClick={()=>fetchSpecies(true)} disabled={loadingMore}>
              {loadingMore?<><Spinner/>Loading more…</>:"Load more plants"}
            </button>
          </div>}
          <AdSlotBanner/>
        </>}
        {!loading&&!hasSearched&&(
          <div className="grid">
            <div className="state-box"><div className="state-ico">🌱</div><div className="state-t">Explore Native Plants</div>
              <div className="state-s">Select a state and plant category, then click <strong>Discover</strong>.</div></div>
          </div>
        )}
      </>}

      {/* ══ INVASIVE TAB ════════════════════════════════════════════════════ */}
      {tab==="Invasive" && <>
        <div className="controls" style={{background:"#3a0a08"}}>
          <div className="search-wrap">
            <span className="s-ico" style={{color:"#e09080"}}>⌕</span>
            <input className="srch" placeholder="Search invasive species…" value={invSearchText}
              onChange={e=>setInvSearchText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&fetchInvasive()}
              style={{background:"rgba(255,255,255,.1)",borderColor:"rgba(255,100,80,.3)",color:"#f0e0dc"}}/>
          </div>
          <select className="fsel" value={activeState} onChange={e=>setActiveState(e.target.value)}
            style={{background:"rgba(255,255,255,.1)",borderColor:"rgba(255,100,80,.3)",color:"#f0e0dc"}}>
            {STATES.map(s=><option key={s}>{s}</option>)}
          </select>
          <button className="go-btn" style={{background:"#8a2010"}} onClick={()=>fetchInvasive()} disabled={invLoading}>
            {invLoading?<><Spinner/>Loading…</>:"Search Invasives"}
          </button>
        </div>
        <div className="cat-strip" style={{background:"#fdf0ee",borderBottom:"1px solid #f0c8c0"}}>
          {INVASIVE_CATEGORIES.map(c=>(
            <div key={c.id} className={`cat-pill${invCatId===c.id?" active":""}`}
              style={invCatId===c.id?{background:c.color,borderColor:c.color}:{borderColor:"#e0b0a8",color:"#8a3020"}}
              onClick={()=>setInvCatId(c.id)}>{c.icon} {c.label}</div>
          ))}
        </div>
        {!invHasSearched && (
          <div className="featured" style={{background:"#fdf0ee"}}>
            <div className="section-label">Featured Invasive Collections</div>
            <div className="feat-chips">
              {INVASIVE_FEATURED.map(f=>(
                <div key={f.label} className="feat-chip" style={{borderColor:"#e0b0a8"}}
                  onClick={()=>{ setActiveState(f.state); setInvCatId(f.category); setTimeout(()=>fetchInvasive(),50); }}>
                  ⚠️ {f.label}
                </div>
              ))}
            </div>
          </div>
        )}
        {invLoading && <SkeletonGrid count={PAGE_SIZE}/>}
        {!invLoading && invHasSearched && <>
          <div className="results-meta">
            <div className="results-count" style={{color:"#b03020"}}>{invSpecies.length} invasive species · {activeState}</div>
          </div>
          <div className="grid">
            {invSpecies.length===0 ? (
              <div className="state-box"><div className="state-ico">🔍</div><div className="state-t">No results found</div><div className="state-s">Try a different state or category.</div></div>
            ) : invSpecies.map((sp,i)=>{
              const cm = INVASIVE_CATEGORIES.find(c=>c.id===sp.category)||INVASIVE_CATEGORIES[0];
              return (
                <div key={i} className="card" onClick={()=>openModal({...sp,isInvasive:true})}
                  style={{borderTop:"3px solid #c03020"}}>
                  <div className="card-img-wrap">
                    {cardPhotos[sp.latin]
                      ? <img src={cardPhotos[sp.latin]} alt={sp.name} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}}/>
                      : null}
                    <div style={{display:cardPhotos[sp.latin]?"none":"flex",width:"100%",height:"100%",alignItems:"center",justifyContent:"center",fontSize:"52px",background:"#fdf0ee",flexDirection:"column",gap:"6px"}}>
                      <span>{cm.icon}</span>
                      <span style={{fontSize:"10px",color:"#b03020",letterSpacing:"1px"}}>Loading photo…</span>
                    </div>
                    <div style={{position:"absolute",top:8,left:8,background:"#c03020",color:"white",fontSize:"9px",padding:"2px 7px",borderRadius:"2px",letterSpacing:"1px",textTransform:"uppercase",fontWeight:700}}>Invasive</div>
                  </div>
                  <div className="card-bar" style={{background:"#c03020"}}/>
                  <div className="card-body">
                    <div className="cpill" style={{background:"#fde8e4",color:"#8a2010"}}>{cm.icon} {cm.label}</div>
                    <div className="card-name">{sp.name}</div>
                    <div className="card-latin">{sp.latin}</div>
                    <div className="card-desc">{sp.description}</div>
                  </div>
                  <div className="card-foot">
                    {sp.origin&&<span className="tag" style={{background:"#fde8e4",color:"#8a2010"}}>🌍 {sp.origin.slice(0,25)}</span>}
                    {sp.size&&<span className="tag">📏 {sp.size}</span>}
                  </div>
                </div>
              );
            })}
          </div>
          {invHasMore&&<div style={{textAlign:"center",padding:"0 0 20px"}}>
            <button className="load-more-btn" onClick={()=>fetchInvasive(true)} disabled={invLoadingMore}>
              {invLoadingMore?<><Spinner/>Loading more…</>:"Load more invasive species"}
            </button>
          </div>}
        </>}
        {!invLoading&&!invHasSearched&&(
          <div className="grid">
            <div className="state-box">
              <div className="state-ico">⚠️</div>
              <div className="state-t">Explore Invasive Species</div>
              <div className="state-s">Select a state and category, then click <strong>Search Invasives</strong> to find species threatening your area.</div>
            </div>
          </div>
        )}
      </>}

      {/* ══ WILDLIFE TAB ════════════════════════════════════════════════════ */}
      {tab==="Wildlife" && <>
        <div className="controls">
          <div className="search-wrap">
            <span className="s-ico">⌕</span>
            <input className="srch" placeholder="Search native wildlife…" value={wldSearchText}
              onChange={e=>setWldSearchText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&fetchWildlife()}/>
          </div>
          <select className="fsel" value={activeState} onChange={e=>setActiveState(e.target.value)}>
            {STATES.map(s=><option key={s}>{s}</option>)}
          </select>
          <select className="fsel" value={habitat} onChange={e=>setHabitat(e.target.value)}>
            {HABITATS.map(h=><option key={h}>{h}</option>)}
          </select>
          <select className="fsel" value={season} onChange={e=>setSeason(e.target.value)}>
            {SEASONS.map(s=><option key={s}>{s}</option>)}
          </select>
          <button className="go-btn" onClick={()=>fetchWildlife()} disabled={wldLoading}>
            {wldLoading?<><Spinner/>Loading…</>:"Discover"}
          </button>
        </div>
        <div className="cat-strip">
          {WILDLIFE_CATEGORIES.map(c=>(
            <div key={c.id} className={`cat-pill${wldCatId===c.id?" active":""}`}
              style={wldCatId===c.id?{background:c.color,borderColor:c.color}:{}}
              onClick={()=>setWldCatId(c.id)}>{c.icon} {c.label}</div>
          ))}
        </div>
        {!wldHasSearched && (
          <div className="featured">
            <div className="section-label">Featured Wildlife Collections</div>
            <div className="feat-chips">
              {WILDLIFE_FEATURED.map(f=>(
                <div key={f.label} className="feat-chip"
                  onClick={()=>{ setActiveState(f.state); setWldCatId(f.category); setTimeout(()=>fetchWildlife(),50); }}>
                  {getCatMeta(f.category,"wildlife").icon} {f.label}
                </div>
              ))}
            </div>
          </div>
        )}
        {wldLoading && <SkeletonGrid count={PAGE_SIZE}/>}
        {!wldLoading && wldHasSearched && <>
          <div className="results-meta">
            <div className="results-count">{wldSpecies.length} species · {activeState} · {getCatMeta(wldCatId,"wildlife").label}</div>
          </div>
          <div className="grid">
            {wldSpecies.length===0 ? (
              <div className="state-box"><div className="state-ico">🔍</div><div className="state-t">No species found</div><div className="state-s">Try adjusting your filters.</div></div>
            ) : wldSpecies.reduce((acc,sp,i)=>{
              const cm=getCatMeta(sp.category,"wildlife");
              acc.push(
                <div key={`sp-${i}`} className="card" onClick={()=>openModal(sp)}>
                  <div className="card-img-wrap">
                    {cardPhotos[sp.latin]
                      ? <img src={cardPhotos[sp.latin]} alt={sp.name} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}}/>
                      : null}
                    <div style={{display:cardPhotos[sp.latin]?"none":"flex",width:"100%",height:"100%",alignItems:"center",justifyContent:"center",fontSize:"52px",background:"var(--cream)",flexDirection:"column",gap:"6px"}}>
                      <span>{cm.icon}</span>
                      <span style={{fontSize:"10px",color:"var(--stone)",letterSpacing:"1px"}}>Loading photo…</span>
                    </div>
                  </div>
                  <div className="card-bar" style={{background:cm.color}}/>
                  <div className="card-body">
                    <div className="cpill">{cm.icon} {cm.label}</div>
                    <div className="card-name">{sp.name}</div>
                    <div className="card-latin">{sp.latin}</div>
                    <div className="card-desc">{sp.description}</div>
                  </div>
                  <div className="card-foot">
                    {sp.season&&<span className="tag">📅 {sp.season}</span>}
                    {sp.habitat&&<span className="tag">🏕 {sp.habitat}</span>}
                    {sp.size&&<span className="tag">📏 {sp.size}</span>}
                  </div>
                </div>
              );
              if ((i+1)%6===0) acc.push(<AdSlotCard key={`ad-${i}`}/>);
              return acc;
            },[])}
          </div>
          {wldHasMore&&<div style={{textAlign:"center",padding:"0 0 20px"}}>
            <button className="load-more-btn" onClick={()=>fetchWildlife(true)} disabled={wldLoadingMore}>
              {wldLoadingMore?<><Spinner/>Loading more…</>:"Load more wildlife"}
            </button>
          </div>}
          <AdSlotBanner/>
        </>}
        {!wldLoading&&!wldHasSearched&&(
          <div className="grid">
            <div className="state-box"><div className="state-ico">🦌</div><div className="state-t">Explore Native Wildlife</div>
              <div className="state-s">Select a state and wildlife category, then click <strong>Discover</strong>.</div></div>
          </div>
        )}
      </>}

      {/* ══ AI IDENTIFIER ══════════════════════════════════════════════════ */}
      {tab==="AI Identifier" && (
        <div className="ai-wrap">
          <div className="ai-title">AI Species Identifier</div>
          <div className="ai-sub">Upload a photo or describe what you observed — the AI will identify the native US species with expert field notes.</div>

          {/* Mode toggle */}
          <div className="ai-mode-toggle">
            {AI_ID_MODES.map(m=>(
              <div key={m.id} className={`ai-mode-btn${aiMode===m.id?" active":""}`}
                onClick={()=>{ setAiMode(m.id); setAiResult(""); }}>
                <span>{m.icon}</span>{m.label}
              </div>
            ))}
          </div>

          {/* State filter - shared */}
          <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap",alignItems:"center"}}>
            <select className="fsel" value={aiState} onChange={e=>setAiState(e.target.value)}>
              <option>All States</option>
              {STATES.map(s=><option key={s}>{s}</option>)}
            </select>
            <span style={{fontSize:11,color:"var(--stone)",fontStyle:"italic"}}>Narrowing by state improves accuracy</span>
          </div>

          {/* ── PHOTO MODE ── */}
          {aiMode==="photo" && (<>
            {!aiImage ? (
              <div className="photo-dropzone"
                onDragOver={e=>{e.preventDefault();e.currentTarget.classList.add("drag-over")}}
                onDragLeave={e=>e.currentTarget.classList.remove("drag-over")}
                onDrop={e=>{e.preventDefault();e.currentTarget.classList.remove("drag-over");handleImageFile(e.dataTransfer.files[0])}}
                onClick={()=>document.getElementById("ai-file-input").click()}>
                <div className="photo-dropzone-icon">📷</div>
                <div className="photo-dropzone-title">Drop a photo here, or click to upload</div>
                <div className="photo-dropzone-sub">Supports JPG, PNG, WEBP · Works best with clear, well-lit photos</div>
                <div className="photo-dropzone-actions" onClick={e=>e.stopPropagation()}>
                  <button className="photo-action-btn photo-action-upload"
                    onClick={()=>document.getElementById("ai-file-input").click()}>
                    📁 Choose Photo
                  </button>
                  <button className="photo-action-btn photo-action-camera"
                    onClick={()=>document.getElementById("ai-camera-input").click()}>
                    📸 Take Photo
                  </button>
                </div>
              </div>
            ) : (
              <div className="photo-preview-wrap">
                <img className="photo-preview" src={aiImage.previewUrl} alt="Species to identify"/>
                <div className="photo-preview-bar">
                  <span className="photo-preview-label">📷 Photo ready for identification</span>
                  <button className="photo-clear-btn" onClick={clearImage}>✕ Remove</button>
                </div>
              </div>
            )}

            {/* Hidden file inputs */}
            <input id="ai-file-input" type="file" accept="image/*" style={{display:"none"}}
              onChange={e=>handleImageFile(e.target.files[0])}/>
            <input id="ai-camera-input" type="file" accept="image/*" capture="environment" style={{display:"none"}}
              onChange={e=>handleImageFile(e.target.files[0])}/>

            {aiImage && (
              <textarea className="photo-notes"
                placeholder="Optional: add context — where was this taken? Season? Any behaviors observed?"
                value={aiImageNotes} onChange={e=>setAiImageNotes(e.target.value)}/>
            )}

            <button className="ai-btn" onClick={runAI} disabled={aiLoading||!aiImage}>
              {aiLoading?<><Spinner/>Analyzing Photo…</>:"Identify from Photo"}
            </button>

            {!aiImage && (
              <div style={{marginTop:20,padding:"14px 16px",background:var_advisor_light,border:"1px solid #b8dcd4",borderRadius:3}}>
                <div style={{fontSize:11,letterSpacing:"1.5px",textTransform:"uppercase",color:"var(--advisor)",marginBottom:8,fontWeight:600}}>📸 Photo Tips for Best Results</div>
                <div style={{fontSize:12,color:"#2a3830",lineHeight:1.75}}>
                  · Get as close as safely possible — fill the frame with the subject<br/>
                  · Use natural light; avoid harsh flash which washes out colors<br/>
                  · For plants: photograph leaves, flowers, bark, and overall shape<br/>
                  · For birds/animals: capture any distinctive markings or patterns<br/>
                  · Multiple angles help — especially for insects and small flowers
                </div>
              </div>
            )}
          </>)}

          {/* ── TEXT MODE ── */}
          {aiMode==="text" && (<>
            <div className="ex-label">Try an example</div>
            <div className="ex-chips">
              {EXAMPLE_QUERIES.map(q=>(
                <div key={q} className="ex-chip" onClick={()=>setAiQuery(q)}>{q}</div>
              ))}
            </div>
            <textarea className="ai-textarea"
              placeholder="e.g. 'Medium hawk with rusty red tail, hovering over an Ohio field in October, streaky brown breast, about crow-sized…'"
              value={aiQuery} onChange={e=>setAiQuery(e.target.value)}
              onKeyDown={e=>{ if(e.key==="Enter"&&e.metaKey) runAI(); }}/>
            <button className="ai-btn" onClick={runAI} disabled={aiLoading||!aiQuery.trim()}>
              {aiLoading?<><Spinner/>Identifying…</>:"Identify Species"}
            </button>
          </>)}

          {/* Usage limit warning */}
          {!isPro && remainingFree <= FREE_AI_LIMIT && remainingFree > 0 && (
            <div className="limit-warn">
              <span className="limit-warn-icon">⚠️</span>
              <span>
                <strong>{remainingFree} free identification{remainingFree!==1?"s":""} remaining</strong> this session.{" "}
                <span className="limit-warn-link" onClick={openUpgrade}>Upgrade to Pro</span> for unlimited access.
              </span>
            </div>
          )}

          {aiResult && <>
            <div className="ai-result">{renderAiResult(aiResult)}</div>
            <AdSlotInline/>
          </>}
        </div>
      )}

      {/* ══ ABOUT ════════════════════════════════════════════════════════ */}
      {tab==="About" && (
        <div className="about-wrap">
          <h2>About Native Ground</h2>
          <p>Native Ground is a conservation-focused field guide and habitat advisor covering all native species across the United States — from wildflowers and ferns to mammals, birds, fish, reptiles, amphibians, and insects. Our mission is to help people discover, identify, and restore the native species and habitats that make America's landscapes thrive.</p>
          <h3>Species Categories</h3>
          <div className="about-cats">
            {CATEGORIES.filter(c=>c.id!=="all").map(c=>(
              <div key={c.id} className="about-cat"><div className="about-cat-icon">{c.icon}</div><div className="about-cat-name">{c.label}</div></div>
            ))}
          </div>
          <h3>Habitat Advisor</h3>
          <p>Enter any native species, your state, property type, and size to receive a full habitat improvement plan — from quick 30-day wins to multi-year management strategies. Plans cover native plantings, invasive removal, water features, nesting structures, seasonal calendars, and relevant certification programs.</p>
          <h3>How to Use</h3>
          <p><strong>Native:</strong> Browse native plants by state, category, habitat and season. Click any card for a full field guide entry with 7 tabbed sections of detailed information.</p>
          <p><strong>Invasive:</strong> Search for invasive species threatening your area. Each card shows identification, origin, spread, ecological impact, and control methods.</p>
          <p><strong>Wildlife:</strong> Explore native mammals, birds, fish, reptiles, amphibians, and insects by state and habitat.</p>
          <p><strong>AI Identifier:</strong> Upload a photo or describe a field observation to get expert species identification.</p>
          <h3>Free vs Pro</h3>
          <p>The free version is supported by generic advertising and includes {FREE_AI_LIMIT} AI identifications per session. <strong>Pro</strong> ({"$"}{PRO_PRICE_MONTHLY}/month or {"$"}{PRO_PRICE_YEARLY}/year) gives you unlimited identifications, unlimited habitat plans, a completely ad-free experience, and priority AI speed.</p>
          {!isPro && <button className="upgrade-cta" style={{marginTop:12}} onClick={openUpgrade}>Upgrade to Pro →</button>}
          {isPro && <div style={{background:"#eaf5e4",border:"1px solid #b8d8a0",borderRadius:3,padding:"12px 16px",marginTop:12,fontSize:13,color:"#2a4a1e"}}>🌿 You're a Native Ground Pro member — enjoy unlimited access!</div>}
          <p>All species information is generated by AI using comprehensive biological, ecological, and restoration literature, enriched with real photos from iNaturalist and verified occurrence records from GBIF. For critical conservation decisions, cross-reference with USDA PLANTS, eBird, iNaturalist, or NatureServe.</p>
        </div>
      )}

      {/* ══ MODAL ════════════════════════════════════════════════════════ */}
      {selected && (() => {
        const cm = getCatMeta(selected.category);
        const d = detailData;
        const TABS_FG = selected.isInvasive ? [
          {id:"overview",      label:"Overview"},
          {id:"identification",label:"Identification"},
          {id:"spread",        label:"Spread & Impact"},
          {id:"control",       label:"Control & Removal"},
        ] : [
          {id:"overview",      label:"Overview"},
          {id:"identification",label:"Identification"},
          {id:"range",         label:"Range & Habitat"},
          {id:"behavior",      label:"Behavior"},
          {id:"reproduction",  label:"Reproduction"},
          {id:"conservation",  label:"Conservation"},
          {id:"fieldnotes",    label:"Field Notes"},
        ];
        return (
          <div className="overlay" onClick={()=>setSelected(null)}>
            <div className="modal" onClick={e=>e.stopPropagation()}>

              {/* PHOTO GALLERY */}
              <div style={{position:"relative",height:220,background:"#111",overflow:"hidden",flexShrink:0}}>
                {inatLoading && !inatPhotos.length ? (
                  <div className="modal-ph" style={{background:cm.color+"18"}}>
                    <span>{cm.icon}</span>
                  </div>
                ) : inatPhotos.length > 0 ? (
                  <img src={inatPhotos[activePhoto]?.url} alt={selected.name}
                    style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}
                    onError={e=>{ e.target.style.display="none"; }}/>
                ) : (
                  <div className="modal-ph" style={{background:cm.color+"18"}}>
                    <span>{cm.icon}</span>
                  </div>
                )}
                {inatPhotos.length > 1 && <>
                  <button className="photo-nav-btn" style={{left:10}}
                    onClick={()=>setActivePhoto(i=>Math.max(0,i-1))}>‹</button>
                  <button className="photo-nav-btn" style={{right:10}}
                    onClick={()=>setActivePhoto(i=>Math.min(inatPhotos.length-1,i+1))}>›</button>
                  <div className="photo-counter-badge">{activePhoto+1} / {inatPhotos.length}</div>
                </>}
              </div>

              {/* Photo attribution + thumbs */}
              {inatPhotos.length > 0 && (
                <div>
                  <div className="photo-attr-bar">
                    <span>{inatPhotos[activePhoto]?.attribution?.replace(/\(c\)/gi,"©")?.slice(0,55)}</span>
                    <a href={inatPhotos[activePhoto]?.obsUrl} target="_blank" rel="noopener noreferrer">
                      iNaturalist ↗
                    </a>
                  </div>
                  {inatPhotos.length > 1 && (
                    <div className="photo-thumbs-row">
                      {inatPhotos.map((p,i)=>(
                        <div key={i} className={`photo-thumb-btn${activePhoto===i?" active":""}`}
                          onClick={()=>setActivePhoto(i)}>
                          <img src={p.url?.replace("medium","square")||p.url} alt=""
                            onError={e=>e.target.style.display="none"}/>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Close button */}
              <button className="modal-close" onClick={()=>setSelected(null)}>✕</button>

              {/* Header */}
              <div className="modal-hdr">
                <div className="cpill" style={{marginBottom:8}}>{cm.icon} {cm.label}</div>
                {d?.conservation?.status && <ConsBadge status={d.conservation.status}/>}
                <div className="modal-name">{selected.name}</div>
                <div className="modal-latin">{selected.latin}</div>

                {/* Field Guide Tabs */}
                <div className="fg-tabs">
                  {TABS_FG.map(t=>(
                    <div key={t.id}
                      className={`fg-tab${detailTab===t.id?" active":""}`}
                      onClick={()=>setDetailTab(t.id)}>
                      {t.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="fg-body">
                {detailLoading && !d ? (
                  <div style={{textAlign:"center",padding:"32px 0",color:"var(--stone)"}}>
                    <Spinner/>Loading field guide data…
                  </div>
                ) : d ? (<>

                  {/* ── OVERVIEW ── */}
                  {detailTab==="overview" && (
                    <div>
                      <div className="fg-overview">{d.overview}</div>
                      <div className="fg-grid">
                        {selected.size && <div className="fg-fact"><div className="fg-fact-lbl">Size</div><div className="fg-fact-val">{selected.size}</div></div>}
                        {d.identification?.size && <div className="fg-fact"><div className="fg-fact-lbl">Measurements</div><div className="fg-fact-val">{d.identification.size}</div></div>}
                        {selected.season && <div className="fg-fact"><div className="fg-fact-lbl">Active Season</div><div className="fg-fact-val">{selected.season}</div></div>}
                        {d.field_notes?.best_time && <div className="fg-fact"><div className="fg-fact-lbl">Best Time to Observe</div><div className="fg-fact-val">{d.field_notes.best_time}</div></div>}
                        {selected.habitat && <div className="fg-fact full"><div className="fg-fact-lbl">Habitat</div><div className="fg-fact-val">{selected.habitat}</div></div>}
                      </div>
                      {d.field_notes?.interesting_fact && (
                        <div className="fg-highlight">
                          <div className="fg-highlight-lbl">🌿 Did You Know?</div>
                          <div className="fg-highlight-val">{d.field_notes.interesting_fact}</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── IDENTIFICATION ── */}
                  {detailTab==="identification" && d.identification && (
                    <div>
                      <div className="fg-section">
                        <div className="fg-section-title">🔍 Physical Description</div>
                        <div className="fg-grid">
                          {d.identification.size && <div className="fg-fact"><div className="fg-fact-lbl">Size &amp; Measurements</div><div className="fg-fact-val">{d.identification.size}</div></div>}
                          {d.identification.shape && <div className="fg-fact"><div className="fg-fact-lbl">Shape &amp; Build</div><div className="fg-fact-val">{d.identification.shape}</div></div>}
                          {d.identification.coloration && <div className="fg-fact full"><div className="fg-fact-lbl">Coloration</div><div className="fg-fact-val">{d.identification.coloration}</div></div>}
                          {d.identification.markings && <div className="fg-fact full"><div className="fg-fact-lbl">Distinctive Markings</div><div className="fg-fact-val">{d.identification.markings}</div></div>}
                          {d.identification.seasonal_variation && <div className="fg-fact full"><div className="fg-fact-lbl">Seasonal Variation</div><div className="fg-fact-val">{d.identification.seasonal_variation}</div></div>}
                          {d.identification.voice && <div className="fg-fact full"><div className="fg-fact-lbl">Voice / Calls / Sounds</div><div className="fg-fact-val">{d.identification.voice}</div></div>}
                        </div>
                      </div>
                      {d.field_notes?.similar_species && (
                        <div className="fg-section">
                          <div className="fg-section-title">⚠️ Similar Species</div>
                          <div className="fg-fact full" style={{marginTop:0}}>
                            <div className="fg-fact-val">{d.field_notes.similar_species}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── RANGE & HABITAT ── */}
                  {detailTab==="range" && (
                    <div>
                      {d.range && (
                        <div className="fg-section">
                          <div className="fg-section-title">📍 Native Range</div>
                          <div className="fg-grid">
                            {d.range.core_range && <div className="fg-fact full"><div className="fg-fact-lbl">Core Range</div><div className="fg-fact-val">{d.range.core_range}</div></div>}
                            {d.range.migration && <div className="fg-fact full"><div className="fg-fact-lbl">Migration / Resident Status</div><div className="fg-fact-val">{d.range.migration}</div></div>}
                            {d.range.elevation && <div className="fg-fact"><div className="fg-fact-lbl">Elevation Range</div><div className="fg-fact-val">{d.range.elevation}</div></div>}
                          </div>
                          {d.range.native_states && (
                            <div style={{marginTop:12}}>
                              <div className="fg-fact-lbl" style={{marginBottom:8}}>Native States</div>
                              <div className="fg-state-chips">
                                {d.range.native_states.split(/,|;/).map((s,i)=>(
                                  <span key={i} className="fg-state-chip">{s.trim()}</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      {d.habitat && (
                        <div className="fg-section">
                          <div className="fg-section-title">🏕 Habitat Requirements</div>
                          <div className="fg-grid">
                            {d.habitat.preferred && <div className="fg-fact full"><div className="fg-fact-lbl">Preferred Habitat</div><div className="fg-fact-val">{d.habitat.preferred}</div></div>}
                            {d.habitat.microhabitat && <div className="fg-fact full"><div className="fg-fact-lbl">Microhabitat</div><div className="fg-fact-val">{d.habitat.microhabitat}</div></div>}
                            {d.habitat.nesting_denning && <div className="fg-fact full"><div className="fg-fact-lbl">Nesting / Denning / Roosting</div><div className="fg-fact-val">{d.habitat.nesting_denning}</div></div>}
                            {d.habitat.territory && <div className="fg-fact full"><div className="fg-fact-lbl">Territory</div><div className="fg-fact-val">{d.habitat.territory}</div></div>}
                          </div>
                        </div>
                      )}
                      {/* GBIF occurrence data */}
                      {gbifData && (
                        <div className="fg-section">
                          <div className="fg-section-title">📊 Occurrence Records <span style={{fontSize:11,fontWeight:400,color:"var(--stone)",fontFamily:"'DM Sans',sans-serif"}}>via GBIF</span></div>
                          <div className="fg-grid">
                            <div className="fg-fact"><div className="fg-fact-lbl">US Records</div><div className="fg-fact-val" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:"var(--moss)"}}>{gbifData.totalOccurrences.toLocaleString()}</div></div>
                            <div className="fg-fact"><div className="fg-fact-lbl">Last Recorded</div><div className="fg-fact-val" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:700,color:"var(--moss)"}}>{gbifData.recentSightings[0]?.date?.slice(0,4)||"—"}</div></div>
                          </div>
                          {gbifData.topStates.length > 0 && (
                            <div style={{marginTop:10}}>
                              <div className="fg-fact-lbl" style={{marginBottom:8}}>Top States by Records</div>
                              {gbifData.topStates.map((s,i)=>{
                                const max = gbifData.topStates[0].count;
                                return (
                                  <div key={i} className="state-bar-row">
                                    <div className="state-bar-name">{s.state}</div>
                                    <div className="state-bar-track"><div className="state-bar-fill" style={{width:`${Math.round((s.count/max)*100)}%`}}/></div>
                                    <div className="state-bar-count">{s.count.toLocaleString()}</div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── BEHAVIOR ── */}
                  {detailTab==="behavior" && d.behavior && (
                    <div>
                      <div className="fg-section">
                        <div className="fg-section-title">🦎 Behavior &amp; Ecology</div>
                        <div className="fg-grid">
                          {d.behavior.activity && <div className="fg-fact full"><div className="fg-fact-lbl">Activity Patterns</div><div className="fg-fact-val">{d.behavior.activity}</div></div>}
                          {d.behavior.feeding && <div className="fg-fact full"><div className="fg-fact-lbl">Diet &amp; Feeding</div><div className="fg-fact-val">{d.behavior.feeding}</div></div>}
                          {d.behavior.social && <div className="fg-fact full"><div className="fg-fact-lbl">Social Behavior</div><div className="fg-fact-val">{d.behavior.social}</div></div>}
                          {d.behavior.defense && <div className="fg-fact full"><div className="fg-fact-lbl">Defense &amp; Predator Avoidance</div><div className="fg-fact-val">{d.behavior.defense}</div></div>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── REPRODUCTION ── */}
                  {detailTab==="reproduction" && d.reproduction && (
                    <div>
                      <div className="fg-section">
                        <div className="fg-section-title">🥚 Reproduction &amp; Life Cycle</div>
                        <div className="fg-grid">
                          {d.reproduction.season && <div className="fg-fact full"><div className="fg-fact-lbl">Breeding / Flowering Season</div><div className="fg-fact-val">{d.reproduction.season}</div></div>}
                          {d.reproduction.courtship && <div className="fg-fact full"><div className="fg-fact-lbl">Courtship / Pollination</div><div className="fg-fact-val">{d.reproduction.courtship}</div></div>}
                          {d.reproduction.young && <div className="fg-fact full"><div className="fg-fact-lbl">Young / Seeds / Eggs</div><div className="fg-fact-val">{d.reproduction.young}</div></div>}
                          {d.reproduction.lifespan && <div className="fg-fact"><div className="fg-fact-lbl">Lifespan</div><div className="fg-fact-val">{d.reproduction.lifespan}</div></div>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── CONSERVATION ── */}
                  {detailTab==="conservation" && d.conservation && (
                    <div>
                      <div className="fg-section">
                        <div className="fg-section-title">🛡 Conservation Status</div>
                        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
                          {d.conservation.status && <ConsBadge status={d.conservation.status}/>}
                          {d.conservation.population_trend && (
                            <span className={
                              d.conservation.population_trend.toLowerCase().includes("increas") ? "fg-trend-up" :
                              d.conservation.population_trend.toLowerCase().includes("decreas") ? "fg-trend-down" :
                              "fg-trend-stable"
                            }>
                              {d.conservation.population_trend.toLowerCase().includes("increas") ? "▲ " :
                               d.conservation.population_trend.toLowerCase().includes("decreas") ? "▼ " : "● "}
                              {d.conservation.population_trend}
                            </span>
                          )}
                        </div>
                        <div className="fg-grid">
                          {d.conservation.threats && <div className="fg-fact full"><div className="fg-fact-lbl">Current Threats</div><div className="fg-fact-val">{d.conservation.threats}</div></div>}
                          {d.conservation.protected && <div className="fg-fact full"><div className="fg-fact-lbl">Legal Protections</div><div className="fg-fact-val">{d.conservation.protected}</div></div>}
                        </div>
                        {d.conservation.what_you_can_do && (
                          <div className="fg-highlight">
                            <div className="fg-highlight-lbl">What You Can Do</div>
                            <div className="fg-highlight-val">{d.conservation.what_you_can_do}</div>
                          </div>
                        )}
                      </div>
                      <div style={{marginTop:16,textAlign:"center"}}>
                        <button className="advisor-btn"
                          onClick={()=>{ setTab("Habitat Advisor"); setHabSpecies(selected.name); setSelected(null); }}>
                          🌿 Open Habitat Improvement Plan
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── FIELD NOTES ── */}
                  {detailTab==="fieldnotes" && d.field_notes && (
                    <div>
                      <div className="fg-section">
                        <div className="fg-section-title">📓 Expert Field Notes</div>
                        <div className="fg-grid">
                          {d.field_notes.best_time && <div className="fg-fact full"><div className="fg-fact-lbl">Best Time to Observe</div><div className="fg-fact-val">{d.field_notes.best_time}</div></div>}
                          {d.field_notes.best_places && <div className="fg-fact full"><div className="fg-fact-lbl">Best Places to Find</div><div className="fg-fact-val">{d.field_notes.best_places}</div></div>}
                        </div>
                      </div>
                      {d.field_notes.tips && (
                        <div className="fg-section">
                          <div className="fg-section-title">💡 Identification Tips</div>
                          <div className="fg-tip-list">
                            {d.field_notes.tips.split(/\.\s+|\n/).filter(t=>t.trim().length>10).map((tip,i)=>(
                              <div key={i} className="fg-tip">
                                <div className="fg-tip-dot"/>
                                <div>{tip.trim()}{tip.trim().endsWith(".")?"":" ."}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {d.field_notes.similar_species && (
                        <div className="fg-section">
                          <div className="fg-section-title">⚠️ Telling Apart Similar Species</div>
                          <div className="fg-fact full" style={{marginTop:0}}>
                            <div className="fg-fact-val">{d.field_notes.similar_species}</div>
                          </div>
                        </div>
                      )}
                      {/* Habitat tips */}
                      <div className="fg-section">
                        <div className="fg-section-title">🌿 Habitat Tips</div>
                        <div className="habitat-quick-btns">
                          {PROPERTY_TYPES.map(p=>(
                            <div key={p.id}
                              className={`hq-btn${modalHabProp===p.id?" active":""}`}
                              onClick={()=>{ setModalHabProp(p.id); setModalHabResult(""); }}>
                              {p.icon} {p.label.split("/")[0].trim()}
                            </div>
                          ))}
                        </div>
                        <button className="advisor-btn" style={{marginBottom:10,padding:"8px 16px",fontSize:10}}
                          onClick={()=>fetchModalHabitat(selected, modalHabProp)} disabled={modalHabLoading}>
                          {modalHabLoading?<><Spinner teal/>Loading…</>:"Get Habitat Tips"}
                        </button>
                        {modalHabResult && (
                          <div className="habitat-result">
                            {modalHabResult.split("\n").filter(l=>l.trim()).map((line,i)=>(
                              <div key={i} className="action-item">
                                <div className="action-dot"/>
                                <div className="action-text">{line.replace(/^\d+\.\s*/,"")}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ── INVASIVE: SPREAD & IMPACT ── */}
                  {detailTab==="spread" && selected.isInvasive && (
                    <div>
                      <div className="fg-section">
                        <div className="fg-section-title" style={{color:"#b03020"}}>🌍 Origin &amp; Spread</div>
                        <div className="fg-grid">
                          {selected.origin && <div className="fg-fact full"><div className="fg-fact-lbl">Native Origin</div><div className="fg-fact-val">{selected.origin}</div></div>}
                          {selected.spread && <div className="fg-fact full"><div className="fg-fact-lbl">How It Spreads</div><div className="fg-fact-val">{selected.spread}</div></div>}
                        </div>
                      </div>
                      {selected.impact && (
                        <div className="fg-section">
                          <div className="fg-section-title" style={{color:"#b03020"}}>⚠️ Ecological Impact</div>
                          <div className="fg-fact full" style={{borderColor:"#f0c8c0",background:"#fdf0ee"}}>
                            <div className="fg-fact-val" style={{color:"#8a2010"}}>{selected.impact}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── INVASIVE: CONTROL ── */}
                  {detailTab==="control" && selected.isInvasive && (
                    <div>
                      <div className="fg-section">
                        <div className="fg-section-title" style={{color:"#2d6b1a"}}>🛠 Control &amp; Removal</div>
                        {selected.control && (
                          <div className="fg-fact full" style={{borderColor:"#c8ddb8",background:"#f0f8ec"}}>
                            <div className="fg-fact-val" style={{color:"#2a3820"}}>{selected.control}</div>
                          </div>
                        )}
                        {d?.conservation?.what_you_can_do && (
                          <div className="fg-highlight" style={{marginTop:14}}>
                            <div className="fg-highlight-lbl">What You Can Do</div>
                            <div className="fg-highlight-val">{d.conservation.what_you_can_do}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// CSS var helpers (avoid template literal issues in JSX)

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  if (!unlocked) return <BetaGate onUnlock={() => setUnlocked(true)} />;
  return <FieldGuide />;
}
