import { atom, useRecoilValue, useRecoilState } from 'recoil'

export interface Group {
	id: string,
	name: string,
	createdAt: Date | null
}

export const defaultGroup: Group = {
	id: '',
	name: '',
	createdAt: null
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
