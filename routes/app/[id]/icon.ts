import type { Handler } from "@/types/Handler.ts";
import { supabase } from "@/lib/supabase.ts";

export const handler: Handler = async (_, ctx) => {
	const { id } = ctx.params;

	if (!id) {
		return new Response("Not found", { status: 404 });
	}

	const { data, error } = await supabase
		.from("apps")
		.select("icon_original")
		.eq("id", id)
		.single();

	if (error || !data) {
		return new Response("Not found", { status: 404 });
	}

	const res = await fetch(data.icon_original);

	if (res.status === 200) {
		return new Response(res.body, {
			status: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		});
	}

	const { data: fallback } = supabase.storage
		.from("apps")
		.getPublicUrl(`${id}/icons/icon.png`);

	if (!fallback) {
		return new Response("Not found", { status: 404 });
	}

	return new Response(fallback.publicUrl, {
		headers: {
			"Content-Type": "image/png",
		},
	});
};
