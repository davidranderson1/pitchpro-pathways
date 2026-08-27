// PitchPro Pathways — private preview wall.
// Everything on the domain asks for a username and password EXCEPT the live
// Family Schedule app and the files it needs (OPEN list below).
const OPEN = [
  /^\/schedule\.html$/,
  /^\/admin\.html$/,
  /^\/sw\.js$/,
  /^\/sw-test\.js$/,
  /^\/manifest\.json$/,
  /^\/icon-\d+\.png$/,
  /^\/supabase\.js$/,
  /^\/site-nav\.js$/,
  /^\/favicon\.ico$/,
  /^\/robots\.txt$/,
];

function safeEqual(a, b) {
  const enc = new TextEncoder();
  const x = enc.encode(a), y = enc.encode(b);
  if (x.byteLength !== y.byteLength) return false;
  return crypto.subtle.timingSafeEqual(x, y);
}

function challenge() {
  return new Response(
    'PitchPro Pathways is in private preview. Sign in to continue.',
    { status: 401, headers: {
      'WWW-Authenticate': 'Basic realm="PitchPro Pathways preview", charset="UTF-8"',
      'Cache-Control': 'no-store',
      'Content-Type': 'text/plain; charset=UTF-8',
    } });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (OPEN.some(re => re.test(url.pathname))) return fetch(request);

    const auth = request.headers.get('Authorization') || '';
    if (!auth.startsWith('Basic ')) return challenge();
    let user = '', pass = '';
    try {
      const decoded = atob(auth.slice(6));
      const i = decoded.indexOf(':');
      user = decoded.slice(0, i); pass = decoded.slice(i + 1);
    } catch { return challenge(); }
    if (!env.WALL_USER || !env.WALL_PASS) return challenge();
    if (!safeEqual(user, env.WALL_USER) || !safeEqual(pass, env.WALL_PASS)) return challenge();

    const origin = await fetch(request);
    const headers = new Headers(origin.headers);
    headers.set('Cache-Control', 'private, no-store');
    headers.set('X-Robots-Tag', 'noindex, nofollow');
    return new Response(origin.body, { status: origin.status, statusText: origin.statusText, headers });
  },
};
