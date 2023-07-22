import { atom, useRecoilState } from 'recoil'

export interface Paper {
	id: string,
	name: string,
	content: string,
	createdAt: Date,
}

export enum PaperOrders {
	Newer = 'Newer',
	Older = 'Older',
	AToZ = 'A - Z',
	ZToA = 'Z - A'
} 

export interface TPapersState {
	activePaper: Paper;
	papers: Paper[];
	inEditing: boolean;
	order: PaperOrders;
	search: string;
}

export const defaultActivePaper: Paper = {
	id: '',
	name: '',
	content: '',
	createdAt: new Date()
}

export const defaultPapers: Paper[] = []

export const defaultState: TPapersState = {
	activePaper: defaultActivePaper,
	papers: defaultPapers,
	inEditing: false,
	order: PaperOrders.Older,
	search: ''
}

export const papersState = atom({
	key: 'papers',
	default: defaultState
})

export const usePapersState = () => {
	const [state, setState] = useRecoilState<TPapersState>(papersState)

	const setActivePaper = (paper: Paper) => {
		setState((prev: TPapersState) => ({
			...prev,
			activePaper: paper
		}) as TPapersState)
	}

	const setPapers = (papers: Paper[]) => {
		setState((prev: TPapersState) => ({
			...prev,
			papers
		}) as TPapersState)
	}

	const setInEditing = (newInEditing: Boolean) => {
		setState((prev: TPapersState) => ({...prev, inEditing: newInEditing }) as TPapersState)
	}

	const setOrder = (newOrder: PaperOrders) => {
		setState((prev: TPapersState) => ({ ...prev, order: newOrder }))
	}

	const setSearch = (newSearch: string) => {
		setState((prev: TPapersState) => ({ ...prev, search: newSearch }) as TPapersState)
	}

	return {
		activePaper: state.activePaper,
		papers: state.papers,
		setActivePaper,
		setPapers,
		inEditing: state.inEditing,
		setInEditing,
		order: state.order,
		setOrder,
		search: state.search,
		setSearch
	}
}