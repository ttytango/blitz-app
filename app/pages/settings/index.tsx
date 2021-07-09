import { BlitzPage, useQuery, Link } from "blitz"
import LoginPage, { UserInfo } from "../../auth/pages/login"
import { useCurrentUser } from "../../core/hooks/useCurrentUser"

const SettingsPage: BlitzPage = () => {
  const currentUser = useCurrentUser()
  if (!currentUser) {
    return (
      <div>
        <LoginPage />
      </div>
    )
  }
  const userName = currentUser.name

  return (
    <div>
      <UserInfo />

      <div className={"p-6"}>
        <h1 className="text-2xl text-center">Settings</h1>
        <Link href={"/forum"}>
          <a>Return to Forum</a>
        </Link>

        <p>
          You are logged in as: <strong>{userName}</strong>
        </p>
      </div>
    </div>
  )
}

export default SettingsPage