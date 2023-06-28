import type { JSX } from "preact";

export default function SlideContainer(props: JSX.IntrinsicElements["div"]) {
	return (
		<div className="relative md:container lg:!max-w-screen-lg">
			<div
				{...props}
				class={`
				flex flex-row overflow-x-scroll
				py-2
				${props.class || ""}
			`}
				style={{
					scrollSnapType: "x mandatory",
					...props.style as Record<string, string>,
				}}
			>
				{props.children}
			</div>
			<div class="absolute top-0 left-0 bottom-0 pointer-events-none w-4 bg-gradient-to-r from-light dark:from-dark" />
			<div class="absolute top-0 right-0 bottom-0 pointer-events-none w-4 bg-gradient-to-l from-light dark:from-dark" />
		</div>
	);
}
