import { useState, useEffect, useRef } from 'react'

// components
import Menu, { MenuItem } from '@/components/common/Menu'

// atoms
import { PaperOrders, usePapersState } from '@/atoms/papersAtom'

// hooks
import useOutsideListener from '@/hooks/useOutsideListener'

// icons
import { FunnelIcon } from '@heroicons/react/24/outline'

export default function Order() {
	const [show, setShow] = useState<boolean>(false)
	const { order, setOrder } = usePapersState()
	const menuRef = useRef(null)

	const toggleShow = (e: any) => {
		e.stopPropagation()
		setShow(prev => !prev)
	}

	return (
		<div className="relative">
			<button onClick={toggleShow} className="flex justify-center items-center w-[2rem] h-[2rem] transition duration-150 hover:bg-slate-100 rounded-full">
				<FunnelIcon 
					className="w-[1.25rem] h-[1.25rem] text-slate-600"
				/>
			</button>
			<Menu title="Order by" show={show} setShow={setShow}>
				<MenuItem 
					selected={order === PaperOrders.Older}
					onClick={() => {
						setOrder(PaperOrders.Older)
					}}
				>
					<span>Older</span>
				</MenuItem>
				<MenuItem 
					selected={order === PaperOrders.Newer}
					onClick={() => {
						setOrder(PaperOrders.Newer)
					}}
				>
					<span>Newer</span>
				</MenuItem>
				<MenuItem 
					selected={order === PaperOrders.AToZ}
					onClick={() => {
						setOrder(PaperOrders.AToZ)
					}}
				>
					<span>A to Z</span>
				</MenuItem>
				<MenuItem 
					selected={order === PaperOrders.ZToA}
					onClick={() => {
						setOrder(PaperOrders.ZToA)
					}}
				>
					<span>Z to A</span>
				</MenuItem>
			</Menu>
		</div>
	)
}