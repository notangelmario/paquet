import { tw } from "@/lib/twind.ts";
import { StateUpdater, useEffect } from "preact/hooks";
import Card from "@/components/Card.tsx";
import Stack from "@/components/Stack.tsx";
import Button from "@/components/Button.tsx";

export type Props = {
	open: boolean;
	setOpen: StateUpdater<boolean>;
	title?: string;
	content?: string;
	buttons?: [
		{
			text: string;
			outlined?: boolean;
			onClick?: () => void;
		},
	];
};

export default function Dialog(props: Props) {
	useEffect(() => {
		if (props.open) {
			document.documentElement.style.overflow = "hidden";
		} else {
			document.documentElement.style.overflow = "";
		}
	}, [props.open]);

	return (
		<div
			class={tw`
				${
				props.open
					? "opacity-100 pointer-events-auto"
					: "opacity-0 pointer-events-none"
			}
				fixed top-0 left-0 right-0 bottom-0 flex justify-center items-end
				
				bg-black bg-opacity-50 z-50

				transition-opacity duration-150 ease-in-out
			`}
			onClick={(e) => {
				if (e.target !== e.currentTarget) return;
				props.setOpen(false);
			}}
		>
			<Card
				class={tw`
					text-black dark:text-white
					!bg-white dark:!bg-dark
					w-full max-w-md mx-auto
					!rounded-b-none

					${props.open ? "translate-y-0" : "translate-y-1/2"}

					transition-transform duration-150 ease-in-out
				`}
			>
				<Stack>
					<h1
						class={tw`text-3xl`}
					>
						{props.title}
					</h1>
					<p
						dangerouslySetInnerHTML={{
							__html: props.content || "",
						}}
					/>
					{props.buttons && props.buttons.map((button, i) => (
						<Button
							key={i}
							outlined={button.outlined}
							onClick={button.onClick}
						>
							{button.text}
						</Button>
					))}
				</Stack>
			</Card>
		</div>
	);
}
