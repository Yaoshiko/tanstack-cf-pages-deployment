import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";
import { getEvent } from "vinxi/http";

export const Route = createAPIFileRoute("/api/env")({
  GET: async () => {
    const event = getEvent();

    // NEVER DO THIS IN YOUR APP, THIS IS JUST FOR THE EXAMPLE
    return json(event.context.cloudflare.env);
  },
});
