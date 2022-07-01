import { apply } from "@twind";
import { css } from "twind/css";

export const btn = apply`
	  	cursor-pointer
		scale(hover:[1.01] focus:[1.01] active:[0.99])
		transition-transform duration-75 ease-in-out origin-center
`

export const iconBtn = apply`
		cursor-pointer 
		block p-2
		focus:!outline-0
		scale(hover:[1.01] focus:[1.01] active:[0.99])
		transition-transform duration-75 ease-in-out origin-center
		${css({
			"& > span": {
				display: "block",
				width: "100%",
				height: "100%",
				verticalAlign: "middle"
			}
		})}
`