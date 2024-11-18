import { CloudflareEnv } from "../types/vinxi";

export function isInCloudflareCI() {
  return process.env.CF_PAGES_COMMIT_SHA !== undefined;
}

export async function getCloudflareProxyEnv() {
  const { getPlatformProxy } = await import("wrangler");

  const proxy = await getPlatformProxy<CloudflareEnv>({
    environment:
      process.env["npm_lifecycle_event"] === "build"
        ? "production"
        : "development",
  });

  const cloudflareEnv = proxy.env;

  await proxy.dispose();

  return cloudflareEnv;
}
