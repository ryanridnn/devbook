import { 
	signInWithPopup, 
	GoogleAuthProvider, 
	onAuthStateChanged, 
	signOut 
} from 'firebase/auth'
import {
	getDocs,
	query,
	where,
	collection,
	getDoc,
	doc,
	addDoc,
} from 'firebase/firestore'
import { db, auth } from '@/services/firebase/firebase'

import { getSnapsData } from '@/services/firebase/helpers'

export interface FUser {
	gid: string,
	name: string,
	email: string,
} 

const provider = new GoogleAuthProvider()

export const loginWithGoogle = () => {
	signInWithPopup(auth, provider)
}

export const logOut = () => {
	signOut(auth)
}

export const authListener = (cb: any) => {
	return onAuthStateChanged(auth, cb)
}

const createUser = async (user: FUser) => {
	const usersRef = collection(db, 'users')
	return await addDoc(usersRef, user) 
}

export const handleLogin = async (user: FUser) => {
	const q = query(collection(db, 'users'), where('gid', '==', user.gid))

	try {
		const snaps = await getDocs(q)

		const users = getSnapsData(snaps)

		if(users.length === 0) {
			const newUser = await createUser(user)

			return newUser.id
		} else {
			return users[0].id
		}
	} catch(e: any) {
		console.log(e)
	}
}

// getDoc(doc(db, 'users', 'h813ULOA7gLWgtouawH3'))
// 	.then(res => {
// 		console.log(res.data())
// 	})