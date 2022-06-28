import { List, ListItem, ListItemText, Paper, Stack, Typography, Box } from "@mui/material";
import { Container } from "@mui/system";
import Header from "../components/Header";
import TopBar from "../components/TopBar";
import { useBrowser } from "../hooks/useBrowser";
import LogoIcon from "../components/LogoIcon";



const Settings = () => {
	const { browser, os, device } = useBrowser();

	return (
		<>
			<TopBar
				back
			/>
			<Container>
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
					<Box
						display="flex"
						justifyContent="center"
					>
						<LogoIcon />
					</Box>
				</Stack>
			</Container>
		</>

	);
};

export default Settings;