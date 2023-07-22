import {
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
} from 'react-router-dom'

// recoil
import { useUserValue } from '@/atoms/userAtom'

export default function ProtectedRoute() {
  const currentUser = useUserValue()

  if (!currentUser.id) {
    return <Navigate to={'/login'} replace />;
  }

  return <Outlet />;
};