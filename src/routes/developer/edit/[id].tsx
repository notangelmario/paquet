/**@jsx h */
/**@jsxFrag Fragment */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import type { PageProps } from "$fresh/server.ts";
import type { Handlers } from "@/types/Handler.ts";
import { App, Category } from "@/types/App.ts";
import { supabaseAsUser, supabaseService } from "@supabase";
import Container from "@/components/Container.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Button from "@/components/Button.tsx";
import Stack from "@/components/Stack.tsx";
import ListItem from "@/components/ListItem.tsx";
import Input from "@/components/Input.tsx";
import TextArea from "@/components/TextArea.tsx";
import Select from "@/components/Select.tsx";
import Divider from "@/components/Divider.tsx";
import { z } from "https://deno.land/x/zod@v3.18.0/index.ts";

type DataProps = {
	app: App;
	categories: Category[];
};

export default function DevDashboard({ data, params }: PageProps<DataProps>) {
	return (
		<>
			<Navbar
				back
			/>
			<Container class={tw`mt-16`}>
				<Stack>
					<ListItem
						title={data.app.name}
						subtitle={data.app.category.name}
						image={data.app.icon_small}
					/>
					<span
						class={tw`rounded ${
							data.app.approved
								? "bg-green-500"
								: "bg-yellow-500"
						} text-white p-2`}
					>
						<span class={tw`material-symbols-outlined !text-base`}>
							info
						</span>{" "}
						Status:{" "}
						{data.app.approved ? "Approved" : "Not approved"}
					</span>
					<form method="POST">
						<input
							type="hidden"
							name="id"
							value={params.id}
						/>
						<Stack>
							<label
								class={tw`form-label inline-block opacity-50`}
							>
								App name
							</label>
							<Input
								type="text"
								name="name"
								placeholder="Name"
								value={data.app.name}
							/>
							<label
								class={tw`form-label inline-block opacity-50`}
							>
								App description
							</label>
							<TextArea
								type="text"
								name="description"
								placeholder="Description"
								value={data.app.description}
							/>
							<label
								class={tw`form-label inline-block opacity-50`}
							>
								App URL
							</label>
							<Input
								autoComplete="off"
								type="url"
								name="url"
								placeholder="URL"
								value={data.app.url}
							/>
							<label
								class={tw`form-label inline-block opacity-50`}
							>
								App category
							</label>
							<Select
								name="category"
								value={data.app.category.id}
							>
								{data.categories.map((category) => (
									<option
										selected={category.id === data.app.category.id}
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
							<label
								class={tw`form-label inline-block opacity-50`}
							>
								Small icon URL (max 128x128)
							</label>
							<Input
								type="url"
								name="icon_small"
								placeholder="Small icon"
								value={data.app.icon_small}
							/>
							<label
								class={tw`form-label inline-block opacity-50`}
							>
								Large icon URL (min 256x256; max 512x512)
							</label>
							<Input
								type="url"
								name="icon_large"
								placeholder="Large icon"
								value={data.app.icon_large}
							/>
							<Divider />
							<h2
								class={tw`text-2xl`}
							>
								App features
							</h2>
							<div class={tw`flex flex-row`}>
								<Input
									id="features_mobile"
									type="checkbox"
									name="features_mobile"
									class="!w-min"
									checked={data.app.features?.mobile}
								/>
								<label class={tw`ml-2`} for="features_mobile">
									Mobile optimized
								</label>
							</div>
							<div class={tw`flex flex-row`}>
								<Input
									id="features_desktop"
									type="checkbox"
									name="features_desktop"
									class="!w-min"
									checked={data.app.features?.desktop}
								/>
								<label class={tw`ml-2`} for="features_desktop">
									Desktop optimized
								</label>
							</div>
							<div class={tw`flex flex-row`}>
								<Input
									id="features_openSource"
									type="checkbox"
									name="features_openSource"
									class="!w-min"
									checked={data.app.features?.openSource}
								/>
								<label
									class={tw`ml-2`}
									for="features_openSource"
								>
									Open source
								</label>
							</div>
							<div class={tw`flex flex-row`}>
								<Input
									id="features_offline"
									type="checkbox"
									name="features_offline"
									class="!w-min"
									checked={data.app.features?.offline}
								/>
								<label class={tw`ml-2`} for="features_offline">
									Offline support
								</label>
							</div>
							<Divider />
							<Stack direction="horizontal">
								<Button type="submit">
									Submit
								</Button>
								<Button
									outlined
									red
									disabled
									// type="submit"
									// name="delete"
									// value="true"
								>
									Delete
								</Button>
							</Stack>
						</Stack>
					</form>
				</Stack>
			</Container>
		</>
	);
}

export const handler: Handlers = {
	async POST(req) {
		const formData = await req.formData();
		const formDataObject = Object.fromEntries(formData);

		const formSchema = z.object({
			id: z.string().uuid(),
			name: z.string().min(3).max(50),
			description: z.string().min(3).max(500),
			category: z.string(),
			url: z.string().url(),
			icon_small: z.string().url(),
			icon_large: z.string().url(),
			features_mobile: z.literal("on").optional(),
			features_desktop: z.literal("on").optional(),
			features_openSource: z.literal("on").optional(),
			features_offline: z.literal("on").optional(),
		})

		const formValidation = formSchema.safeParse(formDataObject);

		if (!formValidation.success) {
			return new Response(JSON.stringify({
				data: formDataObject,
				error: formValidation.error,
			}, null, 4), {
				status: 400,
			});			
		}

		const { error } = await supabaseService.from("apps")
			.update({
				name: formValidation.data.name,
				description: formValidation.data.description,
				url: formValidation.data.url,
				category: formValidation.data.category,
				icon_small: formValidation.data.icon_small,
				icon_large: formValidation.data.icon_large,
				features: {
					mobile: formValidation.data.features_mobile === "on",
					desktop: formValidation.data.features_desktop === "on",
					offline: formValidation.data.features_offline === "on",
					openSource: formValidation.data.features_openSource === "on",
				},
			})
			.eq("id", formDataObject.id);

		if (error) {
			return new Response(JSON.stringify({
				data: formDataObject,
				error: error,
			}), {
				status: 400,
			});
		}

		return new Response(JSON.stringify({
			success: true,
			data: formDataObject,
			error: null,
		}, null, 4), {
			status: 200,
		});
	},
	async GET(_, ctx) {
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
			.select(
				"id, name, url, description, icon_small, icon_large, features, category:categories(*) ",
			)
			.eq("id", ctx.params.id)
			.eq("owner", user.id)
			.single();

		const { data: categories } = await supabase.from<Category>("categories")
			.select("*");

		if (!app || !categories) {
			return new Response("Unauthorized", {
				status: 307,
				headers: {
					Location: "/dashboard",
				},
			});
		}

		return ctx.render({
			app,
			categories,
		});
	}
}