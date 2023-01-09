import { apply } from "twind";
import { css } from "twind/css";

export const btn = apply`
	  	cursor-pointer
		not-disabled:(active:override:opacity-50 hover:opacity-75)
        disabled:(opacity-25 cursor-not-allowed)
		z-10
		transition-opacity
`;

export const btnOutset = apply`
		cursor-pointer
		shadow-outset-light
		not-disabled:active:shadow-pressed-light
		not-disabled:dark:(shadow-outset-dark active:shadow-pressed-dark)
        disabled:(opacity-25 cursor-not-allowed)
		z-0 transition-shadow
`;

export const iconBtn = apply`
		cursor-pointer 
		rounded-full
		block p-2
		focus:!outline-0
		not-disabled:(active:override:opacity-50 hover:opacity-75)
        disabled:(opacity-25 cursor-not-allowed)
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
