import { Container, Typography } from "@mui/material";
import CardBackground from "../resources/deliveryBackground.svg";

function NotFound() {
	return (
		<Container
			sx={{
				minHeight: "calc(100vh - 64px)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column"
			}}
		>
			<CardBackground
				style={{
					position: "absolute",
					bottom: 0,
					left: 0
				}}
			/>
			<Typography
				variant='h1'
			>
				Oops... <span role='img' aria-label='sad face'>😔</span>
			</Typography>
			<Typography
				variant='body1'
			>
				Pagina pe care o cautati nu exista.
			</Typography>
		</Container>
	);
}

export default NotFound;