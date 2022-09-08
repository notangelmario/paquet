import { useEffect, useState } from "preact/hooks";

export const useDebounce = (value: unknown, delay: number) => {
	const [debouncedValue, setDebouncedValue] = useState<typeof value>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
};
