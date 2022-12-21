import { apply } from "twind";
import { css } from "twind/css";

export const btn = apply`
	  	cursor-pointer
		hover:opacity-75 active:opacity-50
		z-10
		transition-opacity
`;

export const btnOutset = apply`
		cursor-pointer
		active:shadow-pressed-light
		dark:(shadow-pressed-dark active:shadow-pressed-dark)
		z-0
		transition-shadow
`;

export const iconBtn = apply`
		cursor-pointer 
		rounded-full
		block p-2
		focus:!outline-0
		hover-hover:opacity-90 active:opacity-80
		transition-opacity duration-75 ease-in-out origin-center
		${
	css({
		"& > span": {
			display: "block",
			width: "100%",
			height: "100%",
			verticalAlign: "middle",
		},
	})
}
`;
