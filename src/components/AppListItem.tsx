import { Avatar, ListItemButton, ListItemAvatar, ListItemText, Skeleton } from "@mui/material";
import { categories } from "../lib/categories";

type Props = {
    loading?: boolean,
    name?: string,
    iconUrl?: string,
    categoryId?: string
}

const AppListItem = (props: Props) => {
	return (
		<ListItemButton>
			<ListItemAvatar>
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
			</ListItemAvatar>
			<ListItemText
				primary={props.name}
				secondary={categories.find((value) => value.id === props.categoryId)?.name}
			/>
		</ListItemButton>
	);
};

export default AppListItem;