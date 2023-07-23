import { useState, useEffect } from 'react'

// atoms
import { useUserValue } from '@/atoms/userAtom'
import { useGroupValue } from '@/atoms/groupsAtom'
import { usePapersState, Paper, PaperOrders } from '@/atoms/papersAtom'

// components
import Order from '@/components/Main/Order'
import Search from '@/components/Main/Search'
import PaperCard from '@/components/Papers/PaperCard'
import MobileMenu from '@/components/Main/MobileMenu'
import NewPaper from '@/components/Papers/NewPaper'
import PaperModal from '@/components/Papers/PaperModal'

// services
import { getPapers } from '@/services/firebase/papers'

// icons
import { PlusIcon } from '@heroicons/react/24/solid'

export default function Main() {
	const currentUser = useUserValue()
	const currentGroup = useGroupValue()
	const [showAdd, setShowAdd] = useState<boolean>(false)
	const { papers, setPapers, order, search } = usePapersState()
	const [filteredPapers, setFilteredPapers] = useState<Paper[]>([]) 
	const [loadingPapers, setLoadingPapers] = useState<Boolean>(true)

	const onAdd = () => {
		setShowAdd(true)
	}

	const closeAdd = () => {
		setShowAdd(false)
	}

	useEffect(() => {
		if(currentGroup.id) {
			getPapers(currentUser.id, currentGroup.id)
				.then((papers: Paper[]) => {
					setPapers(papers)
					setLoadingPapers(false)
				})
		}
	}, [currentGroup])

	useEffect(() => {
		if(papers.length >= 0 && order) {
			let ordered: Paper[] = [...papers]

			if(typeof search === 'string') {
				const regex = new RegExp(search, 'i')

				ordered = ordered.filter((paper: Paper) => {
					const matchName = paper.name.match(regex)
					const matchContent = paper.content.match(regex)

					return matchName || matchContent
				})
			} 

			if(order === PaperOrders.Older) {
				ordered = ordered.sort((a: Paper, b: Paper) => {
					return (new Date(a.createdAt) as any) - (new Date(b.createdAt) as any)
				})
			} else if(order === PaperOrders.Newer) {
				ordered = ordered.sort((a: Paper, b: Paper) => {
					return (new Date(b.createdAt) as any) - (new Date(a.createdAt) as any)
				})
			} else if(order === PaperOrders.AToZ) {
				ordered = ordered.sort((a: Paper, b: Paper) => {
					const nameA = a.name.toUpperCase(); // Convert names to uppercase for case-insensitive sorting
					const nameB = b.name.toUpperCase();

					return nameA < nameB ? -1 : 1
				})
			} else if(order === PaperOrders.ZToA) {
				ordered = ordered.sort((a: Paper, b: Paper) => {
					const nameA = a.name.toUpperCase(); // Convert names to uppercase for case-insensitive sorting
					const nameB = b.name.toUpperCase();

					return nameA > nameB ? -1 : 1
				})
			}

			setFilteredPapers(ordered)
		}
	}, [papers, order, search])

	return (
		<>
			 { currentGroup.id && (
				<div className="px-7 pb-5 w-full min-w-0">
					<NewPaper
						show={showAdd}
						close={closeAdd}
					/>
					<PaperModal />
					<div className="sticky top-0 flex justify-between items-center bg-white z-[997] py-4 lg:pt-5 pb-4">
						<div className="">
							<div className="lg:hidden">
								<MobileMenu />
							</div>
							<div className="hidden lg:flex justify-center items-center gap-[.75rem]">
								<div className="text-2xl text-appblue-100 font-semibold">{ currentGroup.name }</div>
								<div className="w-[.25rem] h-[.25rem] bg-[#D9D9D9] rounded-full mt-1"></div>
								<div className="text-xs text-slate-600">{ papers.length } { papers.length > 1 ? 'papers' : 'paper'} in total</div>
							</div>
						</div>
						<div className="flex items-center gap-4 b-1070:gap-6 mt-1">
							<div className="hidden b-732:block">
								<Search 
									mobile={false}
								/>
							</div>
							<Order />
							<button onClick={onAdd} className="btn-outlined">
								<PlusIcon className="w-[1.125rem] b-1070:w-[1.125rem]" />
								<span className="hidden b-1070:block">New Paper</span>
							</button>
						</div>
					</div>
					<div className="lg:hidden mt-2 bg-appgrey-100 rounded-xl py-5 px-4 items-center gap-[.75rem]">
						<div className="text-2xl text-appblue-100 font-semibold">{ currentGroup.name }</div>
						<div className="mt-1 text-xs text-slate-600">{ papers.length } { papers.length > 1 ? 'papers' : 'paper'} in total</div>
					</div>
					<div className="mt-3 b-732:hidden">
						<Search 
							mobile={true}
						/>
					</div>
					<div className="mt-3 b-732:mt-4 lg:mt-1 grid grid-cols-1 b-480:grid-cols-2 b-648:grid-cols-3 b-1136:grid-cols-4 gap-4">
						{ !loadingPapers && filteredPapers.map((paper: Paper) => (
							<PaperCard key={paper.id} paper={paper}/>
						))}
					</div>
					{ !loadingPapers && papers.length === 0 && (
						<div className="w-full h-[80vh] flex items-center justify-center">
							<div>No Papers</div>
						</div>
					)}
				</div>
			 )}
			 { !currentGroup.id && (
			 	<div className="px-7 py-5 w-full">
			 		<div className="lg:hidden">
		 				<MobileMenu />
			 		</div>
			 		<div className="flex flex-col justify-center items-center min-h-[85vh] lg:min-h-[90vh]">
			 			<div>
				 			No Group Yet
			 			</div>
			 			<div className="mt-1 text-sm text-appblue-100 px-4">
			 				<div className="lg:hidden text-center">
			 					Open up the menu and please add a new group!
			 				</div>
			 				<div className="hidden lg:block">
			 					Please add a new group!
			 				</div>
			 			</div>
			 		</div>
			 	</div>
			 )}
		</>
	)
}