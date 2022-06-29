/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";
import type { App } from "../types/App.ts";


type Props = {
	app: App
}

const AppListItem  = ({ app }: Props) => {
	return (
		<div
			className={tw`flex flex-row items-center`}
		>
			<img
				src={app.iconUrl}
				alt={app.name}
				className={tw`w-16 h-16 rounded mr-4`}
			/>
			<div>
				<h2 className={tw`text-2xl`}>
					{app.name}
				</h2>
				<p className={tw`text-sm opacity-75`}>
					{app.categoryId}
				</p>
			</div>
		</div>
	)
}

export default AppListItem;