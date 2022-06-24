import { Avatar, ListItemButton, ListItemAvatar, ListItemText, Skeleton } from "@mui/material";
import { categories } from "../lib/categories";
import NextLink from "next/link";
import { AppListing } from "../types/AppListing";

type Props = {
	app?: AppListing | null
}

const AppListItem = ({ app }: Props) => {
	return (
		<NextLink href={app?.id ? `/app/${app?.id}` : ""} passHref>
			<ListItemButton>
				<ListItemAvatar>
					{app?.iconUrl ? (
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
							src={app.iconUrl}
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
				</ListItemAvatar>
				<ListItemText
					primary={app?.name}
					secondary={categories.find((value) => value.id === app?.categoryId)?.name}
				/>
			</ListItemButton>
		</NextLink>
	);
};

export default AppListItem;