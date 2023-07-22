import { useState, useEffect } from 'react'

// services
import { authListener, FUser, handleLogin } from '@/services/firebase/user'

// recoil
import { User, defaultUser, useUserState } from '@/atoms/userAtom'

export default function useAuthListener() {
  const [currentUser, setCurrentUser] = useUserState()
  const [loadingUser, setLoadingUser] = useState<boolean>(true)

  useEffect(() => {
      const unsub = authListener(async (user: any) => {
        
        if(user) {
          try {
            const docId = await handleLogin({
              gid: user.uid,
              name: user.displayName,
              email: user.email,
            })
            setLoadingUser(false)
            setCurrentUser({
              id: docId,
              gid: user.uid,
              name: user.displayName,
              email: user.email,
              pic: user.photoURL
            })
          } catch(e: any) {
            console.log(e)
          } 
        } else {
          setLoadingUser(false)
          setCurrentUser(defaultUser)
        }
      })

      return unsub
  }, [])

  return loadingUser
}