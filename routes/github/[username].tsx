/** @jsx h */ 
import { Handlers, PageProps } from "$fresh/server.ts";
import { h } from "preact";

type User = {
	login: string,
	name: string,
	avatar_url: string,
}

export const handler: Handlers<User | null> = {
	async GET(_, ctx) {
		const { username } = ctx.params;

		const resp = await fetch("https://api.github.com/users/" + username);

		if (resp.status === 404) {
			return ctx.render(null);
		}

		const user: User = await resp.json();

		return ctx.render(user);
	}
}


export default function GithuUser({ data }: PageProps) {
	if (!data) {
		return <h1>User not found</h1>
	}

	return (
		<div>
			<img src={data.avatar_url} />
			<h1>{data.name}</h1>
			<p>{data.login}</p>
		</div>
	)
}
