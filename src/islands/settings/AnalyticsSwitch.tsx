import ListItem from "@/components/ListItem.tsx";
import Switch from "@/components/Switch.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";
import { setCookie } from "@/lib/cookie.ts";

interface Props {
	analyticsDisabled: boolean;
}

export default function AnalyticsSwitch(props: Props) {
	// We also use the cookie for prerendering.
	// In the future analyticsDisabled set from the middleware will disable
	// the script before reaching the client.
	const [analyticsEnabled, setAnalyticsEnabled] = useState(
		IS_BROWSER
			? globalThis.localStorage?.getItem("umami.disabled") !== "true"
			: !props.analyticsDisabled,
	);

	const toggleAnalytics = () => {
		if (analyticsEnabled) {
			globalThis.localStorage?.setItem("umami.disabled", "true");
			setCookie("analytics-disabled", "true");
		} else {
			globalThis.localStorage?.removeItem("umami.disabled");
			setCookie("analytics-disabled", "false");
		}
		setAnalyticsEnabled(!analyticsEnabled);
	};

	return (
		<ListItem
			button
			onClick={toggleAnalytics}
			icon="analytics"
			title="Analytics"
			subtitle="Help us improve Paquet by sending anonymous usage data"
			secondarySlot={
				<Switch checked={analyticsEnabled} onChange={toggleAnalytics} />
			}
		/>
	);
}
