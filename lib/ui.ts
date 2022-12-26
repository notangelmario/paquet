import { apply } from "twind";
import { css } from "twind/css";

export const btn = apply`
	  	cursor-pointer
		active:opacity-50 hover:opacity-75 
		z-10
		transition-opacity
`;

export const btnOutset = apply`
		cursor-pointer
		shadow-outset-light
		active:shadow-pressed-light
		dark:(shadow-outset-dark active:shadow-pressed-dark)
		z-0 transition-shadow
`;

export const iconBtn = apply`
		cursor-pointer 
		rounded-full
		block p-2
		focus:!outline-0
		active:opacity-50 hover:opacity-75
		transition-opacity
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
