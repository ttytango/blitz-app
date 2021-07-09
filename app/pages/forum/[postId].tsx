import {
  BlitzPage,
  Link,
  Routes,
  useMutation,
  useParam,
  useParams,
  useQuery,
  useRouter,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getPost from "app/forum/queries/getPost"
import humanReadableDateTime from "app/core/parsers/dates"
import deletePost from "app/forum/mutations/deletePost"
import getUser from "app/users/queries/getUser"
import getUsers from "app/users/queries/getUsers"
import { CommentForm } from "app/comments/components/CommentForm"
import { CommentsList } from "./comments/index"
import CommentsPage from "./comments"
import ShowCommentPage from "./comments/[commentId]"
import { UserInfo } from "../../auth/pages/login"

export const Post = ({ here }) => {
  const postId = here
  const router = useRouter()
  const [deletePostMutation] = useMutation(deletePost)
  const [post] = useQuery(getPost, { id: postId })
  // const [authors] = useQuery(getUsers, { id: post.authorId })
  const [author] = useQuery(getUser, { where: { id: post.authorId }, select: { name: true } })

  const userName: string | undefined | null = author?.name

  const createdAt = humanReadableDateTime(post.createdAt)

  return (
    <>
      <div>
        <h1>Post {post.id}</h1>
        <h4 className={"text-lg font-bold"}>{post.title}</h4>
        <p>Content: {post.content}</p>
        <p>Posted By: {userName}</p>
        {/*<p>Author: {authors[post.authorId].name}</p>*/}
        <p>{createdAt}</p>
        <Link href={`/forum/${post.id}/edit`}>
          <a>Edit</a>
        </Link>
        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePostMutation({ id: post.id })
              router.push(Routes.ForumHome())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
          className={"bg-red text-"}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const PostDetailPage: BlitzPage = () => {
  const postId = useParam("postId", "number")
  return (
    <div className={"bg-gray-600"}>
      <UserInfo />
      <div className={"bg-gray-200 md:mx-4 md:mt-4"}>
        <div className={"py-2 text-right p-2 mx-4"}>
          <p>
            <Link href={"/forum"}>
              <a
                className={
                  "btn px-2 py-1 font-bold bg-red-500 active:bg-red-700 transition-all rounded"
                }
              >
                Back
              </a>
            </Link>
          </p>
        </div>
        <div>
          <Post here={postId} />
          <CommentForm here={postId} />
          <CommentsPage />
        </div>
      </div>
    </div>
  )
}

PostDetailPage.suppressFirstRenderFlicker = true
PostDetailPage.getLayout = (page) => <Layout title={"Post"}>{page}</Layout>

export default PostDetailPage
