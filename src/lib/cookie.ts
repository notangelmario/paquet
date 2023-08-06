export async function getCookie(name: string): Promise<string | undefined> {
	const res = await fetch(`/api/cookie?name=${name}`);
	if (res.status !== 200) {
		return undefined;
	}

	const cookie = await res.text();
	return cookie;
}

export async function setCookie(name: string, value: string): Promise<void> {
	const res = await fetch("/api/cookie", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name, value }),
	});

	if (res.status !== 200) {
		throw new Error("Failed to set cookie");
	}
}
