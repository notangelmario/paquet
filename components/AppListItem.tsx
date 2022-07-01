/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";
import type { App } from "../types/App.ts";
import { btn } from "../utils/ui.ts";


type Props = {
	app: App
}

const AppListItem  = ({ app }: Props) => {
	return (
		<a href={`/app/${app.id}`}>
			<div
				className={
					tw`${btn} flex flex-row items-center`
				}
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
		</a>
	)
}

export default AppListItem;