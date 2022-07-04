/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { btn } from "../utils/sharedUi.ts";

type Props = {
	button?: boolean,
	icon?: string,
	image?: string,

	title?: string,
	subtitle?: string,
	imageProps?: h.JSX.IntrinsicElements["img"],
	divider?: boolean,
}

const ListItem  = ({ button, icon, image, title, subtitle, imageProps, divider }: Props) => {
	return (
		<div>
			<div
				className={
					tw`
						${button && btn} 
						flex flex-row items-center p-4
					`
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
							alt={title}
							width="48px"
							height="48px"
							{...imageProps}
							className={tw`rounded mr-4 ${imageProps?.className || ""}`}						
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
			{divider &&
				<hr className={tw`border-t-1 border-black border-opacity-25 dark:(!border-white !border-opacity-25) mx-4`} />
			}
		</div>
	)
}

export default ListItem;