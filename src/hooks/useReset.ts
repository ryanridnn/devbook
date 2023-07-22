import { useEffect } from 'react'

// atoms
import { useUserValue } from '@/atoms/userAtom'
import { useGroupState, defaultGroup } from '@/atoms/groupsAtom'
import { useMenuState } from '@/atoms/menuAtom'

export default function useReset() {
	const [currentGroup, setCurrentGroup] = useGroupState()
	const [isOpen, setIsOpen] = useMenuState()
	const user = useUserValue()

	useEffect(() => {
		if(!user.id) {
			setCurrentGroup(defaultGroup)
			setIsOpen(false)
		}
	}, [user])
}