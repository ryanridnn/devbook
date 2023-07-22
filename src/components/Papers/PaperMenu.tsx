import { useState, useEffect, useRef } from 'react'

// components
import Menu, { MenuItem } from '@/components/common/Menu'

// atoms
import { useUserValue } from '@/atoms/userAtom'
import { useGroupValue } from '@/atoms/groupsAtom'
import { Paper, usePapersState } from '@/atoms/papersAtom'

// services
import { deletePaper } from '@/services/firebase/papers'

// icons
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'

interface PaperMenuProps {
	paper: Paper,
}

export default function PaperMenu ({ paper }: PaperMenuProps) {
	const currentUser = useUserValue()
	const currentGroup = useGroupValue()
	const [show, setShow] = useState<boolean>(false)
	const [deleting, setDeleting] = useState<Boolean>(false);
	const { papers, setPapers, setInEditing } = usePapersState()

	const menuRef = useRef<any>(null)

	const toggleShow = (e: any) => {
		e.stopPropagation()
		setShow((prev: boolean) => !show)
	}

	const close = () => {
		setShow(false)
	}

	const onEdit = () => {
		setInEditing(true)
		setShow(false)
	}

	const onDelete = async (e: any) => {
		e.stopPropagation()
		setDeleting(true)
		try {
			await deletePaper(currentUser.id, currentGroup.id, paper.id)
			setPapers(papers.filter((eachPaper: Paper) => eachPaper.id !== paper.id))
			setDeleting(false)
		} catch(e: any) {
			setDeleting(false)
		}
	}

	return (
		<div className="relative">
			<button onClick={toggleShow} className="flex justify-center items-center w-[2rem] h-[2rem] transition duratin-150 bg-slate-200 hover:bg-slate-300 rounded-full">
				<EllipsisVerticalIcon 
					className="w-[1.25rem] h-[1.25rem]"
				/>
			</button>
			<Menu title="Paper Menu" show={show} setShow={setShow}>
				<MenuItem onClick={onEdit}>
					<PencilIcon className="w-[1.125rem]" />
					<span>Edit Paper</span>
				</MenuItem>
				<MenuItem onClick={onDelete}>
					<TrashIcon className="w-[1.125rem] text-red-600" />
					<span className="text-red-600">{ deleting ? 'Deleting' : 'Delete Paper' }</span>
				</MenuItem>
			</Menu>
		</div>
	)
}