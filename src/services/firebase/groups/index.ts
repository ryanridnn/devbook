import {
	query,
	collection,
	doc,
	getDocs,
	setDoc,
	addDoc,
	deleteDoc,
	orderBy
} from 'firebase/firestore'

import { Group } from '@/atoms/groupsAtom'
import { db } from '@/services/firebase/firebase'
import { getSnapsData, getSnapData } from '@/services/firebase/helpers'

export const getGroups = async (userId: string) => {
	const groupsRef = collection(db, 'users', userId, 'groups')
	const snaps = await getDocs(query(groupsRef, orderBy('createdAt', 'asc')))

	return getSnapsData(snaps)
}

export const addGroup = async (userId: string, name: string) => {
	const groupsRef = collection(db, 'users', userId, 'groups')
	const createdAt = new Date()
	const snap = await addDoc(groupsRef, { name, createdAt })

	return { 
		id: snap.id,
		name,
		createdAt
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