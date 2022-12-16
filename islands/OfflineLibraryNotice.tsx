import { useState } from "preact/hooks";
import Icon from "@/components/Icon.tsx";
import Dialog from "@/islands/Dialog.tsx";

interface Props {
	offline?: boolean
}

export default function OfflineLibraryNotice({ offline }: Props) {
	const [showDialog, setShowDialog] = useState(false);

	return !offline ? <div/> : (
		<>
			<p
				class="opacity-50 hover:cursor-pointer"
				onClick={() => setShowDialog(true)}
			>
				<Icon
					name="info"
					data-fresh-disable-lock
					inline
					width={18}
					height={18}
				/>{" "}
				Offline
			</p>
			<Dialog 
				open={showDialog}
				setOpen={setShowDialog}
				title="Offline"
				content="You are currently offline. You can still see your library, but you won't be able to explore new apps."
				buttons={[
					{
						text: "Ok",
						outlined: true,
						onClick: () => setShowDialog(false)
					}
				]}
			/>
		</>
	)
}
