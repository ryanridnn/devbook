import { useState, useEffect } from 'react'

// atoms
import { usePapersState } from '@/atoms/papersAtom'

// icons
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid'

interface SearchProps {
	mobile: boolean
}

export default function Search({ mobile }: SearchProps) {
	const [searching, setSearching] = useState<Boolean>(false)
	const { search, setSearch } = usePapersState()

	const toggleSearching = () => {
		setSearching(prev => !prev)
	}

	const onSearchChange = (e: any) => {
		setSearch(e.target.value)
	}

	useEffect(() => {
		if(!searching) {
			setSearch('')
		}
	}, [searching])

	if(mobile) {
		return (
			<div className="relative">
				<input 
					type="text" 
					placeholder="Search..."
					className="bg-none bg-appgrey-100 px-3 py-2 pr-10 rounded-md w-full" 
					value={search}
					onChange={onSearchChange}
				/>
				<MagnifyingGlassIcon 
					className="absolute top-[50%] translate-y-[-50%] right-3 w-[1.25rem] h-[1.25rem] text-slate-600"
				/>
			</div>
		)
	} else {
		return (
			<div className="flex items-center">
				<div className={`flex items-center relative ${searching ? 'opacity-1' : 'opacity-0'}`}>
					<input 
						type="text" 
						placeholder="Search..."
						className="bg-none bg-appgrey-100 px-3 py-2 pr-10 rounded-md min-w-[20rem]" 
						value={search}
						onChange={onSearchChange}
					/>
					<button onClick={toggleSearching} className="absolute right-[.5rem] flex justify-center items-center w-[2rem] h-[2rem] transition duration-150 hover:bg-slate-100 rounded-full hover:scale-[1.2]">
						<XMarkIcon className="w-[1.375rem] h-[1.375rem] text-slate-600" />
					</button>
				</div>
				{ !searching && (
					<button onClick={toggleSearching} className="flex justify-center items-center w-[2rem] h-[2rem] transition duration-150 hover:bg-slate-100 rounded-full">
						<MagnifyingGlassIcon 
							className="w-[1.25rem] h-[1.25rem] text-slate-600"
						/>
					</button>
				)}
			</div>
		)
	}
}