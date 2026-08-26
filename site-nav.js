/* PitchPro × Rajic — shared site navigation / app switcher.
   One include per page: <script src="site-nav.js" defer></script>
   Injects a fixed "Apps" button and an overlay index of every page in the repo,
   grouped by app, each tagged LIVE / MOCKUP / PUBLIC so nobody mistakes sample
   data for the real thing.
   If the host page contains an element with id="ppNavOpen", that element opens
   the overlay instead and the floating button is not injected (lets an app put
   the switcher in its own header). Also exposed as window.ppNav.open().
   Self-contained: no CSS file, no dependencies, no conflict with host styles. */
(function(){
  var PAGES = [
    {g:'Family app — live', items:[
      {f:'schedule.html', t:'Family Schedule', tag:'LIVE', d:'Sign in required. Training, tournaments, stats, coach messages, notifications. All family data is in a private database, not in this repository.'}
    ]},
    {g:'Team App — mockups, sample data only', items:[
      {f:'player-moments-flow.html', t:'Feature map and flow', tag:'MOCKUP', d:'How the Team App fits together — start here'},
      {f:'portal-player.html', t:'Player portal', tag:'MOCKUP', d:'Timeline, composer, profile'},
      {f:'portal-parent.html', t:'Parent portal', tag:'MOCKUP', d:'Approvals, safety and permissions'},
      {f:'portal-guide.html', t:'Guide portal', tag:'MOCKUP', d:'Player feed, comments, my showcase, record'},
      {f:'portal-admin.html', t:'Admin portal', tag:'MOCKUP', d:'Safeguarding queue, audit log, compliance'}
    ]},
    {g:'Guide pages', items:[
      {f:'guide-portal-sandro.html', t:'Guide — Sandro', tag:'MOCKUP', d:'Profile page · media showcase, no video connected'},
      {f:'guide-portal-nick.html', t:'Guide — Coach Nick', tag:'MOCKUP', d:'Profile page · media showcase, no video connected'},
      {f:'guide-portal-grego.html', t:'Guide — Grego', tag:'MOCKUP', d:'Profile page · media showcase with a featured video'},
      {f:'grego-brand-guidelines.html', t:'Grego brand guidelines', tag:'MOCKUP', d:'Colours, type and usage'}
    ]},
    {g:'Motion Intelligence', items:[
      {f:'motion-intelligence.html', t:'The Brain', tag:'MOCKUP', d:'Platform concept, knowledge base, build plan'},
      {f:'device-intelligence.html', t:'Device Radars', tag:'MOCKUP', d:'Playermaker, Oura and Plantiga as radar charts'},
      {f:'deck.html', t:'Meeting deck', tag:'MOCKUP', d:'13 slides, options A and B, questions 1 to 10'}
    ]},
    {g:'Public site', items:[
      {f:'index.html', t:'PitchPro Pathways — home', tag:'PUBLIC', d:'Public marketing site'},
      {f:'pro-pathways.html', t:'Pro Pathways', tag:'PUBLIC', d:'Programme site'},
      {f:'sandro-rajic-website.html', t:'Sandro Rajic — practice site', tag:'PUBLIC', d:'Movement assessment practice · opens in a new tab', nt:true}
    ]},
    {g:'Index', items:[
      {f:'hub.html', t:'All pages', tag:'PUBLIC', d:'This index as a full page'}
    ]}
  ];

  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  var css = document.createElement('style');
  css.textContent = [
    '#pp-navbtn{position:fixed;right:16px;bottom:16px;z-index:99998;font:700 11.5px/1 Inter,system-ui,sans-serif;',
    'letter-spacing:.12em;text-transform:uppercase;padding:12px 16px;border-radius:999px;cursor:pointer;',
    'background:#15211a;color:#2ee08a;border:1px solid rgba(46,224,138,.45);box-shadow:0 6px 24px rgba(0,0,0,.45);}',
    '#pp-navbtn:hover{background:#1b2a21;}',
    '#pp-navwrap{position:fixed;inset:0;z-index:99999;display:none;align-items:center;justify-content:center;padding:20px;',
    'background:rgba(6,10,8,.86);font-family:Inter,system-ui,sans-serif;}',
    '#pp-navwrap.pp-on{display:flex;}',
    '#pp-navbox{background:#101a14;border:1px solid rgba(46,224,138,.35);border-radius:18px;max-width:760px;width:100%;',
    'max-height:82vh;overflow:auto;padding:26px 24px;color:#fff;}',
    '#pp-navbox h4{font:900 13px/1.2 Archivo,Inter,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#2ee08a;margin:0 0 4px;}',
    '#pp-navbox .pp-sub{font-size:12.5px;color:#9db3a6;margin:0 0 18px;}',
    '#pp-navbox .pp-g{font:800 10.5px/1 Inter,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#5fb4ff;margin:18px 0 8px;}',
    '#pp-navbox a{display:block;text-decoration:none;color:#fff;border:1px solid rgba(255,255,255,.08);border-radius:11px;',
    'padding:10px 13px;margin-bottom:7px;font-size:13.5px;}',
    '#pp-navbox a:hover{border-color:rgba(46,224,138,.5);background:rgba(46,224,138,.07);}',
    '#pp-navbox a span.pp-d{display:block;font-size:12px;color:#9db3a6;margin-top:2px;}',
    '#pp-navbox a.pp-here{border-color:rgba(46,224,138,.6);background:rgba(46,224,138,.12);color:#2ee08a;}',
    '.pp-tag{display:inline-block;font:800 8.5px/1 Inter,sans-serif;letter-spacing:.12em;padding:3px 8px;border-radius:999px;',
    'margin-left:8px;vertical-align:2px;}',
    '.pp-tag.pp-live{background:rgba(46,224,138,.16);color:#2ee08a;}',
    '.pp-tag.pp-mock{background:rgba(255,190,70,.15);color:#ffbe46;}',
    '.pp-tag.pp-pub{background:rgba(95,180,255,.15);color:#5fb4ff;}',
    '#pp-navclose{margin-top:18px;background:none;border:1px solid rgba(255,255,255,.14);color:#9db3a6;',
    'font:800 11px/1 Inter,sans-serif;letter-spacing:.12em;text-transform:uppercase;padding:10px 16px;border-radius:999px;cursor:pointer;}',
    '@media print{#pp-navbtn,#pp-navwrap{display:none !important;}}'
  ].join('');
  document.head.appendChild(css);

  function tagHtml(tag){
    if(!tag) return '';
    var cls = tag==='LIVE' ? 'pp-live' : (tag==='MOCKUP' ? 'pp-mock' : 'pp-pub');
    return '<span class="pp-tag '+cls+'">'+tag+'</span>';
  }

  var html = '<div id="pp-navbox"><h4>PitchPro &mdash; apps &amp; pages</h4>' +
             '<p class="pp-sub">Switch between everything built so far. LIVE pages use the real private database; MOCKUP pages show sample data only.</p>';
  for(var i=0;i<PAGES.length;i++){
    html += '<div class="pp-g">' + PAGES[i].g + '</div>';
    for(var j=0;j<PAGES[i].items.length;j++){
      var it = PAGES[i].items[j];
      var cls = (it.f.toLowerCase() === here) ? ' class="pp-here"' : '';
      var tgt = it.nt ? ' target="_blank" rel="noopener"' : '';
      html += '<a href="' + it.f + '"' + cls + tgt + '>' + it.t + tagHtml(it.tag) +
              (it.d ? '<span class="pp-d">' + it.d + '</span>' : '') + '</a>';
    }
  }
  html += '<button id="pp-navclose" type="button">Close</button></div>';

  function boot(){
    var wrap = document.createElement('div');
    wrap.id = 'pp-navwrap'; wrap.innerHTML = html;
    document.body.appendChild(wrap);
    function open(){ wrap.classList.add('pp-on'); }
    function close(){ wrap.classList.remove('pp-on'); }
    var hostBtn = document.getElementById('ppNavOpen');
    if(hostBtn){
      hostBtn.addEventListener('click', function(e){ e.preventDefault(); open(); });
    } else {
      var btn = document.createElement('button');
      btn.id = 'pp-navbtn'; btn.type = 'button'; btn.textContent = '◈ Apps';
      document.body.appendChild(btn);
      btn.addEventListener('click', open);
    }
    wrap.addEventListener('click', function(e){ if(e.target === wrap) close(); });
    document.getElementById('pp-navclose').addEventListener('click', close);
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') close(); });
    window.ppNav = { open: open, close: close };
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
