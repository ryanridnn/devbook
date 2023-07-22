import { useEffect } from 'react'

export default function useOutsideListener(setShow: any, element: any) {
	useEffect(() => {
		const outsideClickListener = (e: any) => {
			setShow((prevShow: boolean) => {
				if(prevShow && element && !element.contains(e.target)) {
					return false
				} else {
					return prevShow
				}
			})
		}

		window.addEventListener('click', outsideClickListener)

		return () => {
			window.removeEventListener('click', outsideClickListener)
		}
	}, [])
}