import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const kv = await Deno.openKv();

    const iter = await kv.list<string>({ prefix: ["geojson"] });
    const geojson = [];
    for await (const res of iter) geojson.push(res);

    return new Response(
      JSON.stringify({
        geojson,
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  },
};
