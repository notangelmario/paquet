import { useEffect, useState } from "preact/hooks";
import Dialog from "@/islands/Dialog.tsx";

export default function LoginErrorDialog() {
	const url = new URL(globalThis.location?.href ?? "https://paquet.shop");
	const [open, setOpen] = useState(!!url.searchParams.get("error"));

	useEffect(() => {
		if (url.searchParams.get("error")) {
			globalThis.history.replaceState(
				{},
				"",
				// We need bot error and error_description to be removed
				// and also the ? or & at the end of the url
				url.href
					.replace(/error=[^&]*&?/, "")
					.replace(/error_description=[^&]*&?/, "")
					.replace(/[?&]$/, "")
			);
		}
	}, []);

	return (
		<div>
			<Dialog
				open={open}
				setOpen={setOpen}
				title="Login error"
				content={`There was an error logging you in. Here's the error message: "${
					url.searchParams.get("error_description")
				}"`}
				buttons={[
					{
						text: "OK",
						outlined: true,
						onClick: () => setOpen(false),
					},
				]}
			/>
		</div>
	);
}
