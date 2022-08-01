/**@jsx h */
/**@jsxFrag Fragment */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import type { PageProps } from "$fresh/server.ts";
import type { Handler } from "@/types/Handler.ts";
import type { App, Category } from "@/types/App.ts";
import { supabaseAsUser } from "@supabase";
import Container from "@/components/Container.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Button from "@/components/Button.tsx";
import Stack from "@/components/Stack.tsx";
import ListItem from "@/components/ListItem.tsx";
import Input from "@/components/Input.tsx";
import TextArea from "@/components/TextArea.tsx";
import Select from "@/components/Select.tsx";
import Divider from "@/components/Divider.tsx";

type DataProps = {
	app: App;
	categories: Category[];
}

export default function DevDashboard(props: PageProps<DataProps>) {
	return (
		<>
			<Navbar 
				back
			/>
			<Container class={tw`mt-16`}>
				<Stack>
					<ListItem
						title={props.data.app.name}
						subtitle={props.data.app.category.name}
						image={props.data.app.icon_small}
					/>
					<form method="GET" action="/api/developer/update-app">
						<input type="hidden" name="id" value={props.params.id} /> 
						<Stack>
							<label class={tw`form-label inline-block opacity-50`}>
								App name
							</label>
							<Input
								type="text"
								name="name"
								placeholder="Name"
								value={props.data.app.name}
							/>
							<label class={tw`form-label inline-block opacity-50`}>
								App description
							</label>
							<TextArea
								type="text"
								name="description"
								placeholder="description"
								value={props.data.app.description}
							/>
							<label class={tw`form-label inline-block opacity-50`}>
								App category
							</label>
							<Select
								name="category"
								value={props.data.app.category.id}
							>
								{props.data.categories.map((category) => (
									<option
										selected={category.id === props.data.app.category.id}
										key={category.id}
										value={category.id}
									>
										{category.name}
									</option>
								))}
							</Select>
							<Divider />
							<h2
								class={tw`text-2xl`}
							>
								App icons
							</h2>
							<label class={tw`form-label inline-block opacity-50`}>
								Small icon URL (max 128x128)
							</label>
							<Input
								type="url"
								name="icon_small"
								placeholder="Small icon"
								value={props.data.app.icon_small}
							/>
							<label class={tw`form-label inline-block opacity-50`}>
								Large icon URL (min 256x256; max 512x512)
							</label>
							<Input
								type="url"
								name="icon_large"
								placeholder="Large icon"
								value={props.data.app.icon_large}
							/>
							<Divider />
							<h2
								class={tw`text-2xl`}
							>
								App features
							</h2>
							<div class={tw`flex flex-row`}>
								<Input
									id="features-mobile"
									type="checkbox"
									name="features-mobile"
									class="!w-min"
									checked={props.data.app.features?.mobile}
								/>
								<label class={tw`ml-2`} for="features-mobile">
									Mobile optimized
								</label>
							</div>
							<div class={tw`flex flex-row`}>
								<Input
									id="features-desktop"
									type="checkbox"
									name="features-desktop"
									class="!w-min"
									checked={props.data.app.features?.desktop}
								/>
								<label class={tw`ml-2`} for="features-desktop">
									Desktop optimized
								</label>
							</div>
							<div class={tw`flex flex-row`}>
								<Input
									id="features-openSource"
									type="checkbox"
									name="features-openSource"
									class="!w-min"
									checked={props.data.app.features?.openSource}
								/>
								<label class={tw`ml-2`} for="features-openSource">
									Open source
								</label>
							</div>
							<div class={tw`flex flex-row`}>
								<Input
									id="features-offline"
									type="checkbox"
									name="features-offline"
									class="!w-min"
									checked={props.data.app.features?.offline}
								/>
								<label class={tw`ml-2`} for="features-offline">
									Offline support
								</label>
							</div>
							<Divider />
							<Stack
								direction="horizontal"
							>
								<Button
									type="submit"
								>
									Submit
								</Button>
								<Button
									outlined
									red
									type="submit"
									name="delete"
									value="true"
								>
									Delete
								</Button>
							</Stack>
						</Stack>
					</form>
				</Stack>
			</Container>
		</>
	)
}

export const handler: Handler = async (_, ctx) => {
	const user = ctx.state.user;
	const { accessToken } = ctx.state;

	if (!user || !accessToken) {
		return new Response("Unauthorized", {
			status: 307,
			headers: {
				Location: "/login",
			},
		});
	}

	const supabase = supabaseAsUser(accessToken);

	const { data: app } = await supabase.from<App>("apps")
		.select("id, name, description, icon_small, icon_large, features, category:categories(*)")
		.eq("id", ctx.params.id)
		.eq("owner", user.id)
		.single();
	
	const { data: categories } = await supabase.from<Category>("categories").select("*");

	if (!app || !categories) {
		return new Response("Unauthorized", {
			status: 307,
			headers: {
				Location: "/dashboard",
			},
		})
	}

	return ctx.render({
		app,
		categories
	})
}