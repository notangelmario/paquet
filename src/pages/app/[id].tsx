import { Container, Stack, Typography } from "@mui/material";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import AppHeader from "../../components/AppHeader";
import TopBar from "../../components/TopBar";
import { firebase } from "../../lib/firebase";
import type { AppListing } from "../../types/AppListing";
import getMetaData from "metadata-scraper";
import { MetaData } from "metadata-scraper/lib/types";

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
	const firestore = getFirestore(firebase);
	const docRef = doc(firestore, `/hub/${id}`);
	const docSnap = await getDoc(docRef);
	
	if(docSnap.exists()) {
		return {
			props: {
				app: {
					id: docSnap.id,
					...docSnap.data()
				}
			}
		};
	} else {
		return {
			props: {
				app: null
			}   
		};
	}
};