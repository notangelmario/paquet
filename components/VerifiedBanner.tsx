import Card from "@/components/Card.tsx";

export interface Props {
	appName: string;
}

export default function VerifiedBanner(props: Props) {
	return (
		<Card class="flex flex-row gap-4 justify-center">
			<div 
				class="bg-gradient-to-tr from-primary to-secondary"
				style={{
					"-webkit-mask-image": "url(/icons/verified.svg)",
					"-webkit-mask-size": "contain",
					"-webkit-mask-repeat": "no-repeat",
					"-webkit-mask-position": "center",
					minWidth: 48,
					minHeight: 48,
				}}
			/>
			<p>
				{props.appName} is verified by the Paquet team.
				This means that the app is safe to use and
				we have verified that it is not malicious.
			</p>
		</Card>
	)
}
