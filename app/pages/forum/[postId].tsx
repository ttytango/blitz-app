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
import db from "db"
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
import { useEffect } from "react"
import { useCurrentUser } from "../../core/hooks/useCurrentUser"

export const Post = ({ here }) => {
  const currentUser = useCurrentUser()
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
      <div className="py-4 my-4 lg:mx-4 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-lg font-bold text-indigo-100 shadow-sm md:shadow-lg">
        <h4 className={"text-lg font-bold mb-4 font-normal lg:font-semibold"}>{post.title}</h4>
        <div
          className={
            "p-4 lg:mx-2 border border-1 border-black bg-gray-100 text-gray-900 text-left md:text-justify text-sm lg:text-lg font-normal"
          }
        >
          <p>{post.content}</p>
        </div>
        <div className={"text-left mt-4 mb-2 px-4 font-normal text-sm lg:text-lg"}>
          <p>Posted By: {userName}</p>
          <p>Post written: {createdAt}</p>
        </div>
        {currentUser.id !== post.authorId ? (
          <div className={"text-right"}>
            <Link href={"#"}>
              <a
                onClick={() => {
                  prompt("Report post....")
                }}
                className={"text-red-600 px-6"}
              >
                Report Post?
              </a>
            </Link>
          </div>
        ) : (
          <div>
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
        )}
      </div>
    </>
  )
}

const PostDetailPage: BlitzPage = () => {
  const postId = useParam("postId", "number")
  return (
    <div className={"bg-gray-600"}>
      <UserInfo />
      <div className={"bg-gray-400 md:mx-4 mt-4"}>
        <div className={"p-4 text-right mx-4"}>
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
