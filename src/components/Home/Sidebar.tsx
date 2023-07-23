// components
import UserProfile from '@/components/Home/UserProfile'
import GroupsBlock from '@/components/Groups/GroupsBlock'

// atoms
import { useMenuState } from '@/atoms/menuAtom'

// images
import logo from '@/assets/images/logo.png'

export default function Sidebar() {
	const [isOpen, setIsOpen] = useMenuState()

	const close = () => {
		setIsOpen(false)
	}

	return (
		<div>
			<div 
				className={
					`
						fixed lg:static transition duration-300 min-w-[17rem] bg-appgrey-100 h-screen max-h-screen p-4 z-[999]
						${isOpen ? 'transform-none' : 'translate-x-[-100%] lg:transform-none' }
					`
				}
			>
				<div className="flex justify-between items-center">
					<img src={logo} alt="Logo" className="h-[1.625rem]" />
					<UserProfile />
				</div>
				<GroupsBlock />
			</div>
			<div 
				className={
					`
						absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-20 z-[998]
						${isOpen ? 'opacity-1' : 'opacity-0 pointer-events-none'}
					`
				}
				onClick={close}
			>
			</div>
		</div>
	)
}