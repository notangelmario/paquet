import { useState, useEffect } from "preact/hooks";


type Props = {
	threshold?: number,
}

export const useScroll = ({ threshold = 0 }: Props) => {
	const [triggered, setTriggered] = useState(window.scrollY > threshold);

	useEffect(() => {
		const handleScroll = () => {
			setTriggered(window.scrollY > threshold);
		}
		

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		}
	}, [])

	return triggered;
}