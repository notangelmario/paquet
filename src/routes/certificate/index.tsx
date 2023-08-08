import Header from "@/components/Header.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Container from "@/components/Container.tsx";
import Card from "@/components/Card.tsx";
import Stack from "@/components/Stack.tsx";
import Icon from "@/components/Icon.tsx";
import Input from "@/components/Input.tsx";
import Button from "@/components/Button.tsx";
import { Handlers } from "@/types/Handler.ts";
import { PageProps } from "$fresh/server.ts";
import { createCertificate } from "@/lib/cert.ts";

interface DataProps {
	cert?: Record<string, string | number>;
}

export default function Certificate(props: PageProps<DataProps>) {
	return (
		<>
			<Navbar 
				back
			/>
			<Container>
				<Stack>
					<Header
						icon="certificate"
					>
						Certificate
					</Header>
					{props.data?.cert ? (
						<Card>
							<Stack>
								<p class="text-primary">
									<Icon
										name="info"
										inline
										size={18}
									/>{" "}
									Your certificate has been generated.
								</p>
								<pre class="text-xs overflow-x-auto bg-light dark:bg-dark rounded-lg p-2">
									{JSON.stringify(props.data.cert, null, 2)}
								</pre>
								<a
									href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(props.data.cert, null, 2))}`}
									download="certificate.json"
								>
									<Button
										fullWidth
										variant="outlined"
									>
										Download
									</Button>
								</a>
								<p>
									Refer to the <a class="text-primary hover:underline" href="/docs/certificate">documentation</a> to learn how to use it.
								</p>
							</Stack>
						</Card>
					) : null}
					<Card>
						<p class="opacity-50">
							<Icon
								name="info"
								inline
								size={18}
							/>{" "}
							Generate a Paquet certificate for your app
							to verify its authenticity.
						</p>
					</Card>
					
					<Card>
						<form method="POST">
							<Stack>
								<Input
									placeholder="App URL"
									fullWidth
									name="url"
								/>

								<Button
									type="submit"
									variant="primary"
								>
									Generate
								</Button>
							</Stack>
						</form>
					</Card>
				</Stack>
			</Container>
		</>
	)
}

export const handler: Handlers = {
	async POST(req, ctx) {
		const body = await req.formData();

		const url = body.get("url")?.toString();

		if (!url) {
			return ctx.render();
		}
			
		const privateKey = Deno.env.get("CERTIFICATE_PRIVATE_KEY")!;
		const cert = await createCertificate(privateKey, url);

		return ctx.render({
			cert
		});
	}
}
