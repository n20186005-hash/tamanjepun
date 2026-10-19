export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'www.tamanjepun.com' || (url.hostname === 'tamanjepun.com' && url.protocol === 'http:')) {
      url.hostname = 'tamanjepun.com';
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  }
};
