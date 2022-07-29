/**@jsx h */
/**@jsxFrag Fragment */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import type { Handler, PageProps } from "$fresh/server.ts";
import type { App, Category } from "@/types/App.ts";
import { getCookies } from "$std/http/cookie.ts";
import { supabaseService } from "@supabase";
import Container from "@/components/Container.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Button from "@/components/Button.tsx";
import Stack from "@/components/Stack.tsx";
import ListItem from "@/components/ListItem.tsx";
import Input from "@/components/Input.tsx";
import Select from "@/components/Select.tsx";

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
					<form>
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
							<Input
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

export const handler: Handler = async (req, ctx) => {
	const cookies = await getCookies(req.headers);
	const { user } = await supabaseService.auth.api.getUser(cookies["access_token"]);

	if (!user) {
		return new Response("Unauthorized", {
			status: 307,
			headers: {
				Location: "/login",
			},
		});
	}

	supabaseService.auth.setAuth(cookies["access_token"]);

	const { data: app } = await supabaseService.from<App>("apps")
		.select("id, name, description, icon_small, category:categories(*)")
		.eq("id", ctx.params.id)
		.eq("owner", user.id)
		.single();
	
	const { data: categories } = await supabaseService.from<Category>("categories").select("*");

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