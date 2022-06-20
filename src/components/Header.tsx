import { Typography } from "@mui/material";


type HeaderProps = {
	children: React.ReactNode
}

function Header({ children }: HeaderProps) {
	return (
		<Typography
			variant='h1'
			sx={{
				marginTop: 4
			}}
		>
			{children}
		</Typography>
	);
}

export default Header;