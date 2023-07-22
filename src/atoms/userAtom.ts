import { atom, useRecoilValue, useRecoilState } from 'recoil'

export interface User {
	id: string,
	gid: string,
	name: string,
	email: string,
	pic: string
}

export const defaultUser: User = {
	id: '',
	gid: '',
	name: '',
	email: '',
	pic: '',
}

export const userState = atom<User>({
	key: 'userState',
	default: defaultUser
})

export const useUserValue = () => {
	const user = useRecoilValue<User>(userState)

	return user
}

export const useUserState = () => {
	const [user, setUser] = useRecoilState<User>(userState)
	return [user, setUser as any]
}