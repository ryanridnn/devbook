
// components
import Router from '@/routes/Router'
import PageLoader from '@/components/common/PageLoader'

// hooks
import useReset from '@/hooks/useReset'
import useAuthListener from '@/hooks/useAuthListener'
import useMenuResizeListener from '@/hooks/useMenuResizeListener'

export default function App() {
  // const [user, setUser] = useRecoilState<User>(userState)
  // const [loadingUser, setLoadingUser] = useState<boolean>(true)

  // useEffect(() => {
  //     authListener((user: any) => {
  //       setLoadingUser(false)

  //     })
  // }, [])

  const loadingUser = useAuthListener()

  useReset()
  useMenuResizeListener()

  return (
      <div className="font-main">
        { loadingUser ? 
          <PageLoader />
          : <Router />
        }
      </div>
  )
}