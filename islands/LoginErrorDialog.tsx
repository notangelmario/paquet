import { useState } from "preact/hooks";
import Dialog from "@/islands/Dialog.tsx";

export default function LoginErrorDialog() {
	const url = new URL(globalThis.location?.href ?? "https://paquet.shop");
	const [open, setOpen] = useState(!!url.searchParams.get("error"));

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
