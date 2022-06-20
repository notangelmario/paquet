import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import RideSVG from "../resources/ride.svg";
import { Parallax } from "react-scroll-parallax";



function PaquetRide() {
	return (
		<Card>		
			<CardMedia
				component={Parallax}
				title='Ride'
				scale={[.8, 1]}
			>
				<RideSVG 
					width='100%'
					height={300}
				/>
			</CardMedia>
			<CardContent>
				<Typography variant='h5'>
					Paquet Ride
				</Typography>
				<Typography variant='body1'>
					Mult mai ușor, mult mai simplu și mult mai accesibil. Serviciul nostru
                    de taxi te va ajuta să ajungi la destinația ta, fără să te temi de 
                    costuri și de țepe. Șoferii noștrii sunt angajați direct de către
                    noi, iar drumul și costul este procesat în întregime de către noi.
				</Typography>
			</CardContent>
		</Card>
	);
}

export default PaquetRide;