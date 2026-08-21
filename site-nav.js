/* PitchPro × Rajic — shared site navigation.
   One include per page: <script src="site-nav.js" defer></script>
   Injects a fixed "All pages" button and an overlay index of every page in the repo.
   Self-contained: no CSS file, no dependencies, no conflict with the host page's styles. */
(function(){
  var PAGES = [
    {g:'Public site', items:[
      {f:'index.html', t:'PitchPro Pathways — home', d:'Public marketing site'},
      {f:'pro-pathways.html', t:'Pro Pathways', d:'Programme site'},
      {f:'sandro-rajic-website.html', t:'Sandro Rajic — practice site', d:'Movement assessment practice'}
    ]},
    {g:'Motion Intelligence', items:[
      {f:'motion-intelligence.html', t:'The Brain', d:'Platform concept, knowledge base, build plan'},
      {f:'device-intelligence.html', t:'Device Radars', d:'Playermaker, Oura and Plantiga as radar charts'},
      {f:'deck.html', t:'Meeting deck', d:'13 slides, options A and B, questions 1 to 10'}
    ]},
    {g:'Player moments', items:[
      {f:'player-moments-flow.html', t:'Feature map and flow', d:'Start here for the moments feature'},
      {f:'portal-player.html', t:'Player portal', d:'Timeline, composer, profile'},
      {f:'portal-parent.html', t:'Parent portal', d:'Approvals, safety and permissions'},
      {f:'portal-guide.html', t:'Guide portal', d:'Player feed, comments, record'},
      {f:'portal-admin.html', t:'Admin portal', d:'Safeguarding queue, audit log, compliance'}
    ]},
    {g:'Guide pages', items:[
      {f:'guide-portal-sandro.html', t:'Guide — Sandro', d:''},
      {f:'guide-portal-nick.html', t:'Guide — Coach Nick', d:''},
      {f:'guide-portal-grego.html', t:'Guide — Grego', d:''},
      {f:'grego-brand-guidelines.html', t:'Grego brand guidelines', d:''}
    ]},
    {g:'Index', items:[
      {f:'hub.html', t:'All pages', d:'This index as a full page'}
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
    '#pp-navbox a span{display:block;font-size:12px;color:#9db3a6;margin-top:2px;}',
    '#pp-navbox a.pp-here{border-color:rgba(46,224,138,.6);background:rgba(46,224,138,.12);color:#2ee08a;}',
    '#pp-navclose{margin-top:18px;background:none;border:1px solid rgba(255,255,255,.14);color:#9db3a6;',
    'font:800 11px/1 Inter,sans-serif;letter-spacing:.12em;text-transform:uppercase;padding:10px 16px;border-radius:999px;cursor:pointer;}',
    '@media print{#pp-navbtn,#pp-navwrap{display:none !important;}}'
  ].join('');
  document.head.appendChild(css);

  var html = '<div id="pp-navbox"><h4>PitchPro &times; Rajic &mdash; all pages</h4>' +
             '<p class="pp-sub">Every page in the site. Mockups use sample data.</p>';
  for(var i=0;i<PAGES.length;i++){
    html += '<div class="pp-g">' + PAGES[i].g + '</div>';
    for(var j=0;j<PAGES[i].items.length;j++){
      var it = PAGES[i].items[j];
      var cls = (it.f.toLowerCase() === here) ? ' class="pp-here"' : '';
      html += '<a href="' + it.f + '"' + cls + '>' + it.t + (it.d ? '<span>' + it.d + '</span>' : '') + '</a>';
    }
  }
  html += '<button id="pp-navclose" type="button">Close</button></div>';

  function boot(){
    var btn = document.createElement('button');
    btn.id = 'pp-navbtn'; btn.type = 'button'; btn.textContent = '◈ All pages';
    var wrap = document.createElement('div');
    wrap.id = 'pp-navwrap'; wrap.innerHTML = html;
    document.body.appendChild(btn); document.body.appendChild(wrap);
    btn.addEventListener('click', function(){ wrap.classList.add('pp-on'); });
    wrap.addEventListener('click', function(e){ if(e.target === wrap) wrap.classList.remove('pp-on'); });
    document.getElementById('pp-navclose').addEventListener('click', function(){ wrap.classList.remove('pp-on'); });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') wrap.classList.remove('pp-on'); });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
