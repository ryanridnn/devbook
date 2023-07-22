import { ReactNode, useEffect, useRef } from 'react'

export enum Pos {
	Left = 'left',
	Center = 'center',
	Right = 'right'
}

interface MenuProps {
	title: string,
	show: boolean,
	children: ReactNode,
	setShow: any
}

const defaultOnRefChange = (ref: any) => {}

export default function Menu({ title, show, setShow, children }: MenuProps) {
	const menuRef = useRef<any>()

	useEffect(() => {
		const outsideClickListener = (e: any) => {
			setShow((prevShow: boolean) => {
				if(prevShow && menuRef.current && !menuRef.current.contains(e.target)) {
					return false
				} else {
					return prevShow
				}
			})
		}

		window.addEventListener('click', outsideClickListener)

		return () => {
			window.removeEventListener('click', outsideClickListener)
		}
	}, [])

	const close = () => {
		setShow(false)
	}

	return (
		<div ref={menuRef || null}>
			{ show ?
				<div 
					className="absolute top-[calc(100%+.25rem)] right-0 bg-white rounded-2xl drop-shadow min-w-[12rem] z-[9999]"
				>
					<div className="px-3 pt-3">
						<div className="mb-1 font-semibold">{ title }</div>
						<div className="w-full h-[1px] bg-slate-200"></div>
					</div>
					<div className="py-2 px-2">
						{ children }
					</div>
				</div>
			: <></>}
		</div>
	)
}

interface MenuItemProps {
	onClick?: (e?: any) => any,
	children: ReactNode,
	selected?: Boolean
}

export const MenuItem = ({ onClick, children, selected }: MenuItemProps) => {
	return (
		<button 
			onClick={onClick} 
			className={
				`
					flex gap-2 justify-start items-center w-full px-1 py-2 rounded-lg transition duration-15 text-sm
					${selected ? 'bg-appblue-100 bg-opacity-[.07] border-[.5px] border-solid border-appblue-100 text-appblue-100 hover:bg-opacity-[.12]' : 'hover:bg-gray-100'}
				`
			}
		>
			{ children }
		</button>
	)
}