import { createClient } from "libsql";

export const turso = createClient({
	url: Deno.env.get("TURSO_URL")!,
	authToken: Deno.env.get("TURSO_AUTH_TOKEN")!,
});

export async function dbGet<T>(sql: string): Promise<T | null> {
	try {
		const { rows } = await turso.execute(sql);

		return rows;
	} catch (error) {
		console.error(error);
			
		return null;
	}
}


export const convertStringToArray = (str: string): string[] => {
	return str.split(",").map((item) => item.trim());
}
