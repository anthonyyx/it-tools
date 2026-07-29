export default {
  async fetch(request, env) {
    const acceptEncoding = request.headers.get("Accept-Encoding");
    if (acceptEncoding && acceptEncoding.includes("zstd")) {
      const newHeaders = new Headers(request.headers);
      const cleaned = acceptEncoding.replace(/zstd,?\s*/gi, "").trim();
      newHeaders.set("Accept-Encoding", cleaned || "identity");
      request = new Request(request, { headers: newHeaders });
    }
    return env.ASSETS.fetch(request);
  }
};
