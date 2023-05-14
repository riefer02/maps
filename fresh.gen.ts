// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[name].tsx";
import * as $1 from "./routes/api/geojson/create.tsx";
import * as $2 from "./routes/api/geojson/read.tsx";
import * as $3 from "./routes/api/geojson/update.tsx";
import * as $4 from "./routes/api/joke.ts";
import * as $5 from "./routes/features/[id].tsx";
import * as $6 from "./routes/index.tsx";
import * as $$0 from "./islands/CoordinateInput.tsx";
import * as $$1 from "./islands/Counter.tsx";
import * as $$2 from "./islands/CreateGeoJsonFeature.tsx";

const manifest = {
  routes: {
    "./routes/[name].tsx": $0,
    "./routes/api/geojson/create.tsx": $1,
    "./routes/api/geojson/read.tsx": $2,
    "./routes/api/geojson/update.tsx": $3,
    "./routes/api/joke.ts": $4,
    "./routes/features/[id].tsx": $5,
    "./routes/index.tsx": $6,
  },
  islands: {
    "./islands/CoordinateInput.tsx": $$0,
    "./islands/Counter.tsx": $$1,
    "./islands/CreateGeoJsonFeature.tsx": $$2,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;