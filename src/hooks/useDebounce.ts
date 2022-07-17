import { useEffect, useState } from "preact/hooks";

/**
 * This hook debounces a variable.
 * 
 * @param value Value to debounce
 * @param delay Delay in milliseconds
 * @returns 
 */
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
