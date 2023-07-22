// assets 
import avatar from '@/assets/images/avatar.png'
import logo from '@/assets/images/logo.png'

export default function Banner() {
	return (
		<div className="linear-grad relative min-h-[208px] rounded-2xl overflow-hidden">
			<div className="flex flex-col items-center mt-6 xs-1:block xs-1:mt-0 xs-1:absolute top-[30%] left-[34%]">
				<div className="text-4xl font-semibold mb-3">Hi! Welcome To</div>
				<img src={logo} alt="Devbook logo" />
			</div>
			<div className="h-[208px]">
				<img src={avatar} className="h-full" alt="Waving person" />
			</div>
		</div>
	)
}