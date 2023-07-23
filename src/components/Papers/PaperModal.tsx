import { useState, useEffect } from 'react'
import parseHTMLString from 'html-react-parser'

// components
import ReactQuill from 'react-quill';
import Modal, { ModalHeader } from '@/components/common/Modal'
import PaperModalHeader from '@/components/Papers/PaperModalHeader'

import { toolbarOptions } from '@/components/Papers/NewPaper'

// services
import { editPaper } from '@/services/firebase/papers'

// atoms
import { useUserValue } from '@/atoms/userAtom'
import { useGroupValue } from '@/atoms/groupsAtom'
import { Paper, usePapersState, defaultActivePaper } from '@/atoms/papersAtom'

export default function PaperModal() {
	const [show, setShow] = useState<boolean>(false)
	const { activePaper, setActivePaper, inEditing, setInEditing } = usePapersState()

	const close = () => {
		setActivePaper(defaultActivePaper)
		setInEditing(false)
	}

	useEffect(() => {
		if(activePaper.id) {
			setShow(true)
		} else {
			setShow(false)
		}
	}, [activePaper])

	const toggleEditing = () => {
		setInEditing(!inEditing)
	}

	return (
		<Modal
			show={show}
			close={close}
			isLarge={true}
		>
			<div>
				<PaperModalHeader
					paper={activePaper}
					inEditing={inEditing}
					toggleEditing={toggleEditing}
					close={close}
				/>
				{ inEditing ? 
					<EditPaper paper={activePaper} onCompleted={toggleEditing} />
					: <ContentRenderer content={activePaper.content} />
				}
			</div>
		</Modal>
	)
}

interface ContentRendererProps {
	content: string
}

const ContentRenderer = ({ content }: ContentRendererProps) => {
	return (
		<div className="content-renderer px-2 py-4">
			{ parseHTMLString(content) }
		</div>
	)
}

interface EditPaperProps {
	paper: Paper,
	onCompleted: () => void
}

const EditPaper = ({ paper, onCompleted }: EditPaperProps) => {
	const [paperName, setPaperName] = useState<string>(() => paper.name)
	const [content, setContent] = useState<string>(() => paper.content)
	const [loading, setLoading] = useState<boolean>(false)
	const { setActivePaper, papers, setPapers } = usePapersState()
	const currentUser = useUserValue()
	const currentGroup = useGroupValue()


	const onEdit = async () => {
		console.log(paper)
		const editedPaper = {
			id: paper.id,
			name: paperName,
			content,
			createdAt: paper.createdAt
		}

		setLoading(true)

		try {
			await editPaper(currentUser.id, currentGroup.id, editedPaper)
			setActivePaper(editedPaper)
			setPapers(papers.map((eachPaper: Paper) => {
				if(eachPaper.id === editedPaper.id) {
					return editedPaper
				} else {
					return eachPaper
				}
			}))
			onCompleted()
			setLoading(false)
		} catch(e: any) {
			console.log(e)
			setLoading(false)
		}
	}

	return (
		<div className="mt-3">
			<div>
				<label 
					htmlFor="paper-title"
					className="text-appblue-100 font-medium"
				>
					Paper Name
				</label>
				<input 
					type="text" 
					id="paper-title"
					className="textfield mt-1"
					value={paperName}
					onChange={(e: any) => {
						setPaperName(e.target.value as string)
					}}
				/>
			</div>
			<div className="mt-4 devbook-editor">
				<ReactQuill 
					theme="snow" 
					value={content} 
					onChange={setContent} 
					modules={{
						toolbar: toolbarOptions
					}}
				/>
			</div>
			<div className="mt-4">
				<button
					onClick={onEdit}
					className="btn w-full rounded-xl"
					disabled={loading}
				>
					Edit Paper
				</button>
			</div>
		</div>
	)
}