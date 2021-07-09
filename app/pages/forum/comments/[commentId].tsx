import { Suspense } from "react"
import { z } from "zod"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getComment from "app/comments/queries/getComment"
import deleteComment from "app/comments/mutations/deleteComment"
import getUser from "app/users/queries/getUser"
import getUsers from "app/users/queries/getUsers"
import getPost from "app/forum/queries/getPost"

export const Comment = () => {
  const router = useRouter()
  const commentId = useParam("commentId", "number")
  const [deleteCommentMutation] = useMutation(deleteComment)
  const [comment] = useQuery(getComment, { id: commentId })
  const userId = comment.authorId
  // const [users] = useQuery(getUsers, { id: comment.authorId })
  const [author] = useQuery(getUser, { where: { id: userId }, select: { name: true } })
  const [post] = useQuery(getPost, { id: comment.postId })
  // {comment.}
  return (
    <>
      <pre>{JSON.stringify(comment, null, 2)}</pre>
      {/*<pre>{JSON.stringify(users, null, 6)}</pre>*/}
      <Head>
        <title>Comment {comment.id}</title>
      </Head>

      <div>
        <h1>Comment {comment.id}</h1>
        <h1>Commenter: {author.name}</h1>
        <h1>Comment {comment.content}</h1>

        {/*<Link href={Routes.EditCommentPage({ commentId: comment.id })}>*/}
        {/*  <a>Edit</a>*/}
        {/*</Link>*/}
        {/*<p>Posted By: {users.filter((user) => (comment.authorId === user.id) )? user : null)} }}</p>*/}

        <button
          type="button"
          className={
            "p-1 px-2 my-6 font-bold bg-red-500 rounded-lg hover:shadow-md active:bg-red-800 active:outline-none focus:outline-none"
          }
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteCommentMutation({ id: comment.id })
              router.push(Routes.ForumHome())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowCommentPage: BlitzPage = (props) => {
  const here = props
  return (
    <div>
      <p>
        <Link href={Routes.ForumHome()}>
          <a>Comments</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Comment />
      </Suspense>
    </div>
  )
}

ShowCommentPage.authenticate = true
ShowCommentPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowCommentPage
