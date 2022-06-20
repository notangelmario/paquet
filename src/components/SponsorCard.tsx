import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Favorite as HeartIcon } from "@mui/icons-material";


function SponsorCard() {
	return (
		<Card
			sx={{
				backgroundImage: theme => `linear-gradient(to top right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
				color: "white"
			}}
		>
			<CardContent>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						alignContent: "center",
						height: "100%",
						marginBottom: 1
					}}
				>
					<HeartIcon fontSize='inherit'/> 
					<Typography
						variant='h5'
						marginLeft={1}
					>
						Sponsorizare
					</Typography>
				</Box>
				<Typography
					marginBottom={2}
				>
					Vrei sa ne ajuti sa ne dezvoltam? Considera sa ne sponsorizezi! Banii pe care ii primim
					ne ajuta sa dezvoltam platforma cat mai repede.
				</Typography>
				<Button
					variant='outlined'
					color='inherit'
					size='large'
					href='https://github.com/sponsors/paquetromania'
					target='_blank'
					rel='noopener noreferrer'
					fullWidth
				>
					Sponsorizeaza-ne
				</Button>
			</CardContent>
		</Card>
	);
}

export default SponsorCard;