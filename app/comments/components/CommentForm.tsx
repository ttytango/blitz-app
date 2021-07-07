import { AuthenticationError, Link, useMutation, Routes, useSession } from "blitz"
import { Form, FORM_ERROR, FormProps } from "app/core/components/Form"
import { z } from "zod"
import db from "db"
export { FORM_ERROR } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import createComment, { CreateComment } from "app/comments/mutations/createComment"

type CommentFormProps = {
  onSuccess?: () => void
}

export function CommentForm<S extends z.ZodType<any, any>>(props: CommentFormProps) {
  const postID = props.here
  const session = useSession()
  const userID = session.userId
  const [createCommentMutation] = useMutation(createComment)

  return (
    <Form<S>
      submitText={null}
      schema={CreateComment}
      initialValues={{ postId: postID, authorId: userID }}
      onSubmit={async (values) => {
        try {
          await createCommentMutation(values)
          props.onSuccess?.()
        } catch (error) {
          return {
            [FORM_ERROR]:
              "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
          }
        }
      }}
    >
      <LabeledTextField
        className="w-8/12 mx-auto mb-4 mt-8 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500"
        name="content"
        label=""
        placeholder="Comment on this post"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-200 border rounded-lg active:shadow-md active:outline-none focus:outline-none"
      >
        Submit comment
      </button>
    </Form>
  )
}
