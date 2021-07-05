import { UserInfo } from "app/auth/pages/login"
import { Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"

const ForumHome: BlitzPage = () => {
  return (
    <div>
      <UserInfo />
    </div>
  )
}
ForumHome.suppressFirstRenderFlicker = true
ForumHome.getLayout = (page) => <Layout title="Home">{page}</Layout>
export default ForumHome
