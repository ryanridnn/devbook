import { useEffect } from 'react'

// atoms
import { useMenuState } from '@/atoms/menuAtom'

export default function useMenuResizeListener() {
	const [isOpen, setIsOpen] = useMenuState()

	useEffect(() => {
		const onResize = () => {
			setIsOpen(false)
		}

		window.addEventListener('resize', onResize)

		return () => {
			window.removeEventListener('resize', onResize)
		}
	}, [])
}