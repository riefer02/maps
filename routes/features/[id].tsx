import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const { id } = ctx.params;

    const kv = await Deno.openKv();
    const feature = await kv.get(["geojson", id]);

    return ctx.render(feature);
  },

  async POST(req, ctx) {
    const { id } = ctx.params;
    const form = await req.formData();
    const name = form.get("name")?.toString();

    const kv = await Deno.openKv();
    let feature = await kv.get(["geojson", id]);

    if (name) feature.value.name = name;

    feature = await kv.set(["geojson", id], feature.value);

    const headers = new Headers();
    headers.set("location", `${id}`);
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function FeatureDetailPage(props: PageProps) {
  const { value: { name, coordinates } } = props.data;

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <div class="flex flex-col gap-12 items-center justify-center py-12 bg-gray-600 min-h-screen">
        <div class="bg-gray-200 p-4">
          <div class="text-xl">Name: {name}</div>
          <div class="text-xl">
            Coordinates: {coordinates[0]} {coordinates[1]}
          </div>
          <div>Feature ID: {props.params.id}</div>
        </div>
        <div class="bg-gray-300 p-4">
          <h3 class="text-xl mb-2">Update Feature</h3>
          <form class="flex gap-4" method="post">
            <input
              class="bg-gray-100 px-2 py-1 border rounded-xl shadow"
              type="text"
              name="name"
              value={name}
            />
            <button
              type="submit"
              class="bg-gray-800 text-white px-3 py-1 rounded-xl shadow"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
