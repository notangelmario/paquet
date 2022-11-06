import Card, { Props as CardProps } from "@/components/Card.tsx";


export default function Announcement(props: CardProps) {
	return (
		<div class="rounded p-1 bg-gradient-to-tr from-primary to-secondary">
			<Card>
			{props.children}
			</Card>
		</div>
	)
}
