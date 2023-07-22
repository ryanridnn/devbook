import { useState } from 'react'
import { useRecoilValue	} from 'recoil'

// components
import Menu, { MenuItem } from '@/components/common/Menu'

// recoil
import { userState, User } from '@/atoms/userAtom'

// services
import { logOut } from '@/services/firebase/user'

// icons
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'

export default function UserProfile() {
	const [show, setShow] = useState<boolean>(false)
	const currentUser = useRecoilValue<User>(userState)

	const toggleShow = (e: any) => {
		e.stopPropagation()
		setShow((prev: boolean) => !prev)
	}

	const close = () => {
		setShow(false)
	}

	const onLogOut = () => {
		logOut()
	}

	return (
		<div className="relative">
			<button onClick={toggleShow} className="img-hover w-[1.75rem] h-[1.75rem] rounded-full overflow-hidden hover:">
				<img src={currentUser.pic} alt="User Profile Photo" referrerPolicy="no-referrer" className="w-full h-full" />
			</button>
			<Menu title="Profile Menu" show={show} setShow={setShow}>
				<MenuItem onClick={onLogOut}>
					<ArrowLeftOnRectangleIcon className="w-[1.25rem]" />
					<span>Log Out</span>
				</MenuItem>
			</Menu>
		</div>
	)
}