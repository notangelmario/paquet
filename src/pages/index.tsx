import type { NextPage } from "next";
import { Container, Typography, Divider, Stack, Grid } from "@mui/material";
import Header from "../components/Header";
import Categories from "../components/Categories";
import AppListingInline from "../components/AppListingInline";

const Home: NextPage = () => {
	return (
		<>
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
						Nou nout
					</Typography>
				</Stack>
			</Container>
			<Container disableGutters sx={{ mt: 2 }}>
				<AppListingInline
					name="Twitter"
					categoryId="social"
					iconUrl="https://abs.twimg.com/responsive-web/client-web/icon-default-maskable-large.ee2b7aa8.png"
				/>
			</Container>
		</>
	);
};

export default Home;
