import {
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
} from 'react-router-dom'

// recoil
import { useUserValue } from '@/atoms/userAtom'

export default function PublicRoute() {
  const currentUser = useUserValue()

  if (currentUser.id) {
    return <Navigate to={'/'} replace />;
  }

  return <Outlet />;
};