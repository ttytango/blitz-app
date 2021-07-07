import { Suspense, useEffect, useState } from "react"
import {
  BlitzPage,
  Head,
  Link,
  Routes,
  usePaginatedQuery,
  useParam,
  useQuery,
  useRouter,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getComments from "app/comments/queries/getComments"
import getUsers from "../../../users/queries/getUsers"

const ITEMS_PER_PAGE = 10

const parser = async (comments) => {
  const stringifiedComments = await JSON.stringify(comments)
  return await JSON.parse(stringifiedComments)
}
export const CommentsList = () => {
  // const postId = here
  // const [currentPath, setCurrentPath] = useState("")
  const currentPostId = useParam("postId", "number")
  const pathway = JSON.stringify(currentPostId)
  // setCurrentPath(pathway)
  // const newPath = currentPath;
  // console.log(newPath)

  console.log("PostId: " + currentPostId)

  const router = useRouter()
  // const path = router.asPath
  // const [post] = useQuery(getPost, props.page)

  // console.log(post.id)
  const page = Number(router.query.page) || 0
  const [{ comments, hasMore }] = usePaginatedQuery(getComments, {
    where: { postId: currentPostId },
    orderBy: { createdAt: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  // useEffect(() => {
  //
  //   router.push("/?page=1", undefined, { shallow: true })
  // }, [])
  //
  // useEffect(() => {
  //   // The counter changed!
  // }, [page])

  const [author] = useQuery(getUsers, { id: comments.authorId })
  // const refID = comments.authorId;
  // const [post] = useQuery(getPost, props.page)
  // const [post] = useQuery(getPost, currentPostId)
  // const author = useQuery(getUsers, refID)

  const goToPreviousPage = () =>
    router.push({ query: { postId: currentPostId, page: page - 1 } }, undefined, { shallow: true })
  const goToNextPage = () => router.push({ query: { postId: currentPostId, page: page + 1 } })
  // console.log(JSON.stringify(comments, null, 2))

  if (!comments) {
    return null
  }
  return (
    <div>
      {/*<pre>{JSON.stringify(comments, null, 2)}</pre>*/}
      {/*<pre>{JSON.stringify(post, null, 2)}</pre>*/}
      {/*<pre>{JSON.stringify(author, null, 2)}</pre>*/}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <Link href={Routes.ShowCommentPage({ commentId: comment.id })}>
              <a>{comment.content}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const CommentsPage: BlitzPage = () => {
  // const postID = here
  return (
    <>
      <Head>
        <title>Comments</title>
      </Head>

      <div>
        {/*<p>*/}
        {/*  <Link href={Routes.NewCommentPage()}>*/}
        {/*    <a>Create Comment</a>*/}
        {/*  </Link>*/}
        {/*</p>*/}

        <Suspense fallback={<div>Loading...</div>}>
          <CommentsList />
        </Suspense>
      </div>
    </>
  )
}

CommentsPage.authenticate = true
CommentsPage.getLayout = (page) => <Layout>{page}</Layout>
//
// export default async function getServerSideProps({req, res}) {
//   return {
//     props: {
//
//     }
//   }
// }

export default CommentsPage
