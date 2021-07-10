import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getComment from "app/comments/queries/getComment"
import updateComment from "app/comments/mutations/updateComment"
import { CommentForm, FORM_ERROR } from "app/comments/components/CommentForm"
import getUser from "../../../../users/queries/getUser"

export const EditComment = () => {
  const router = useRouter()
  const commentId = useParam("commentId", "number")
  const [comment, { setQueryData }] = useQuery(
    getComment,
    { id: commentId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const userId = comment.authorId
  // const [users] = useQuery(getUsers, { id: comment.authorId })
  const [author] = useQuery(getUser, { where: { id: userId }, select: { name: true } })

  const [updateCommentMutation] = useMutation(updateComment)

  return (
    <>
      <Head>
        <title>Edit Comment {comment.id}</title>
      </Head>

      <div>
        <h1>Edit Comment {comment.id}</h1>
        <pre>{JSON.stringify(comment)}</pre>

        <CommentForm
          submitText="Update Comment"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateComment}
          initialValues={comment}
          onSubmit={async (values) => {
            try {
              const updated = await updateCommentMutation({
                id: comment.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowCommentPage({ commentId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
        <p>
          <p>Comment By: {author.name}</p>
          <Link href={Routes.PostDetailPage({ postId: comment.postId })}>
            <a>Back</a>
          </Link>
        </p>
      </div>
    </>
  )
}

const EditCommentPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditComment />
      </Suspense>
    </div>
  )
}

EditCommentPage.authenticate = true
EditCommentPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditCommentPage
