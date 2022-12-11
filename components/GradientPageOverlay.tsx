interface Props {
	accentColor: string;
}

export default function GradientPageOverlay({ accentColor }: Props) {
	return (
		<div
			style={{
				position: "absolute",
		  		top: 0,
		  		left: 0,
		  		right: 0,
		  		height: 256,
		  		background: `linear-gradient(to bottom, ${accentColor}25 0%, rgba(0, 0, 0, 0) 100%)`,
		  		zIndex: 0,
				pointerEvents: "none"
			}}
	  	/>
  	);
}
