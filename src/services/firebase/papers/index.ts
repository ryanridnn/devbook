import {
	collection,
	doc,
	query,
	getDocs,
	setDoc,
	addDoc,
	deleteDoc,
	orderBy
} from 'firebase/firestore'

import { Paper } from '@/atoms/papersAtom'
import { db } from '@/services/firebase/firebase'
import { getSnapsData, getSnapData } from '@/services/firebase/helpers'

export const getPapers = async (userId: string, groupId: string) => {
	const papersRef = collection(db, 'users', userId, 'groups', groupId, 'papers')
	const snaps = await getDocs(query(papersRef, orderBy('createdAt')))

	return getSnapsData(snaps).map((paper: any) => ({ ...paper, createdAt: new Date(paper.createdAt.seconds)}))
}

export const addPaper = async (userId: string, groupId: string, paper: { name: string, content: string, createdAt: Date }) => {
	const papersRef = collection(db, 'users', userId, 'groups', groupId, 'papers')
	const snap = await addDoc(papersRef, paper)

	return { 
		id: snap.id,
		...paper
	}
}

export const editPaper = async (userId: string, groupId: string, paper: Paper) => {
	const paperRef = doc(db, 'users', userId, 'groups', groupId, 'papers', paper.id)
	await setDoc(paperRef, { name: paper.name, content: paper.content }, { merge: true })
}

export const deletePaper = async (userId: string, groupId: string, paperId: string) => {
	const paperRef = doc(db, 'users', userId, 'groups', groupId, 'papers', paperId)
	await deleteDoc(paperRef)
}