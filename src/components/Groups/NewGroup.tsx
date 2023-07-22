import { useState } from 'react'

// components
import Modal, { ModalHeader } from '@/components/common/Modal'

// services
import { addGroup } from '@/services/firebase/groups'

// recoil
import { useUserValue } from '@/atoms/userAtom'
import { Group } from '@/atoms/groupsAtom'

interface NewGroupProps {
	show: boolean;
	close: () => void;
	appendGroup: (group: Group) => void; 
}

export default function NewGroup({ show, close, appendGroup }: NewGroupProps) {
	const currentUser = useUserValue()
	const [groupName, setGroupName] = useState<string>('')

	const onSubmit = async () => {
		if(groupName.length > 0) {
			try {
				const newGroup = await addGroup(currentUser.id, groupName)
				appendGroup(newGroup as Group)
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
				<ModalHeader title="New Group" />
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
						<button onClick={onSubmit} className="btn w-full rounded-xl">Add New Group</button>
					</div>
				</div>
			</div>	
		</Modal>
	)
}