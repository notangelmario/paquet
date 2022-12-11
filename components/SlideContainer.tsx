
export default function SlideContainer(props: JSX.IntrinsicElements["div"]) {
	return (
		<div
			{...props}
			class={`flex flex-row overflow-x-scroll md:container ${
				props.class || ""
			}`}
			style={{
				scrollSnapType: "x mandatory",
				...props.style as Record<string, string>,
			}}
		>
			{props.children}
		</div>
	);
}
