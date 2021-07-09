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

export const Post = ({ here }) => {
  const postId = here
  const router = useRouter()
  const [deletePostMutation] = useMutation(deletePost)
  const [post] = useQuery(getPost, { id: postId })
  const [authors] = useQuery(getUsers, { id: post.authorId })

  const created = humanReadableDateTime(post.createdAt)
  return (
    <>
      <div>
        <h1>Post {post.id}</h1>
        <h4 className={"text-lg font-bold"}>{post.title}</h4>
        <p>Content: {post.content}</p>
        {/*<p>Author: {authors[post.authorId].name}</p>*/}
        <p>{created}</p>
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
  // console.log(postId)
  return (
    <div>
      <p>
        <Link href={"/forum"}>
          <a>Back</a>
        </Link>
      </p>

      <Post here={postId} />
      <CommentForm
        here={postId}
        // onSubmit={(e) => e.preventDefault}
      />
      <CommentsPage />

      {/*<ShowCommentPage here={postId} />*/}
      {/*<Link href={`/forum/${postId}/comments/create-comment`}>*/}
      {/*  <a>New Comment</a>*/}
      {/*</Link>*/}
    </div>
  )
}

PostDetailPage.suppressFirstRenderFlicker = true
PostDetailPage.getLayout = (page) => <Layout title={"Post"}>{page}</Layout>

export default PostDetailPage
