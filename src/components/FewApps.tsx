/**@jsx h */
import { h } from "preact";
import { tw } from "@/lib/twind.ts";

export default function FewApps() {
	return (
		<div>
			<h1
				class={tw`
					text-2xl opacity-50
				`}
			>
				More apps coming soon...
			</h1>
			<p class={tw`opacity-50 mb-4`}>
				Apps are being added every week. Check back soon for more!
			</p>
			<img
				src="/illustrations/app-installation.svg"
				alt=""
				class={tw`h-64`}
			/>
		</div>
	);
}
