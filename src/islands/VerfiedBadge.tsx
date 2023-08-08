import { useSignal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";
import { Certificate } from "@/types/Certificate.ts";
import { verifyCertificate } from "@/lib/cert.ts";
import Button from "@/components/Button.tsx";
import Dialog from "@/islands/Dialog.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import Card from "@/components/Card.tsx";

export default function VerifiedBadge(props: { cert: Certificate }) {
	const verifiedState = useSignal<"loading" | "verified" | "error">("loading")
	const [dialogOpen, setDialogOpen] = useState(false);

	const verify = async () => {
		const publicKeyPem = await fetch("/api/certificate/public-key").then((res) => res.text());
		
		verifiedState.value = await verifyCertificate(publicKeyPem, props.cert) ? "verified" : "error";
	}

	useEffect(() => {
		verify();
	}, []);

	return IS_BROWSER ? (
		<>
			<Button
				variant={
					verifiedState.value === "loading"
						? "outlined"
						: verifiedState.value === "verified"
							? "secondary"
							: "error"
				}
				icon={
					verifiedState.value === "loading"
						? "refresh"
						: verifiedState.value === "verified"
							? "check"
							: "x"
				}
				disabled={verifiedState.value === "loading"}
				onClick={() => setDialogOpen(true)}
			>
				{verifiedState.value === "loading"
					? "Verifying..."
					: verifiedState.value === "verified"
						? "Verified"
						: "Invalid certificate"}
			</Button>
			<Dialog
				open={dialogOpen}
				setOpen={setDialogOpen}
				title="Certificate details"
				content={`
					<p>
						<b>Issued At:</b> ${new Date(props.cert.issuedAt).toLocaleString()}
					</p>
					<p>
						<b>For App URL:</b> ${props.cert.url}
					</p>
					<p class="truncate">
						<b>Signature:</b> ${props.cert.signature}
					</p>
					<p>
						<b>Is Valid:</b> ${verifiedState.value === "verified" ? "Yes" : "No"}
					</p>
				`}
				buttons={[
					{
						text: "Close",
						onClick: () => setDialogOpen(false),
						variant: "outlined"
					}
				]}
			/>
		</>
	) : (
		<noscript>
			<Card title="Verification">
				<p>
					This app has a certificate, but it can only be verified in the browser.
				</p>
			</Card>
		</noscript>
	)
}
