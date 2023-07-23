import { useState, useEffect } from 'react'
 
// atoms
import { useUserValue } from '@/atoms/userAtom'
import { useGroupValue } from '@/atoms/groupsAtom'

// components
import ReactQuill from 'react-quill';
import Modal, { ModalHeader } from '@/components/common/Modal'
import { usePapersState, Paper } from '@/atoms/papersAtom'

// services
import { addPaper } from '@/services/firebase/papers'

// stylings
import 'react-quill/dist/quill.snow.css';

interface NewPaperProps {
	show: boolean;
	close: () => void;
}

export const toolbarOptions  = [
	[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
	[{ 'font': [] }],
	[{ 'color': [] }],          // dropdown with defaults from theme
	['bold', 'italic', 'underline', 'strike'],        // toggled buttons
	[{ 'align': [] }],
	[{ 'list': 'ordered'}, { 'list': 'bullet' }],
	['link', 'image'],
	['blockquote', 'code-block'],
	['clean']                         
]

export default function NewPaper({ show, close }: NewPaperProps) {
	const [paperName, setPaperName] = useState<string>('')
	const [content, setContent] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)

	const currentUser = useUserValue()
	const currentGroup = useGroupValue()

	const { papers, setPapers } = usePapersState()

	useEffect(() => {
		if(!show) {
			setPaperName('')
			setContent('')
		}
	}, [show])

	const onAdd = async () => {
		setLoading(true)
		try {
			const paper = await addPaper(currentUser.id, currentGroup.id, { name: paperName, content, createdAt: new Date() })
			setPapers([...papers, paper])
			setLoading(false)
			close()
		} catch(e: any) {
			console.log(e)
			setLoading(false)
		}
	}

	return (
		<Modal
			show={show}
			close={close}
			isLarge={true}
		>
			<div>
				<ModalHeader title="New Paper" />
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
							onClick={onAdd}
							className="btn w-full rounded-xl"
							disabled={loading}
						>
							Add New Paper
						</button>
					</div>
				</div>
			</div>
		</Modal>
	)
}