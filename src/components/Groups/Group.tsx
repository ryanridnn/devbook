// services
import { deleteGroup } from '@/services/firebase/groups'

// recoil
import { useUserValue } from '@/atoms/userAtom'
import { Group, useGroupState, defaultGroup } from '@/atoms/groupsAtom'

// icons
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid'

interface GroupCompType {
	group: Group;
	removeGroup: (groupId: string) => void;
	selectEditingGroup: () => void;
}

export default function GroupComp ({ group, removeGroup, selectEditingGroup }: GroupCompType) {
	const currentUser = useUserValue()
	const [currentGroup, setCurrentGroup] = useGroupState()

	const onClick = () => {
		setCurrentGroup(group)
	}

	const onSelect = (e: any) => {
		e.stopPropagation()

		selectEditingGroup()
	}

	const onDelete = async (e: any) => {
		e.stopPropagation()

		try {
			await deleteGroup(currentUser.id, group.id)
			if(currentGroup.id === group.id) {
				setCurrentGroup(defaultGroup)
			}
			removeGroup(group.id)
		} catch(e: any) {
			console.log(e)
		} 
	}

	return (
		<div 
			onClick={onClick}
			className={`
				group flex justify-between p-[10px] transition duration-[.15] border-[1px] rounded-md cursor-pointer
				${currentGroup.id === group.id ? 
					'bg-appblue-100 bg-opacity-[.07] border-appblue-100 text-appblue-100 font-medium'
					: 'border-transparent hover:bg-appgrey-200'
				}
			`}
		>
			<div className="">
				{ group.name }
			</div>
			<div className="hidden group-hover:flex gap-[.75rem] items-center">
				<button onClick={onSelect} className="">
					<PencilIcon className="w-[1.125rem] text-appblue-100" />
				</button>
				<button onClick={onDelete} className="">
					<TrashIcon className="w-[1.125rem] text-red-600" />
				</button>
			</div>
		</div>
	)
}