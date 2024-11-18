import type { H3EventContext } from "vinxi/http";
import type { Request, ExecutionContext } from "@cloudflare/workers-types";
import type { PlatformProxy } from "wrangler";

import type { Env } from "../libs/env";

type CloudflareEnv = Env & {
  ASSETS: { fetch: (request: CfRequest) => Promise<Response> };
  CF_PAGES: "1";
  CF_PAGES_BRANCH: string;
  CF_PAGES_COMMIT_SHA: string;
  CF_PAGES_URL: string;
};

declare module "vinxi/http" {
  interface H3EventContext {
    cloudflare: PlatformProxy<CloudflareEnv>;
  }
}
