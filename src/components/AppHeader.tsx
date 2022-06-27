import type { AppListing } from "../types/AppListing";
import { Avatar, Button, Grid, Typography } from "@mui/material";
import OpenIcon from "@mui/icons-material/OpenInNew";



type Props = {
    app: AppListing
}

const AppHeader = ({ app }: Props) => {
	return (
		<Grid
			container
			direction="row"
			spacing={2}
		>
			<Grid
				item
				xs={4}
				md={2}
			>
				<Avatar
					variant="rounded"
					src={app.iconUrl}
					sx={{
						width: "100%",
						height: "100%"
					}}
				/>
			</Grid>
			<Grid
				item
				xs={4}
				md={6}
			>
				<Typography
					variant="h3"
				>
					{app.name}
				</Typography>
			</Grid>
			<Grid
				item
				xs={12}
				md={4}
			>
				<Button
					href={app.url}
					disabled={!app.url}
					target="_blank"
					rel="noopener noreferrer"
					startIcon={<OpenIcon />}
					fullWidth
					variant="contained"
				>
                    Deschide
				</Button>
			</Grid>
		</Grid>
	);
};

export default AppHeader;