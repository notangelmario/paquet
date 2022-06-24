import { List, ListItem, ListItemText, Paper, Stack } from "@mui/material";
import { Container } from "@mui/system";
import Header from "../components/Header";
import TopBar from "../components/TopBar";
import { useBrowser } from "../hooks/useBrowser";



const Settings = () => {
	const { browser, os, device } = useBrowser();

	return (
		<>
			<TopBar
				back
			/>
			<Container sx={{ height: "100vh" }}>
				<Stack>
					<Header>
                        Setari
					</Header>
					<List component={Paper}>
						<ListItem>
							<ListItemText
								primary="Browser"
								secondary={browser?.name}
							/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary="System de operare"
								secondary={os?.name}
							/>
						</ListItem>
						{device?.vendor &&
                            <ListItem>
                            	<ListItemText
                            		primary="Dispozitiv"
                            		secondary={`${device?.vendor} ${device?.model || ""}`}
                            	/>
                            </ListItem>
						}
					</List>
				</Stack>
			</Container>
		</>

	);
};

export default Settings;