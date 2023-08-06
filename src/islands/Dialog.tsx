import { StateUpdater, useEffect } from "preact/hooks";
import Stack from "@/components/Stack.tsx";
import Button, { ButtonProps } from "@/components/Button.tsx";

export type Props = {
	open: boolean;
	setOpen: StateUpdater<boolean>;
	title?: string;
	content?: string;
	buttons?: {
		text: string;
		icon?: string;
		variant?: ButtonProps["variant"];
		onClick?: () => void;
	}[];
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
			class={`
				fixed top-0 left-0 right-0 bottom-0 flex justify-center items-end
				bg-black bg-opacity-50 z-50
				!m-0
				transition-opacity duration-150 ease-in-out

				${
				props.open
					? "opacity-100 pointer-events-auto"
					: "opacity-0 pointer-events-none"
			}
			`}
			onClick={(e) => {
				if (e.target !== e.currentTarget) return;
				props.setOpen(false);
			}}
		>
			<div
				class={`
					text-black dark:text-white
					bg-light dark:bg-dark
					w-full max-w-xl mx-auto
					!rounded-b-none
					transition-transform duration-150 ease-in-out
					p-8 shadow-xl rounded-t


					${props.open ? "translate-y-0" : "translate-y-1/2"}
				`}
			>
				<Stack>
					<h1 class="text-3xl">
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
							variant={button.variant}
							icon={button.icon}
							onClick={button.onClick}
						>
							{button.text}
						</Button>
					))}
				</Stack>
			</div>
		</div>
	);
}
