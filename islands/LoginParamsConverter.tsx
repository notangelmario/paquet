import { useEffect } from "preact/hooks";

type Props = {
	redirectTo: string;
};

export default function LoginParamsConverter(props: Props) {
	useEffect(() => {
		const hash = new URL(globalThis.location.href).hash;
		const hashParams = new URLSearchParams("?" + hash.substring(1));

		const access_token = hashParams.get("access_token");
		const refresh_token = hashParams.get("refresh_token");
		const expires_in = hashParams.get("expires_in");

		if (access_token && refresh_token && expires_in) {
			globalThis.location.replace(`/api/auth/login?${hash.substring(1)}`);
		} else {
			globalThis.location.replace(props.redirectTo);
		}
	}, []);

	return <p>Logging in...</p>;
}
