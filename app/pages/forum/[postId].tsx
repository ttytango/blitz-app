import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"

const PostDetailPage: BlitzPage = () => {
  return <div>Post Details Page</div>
}

PostDetailPage.suppressFirstRenderFlicker = true
PostDetailPage.getLayout = (page) => <Layout title={`Post ${post.id}`}>{page}</Layout>
export default PostDetailPage
