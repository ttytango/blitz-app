import { Link, Routes, useRouter, useMutation, BlitzPage, useSession } from "blitz"
import Layout from "app/core/layouts/Layout"
import createPost, { CreatePost } from "app/forum/mutations/createPost"
import { PostForm } from "app/forum/components/PostForm"
import getCurrentUser from "app/users/queries/getCurrentUser"

const NewPostPage: BlitzPage = () => {
  const session = useSession()
  const router = useRouter()
  const [createPostMutation] = useMutation(createPost)
  const user = session.userId

  // {if (session) {
  //   }
  // }
  return (
    <div>
      <h1>Create a New Post</h1>

      <PostForm
        submitText="Create Post"
        schema={CreatePost}
        onSubmit={async (values) => {
          // This is equivalent to calling the server function directly
          // const authorId = authorNum
          const post = await createPostMutation(values)
          // Notice the 'Routes' object Blitz provides for routing
          router.push("/forum")

          //   {postId: post.id}
        }}
      />
    </div>
  )
}

NewPostPage.authenticate = true
NewPostPage.getLayout = (page) => <Layout title={`Create a new Post`}>{page}</Layout>

export default NewPostPage
