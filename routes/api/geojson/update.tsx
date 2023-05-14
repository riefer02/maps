import { Handlers } from "$fresh/server.ts";
import { createId } from "https://esm.sh/@paralleldrive/cuid2";

export const handler: Handlers = {
  async PUT(req) {
    const body = await req.json();
    console.log({ body });

    const kv = await Deno.openKv();

    // await kv.set(["geojson", ""], "");

    // const result = await kv.get(["geojson"]);

    // console.log(result);

    return new Response(
      JSON.stringify({
        message: "Successfully updated geojson feature",
        // data: result.value,
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  },
};
