import { atom, useRecoilValue, useRecoilState } from 'recoil'

export interface Group {
	id: string,
	name: string
}

export const defaultGroup = {
	id: '',
	name: ''
}

export const groupState = atom({
	key: 'groupState',
	default: defaultGroup
})

export const useGroupValue = () => {
	const group = useRecoilValue<Group>(groupState)

	return group
}

export const useGroupState = () => {
	const [group, setGroup] = useRecoilState<Group>(groupState)

	return [group, setGroup as any]
}
