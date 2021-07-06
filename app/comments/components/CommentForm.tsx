import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function CommentForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const relPostId = props.here
  console.log(relPostId)
  return (
    <Form<S> {...props}>
      <LabeledTextField name="content" label="Comment" placeholder="Comment on this post" />
    </Form>
  )
}
