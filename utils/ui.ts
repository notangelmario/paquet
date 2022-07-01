import { apply } from "@twind";
import { css } from "twind/css";

export const btn = apply`
	  	cursor-pointer
		opacity(hover:90 active:80)
		transition-opacity duration-75 ease-in-out origin-center
`

export const iconBtn = apply`
		cursor-pointer 
		block p-2
		focus:!outline-0
		opacity(hover:90 active:80)
		transition-opacity duration-150 ease-in-out origin-center
		${css({
			"& > span": {
				display: "block",
				width: "100%",
				height: "100%",
				verticalAlign: "middle"
			}
		})}
`