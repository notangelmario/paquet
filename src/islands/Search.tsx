/**@jsx h */
/**@jsxFrag Fragment */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { useDebounce } from "../hooks/useDebounce.ts";
import type { App } from "../types/App.ts";
import { useEffect, useState, useRef } from "preact/hooks";
import SearchBox from "../components/SearchBox.tsx";
import Container from "../components/Container.tsx";
import ListItem from "../components/ListItem.tsx";
import Card from "../components/Card.tsx";


export default function Search() {
	const [ apps, setApps ] = useState<App[]>([]);
	const [ open, setOpen ] = useState(false);
	const [ searchTerm, setSearchTerm ] = useState("");
	const searchRef = useRef<HTMLInputElement>(null);
	const debouncedValue = useDebounce(searchTerm, 500);
	
	useEffect(() => {
		(async () => {
			if (debouncedValue) {
				const { data } = await window.supabase.rpc<App>("search_app", { search_term: debouncedValue });

				if (data) {
					setApps(data);
				}
			}
		})();
	}, [ debouncedValue ]);
	
	useEffect(() => {
		if (open) {
			document.documentElement.style.overflow = "hidden";
		} else {
			document.documentElement.style.overflow = "";
		}
	}, [open]);

	return (
		<>
			<div
				class={tw`
					${open ? 
						"opacity-100 pointer-events-auto"
						: 
						"opacity-0 pointer-events-none"
					}
					fixed top-0 left-0 right-0 bottom-0 flex justify-center items-start
					pt-4
					bg-black bg-opacity-50 z-40
					transition-opacity duration-150 ease-in-out
				`}
				onClick={(e) => {
					if (e.target !== e.currentTarget) return;
					setOpen(false);
				}}
			>
				<Container>
					<SearchBox
						resetButton
						inputRef={searchRef}
						inputProps={{
							onFocus: () => setOpen(true),
							onBlur: () => !searchTerm && setOpen(false),

							value: searchTerm,
							onInput: (e) => setSearchTerm((e.target as HTMLInputElement).value),
						}}
					/>
					<Card
						disableGutters
						class={tw`
							mt-4
						`}
					>
						{!searchTerm && (
							<p class={tw`opacity-50 text-center`}>
								Search for an app...
							</p>
						)}
						{apps.length > 0 && apps.map((app, idx) => (
							<a href={`/app/${app.id}`}>
								<ListItem
									button
									key={app.id}
									image={app.iconUrl}
									title={app.name}
									divider={idx !== apps.length - 1}
								/>
							</a>
						))}
					</Card>
				</Container>
			</div>
			<SearchBox
				class={tw`${open && "opacity-0"}`}
				inputProps={{
					class: tw`opacity-50`,
				}}
				text={searchTerm}
				onClick={() => {
					console.log("clicked");
					
					setOpen(true);
					if (searchRef.current) {
						searchRef.current.focus();
					}
				}}
			/>
		</>
	)
}