import { useState, useEffect, ReactNode } from 'react'

interface ModalProps {
	show: boolean;
	close: () => void;
	children: ReactNode;
	isLarge?: boolean;
}

const animationDuration = .3

export default function Modal({ show, close, children, isLarge }: ModalProps) {
	const [showUI, setShowUI] = useState<boolean>(false)
	const [showAnimation, setShowAnimation] = useState<boolean>(false)

	useEffect(() => {
		if(show) {
			setShowUI(true)
			setTimeout(() => {
				setShowAnimation(true)
			}, 10)
		} else {
			setShowAnimation(false)
			setTimeout(() => {
				setShowUI(false)
			}, animationDuration * 1000)
		}
	}, [show])

	return (
		<>
			{ showUI && (
				<>
					<div 
						onClick={close} 
						className={`
							fixed top-[0] left-[0] w-screen h-screen bg-black
							transition duration-300
							${showAnimation ? 'bg-opacity-5' : 'bg-opacity-0'}
						`}
					>
					</div>
					<div 
						className={
							`
								fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
								bg-white rounded-[2rem] py-3 px-4 max-w-[94vw] max-h-[95vh] overflow-y-auto overflow-x-hidden
								transition duration-300 ease-in-out z-[1000]
								${ isLarge ? 'w-[52rem]' : 'w-[36rem]'}
								${ showAnimation  ? 'opacity-[1]' : 'opacity-[0]'}
							`
						}
					>
						{ children }
					</div>
				</>
			)}
		</>
	)
}

interface ModalHeaderProps {
	title: string;
}

export const ModalHeader = ({ title }: ModalHeaderProps) => {
	return (
		<div className="text-xl font-semibold bg-appgrey-300 rounded-xl py-2 px-3">
			{ title }
		</div>
	)
}