import { Container, Typography, Divider, Stack, IconButton } from "@mui/material";
import Header from "../components/Header";
import Categories from "../components/Categories";
import AppListItem from "../components/AppListItem";
import { AppListing } from "../types/AppListing";
import TopBar from "../components/TopBar";
import NextLink from "next/link";
import SettingsIcon from "@mui/icons-material/Settings";
import { supabase } from "../lib/supabase";

type Props = {
	apps: AppListing[]
}

const Home = ({ apps }: Props) => {
	return (
		<>
			<TopBar
				right={
					<NextLink href="/settings" passHref>
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
						app={app}
					/>
				))}
			</Container>
		</>
	);
};

export const getServerSideProps = async () => {
	const { data: apps } = await supabase.from("apps").select("*");

	return {
		props: {
			apps
		}
	};
};

export default Home;
