import Button from "@/components/Button.tsx";
import { AuthMethodsList, AuthProviderInfo } from "pocketbase-types";
import { AuthMethodNames } from "@/lib/pocketbase-client.ts";

interface Props {
	authMethods: AuthMethodsList;
}

export default function LoginButtons(props: Props) {
	return (
		<>
			{props.authMethods.authProviders.map(provider => (
				<a
					href={`/auth/login?provider=${provider.name}`}
				>
					<Button
						icon={provider.name}
						fullWidth
					>
						Login with {AuthMethodNames.get(provider.name)}
					</Button>
				</a>
			))}
		</>
	);
}
