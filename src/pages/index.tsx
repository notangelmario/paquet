import { Container, Typography, Divider, Stack, IconButton } from "@mui/material";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import Header from "../components/Header";
import Categories from "../components/Categories";
import AppListItem from "../components/AppListItem";
import { firebase } from "../lib/firebase";
import { AppListing } from "../types/AppListing";
import TopBar from "../components/TopBar";
import NextLink from "next/link";
import SettingsIcon from "@mui/icons-material/Settings";

type Props = {
	apps: AppListing[]
}

const Home = ({ apps }: Props) => {
	return (
		<>
			<TopBar
				right={
					<NextLink href="/settings">
						<IconButton edge="end">
							<SettingsIcon />
						</IconButton>
					</NextLink>
				}
			/>
			<Container>
				<Stack>
					<Header>
						Acasa
					</Header>
					<Categories/>
					<Divider/>
					<Typography
						variant="h2"
					>
						Nou
					</Typography>
				</Stack>
			</Container>
			<Container disableGutters sx={{ mt: 2 }}>
				{apps.map((app) => (
					<AppListItem
						key={app.id}
						name={app.name}
						categoryId={app.categoryId}
						iconUrl={app.iconUrl}
					/>
				))}
			</Container>
		</>
	);
};

export const getServerSideProps = async () => {
	const firestore = getFirestore(firebase);
	const queryRef = collection(firestore, "hub");
	let apps: AppListing[] = [];
	const docs = await getDocs(queryRef);

	const twitterManifest = await fetch("https://twitter.com/manifest.json").then((res) => res.json());

	docs.forEach((doc) => {
		apps.push({...doc.data(), id: doc.id} as AppListing);
	});

	return {
		props: {
			apps
		}
	};
};

export default Home;
