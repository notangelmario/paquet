export type Props = {
	inset?: boolean;
};

export default function Divider(props: Props & JSX.IntrinsicElements["hr"]) {
	return (
		<hr
			{...props}
			class={`
				border-t-1 border-black border-opacity-25 dark:(!border-white !border-opacity-25)
				${props.inset ? "mx-4" : ""}
				${props.class || ""}
			`}
		/>
	);
}
