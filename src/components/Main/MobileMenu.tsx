// atoms
import { useMenuState } from '@/atoms/menuAtom'

// icons
import { Bars3BottomLeftIcon } from '@heroicons/react/24/solid'

export default function MobileMenu() {
	const [isOpen, setIsOpen] = useMenuState()

	const openMenu = () => {
		setIsOpen(true)
	}

	return (
		<button 
			className="flex justify-center items-center w-[2rem] h-[2rem] transition duration-150 bg-slate-100 hover:bg-slate-200 rounded-full"
			onClick={openMenu}
		>
			<Bars3BottomLeftIcon 
				className="w-[1.25rem] h-[1.25rem] text-slate-600"
			/>
		</button>
	)
}