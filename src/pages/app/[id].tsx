import { Container } from "@mui/material";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import AppListItem from "../../components/AppListItem";
import TopBar from "../../components/TopBar";
import { firebase } from "../../lib/firebase";
import { AppListing } from "../../types/AppListing";

type Props = {
    app: AppListing | null
}

const App = (props: Props) => {
	return (
		<>
			<TopBar back />
			<Container>
				<AppListItem
					app={props.app}
				/>
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
				app: {id: docSnap.id, ...docSnap.data()}
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