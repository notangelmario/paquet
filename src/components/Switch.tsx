interface SwitchProps {
	name?: string;
	checked?: boolean;
	onChange?: (checked: boolean) => void;
}

export default function Switch(props: SwitchProps) {
	return (
		<label class="relative inline-flex items-center cursor-pointer">
			<input
				name={props.name}
				type="checkbox"
				value="true"
				class="sr-only peer"
				checked={props.checked}
				onChange={(e) => props.onChange?.(e.currentTarget.checked)}
			/>
			<div class="transition-all shadow shadow-inset-light dark:shadow-inset-dark w-11 h-6 bg-light-dark dark:bg-dark-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary peer-checked:shadow-outset-primary">
			</div>
		</label>
	);
}
