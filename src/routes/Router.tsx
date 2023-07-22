import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

// routes
import Home from '@/routes/home/Home'
import Login from '@/routes/login/Login'
import PublicRoute from '@/components/common/PublicRoute'
import ProtectedRoute from '@/components/common/ProtectedRoute'

export default function RouterComp() {
	return (
		<Router>
			<Routes>
				<Route element={<ProtectedRoute />}>
					<Route path="/" element={<Home />} />
				</Route>
				<Route element={<PublicRoute />}>
					<Route path="/login" element={<Login />} />
				</Route>
			</Routes>
		</Router>
	)
}