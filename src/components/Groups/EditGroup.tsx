import { useState, useEffect } from 'react'

// components
import Modal, { ModalHeader } from '@/components/common/Modal'

// services
import { editGroup } from '@/services/firebase/groups'

// recoil
import { useUserValue } from '@/atoms/userAtom'
import { useGroupState, Group } from '@/atoms/groupsAtom'

interface EditGroupProps {
	show: boolean;
	close: () => void;
	editCurrentGroup: (group: Group) => void; 
	currentEditingGroup: Group | null;
}

export default function EditGroup({ show, close, editCurrentGroup, currentEditingGroup }: EditGroupProps) {
	const currentUser = useUserValue()
	const [currentGroup, setCurrentGroup] = useGroupState()
	const [groupName, setGroupName] = useState<string>('')

	useEffect(() => {
		if(currentEditingGroup) {
			setGroupName(currentEditingGroup.name)
		} else {
			setGroupName('')
		}
	}, [currentEditingGroup])

	const onSubmit = async () => {
		if(currentEditingGroup && groupName.length > 0) {
			try {
				const editedGroup = await editGroup(currentUser.id, { id: currentEditingGroup.id, name: groupName, createdAt: currentEditingGroup.createdAt })
				editCurrentGroup(
					{ 
						id: currentEditingGroup.id, 
						name: groupName,
						createdAt: currentEditingGroup.createdAt
					} as Group
				)
				if(currentGroup.id === currentEditingGroup.id) {
					setCurrentGroup((prev: Group) => ({
						...prev,
						name: groupName,
					}))
				}
				close()
			} catch(e) {
				console.log(e)
			}
		}
	}

	return (
		<Modal 
				show={show} 
				close={close}
			>
			<div>
				<ModalHeader title="Edit Group" />
				<div className="mt-3">
					<div>
						<label 
							htmlFor="group-title"
							className="text-appblue-100 font-medium"
						>
							Group Name
						</label>
						<input 
							type="text" 
							id="group-title"
							className="textfield mt-1"
							value={groupName}
							onChange={(e: any) => {
								setGroupName(e.target.value as string)
							}}
						/>
					</div>
					<div className="mt-4">
						<button onClick={onSubmit} className="btn w-full rounded-xl">Edit Group</button>
					</div>
				</div>
			</div>	
		</Modal>
	)
}