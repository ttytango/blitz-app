import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createComment from "app/comments/mutations/createComment"
import { CommentForm, FORM_ERROR } from "app/comments/components/CommentForm"

const NewCommentPage: BlitzPage = () => {
  const router = useRouter()
  const [createCommentMutation] = useMutation(createComment)

  return (
    <div>
      <h1>Create New Comment</h1>

      <CommentForm
        submitText="Create Comment"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateComment}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const comment = await createCommentMutation(values)
            router.push(Routes.ShowCommentPage({ commentId: comment.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.CommentsPage()}>
          <a>Comments</a>
        </Link>
      </p>
    </div>
  )
}

NewCommentPage.authenticate = true
NewCommentPage.getLayout = (page) => <Layout title={"Create New Comment"}>{page}</Layout>

export default NewCommentPage
