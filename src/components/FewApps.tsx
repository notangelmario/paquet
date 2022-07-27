/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function FewApps() {
	return (
		<div
			class={tw`
				opacity-50
			`}
		>
			<h1
				class={tw`
					text-2xl
				`}
			>
				More apps coming soon...
			</h1>
			<p>
				Apps are being added every week. Check back soon for more!
			</p>
		</div>
	);
}
