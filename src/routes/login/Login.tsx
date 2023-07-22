// components
import Banner from '@/components/Login/Banner'

// services
import { loginWithGoogle } from '@/services/firebase/user'

export default function Login() {
	return (
		<div className="flex justify-center items-center w-screen h-screen bg-appgrey-100">
			<div className="flex flex-col gap-4 bg-white rounded-3xl sm:w-[516px] w-[90vw] p-4">
				<Banner />				
				<button onClick={loginWithGoogle} className="btn mb-1">
					Login With Google Account
				</button>
			</div>
		</div>
	)
}