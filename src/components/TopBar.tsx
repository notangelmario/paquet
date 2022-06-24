import { Toolbar, AppBar, IconButton, useScrollTrigger, Divider } from "@mui/material";
import { useRouter } from "next/router";
import { ArrowBack as BackIcon } from "@mui/icons-material";
import { useBrowser } from "../hooks/useBrowser";

type Props = {
	back?: boolean,
	right?: React.ReactElement
}

function TopBar(props: Props) {
	const { isIos } = useBrowser();
	const router = useRouter();
	const trigger = useScrollTrigger({
		threshold: 64,
		disableHysteresis: true
	});


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
					backgroundColor: theme => isIos ? `${theme.palette.background.default}99` : theme.palette.background.default,
					backdropFilter: theme => isIos ? `blur(${theme.shape.blur}px)` : undefined
				}}
			>
				<Toolbar>
					<>
						{props.back && (
							<IconButton
								edge="start"
								color="inherit"
								onClick={handleBack}
							>
								<BackIcon />
							</IconButton>
						)}
						<div style={{ marginLeft: "auto" }}>
							{props.right ? props.right : null}
						</div>
					</>
				</Toolbar>
				{trigger && <Divider />}
			</AppBar>
			<Toolbar/>
		</>
	);
}

export default TopBar;