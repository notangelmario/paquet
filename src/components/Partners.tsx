import Link from "next/link";
import { Grid, Avatar, Typography, Button } from "@mui/material";
import IrisPizza from "../resources/partners/trattoria-iris.jpeg";
import BarBQ from "../resources/partners/barbq.jpg";

function Partners() {
	return (
		<>
			<Typography
				variant='h2'
			>
				Partenerii nostrii
			</Typography>
			<Grid 
				container 
				spacing={2}
				justifyContent='center'
				alignItems='center'
				alignContent='center'
				direction='row'
				sx={{
					marginLeft: theme => `-${theme.spacing(2)}!important`
				}}
			>
				{/* Pana vom avea mai multi parteneri ramanem doar cu proprietatea de md={6} */}
				<Grid 
					item
					xs={3}
					md={2}
				>
					<Avatar
						src={IrisPizza.src}
						sx={{
							width: "100%",
							height: "100%"
						}}
					/>
				</Grid>
				<Grid 
					item
					xs={3}
					md={2}
				>
					<Avatar
						src={BarBQ.src}
						sx={{
							width: "100%",
							height: "100%"
						}}
					/>
				</Grid>
			</Grid>
			<Link
				href='/contact'
				passHref
			>
				<Button
					LinkComponent='a'
					variant='contained'
					color='primary'
					sx={{
						alignSelf: "center"
					}}
				>
					Contacteaza-ne
				</Button>
			</Link>
		</>
	);
}

export default Partners;