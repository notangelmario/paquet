/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { btn } from "../utils/ui.ts";

type Props = {
	button?: boolean,
	icon?: string,
	image?: string,

	title?: string,
	subtitle?: string
}

const ListItem  = ({ button, icon, image, title, subtitle }: Props) => {
	return (
		<div
			className={
				tw`${button && btn} flex flex-row items-center p-2`
			}
		>
			{icon || image ?
				icon ?
					<div className={tw`w-12 h-12 mr-4 flex justify-center items-center`}>
						<span className={tw`!text-3xl !align-middle material-symbols-outlined`}>
							{icon}
						</span>
					</div>
					:
					<img
						src={image}
						alt=""
						className={tw`w-12 h-12 rounded	 mr-4`}
					/>
				: null
			}
			
			<div>
				<h2 className={tw`text-lg`}>
					{title}
				</h2>
				<p className={tw`text-sm opacity-50`}>
					{subtitle}
				</p>
			</div>
		</div>
	)
}

export default ListItem;