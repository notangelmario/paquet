// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_app.tsx";
import * as $1 from "./routes/_middleware.ts";
import * as $2 from "./routes/app/[id].tsx";
import * as $3 from "./routes/app/error.tsx";
import * as $4 from "./routes/category/[id].tsx";
import * as $5 from "./routes/category/index.tsx";
import * as $6 from "./routes/docs/[doc].tsx";
import * as $7 from "./routes/docs/index.tsx";
import * as $8 from "./routes/gfm.css.ts";
import * as $9 from "./routes/index.tsx";
import * as $10 from "./routes/offline.tsx";
import * as $11 from "./routes/search.tsx";
import * as $12 from "./routes/settings.tsx";
import * as $13 from "./routes/sitemap.xml.ts";
import * as $$0 from "./islands/Dialog.tsx";
import * as $$1 from "./islands/InstallBanner.tsx";
import * as $$2 from "./islands/Navbar.tsx";

const manifest = {
	routes: {
		"./routes/_app.tsx": $0,
		"./routes/_middleware.ts": $1,
		"./routes/app/[id].tsx": $2,
		"./routes/app/error.tsx": $3,
		"./routes/category/[id].tsx": $4,
		"./routes/category/index.tsx": $5,
		"./routes/docs/[doc].tsx": $6,
		"./routes/docs/index.tsx": $7,
		"./routes/gfm.css.ts": $8,
		"./routes/index.tsx": $9,
		"./routes/offline.tsx": $10,
		"./routes/search.tsx": $11,
		"./routes/settings.tsx": $12,
		"./routes/sitemap.xml.ts": $13,
	},
	islands: {
		"./islands/Dialog.tsx": $$0,
		"./islands/InstallBanner.tsx": $$1,
		"./islands/Navbar.tsx": $$2,
	},
	baseUrl: import.meta.url,
	config,
};

export default manifest;
