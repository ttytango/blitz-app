import { UserInfo } from "app/auth/pages/login"
import { Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
// import {useUsers} from "app/users/hooks/useUsers"
import Feed from "app/forum/components/feed"

const ForumHome: BlitzPage = () => {
  // const {users} = useUsers();
  return (
    <div>
      <UserInfo />
      <Feed />
    </div>
  )
}
ForumHome.suppressFirstRenderFlicker = true
ForumHome.getLayout = (page) => <Layout title="Home">{page}</Layout>
export default ForumHome
