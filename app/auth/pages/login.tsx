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
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
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
