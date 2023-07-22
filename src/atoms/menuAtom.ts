import { atom, useRecoilValue, useRecoilState } from 'recoil'

export const menuState = atom({
	key: 'menuState',
	default: false
})

export const useMenuValue = () => {
	const isOpen = useRecoilValue(menuState)

	return isOpen
}

export const useMenuState = () => {
	const [isOpen, setIsOpen] = useRecoilState(menuState)

	return [isOpen, setIsOpen as any]
}