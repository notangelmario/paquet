import {
	createGitHubOAuth2Client,
	getSessionAccessToken,
	getSessionId,
} from "deno-kv-oauth";
import { OAuth2ClientConfig } from "https://deno.land/x/oauth2_client@v1.0.2/mod.ts";
import { User } from "@/types/User.ts";

// For now we only support GitHub
// But we can easily add more providers
export const createOAuthClient = (req: Request, provider: string) => {
	const url = new URL(req.url);

	const OAuthConfig: Partial<OAuth2ClientConfig> = {
		redirectUri: `${url.origin}/api/auth/callback?provider=${provider}`,
	};

	switch (provider) {
		case "github":
			return createGitHubOAuth2Client(OAuthConfig);
	}
};

export const getUser = async (req: Request) => {
	const sessionId = getSessionId(req);

	if (!sessionId) {
		return null;
	}

	// We are 100% sure that the client is a GitHubOAuth2Client
	const client = createOAuthClient(req, "github")!;

	const accessToken = await getSessionAccessToken(client, sessionId);

	const res = await fetch("https://api.github.com/user", {
		headers: {
			"Authorization": `Bearer ${accessToken}`,
		},
	});

	if (!res.ok) {
		return null;
	}

	return await res.json() as User;
};
