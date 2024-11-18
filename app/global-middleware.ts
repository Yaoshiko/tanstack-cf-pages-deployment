import { defineMiddleware } from "vinxi/http";

import { CloudflareEnv } from "./types/vinxi";

export default defineMiddleware({
  onRequest: async (event) => {
    if (import.meta.env.DEV) {
      const { getPlatformProxy } = await import("wrangler");

      const proxy = await getPlatformProxy<CloudflareEnv>();

      event.context.cloudflare = proxy;

      await proxy.dispose();
    }
  },
});
