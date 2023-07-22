import { useState } from 'react'

// components
import PaperMenu from '@/components/Papers/PaperMenu'

// atoms
import { Paper, usePapersState } from '@/atoms/papersAtom'

interface CardProps {
	paper: Paper
}

export default function Card({ paper }: CardProps) {
	const { setActivePaper } = usePapersState()

	const getContent = () => {
		const div = document.createElement('div')
		div.innerHTML = paper.content

		return div.innerText
	}

	const content = getContent()

	const onClick = () => {
		setActivePaper(paper)
	}

	return (
		<div
			className="bg-appgrey-100 py-3 px-4 rounded-3xl cursor-pointer transition duration-150 hover:scale-[.98]"
			onClick={onClick}
		>
			<div className="flex justify-between items-center">
				<div className="font-semibold">
					{ paper.name }
				</div>
				<PaperMenu paper={paper}/>
			</div>
			<div className="mt-2 mb-1 text-sm text-[#777] ellipsis-3-lines">
				{ content }
			</div>
		</div>
	)
}