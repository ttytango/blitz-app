import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getComments from "app/comments/queries/getComments"

const ITEMS_PER_PAGE = 10

export const CommentsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ comments, hasMore }] = usePaginatedQuery(getComments, {
    orderBy: { createdAt: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
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
  return (
    <>
      <Head>
        <title>Comments</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewCommentPage()}>
            <a>Create Comment</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <CommentsList />
        </Suspense>
      </div>
    </>
  )
}

CommentsPage.authenticate = true
CommentsPage.getLayout = (page) => <Layout>{page}</Layout>

export default CommentsPage
