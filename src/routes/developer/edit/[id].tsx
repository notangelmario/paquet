/**@jsx h */
/**@jsxFrag Fragment */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import type { PageProps } from "$fresh/server.ts";
import type { Handlers } from "@/types/Handler.ts";
import { App, Category } from "@/types/App.ts";
import { supabaseAsUser, supabaseService } from "@supabase";
import { z, ZodError } from "zod";
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
	error?: ZodError<FormData>;
	updated?: boolean;
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
					{data.updated && (
						<p
							class={tw`text-green-500`}
						>
							<span
								class={tw`material-symbols-outlined !text-base !align-bottom`}
							>
								check
							</span>{" "}
							Successfully updated
						</p>
					)}
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
							{data.error && data.error.format().name && (
								<span class={tw`text-red-500`}>
									{data.error.format().name?._errors[0]}
								</span>
							)}


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
							{data.error && data.error.format().description && (
								<span class={tw`text-red-500`}>
									{data.error.format().description?._errors[0]}
								</span>
							)}


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
							{data.error && data.error.format().url && (
								<span class={tw`text-red-500`}>
									{data.error.format().url?._errors[0]}
								</span>
							)}


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
							{data.error && data.error.format().category && (
								<span class={tw`text-red-500`}>
									{data.error.format().category?._errors[0]}
								</span>
							)}


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
							{data.error && data.error.format().icon_small && (
								<span class={tw`text-red-500`}>
									{data.error.format().icon_small?._errors[0]}
								</span>
							)}



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
							{data.error && data.error.format().icon_large && (
								<span class={tw`text-red-500`}>
									{data.error.format().icon_large?._errors[0]}
								</span>
							)}

							<p
								class={tw`opacity-50`}
							>
								<span
									class={tw`material-symbols-outlined !text-base !align-bottom`}
								>
									info
								</span>{" "}
								To reduce requests to your server, we serve cached
								versions of your icons to users.
							</p>
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

type FormData = z.infer<typeof formSchema>;

const fetchApp = async (appId: string, userId: string, accessToken: string) => {
	const supabase = supabaseAsUser(accessToken);

	const [{ data: app }, { data: categories }] = await Promise.all([
		supabase.from<App>("apps")
			.select(
				"id, name, url, description, icon_small, icon_large, features, approved, ready_to_approve, category:categories(*), owner:users(*)"
			)
			.eq("id", appId)
			.eq("owner", userId)
			.single(),
		supabase.from<Category>("categories")
			.select("*")
	]);

	return { app, categories };
}

export const handler: Handlers = {
	async POST(req, ctx) {
		const { accessToken } = ctx.state

		if (!accessToken) {
			return new Response("Unauthorized", {
				status: 307,
				headers: {
					Location: "/login",
				},
			})
		}

		const { user } = await supabaseService.auth.api.getUser(accessToken);

		if (!user) {
			return new Response("Unauthorized", {
				status: 307,
				headers: {
					Location: "/developer",
				},
			})
		}

		const { app, categories } = await fetchApp(ctx.params.id, user.id, accessToken);

		if (!app || !categories) {
			return new Response("Internal server error", {
				status: 500,
			});
		}

		if (app.owner?.id !== user.id) {
			return new Response("Forbidden", {
				status: 307,
				headers: {
					Location: "/developer",
				},
			});
		}

		const formData = await req.formData();
		const formDataObject = Object.fromEntries(formData);

		const formValidation = formSchema.safeParse(formDataObject);

		if (!formValidation.success) {
			return ctx.render({
				app,
				categories,
				error: formValidation.error,
			} as DataProps)
		}

		const { error, data: newApp } = await supabaseService.from("apps")
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
			.eq("id", formDataObject.id)
			.single();

		if (error) {
			return new Response("Internal server error", {
				status: 500,
			});
		}

		return ctx.render({
			app: newApp,
			categories,
			updated: true,
		} as DataProps)
	},

	async GET(_, ctx) {
		const { accessToken } = ctx.state;

		if (!accessToken) {
			return new Response("Unauthorized", {
				status: 307,
				headers: {
					Location: "/login",
				},
			})
		}

		const { user } = await supabaseService.auth.api.getUser(accessToken);

		if (!user) {
			return new Response("Unauthorized", {
				status: 307,
				headers: {
					Location: "/developer",
				},
			})
		}

		const { app, categories } = await fetchApp(ctx.params.id, user.id, accessToken);

		if (!app || !categories) {
			return new Response("Internal server error", {
				status: 500,
			});
		}

		return ctx.render({
			app,
			categories,
		} as DataProps);
	}
}