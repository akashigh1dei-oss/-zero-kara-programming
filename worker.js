export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cf = request.cf || {};

    const response = await env.ASSETS.fetch(request);

    // Privacy-conscious access log: no IP address, cookies, query string,
    // form body, email address, or other user-entered content is recorded.
    console.log(JSON.stringify({
      event: "site_access",
      method: request.method,
      path: url.pathname,
      status: response.status,
      country: cf.country || null,
      region: cf.region || null,
      city: cf.city || null,
      colo: cf.colo || null,
      device: request.headers.get("sec-ch-ua-mobile") === "?1" ? "mobile" : "other"
    }));

    return response;
  }
};
