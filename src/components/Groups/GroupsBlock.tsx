import { useState, useEffect } from 'react'

// components
import Modal, { ModalHeader } from '@/components/common/Modal'
import GroupComp from '@/components/Groups/Group'
import NewGroup from '@/components/Groups/NewGroup'
import EditGroup from '@/components/Groups/EditGroup'

// services
import { getGroups } from '@/services/firebase/groups'

// recoil
import { useUserValue } from '@/atoms/userAtom'
import { Group, useGroupState } from '@/atoms/groupsAtom'

// icons
import { PlusIcon } from '@heroicons/react/24/solid'

export default function GroupsBlock() {
	const currentUser = useUserValue()
	const [groups, setGroups] = useState<Group[]>([])
	const [currentGroup, setCurrentGroup] = useGroupState()
	const [showAdd, setShowAdd] = useState<boolean>(false)
	const [currentEditingGroup, setCurrentEditingGroup] = useState<Group | null>(null)
	const showEdit = Boolean(currentEditingGroup)

	useEffect(() => {
		getGroups(currentUser.id)
			.then((res: any) => {
				setGroups(res as Group[])
				if(res.length > 0) {
					setCurrentGroup(res[0] as Group)
				}
			})
			.catch((e: any) => {
				console.log(e)
			})
	}, [])

	const openShowAdd = () => {
		setShowAdd(true)
	}

	const closeShowAdd = () => {
		setShowAdd(false)
	}

	const closeShowEdit = () => {
		setCurrentEditingGroup(null)
	}

	const appendGroup = (newGroup: Group) => {
		setGroups((prev) => [...prev, newGroup])
	}

	const removeGroup = (groupId: string) => {
		setGroups((prev) => {
			return prev.filter((group: Group) => group.id !== groupId)
		})
	}

	const editCurrentGroup = (group: Group) => {
		setGroups((prev) => {
			return prev.map((eachGroup: Group) => {
				if(eachGroup.id === group.id) {
					return group
				} else {
					return eachGroup
				}
			})
		})
	}

	return (
		<div className="mt-3">
			<NewGroup 
				show={showAdd} 
				close={closeShowAdd}
				appendGroup={appendGroup}
			/>
			<EditGroup 
				show={showEdit} 
				close={closeShowEdit}
				editCurrentGroup={editCurrentGroup}
				currentEditingGroup={currentEditingGroup}
			/>
			<div className="flex justify-between items-center">
				<div className="text-xl font-semibold">
					Groups
				</div>
				<div>
					<button onClick={openShowAdd} className="btn-outlined">
						<PlusIcon className="w-[1.25rem] b-1070:w-[1.125rem]" />
						<span className="hidden b-1070:block">New Group</span>
					</button>
				</div>
			</div>
			<div className="flex flex-col gap-1 mt-4">
				{ groups.map((group: Group) => (
					<GroupComp 
						key={group.id} 
						group={group} 
						removeGroup={removeGroup} 
						selectEditingGroup={() => {
							setCurrentEditingGroup(group)
						}}
					/>
				))}
				{
					groups.length === 0 && 
					<div className="flex justify-center items-center min-h-[6rem] text-sm">
						No Groups
					</div>
				}
			</div>
		</div>
	)
}