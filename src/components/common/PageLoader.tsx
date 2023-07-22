// icons
import { ArrowPathIcon } from '@heroicons/react/24/solid'

export default function PageLoader() {
	return (
		<div className="flex justify-center items-center w-screen h-screen">
			<ArrowPathIcon className="w-[2.5rem] h-[2.5rem] spinner" />
		</div>
	)
}