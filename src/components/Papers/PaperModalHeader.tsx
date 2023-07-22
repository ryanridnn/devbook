import { useState } from 'react'

// services
import { deletePaper } from '@/services/firebase/papers'

// atoms
import { useUserValue } from '@/atoms/userAtom'
import { useGroupValue } from '@/atoms/groupsAtom'
import { Paper, usePapersState } from '@/atoms/papersAtom'

// icons
import { PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/solid'

interface PaperModalHeaderProps {
	paper: Paper;
	inEditing: boolean;
	toggleEditing: () => void;
	close: () => void;
}

export default function PaperModalHeader({ paper, inEditing, toggleEditing, close }: PaperModalHeaderProps) {
	const currentUser = useUserValue()
	const currentGroup = useGroupValue()
	const { papers, setPapers } = usePapersState()
	const [loading, setLoading] = useState<boolean>(false)

	const onDelete = async () => {
		setLoading(true)
		try {
			await deletePaper(currentUser.id, currentGroup.id, paper.id)
			setPapers(papers.filter((eachPaper: Paper) => eachPaper.id !== paper.id))
			close()
			setLoading(false)
		} catch(e: any) {
			console.log(e)
			setLoading(false)
		}
	}

	return (
		<div className="flex justify-between items-center bg-appgrey-300 rounded-xl py-2 px-3">
			<div className="text-xl font-semibold">
				{ inEditing ? 'Edit Paper' : paper.name }
			</div>
			{ !inEditing && (
				<div className="flex items-center gap-3">
					<button 
						onClick={toggleEditing} 
						disabled={loading}
						className="flex justify-center items-center w-[2rem] h-[2rem] transition duration-150 hover:bg-slate-100 rounded-full"
					>
						<PencilIcon className="w-[1.25rem] h-[1.25rem] text-appblue-100"/>
					</button>
					<button 
						onClick={onDelete}
						disabled={loading}
						className="flex justify-center items-center w-[2rem] h-[2rem] transition duration-150 hover:bg-slate-100 rounded-full"
					>
						<TrashIcon className="w-[1.25rem] h-[1.25rem] text-red-600"/>
					</button>
				</div>
			)}
			{ inEditing && (
				<button 
					onClick={toggleEditing}
					className="flex items-center gap-2 text-sm font-medium bg-red-500 hover:bg-red-400 text-white py-2 px-3 pl-2 rounded-lg transition duration-150"
				>
					<XMarkIcon className="w-[1.125rem] h-[1.125rem] text-white" />
					<span>
						Cancel Editing
					</span>
				</button>
			)}			
		</div>
	)
}