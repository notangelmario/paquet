import "dotenv";
import type { App } from "@/types/App.ts";
import { createClient } from "supabase";
import Pocketbase from "pocketbase";

const supabase = createClient(
	Deno.env.get("SUPABASE_URL")!,
	Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const pb = new Pocketbase("http://localhost:8090");

const { data: app } = await supabase.from("apps")
	.select("*")
	.eq("id", "cdf075ca-1db8-497b-a905-ec557f230bfa")
	.single();

if (!app) {
	Deno.exit();
}

// @ts-ignore: Unreachable code error
const icon = await fetch(app.icon_original).then((res) => res.blob());

const data = new FormData();

data.append("name", app.name);
data.append("author", app.author);
data.append("description", app.description);
data.append("added_at", new Date(app.addedOn).toISOString());
data.append("icon", new File([icon], "icon.png", { type: "image/png" }));

console.log(data);

await pb.collection("apps")
	.create(data);
