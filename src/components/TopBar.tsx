import { Toolbar, AppBar, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { ArrowBack as BackIcon } from "@mui/icons-material";
import LogoIcon from "./LogoIcon";

function TopBar() {
	const router = useRouter();


	// !AVERTIZMENT!
	// Asta este un mic hack pentru a nu avea probleme cu redirectionarea
	// Aceasta metoda nu este sigura. Te rog sa testezi functionalitatea inainte
	// De a face update la NextJS. Aceasta metoda nu este documentata si ar
	// putea fi modificata sau stearsa in orice moment.
	const handleBack = () => {
		if (history.state?.idx || 0 > 0) {
			router.back();
		} else {
			router.replace("/");
		}
	};

	return (
		<>
			<AppBar
				color='transparent'
				sx={{
					backgroundColor: theme => `${theme.palette.background.default}99`,
					backdropFilter: theme => `blur(${theme.shape.blur}px)`
				}}
			>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={handleBack}
					>
						<BackIcon />
					</IconButton>
					<LogoIcon 
						sx={{
							position: "absolute",
							left: "50%",
							transform: "translateX(-50%)"
						}}
					/>
				</Toolbar>
			</AppBar>
			<Toolbar/>
		</>
	);
}

export default TopBar;