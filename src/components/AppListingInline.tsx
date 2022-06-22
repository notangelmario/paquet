import { Avatar, Typography, ButtonBase, Skeleton, Stack, Container, useTheme } from "@mui/material";
import { categories } from "../lib/categories";

type Props = {
    loading?: boolean,
    name?: string,
    iconUrl?: string,
    categoryId?: string
}

const AppListingInline = (props: Props) => {
	const theme = useTheme();

	return (
		<ButtonBase
			sx={{
				justifyContent: "flex-start",
				textAlign: "start",
				width: "100%"
			}}
		>
			<Container
				sx={{
					paddingTop: theme.spacing(2),
					paddingBottom: theme.spacing(2)
				}}
			>
				<Stack
					direction="row"
				>
					{!props.loading && props.iconUrl ? (
						<Avatar 
							variant="rounded"
							sx={{
								width: 48,
								height: 48,
								backgroundColor: theme => theme.palette.background.paper
							}}
							imgProps={{
								style: { objectFit: "contain" }
							}}
							src={props.iconUrl}
						/>
					) : (
						<Skeleton
							variant="rectangular"
							sx={{
								width: 48,
								height: 48
							}}
						/>
					)}
					<Stack
						spacing={0}
					>
						<Typography
							variant="h5"
						>
							{!props.loading && props.name ? (
								props.name
							) : (
								<Skeleton width={128} />
							)}
						</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
						>
							{!props.loading && props.categoryId && categories.find((value) => value.id === props.categoryId)  ? (
								categories.find((value) => value.id === props.categoryId)?.name
							) : (
								<Skeleton width={64} />
							)}
						</Typography>
					</Stack>
				</Stack>
			</Container>
		</ButtonBase>
	);
};

export default AppListingInline;