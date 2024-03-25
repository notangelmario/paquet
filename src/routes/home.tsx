import type { App } from "@/types/App.ts";
import { Head } from "$fresh/runtime.ts";
import Stack from "@/components/Stack.tsx";
import Header from "@/components/Header.tsx";
import Container from "@/components/Container.tsx";
import { CATEGORIES, getCategory } from "@/lib/categories.ts";
import Navbar from "@/islands/Navbar.tsx";
import Button from "@/components/Button.tsx";
import ListItem from "@/components/ListItem.tsx";
import FewApps from "@/components/compound/FewApps.tsx";
import InstallBanner from "@/islands/InstallBanner.tsx";
import SearchBar from "@/components/SearchBar.tsx";
import SlideContainer from "@/components/SlideContainer.tsx";
import SlideItem from "@/components/SlideItem.tsx";
import ImageCard from "@/components/compound/ImageCard.tsx";
import { buildImageUrl } from "@/lib/image.ts";
import {
	getAppsBetweenDates,
	getAppsByCategory,
	getAppsRandom,
	getRandomAppsWithCover,
} from "@/lib/db.ts";
import Card from "@/components/Card.tsx";

export default async function Home() {
	const randomCategoryId: string =
		CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)].id;

	// This is used to determine for how long an app is considered
	// to be new.
	const sixtyDaysAgo = new Date(
		new Date().getTime() - (60 * 24 * 60 * 60 * 1000),
	);

	const [
		randomCategoryApps,
		newApps,
		randomApps,
		randomCards,
	] = await Promise.all([
		getAppsByCategory(5, randomCategoryId),
		getAppsBetweenDates(5, sixtyDaysAgo, new Date()),
		getAppsRandom(5),
		getRandomAppsWithCover(6),
	]);

	const randomCategory = randomCategoryApps?.length
		? {
			category: randomCategoryId,
			apps: randomCategoryApps,
		}
		: undefined;

	return (
		<>
			<Head>
				<title>Paquet</title>
			</Head>
			<Navbar
				right={[
					{
						icon: "settings",
						href: "/settings",
					},
				]}
			/>
			<Stack>
				<Container>
					<Stack>
						<Header icon="home">
							Home
						</Header>
						<form
							action="/search"
							method="GET"
						>
							<SearchBar />
						</form>
					</Stack>
				</Container>
				<SlideContainer>
					<SlideItem>
						<a href="/category">
							<Button
								icon="list"
								variant="outlined"
							>
								All
							</Button>
						</a>
					</SlideItem>
					{CATEGORIES.map((category, idx) => (
						<SlideItem
							key={category.id}
							isLast={idx === CATEGORIES.length - 1}
						>
							<a
								href={`/category/${category.id}`}
							>
								<Button
									icon={category.icon}
									variant="primary"
								>
									{category.name}
								</Button>
							</a>
						</SlideItem>
					))}
				</SlideContainer>

				<SlideContainer>
					{randomCards?.map((app, idx) => (
						<SlideItem
							key={idx}
							isLast={randomCards &&
								idx === randomCards.length - 1}
						>
							<a
								href={`/app/${app.id}`}
							>
								<ImageCard
									class="flex flex-col gap-y-4 w-64"
									// Weird stuff man
									image={buildImageUrl(app.cover!, 350)}
								>
									<img
										src={buildImageUrl(app.icon, 72, 72)}
										class="rounded-xl w-16 h-16"
									/>
									<h2 class="text-2xl">
										{app.name}
									</h2>
								</ImageCard>
							</a>
						</SlideItem>
					))}
				</SlideContainer>
				{newApps && newApps.length
					? (
						<div>
							<Container>
								<h2 class="text-2xl">
									New apps
								</h2>
							</Container>
							<SlideContainer>
								{/* This sorts every 2 elements */}
								{newApps.reduce(
									function (
										accumulator,
										_,
										currentIndex,
										array,
									) {
										if (currentIndex % 3 === 0) {
											accumulator.push(
												array.slice(
													currentIndex,
													currentIndex + 3,
												) as never,
											);
										}
										return accumulator;
									},
									[],
								)
									.map((
										col: App[],
										idx: number,
									) => (
										<SlideItem
											key={idx}
											disableGutters
											isLast={newApps &&
												idx ===
													newApps.length - 1}
										>
											{col.map((app, idx) => (
												<a
													href={`/app/${app.id}`}
													key={idx}
												>
													<ListItem
														button
														key={app.id}
														style={{ width: 300 }}
														image={buildImageUrl(
															app.icon,
															72,
															72,
														)}
														title={app.name}
														subtitle={app.categories
															?.map((category) =>
																getCategory(
																	category,
																)?.name
															).join(", ")}
														divider={idx !== 2}
													/>
												</a>
											))}
										</SlideItem>
									))}
							</SlideContainer>
						</div>
					)
					: null}
			</Stack>
			<Container>
				<Card class="mt-4 !bg-gradient-to-tr from-primary to-secondary text-light">
					<h2 class="text-xl">
						Paquet is now part of Roseto!
					</h2>
					<p>
						We're excited to announce that Paquet is now part of Roseto! 
						Roseto will be the new home for Paquet, and we're excited to see what the future holds.
					</p>
					<a
						href="https://roseto.co/updates#welcome-paquet"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button fullWidth variant="secondary" class="mt-4">
							Learn more on Roseto's blog
						</Button>
					</a>
				</Card>
				<InstallBanner />
			</Container>
			<Stack class="mt-4">
				<Container
					disableGutters
					class="gap-4 md:flex flex-row justify-items-stretch"
				>
					{randomApps &&
						(
							<div class="flex-1">
								<Container>
									<h2 class="text-2xl">
										Random picks
									</h2>
								</Container>
								<Container disableGutters>
									{randomApps.map((
										app: App,
										idx: number,
									) => (
										<a href={`/app/${app.id}`}>
											<ListItem
												button
												key={app.id}
												image={buildImageUrl(
													app.icon,
													72,
													72,
												)}
												title={app.name}
												subtitle={app.categories?.map(
													(category) =>
														getCategory(category)
															?.name,
												).join(", ")}
												divider={randomApps &&
													idx !==
														randomApps.length -
															1}
											/>
										</a>
									))}
								</Container>
							</div>
						)}

					{randomCategory &&
						(
							<div class="flex-1">
								<Container>
									<h2 class="text-2xl">
										Looking for {getCategory(
											randomCategory.category,
										)
											?.name}?
									</h2>
								</Container>
								<Container disableGutters>
									{randomCategory.apps.map((
										app: App,
										idx: number,
									) => (
										<a href={`/app/${app.id}`}>
											<ListItem
												button
												key={app.id}
												image={buildImageUrl(
													app.icon,
													72,
													72,
												)}
												title={app.name}
												subtitle={app.author}
												divider={randomCategory
													?.apps &&
													idx !==
														randomCategory.apps
																.length - 1}
											/>
										</a>
									))}
								</Container>
							</div>
						)}
				</Container>
				<Container class="mt-4">
					<FewApps />
				</Container>
			</Stack>
		</>
	);
}
