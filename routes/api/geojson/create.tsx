import { Handlers } from "$fresh/server.ts";
import { createId } from 'https://esm.sh/@paralleldrive/cuid2';

export const handler: Handlers = {
  async POST(req) {
    const body = await req.json();
    const { type, geometryType, coordinates, name } = body;

    const kv = await Deno.openKv();

    const geojson = {
      type,
      geometryType,
      coordinates,
      name,
    };

    await kv.set(["geojson", createId()], geojson);

    const result = await kv.get(["geojson"]);

    console.log(result)

    return new Response(
      JSON.stringify({
        message: "Successfully saved geojson",
        data: result.value,
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  },
};
