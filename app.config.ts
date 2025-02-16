import { join } from "node:path";
import { defineConfig } from "@tanstack/start/config";
import type { App } from "vinxi";

import { parseEnv } from "./app/libs/env";
import { getCloudflareProxyEnv, isInCloudflareCI } from "./app/libs/cloudflare";

await parseEnv();

const app = defineConfig({
  server: {
    preset: "cloudflare-pages",
    rollupConfig: {
      external: ["node:async_hooks"],
    },
  },
  vite: {
    define: await proxyCloudflareEnv(),
  },
});

async function proxyCloudflareEnv() {
  if (isInCloudflareCI()) return undefined;

  const env = await getCloudflareProxyEnv();

  const viteDefine = Object.fromEntries(
    Object.entries(env)
      .filter(([key]) => key.startsWith("VITE_"))
      .map(([key, value]) => [`import.meta.env.${key}`, `"${value}"`])
  );

  return viteDefine;
}

async function withGlobalMiddleware(app: any) {
  // With more recent Tanstack version app is a Promise.
  // This workaround is bad, but I don't think it's related to the issue,
  // since I get the same error on my repo.
  var app = await app;
  
  return {
    ...app,
    config: {
      ...app.config,
      routers: app.config.routers.map((router) => ({
        ...router,
        middleware:
          router.target !== "server"
            ? undefined
            : join("app", "global-middleware.ts"),
      })),
    },
  };
}

export default withGlobalMiddleware(app);
