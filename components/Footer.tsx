import Container from "@/components/Container.tsx";

const LINKS = [
	{
		title: "Settings",
		href: "/settings",
	},
	{
		title: "Documentation",
		href: "/docs",
	},
];

export default function Footer() {
	return (
		<footer class="bg-paper-light dark:bg-paper-dark rounded-t p-4 mt-4">
			<Container>
				<h2 class="text-3xl">
					<img
						src="/icons/paquet.svg"
						alt=""
						class="inline-block w-8 h-8 align-middle dark:(filter invert)"
					/>{" "}
					Paquet
				</h2>
				<div class="mt-4 flex flex-row gap-4">
					<a
						href="https://github.com/fructoland/paquet"
						target="_blank"
						rel="noreferrer noopener"
						aria-label="GitHub"
					>
						<img
							src="/icons/github.svg"
							alt="GitHub"
							class="w-8 h-8 dark:(filter invert)"
						/>
					</a>
					<a
						href="https://www.madewithsupabase.com/p/paquet"
						target="_blank"
						rel="noreferrer noopener"
						aria-label="Made with Supabase"
					>
						<img
							src="/icons/supabase.svg"
							alt="Made with Supabase"
							class="w-8 h-8 dark:(filter invert)"
						/>
					</a>
					<a
						href="https://discord.gg/DXKe9aSZh6"
						target="_blank"
						rel="noreferrer noopener"
						aria-label="Discord"
					>
						<img
							src="/icons/discord.svg"
							alt="Discord"
							class="w-8 h-8 dark:(filter invert)"
						/>
					</a>
				</div>
				<div class="my-4 flex flex-row">
					{LINKS.map((link, idx) => (
						<>
							<a
								key={link.href}
								href={link.href}
								class="opacity-50 hover:underline"
							>
								{link.title}
							</a>
							{idx !== LINKS.length - 1 &&
								(
									<span class="opacity-50 mx-2">
										&middot;
									</span>
								)}
						</>
					))}
				</div>
				<p>
					Made with <span role="img">❤</span> by{" "}
					<a
						href="https://fructo.land"
						rel="noreferrer noopener"
						class="hover:underline"
					>
						Fructoland
					</a>
				</p>
			</Container>
		</footer>
	);
}
