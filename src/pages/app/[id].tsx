import { Container, Stack, Typography } from "@mui/material";
import { supabase } from "../../lib/supabase";
import { GetServerSideProps } from "next";
import AppHeader from "../../components/AppHeader";
import TopBar from "../../components/TopBar";
import type { AppListing } from "../../types/AppListing";
// import getMetaData from "metadata-scraper";
// import { MetaData } from "metadata-scraper/lib/types";

type Props = {
    app: AppListing
}

const App = ({ app }: Props) => {
	return (
		<>
			<TopBar back />
			<Container>
				<Stack>
					<AppHeader
						app={app}
					/>
					<Typography>
						{app?.description}
					</Typography>
				</Stack>
			</Container>
		</>
	);
};

export default App;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id } = context.query;

	if (id) {
		const { data: app } = await supabase.from<AppListing>("apps").select("*").eq("id", id as string).single();

		return {
			props: {
				app
			}
		};
	}
		
	return {
		props: {
			app: null
		}
	}
};