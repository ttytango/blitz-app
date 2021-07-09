import { useRouter, BlitzPage, Link, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"

export const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <div className={"text-left w-50 mx-auto bg-gray-700 p-4 text-indigo-200"}>
        <button
          className="btn p-2 font-semibold bg-[#16c9c9] hover:bg-green-100 active:bg-[#1133b8] text-black active:text-white rounded my-2 transition-all active:text-white active:outline-none"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <Link href={Routes.SettingsPage()}>
          <a
            className={
              "btn p-2 font-semibold bg-red-200 hover:bg-yellow-100 active:bg-[#1452b2] text-black active:text-white rounded my-2 transition-all mx-4"
            }
          >
            User Settings
          </a>
        </Link>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </div>
    )
  }
  return (
    <>
      <p className="mb-4">You must be logged in</p>
    </>
  )
}

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div className="mx-auto">
      <UserInfo />
      <LoginForm
        onSuccess={() => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          router.push("/forum")
        }}
      />
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = "/forum"
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
