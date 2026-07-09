(function(){
  const deck = window.AGENT_DECK;
  const agents = deck.agents;
  const pageId = document.body.dataset.page || 'command';
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const state = { charts: [], timers: [], scenario: 'simulate', tick: 0 };

  function hashSeed(str){
    let h=2166136261;
    for(let i=0;i<str.length;i++){h^=str.charCodeAt(i); h+= (h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24);}
    return Math.abs(h>>>0);
  }
  function seededRand(seed){
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }
  function fmt(n){ return Number.isInteger(n) ? n : n.toFixed(1); }
  function now(){ return new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', second:'2-digit'}); }
  function clamp(v,a,b){return Math.max(a,Math.min(b,v));}

  function iconLetters(agent){ return agent.short.split(/\s|\+/).filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase(); }

  function buildShell(){
    const sidebar = $('#sidebar');
    if(!sidebar) return;
    const nav = agents.map((a, i)=>`
      <a class="nav-link ${pageId===a.id?'active':''}" href="${a.file}">
        <span class="nav-num">${String(i+1).padStart(2,'0')}</span>
        <span><span class="nav-name">${a.short}</span><span class="nav-cat">${a.category}</span></span>
        <span class="nav-status"></span>
      </a>`).join('');
    sidebar.innerHTML = `
      <div class="logo-row">
        <a class="logo-mark" href="index.html"><span class="aionos">AIONOS</span><span class="cross">×</span><span class="kyndryl">Kyndryl</span></a>
        <span class="pill">Live demo</span>
      </div>
      <div class="nav-title">Command</div>
      <a class="nav-link ${pageId==='command'?'active':''}" href="index.html">
        <span class="nav-num">00</span>
        <span><span class="nav-name">Governance Command Center</span><span class="nav-cat">All manufacturing agents</span></span>
        <span class="nav-status"></span>
      </a>
      <div class="nav-title">12 manufacturing agents</div>
      ${nav}
      <div class="nav-title">Operating model</div>
      <div class="panel" style="background:rgba(255,255,255,.06);box-shadow:none;border-color:rgba(255,255,255,.10);padding:14px;border-radius:18px;color:#d9d9d9">
        <b style="color:#fff">Sense → predict → recommend → approve → act → learn</b>
        <div style="font-size:12px;line-height:1.45;color:#aaa;margin-top:8px">Every view runs with synthetic live data to demonstrate governed human-in-the-loop intelligence for manufacturing clients.</div>
      </div>`;
  }

  function renderTopbar(title){
    const top = $('#topbar');
    if(!top) return;
    top.innerHTML = `
      <button class="ghost-btn mobile-menu" id="menuBtn">☰ Menu</button>
      <div><div class="eyebrow">${deck.brand.theme}</div></div>
      <div class="top-actions">
        <button class="ghost-btn" data-global="pulse">Pulse agents</button>
        <button class="primary-btn" data-global="audit">Run governance audit</button>
      </div>`;
    $('#menuBtn')?.addEventListener('click', () => $('#sidebar')?.classList.toggle('open'));
    $$('[data-global]').forEach(btn => btn.addEventListener('click', () => {
      if(btn.dataset.global==='audit') globalAudit(); else pulseAll();
    }));
  }

  function toast(text){
    let t = $('#toast');
    if(!t){
      t = document.createElement('div'); t.id='toast'; t.className='toast'; document.body.appendChild(t);
    }
    t.textContent = text;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(()=>t.classList.remove('show'), 3200);
  }

  function pulseAll(){
    $$('.agent-card,.metric-card,.chart-card,.panel').forEach((el,i)=>{
      setTimeout(()=>{ el.style.transform='translateY(-3px)'; setTimeout(()=>el.style.transform='',260); }, i*25);
    });
    addLog('system','All visible agents pulsed. Live telemetry is recalculating confidence and risk.');
    toast('Live agent pulse triggered across visible canvases.');
  }
  function globalAudit(){
    addLog('governance','Policy audit complete: 12/12 agents have human approval and explainability enabled.');
    toast('Governance audit complete: no critical policy breaches.');
    const audit = $('#auditSummary');
    if(audit){ audit.innerHTML = '<b>Audit clean.</b> 12 agents policy-controlled, 12 explainable, 12 with approval thresholds.'; }
  }

  function addLog(type, msg){
    const log = $('#eventLog');
    if(!log) return;
    const line = document.createElement('div');
    line.className='event-line';
    line.innerHTML = `<span class="time">${now()}</span> <span class="sev">${type.toUpperCase()}</span> ${msg}`;
    log.prepend(line);
    while(log.children.length>60) log.removeChild(log.lastChild);
  }

  function createSeries(seed, count=44, base=55, volatility=10){
    const arr=[];
    for(let i=0;i<count;i++){
      const wave = Math.sin((i+seed%13)/4)*volatility;
      const rand = (seededRand(seed+i)*2-1)*volatility*.75;
      arr.push(clamp(base+wave+rand, 4, 98));
    }
    return arr;
  }

  function drawLineChart(canvas, series, opts={}){
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, rect.width*dpr); canvas.height = Math.max(1, rect.height*dpr);
    ctx.scale(dpr,dpr);
    const w=rect.width,h=rect.height,p=opts.padding||22;
    ctx.clearRect(0,0,w,h);
    const grad=ctx.createLinearGradient(0,0,w,h); grad.addColorStop(0,'rgba(255,70,46,.12)'); grad.addColorStop(1,'rgba(0,166,166,.10)');
    ctx.fillStyle=grad; ctx.fillRect(0,0,w,h);
    ctx.strokeStyle='rgba(0,0,0,.06)'; ctx.lineWidth=1;
    for(let i=0;i<5;i++){ const y=p+i*(h-2*p)/4; ctx.beginPath(); ctx.moveTo(p,y); ctx.lineTo(w-p,y); ctx.stroke(); }
    for(let i=0;i<6;i++){ const x=p+i*(w-2*p)/5; ctx.beginPath(); ctx.moveTo(x,p); ctx.lineTo(x,h-p); ctx.stroke(); }
    const min=Math.min(...series)-5, max=Math.max(...series)+5;
    const xAt=i=>p+i*(w-2*p)/(series.length-1);
    const yAt=v=>h-p-(v-min)/(max-min)*(h-2*p);
    const fill=ctx.createLinearGradient(0,p,0,h-p); fill.addColorStop(0,'rgba(255,70,46,.25)'); fill.addColorStop(1,'rgba(0,166,166,.04)');
    ctx.beginPath(); series.forEach((v,i)=> i?ctx.lineTo(xAt(i),yAt(v)):ctx.moveTo(xAt(i),yAt(v))); ctx.lineTo(w-p,h-p); ctx.lineTo(p,h-p); ctx.closePath(); ctx.fillStyle=fill; ctx.fill();
    ctx.beginPath(); series.forEach((v,i)=> i?ctx.lineTo(xAt(i),yAt(v)):ctx.moveTo(xAt(i),yAt(v))); ctx.strokeStyle=opts.color||'#ff462e'; ctx.lineWidth=3; ctx.stroke();
    ctx.beginPath(); series.forEach((v,i)=>{ if(i%7===0 || i===series.length-1){ctx.moveTo(xAt(i)+4,yAt(v)); ctx.arc(xAt(i),yAt(v),4,0,Math.PI*2);} }); ctx.fillStyle=opts.dot||'#00a6a6'; ctx.fill();
    ctx.fillStyle='rgba(16,16,16,.72)'; ctx.font='700 11px Inter, Arial';
    if(opts.label) ctx.fillText(opts.label, p, 16);
  }

  function drawBars(canvas, values, labels=[]){
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect(); canvas.width=rect.width*dpr; canvas.height=rect.height*dpr; ctx.scale(dpr,dpr);
    const w=rect.width,h=rect.height,p=24;
    ctx.clearRect(0,0,w,h); ctx.fillStyle='#fff'; ctx.fillRect(0,0,w,h);
    ctx.strokeStyle='rgba(0,0,0,.06)'; for(let i=0;i<4;i++){const y=p+i*(h-2*p)/3;ctx.beginPath();ctx.moveTo(p,y);ctx.lineTo(w-p,y);ctx.stroke();}
    const bw=(w-2*p)/(values.length*1.7); const gap=bw*.7; const max=Math.max(...values,100);
    values.forEach((v,i)=>{
      const x=p+i*(bw+gap)+gap; const bh=(v/max)*(h-2*p); const y=h-p-bh;
      const g=ctx.createLinearGradient(0,y,0,h-p); g.addColorStop(0, i%2?'#00a6a6':'#ff462e'); g.addColorStop(1,'rgba(255,70,46,.25)');
      ctx.fillStyle=g; roundRect(ctx,x,y,bw,bh,7); ctx.fill();
      ctx.fillStyle='#111'; ctx.font='800 11px Inter, Arial'; ctx.fillText(String(Math.round(v)),x,y-6);
      if(labels[i]){ctx.fillStyle='#777';ctx.font='700 10px Inter, Arial';ctx.fillText(labels[i].slice(0,8),x,h-8);}
    });
  }

  function drawDonut(canvas, value, label='Trust'){
    if(!canvas) return;
    const ctx=canvas.getContext('2d'); const dpr=window.devicePixelRatio||1; const rect=canvas.getBoundingClientRect(); canvas.width=rect.width*dpr; canvas.height=rect.height*dpr; ctx.scale(dpr,dpr);
    const w=rect.width,h=rect.height,cx=w/2,cy=h/2,r=Math.min(w,h)*.34;
    ctx.clearRect(0,0,w,h); ctx.fillStyle='#fff'; ctx.fillRect(0,0,w,h);
    ctx.lineWidth=18; ctx.strokeStyle='rgba(0,0,0,.08)'; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.stroke();
    const grad=ctx.createLinearGradient(cx-r,cy-r,cx+r,cy+r); grad.addColorStop(0,'#ff462e'); grad.addColorStop(1,'#00a6a6'); ctx.strokeStyle=grad; ctx.lineCap='round'; ctx.beginPath(); ctx.arc(cx,cy,r,-Math.PI/2,-Math.PI/2+Math.PI*2*value/100); ctx.stroke();
    ctx.fillStyle='#111'; ctx.font='1000 32px Inter, Arial'; ctx.textAlign='center'; ctx.fillText(`${Math.round(value)}%`,cx,cy+8); ctx.font='800 11px Inter, Arial'; ctx.fillStyle='#777'; ctx.fillText(label.toUpperCase(),cx,cy+28); ctx.textAlign='left';
  }

  function drawNetwork(canvas){
    if(!canvas) return;
    const ctx=canvas.getContext('2d'); const dpr=window.devicePixelRatio||1; const rect=canvas.getBoundingClientRect(); canvas.width=rect.width*dpr; canvas.height=rect.height*dpr; ctx.scale(dpr,dpr);
    const w=rect.width,h=rect.height; ctx.clearRect(0,0,w,h);
    const grad=ctx.createRadialGradient(w*.55,h*.5,10,w*.5,h*.5,w*.65); grad.addColorStop(0,'rgba(255,70,46,.40)'); grad.addColorStop(.45,'rgba(0,166,166,.22)'); grad.addColorStop(1,'rgba(255,255,255,.03)'); ctx.fillStyle=grad; ctx.fillRect(0,0,w,h);
    const nodes = agents.map((a,i)=>{ const angle=(Math.PI*2/agents.length)*i + state.tick*.006; const r=Math.min(w,h)*.34 + Math.sin(state.tick*.03+i)*7; return {x:w/2+Math.cos(angle)*r,y:h/2+Math.sin(angle)*r,a}; });
    // center
    ctx.strokeStyle='rgba(255,255,255,.16)'; ctx.lineWidth=1;
    nodes.forEach((n,i)=>{ ctx.beginPath(); ctx.moveTo(w/2,h/2); ctx.lineTo(n.x,n.y); ctx.stroke(); if(i%3===0){const m=nodes[(i+4)%nodes.length];ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();}});
    ctx.beginPath(); ctx.arc(w/2,h/2,44+Math.sin(state.tick*.04)*5,0,Math.PI*2); ctx.fillStyle='rgba(255,70,46,.95)'; ctx.fill(); ctx.strokeStyle='rgba(255,255,255,.35)'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='#fff'; ctx.font='1000 13px Inter, Arial'; ctx.textAlign='center'; ctx.fillText('GOVERN',w/2,h/2+4);
    nodes.forEach((n,i)=>{ const active=Math.sin(state.tick*.05+i)>-.3; ctx.beginPath(); ctx.arc(n.x,n.y,active?13:10,0,Math.PI*2); ctx.fillStyle=active?'#00a6a6':'#ff462e'; ctx.fill(); ctx.strokeStyle='rgba(255,255,255,.5)'; ctx.stroke(); ctx.fillStyle='#fff'; ctx.font='900 9px Inter,Arial'; ctx.fillText(String(i+1),n.x,n.y+3); });
    ctx.textAlign='left';
    state.tick++;
  }

  function roundRect(ctx,x,y,w,h,r){
    const rr=Math.min(r,w/2,h/2); ctx.beginPath(); ctx.moveTo(x+rr,y); ctx.arcTo(x+w,y,x+w,y+h,rr); ctx.arcTo(x+w,y+h,x,y+h,rr); ctx.arcTo(x,y+h,x,y,rr); ctx.arcTo(x,y,x+w,y,rr); ctx.closePath();
  }

  function initCanvasLoop(){
    function loop(){
      $$('.spark').forEach((c,idx)=>{
        const seed=hashSeed((c.dataset.seed||'spark')+idx+Math.floor(state.tick/3));
        drawLineChart(c, createSeries(seed, 20, 55+(seed%25), 6), {padding:8, color: idx%2?'#00a6a6':'#ff462e'});
      });
      drawNetwork($('#networkCanvas'));
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  function renderCommandCenter(){
    renderTopbar('Command Center');
    const main = $('#content');
    const cards = agents.map((a,i)=>`
      <a class="agent-card" href="${a.file}" data-agent-card="${a.id}">
        <div class="agent-top">
          <div><div class="agent-title">${a.name}</div><div class="agent-cat">${a.category} · ${a.mode}</div></div>
          <div class="agent-icon">${iconLetters(a)}</div>
        </div>
        <div class="agent-signal"><b>Live signal:</b> ${a.signal}</div>
        <canvas class="spark" data-seed="${a.id}"></canvas>
        <div class="agent-footer"><span class="live-dot">working · ${a.confidence}% confidence</span><span class="open-link">Open →</span></div>
      </a>`).join('');
    main.innerHTML = `
      <div class="topbar" id="topbar"></div>
      <section class="hero">
        <div class="hero-card">
          <div class="eyebrow">Agent Governance Command Center</div>
          <h1>One live cockpit for <span class="highlight">12 manufacturing agents</span>.</h1>
          <p class="lede">Show Kyndryl manufacturing clients how AIONOS adds a governed intelligence layer above existing enterprise and plant systems: sense, predict, recommend, approve, act and learn.</p>
          <div class="hero-meta">
            <div class="meta-chip"><strong>12</strong><span>domain agents</span></div>
            <div class="meta-chip"><strong>87%</strong><span>avg trust score</span></div>
            <div class="meta-chip"><strong>24/7</strong><span>synthetic live ops</span></div>
            <div class="meta-chip"><strong>HITL</strong><span>human-in-loop</span></div>
          </div>
        </div>
        <div class="command-visual">
          <canvas id="networkCanvas"></canvas>
          <div class="hud-strip">
            <div class="hud-stat"><b id="hudAlerts">18</b><span>open alerts</span></div>
            <div class="hud-stat"><b>12/12</b><span>governed</span></div>
            <div class="hud-stat"><b id="hudActions">146</b><span>actions queued</span></div>
            <div class="hud-stat"><b>0</b><span>critical breach</span></div>
          </div>
        </div>
      </section>
      <section class="grid-4">
        <div class="metric-card"><div class="mini-label">Factory</div><div class="value" id="m1">82%</div><div class="target">OEE protected by planning + maintenance agents</div><div class="bar"><span style="width:82%"></span></div></div>
        <div class="metric-card"><div class="mini-label">Warehouse</div><div class="value" id="m2">91%</div><div class="target">inventory confidence across WMS / RFID</div><div class="bar"><span style="width:91%"></span></div></div>
        <div class="metric-card"><div class="mini-label">Supply chain</div><div class="value" id="m3">87%</div><div class="target">OTIF risk actively orchestrated</div><div class="bar"><span style="width:87%"></span></div></div>
        <div class="metric-card"><div class="mini-label">Commercial</div><div class="value" id="m4">2.4%</div><div class="target">margin recovery opportunity surfaced</div><div class="bar"><span style="width:70%"></span></div></div>
      </section>
      <div class="section-title"><div><h2>Agent portfolio</h2><p>Every tile is clickable and has its own live page, controls, running graphs and explainability panel.</p></div><div class="top-actions"><button class="primary-btn" id="shockAll">Simulate multi-agent shock</button><button class="ghost-btn" id="clearRisks">Clear resolved risks</button></div></div>
      <section class="agent-grid">${cards}</section>
      <section class="two-col">
        <div class="chart-card"><div class="chart-head"><div><h3>Manufacturing agent throughput</h3><span>live recommendations / approvals / exceptions</span></div></div><canvas class="chart" id="fleetChart"></canvas></div>
        <div class="chart-card"><div class="chart-head"><div><h3>Governance event log</h3><span id="auditSummary">human approval · policy · lineage</span></div></div><div class="event-log" id="eventLog"></div></div>
      </section>
      <div class="footer-note"><span><b>AIONOS × Kyndryl</b> manufacturing command center · static GitHub Pages demo</span><span>All data is synthetic for client storytelling.</span></div>
    `;
    renderTopbar('Command Center');
    $('#shockAll').addEventListener('click',()=>{
      $('#hudAlerts').textContent = String(24 + Math.floor(Math.random()*8));
      $('#hudActions').textContent = String(180 + Math.floor(Math.random()*40));
      addLog('shock','Multi-agent shock injected: material delay, quality drift and route congestion. Agents are coordinating response.');
      toast('Shock scenario running across 12 agents.');
    });
    $('#clearRisks').addEventListener('click',()=>{
      $('#hudAlerts').textContent = '7'; $('#hudActions').textContent = '92'; addLog('resolve','Resolved risks cleared after supervisor approvals.'); toast('Resolved risks cleared.');
    });
    for(let i=0;i<6;i++) addLog(['governance','agent','policy'][i%3], ['Policy threshold checked for all agent actions.','Production Twin recommended line-loading action.','Quality Vision routed defect cluster to supervisor.','Fleet Routing predicted ETA drift in north lane.','P2P Document AI created evidence pack for PO mismatch.','Energy + ESG detected peak tariff risk.'][i]);
    let seed=991; const chart=$('#fleetChart'); let series=createSeries(seed,54,70,11);
    state.timers.push(setInterval(()=>{series.push(clamp(series[series.length-1]+(Math.random()*8-3),30,98)); if(series.length>54)series.shift(); drawLineChart(chart,series,{label:'Agent work rate', color:'#ff462e'});},900));
  }

  function renderAgentPage(agent){
    renderTopbar(agent.name);
    const main = $('#content');
    main.innerHTML = `
      <div class="topbar" id="topbar"></div>
      <section class="agent-hero">
        <div class="hero-card">
          <div class="agent-badge"><span></span>${agent.category} · ${agent.mode}</div>
          <h1>${agent.name}</h1>
          <p class="lede">${agent.tagline}</p>
          <div class="decision-flow"><div class="flow-step">Signals</div><div class="flow-step">AIONOS agent</div><div class="flow-step">Human approval</div><div class="flow-step">System action</div><div class="flow-step">Learning loop</div></div>
          <div class="hero-meta">
            <div class="meta-chip"><strong>${agent.confidence}%</strong><span>confidence</span></div>
            <div class="meta-chip"><strong>${agent.automation}%</strong><span>automation ready</span></div>
            <div class="meta-chip"><strong>${agent.risk}%</strong><span>risk index</span></div>
            <div class="meta-chip"><strong>${agent.impact.split(' ')[0]}</strong><span>${agent.impact.replace(agent.impact.split(' ')[0],'')}</span></div>
          </div>
        </div>
        <aside class="agent-control">
          <div class="mini-label" style="color:#aaa">Live agent trust</div>
          <div class="gauge-wrap"><div class="gauge" id="cssGauge"><div class="gauge-inner"><div><b id="trustValue">${agent.confidence}</b><span>trust</span></div></div></div></div>
          <div class="mini-label" style="color:#aaa">Active signal</div>
          <h3 style="color:#fff;margin-top:7px">${agent.signal}</h3>
          <p style="color:#bbb;font-size:13px;line-height:1.45;margin:0">Agent recommends; supervisor approves; all decisions are explainable and auditable.</p>
        </aside>
      </section>
      <section class="grid-4" id="kpiCards">${agent.kpis.map((k,i)=>`<div class="metric-card"><div class="mini-label">${k.label}</div><div class="value" data-kpi="${i}">${fmt(k.value)}${k.unit}</div><div class="target">${k.target}</div><div class="bar"><span style="width:${clamp(Number(k.value),12,96)}%"></span></div></div>`).join('')}</section>
      <section class="two-col">
        <div class="chart-card"><div class="chart-head"><div><h3>Live agent telemetry</h3><span>signal confidence, risk and action rate</span></div><span class="live-dot">working</span></div><canvas class="chart" id="liveChart"></canvas></div>
        <div class="chart-card"><div class="chart-head"><div><h3>Decision controls</h3><span>press to change views</span></div></div><div class="scenario-buttons">${agent.buttons.map((b,i)=>`<button class="${i===0?'active':''}" data-scenario="${b.scenario}">${b.label}</button>`).join('')}</div><div class="insight-box"><div class="title">Current intelligence view</div><div class="insight-text" id="insightText">${agent.views.simulate}</div></div></div>
      </section>
      <section class="two-col">
        <div class="chart-card"><div class="chart-head"><div><h3>Projected business impact</h3><span>changes when scenarios are pressed</span></div></div><canvas class="chart small-chart" id="barChart"></canvas></div>
        <div class="chart-card"><div class="chart-head"><div><h3>Agent trust score</h3><span>policy · data · explainability</span></div></div><canvas class="chart small-chart" id="donutChart"></canvas></div>
      </section>
      <section class="grid-3" style="margin-top:16px">
        <div class="panel"><h3>Acts on</h3><div class="list">${agent.actsOn.slice(0,6).map(x=>`<div class="list-item"><span class="list-dot"></span><span><b>${x}</b><span>monitored as an operational risk signal</span></span></div>`).join('')}</div></div>
        <div class="panel"><h3>How it works</h3><p class="lede" style="font-size:15px">${agent.how}</p><h3>Agent action</h3><p class="lede" style="font-size:15px">${agent.action}</p></div>
        <div class="panel"><h3>Live event log</h3><div class="event-log" id="eventLog"></div></div>
      </section>
      <section class="panel" style="margin-top:16px"><h3>Governance matrix</h3><div class="matrix"><div class="matrix-cell"><b>Human approval</b><span>High-impact actions are routed for supervisor approval before execution.</span></div><div class="matrix-cell"><b>Explainability</b><span>Every recommendation includes source signals and a decision trace.</span></div><div class="matrix-cell"><b>Audit trail</b><span>Signals, actions, approvals and outcomes are captured as evidence.</span></div><div class="matrix-cell"><b>Kyndryl fit</b><span>Runs above existing client systems and aligns to managed service governance.</span></div></div></section>
      <div class="footer-note"><span><b>AIONOS × Kyndryl</b> · ${agent.name}</span><span>Static demo · synthetic live data</span></div>
    `;
    renderTopbar(agent.name);
    initAgentInteractions(agent);
  }

  function initAgentInteractions(agent){
    const live=$('#liveChart'), bar=$('#barChart'), donut=$('#donutChart');
    const seed=hashSeed(agent.id);
    let series=createSeries(seed, 54, 62+(seed%24), 9);
    let barVals=agent.kpis.map(k=>clamp(Number(k.value) || 50, 12, 95));
    drawBars(bar, barVals, agent.kpis.map(k=>k.label)); drawDonut(donut, agent.confidence, 'Trust');
    function updateCharts(boost=0){
      series.push(clamp(series[series.length-1]+(Math.random()*8-3)+boost,18,99)); if(series.length>54) series.shift();
      drawLineChart(live, series, {label:agent.short+' telemetry', color:'#ff462e'});
      barVals = barVals.map((v,i)=>clamp(v + (Math.random()*6-2) + boost*(i%2?-.2:.2), 8, 99));
      drawBars(bar, barVals, agent.kpis.map(k=>k.label));
      const trust = clamp(agent.confidence + Math.sin(Date.now()/1600)*4 + boost, 55, 99); drawDonut(donut, trust, 'Trust'); $('#trustValue').textContent = Math.round(trust);
      $('#cssGauge').style.background = `conic-gradient(var(--red) 0deg, var(--teal) ${trust*3.6}deg, rgba(255,255,255,.09) ${trust*3.6}deg 360deg)`;
    }
    state.timers.push(setInterval(()=>updateCharts(0), 1000));
    agent.buttons.forEach(b=>addLog('agent', `${b.label} ready.`));
    $$('.scenario-buttons button').forEach(btn=>btn.addEventListener('click',()=>{
      $$('.scenario-buttons button').forEach(x=>x.classList.remove('active'));
      btn.classList.add('active');
      const sc=btn.dataset.scenario; $('#insightText').textContent = agent.views[sc];
      let boost = sc==='shock' ? -6 : sc==='approve' ? 5 : sc==='explain' ? 1 : 3;
      updateCharts(boost);
      const verbs = {simulate:'simulate', shock:'risk', approve:'approval', explain:'explain'};
      addLog(verbs[sc]||'agent', agent.views[sc]);
      toast(`${agent.short}: ${btn.textContent}`);
      $$('.metric-card .bar span').forEach((s,i)=>{ const width=clamp(parseFloat(s.style.width)||55 + boost*(i+1),8,97); s.style.width=width+'%'; });
    }));
  }

  function boot(){
    buildShell();
    if(pageId === 'command') renderCommandCenter();
    else {
      const agent = agents.find(a=>a.id===pageId) || agents[0];
      renderAgentPage(agent);
    }
    initCanvasLoop();
    window.addEventListener('resize',()=>{});
  }
  document.addEventListener('DOMContentLoaded', boot);
})();
