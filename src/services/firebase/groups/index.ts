import {
	collection,
	doc,
	getDocs,
	setDoc,
	addDoc,
	deleteDoc,
} from 'firebase/firestore'

import { Group } from '@/atoms/groupsAtom'
import { db } from '@/services/firebase/firebase'
import { getSnapsData, getSnapData } from '@/services/firebase/helpers'

export const getGroups = async (userId: string) => {
	const groupsRef = collection(db, 'users', userId, 'groups')
	const snaps = await getDocs(groupsRef)

	return getSnapsData(snaps)
}

export const addGroup = async (userId: string, name: string) => {
	const groupsRef = collection(db, 'users', userId, 'groups')
	const snap = await addDoc(groupsRef, { name })

	return { 
		id: snap.id,
		name
	}
}

export const editGroup = async (userId: string, group: Group) => {
	const groupRef = doc(db, 'users', userId, 'groups', group.id)
	await setDoc(groupRef, { name: group.name }, { merge: true })
}

export const deleteGroup = async (userId: string, groupId: string) => {
	const groupRef = doc(db, 'users', userId, 'groups', groupId)
	await deleteDoc(groupRef)
}