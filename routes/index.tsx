import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import CreateGeoJsonFeature from "../islands/CreateGeoJsonFeature.tsx";
import { handler as getFeaturesHandler } from "./api/geojson/read.tsx";
import { load } from "https://deno.land/std/dotenv/mod.ts";
const env = await load();
const mapboxAccessToken = env["MAPBOX_ACCESS_TOKEN"] ||
  Deno.env.get("MAPBOX_ACCESS_TOKEN");

export const handler: Handlers<User | null> = {
  async GET(req, ctx) {
    const response = await getFeaturesHandler.GET(req, ctx);
    const features = await response.json();

    return ctx.render(features);
  },
};

export default function Home(props: PageProps) {
  return (
    <>
      <Head>
        <title>Maps</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-xl">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight my-6 text-center">
          Create GeoJson Feature
        </h1>
        <CreateGeoJsonFeature mapboxAccessToken={mapboxAccessToken} />
        <ul class="grid grid-cols-4 gap-4">
          {props.data?.geojson.length > 0 &&
            props.data.geojson.map((feature) => (
              <li class="border border-gray-300 p-2">
                <div>{feature.value.name}</div>
                <div class="grid grid-cols-2 gap-2">
                  <div class="border overflow-hidden">
                    {feature.value.coordinates[0]}
                  </div>
                  <div class="border overflow-hidden">
                    {feature.value.coordinates[1]}
                  </div>
                  <a href={`features/${feature.key[1]}`}>Details</a>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
