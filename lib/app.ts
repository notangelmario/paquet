import "dotenv";

export const APP = {
	version: "3.0.0",
	codename: "Cristina",
	discordInvite: "https://discord.com/invite/DXke9aSZh6",
	githubRepo: "https://github.com/notangelmario/paquet"
};

export const DEV = !Deno.env.get("DENO_DEPLOYMENT_ID");
