/*
This login endpoint could be a little bit more efficient,
but it's a Supabase problem. Supabase will not use
querystring params to pass the access_token and refresh_token
to the client, but instead will use the hash fragment due to
security reasons.

This does not concern us, so we can safely convert the hash
to querystring params and pass them to the login endpoint.

If anyone finds a better solution, please let me know.
This is a very hacky fix and might have some unforeseen consequences.
*/
/**@jsx h */
import { h } from "preact";
import type { Handler, PageProps } from "$fresh/server.ts";
import { supabaseService } from "@/lib/supabase.ts";
import { Provider } from "supabase";
import { setCookie } from "$std/http/cookie.ts";
import LoginParamsConverter from "@/islands/LoginParamsConverter.tsx";

const DEV = !Deno.env.get("DENO_DEPLOYMENT_ID");
const PROVIDERS = ["google", "github"];

type DataProps = {
	redirectTo?: string | undefined;
};

export default function LoginEndpoint(props: PageProps<DataProps>) {
	return <LoginParamsConverter redirectTo={props.data?.redirectTo || "/"} />;
}

export const handler: Handler = async (req, ctx) => {
	const url = new URL(req.url);

	const provider = url.searchParams.get("provider");
	const error = url.searchParams.get("error");
	const access_token = url.searchParams.get("access_token");
	const refresh_token = url.searchParams.get("refresh_token");
	const expires_in = url.searchParams.get("expires_in");

	// TODO(@notangelmario) handle error better
	if (error) {
		return new Response("Login failed", {
			status: 307,
			headers: { "Location": "/" },
		});
	}

	if (!access_token || !refresh_token || !expires_in) {
		if (!PROVIDERS.includes(provider as string)) {
			return ctx.render();
		}

		const authUrl = supabaseService.auth.api.getUrlForProvider(
			provider as Provider,
			{
				redirectTo: DEV
					? `http://localhost:3000/api/auth/login`
					: `${url.origin}/api/auth/login`,
			},
		);

		return ctx.render({
			redirectTo: authUrl,
		});
	}

	// This checks if the access token is valid
	const { user } = await supabaseService.auth.api.getUser(access_token);

	if (!user) {
		return new Response("Invalid access_token", { status: 400 });
	}

	const res = new Response("OK", {
		status: 307,
		headers: { "Location": "/" },
	});

	setCookie(res.headers, {
		name: "access_token",
		value: access_token,
		maxAge: 365 * 24 * 60 * 60,
		httpOnly: true,
		sameSite: "Strict",
		path: "/",
	});

	setCookie(res.headers, {
		name: "refresh_token",
		value: refresh_token,
		maxAge: 365 * 24 * 60 * 60,
		httpOnly: true,
		sameSite: "Strict",
		path: "/",
	});

	setCookie(res.headers, {
		name: "expires_at",
		value: (Math.floor(Date.now() / 1000) + parseInt(expires_in)).toString(),
		maxAge: 365 * 24 * 60 * 60,
		httpOnly: true,
		sameSite: "Strict",
		path: "/",
	});

	return res;
};
