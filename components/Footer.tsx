/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Container from "./Container.tsx";



export default function Footer() {
	return (
		<footer className={tw`bg-paper-light text-black dark:(bg-paper-dark text-white) py-4 rounded-t mt-4`}>
			<Container>
				<h4 className={tw`text-xl mb-2`}>
					Paquet
				</h4>
				<div>
					<a href="https://github.com/notangelmario/paquet">
						<img
							className={tw`filter dark:invert`}
							height="24px"
							width="24px"
							src="/github.svg"
						/>
					</a>
				</div>
			</Container>
		</footer>
	)
}