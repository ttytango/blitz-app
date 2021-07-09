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
import getUser from "../../../users/queries/getUser"
import { string } from "zod"
import { Comment } from "./[commentId]"
// import ShowCommentPage from "app/pages/forum/comments/index"
const ITEMS_PER_PAGE = 10

const parser = async (comments) => {
  const stringifiedComments = await JSON.stringify(comments)
  return await JSON.parse(stringifiedComments)
}

// export default function CommentAuthor(props) {
//   // const commenter = props;
//   let author;
//   {props.commenter.forEach(c => {
//     author = useQuery(getUser, { query: { id: c.commentId } })
//   })}
//   return (
//     <div>
//       <p>{author.name}</p>
//     </div>
//   )
// }
export const CommentsList = () => {
  // const postId = here
  // const [currentPath, setCurrentPath] = useState("")
  const currentPostId = useParam("postId", "number")
  // const [author] = useQuery(getUser, {id: authorId, select: {name:true}})
  // const pathway = JSON.stringify(currentPostId)
  // setCurrentPath(pathway)
  // const newPath = currentPath;
  // console.log(newPath)
  // let author;
  //
  //  let [author] = {
  //    comments.map((comment) => {
  //      useQuery(getUser, { query: { id: comment.authorId } })
  //    })
  //  }
  // const [authors] = useQuery(getUsers, {
  //   where: {
  //     id: this,
  //   },
  //   select: {
  //     name: true
  //   }
  // })

  // console.log("PostId: " + currentPostId)

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
  // const [author] = useQuery(getUser, {where: {select: {id: commentId}}})

  // useEffect(() => {
  //
  //   router.push("/?page=1", undefined, { shallow: true })
  // }, [])
  //
  // useEffect(() => {
  //   // The counter changed!
  // }, [page])

  // const [author] = useQuery(getUser, { id: comment.authorId })
  // comments.map((comment) => {
  //   const [author] = useQuery(getUser, { id: comment.authorId })
  // })
  // const refID = comments.authorId;
  // const [post] = useQuery(getPost, props.page)
  // const [post] = useQuery(getPost, currentPostId)
  // const author = useQuery(getUsers, refID)

  const goToPreviousPage = () =>
    router.push({ query: { postId: currentPostId, page: page - 1 } }, undefined, { shallow: true })
  const goToNextPage = () =>
    router.push({ query: { postId: currentPostId, page: page + 1 } }, undefined, { shallow: true })
  // console.log(JSON.stringify(comments, null, 2))
  // const stringAuthors = JSON.stringify(authors)
  // const parsedAuthors = JSON.parse(stringAuthors);
  // function authorMap(comments, authors) {
  //   {parsedAuthors.filter((c) => authors.id === c.authorId)}
  //   // return userMap.name
  // }
  // const users = authorMap()
  if (!comments) {
    return null
  }
  return (
    <div className={"bg-gray-600 p-2 mt-4"}>
      {/*<pre>{JSON.stringify(comments, null, 2)}</pre>*/}
      {/*<pre>{JSON.stringify(post, null, 2)}</pre>*/}
      {/*<pre>{JSON.stringify(author, null, 2)}</pre>*/}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className={"my-2 md:w-11/12 mx-auto"}>
            <div className={"bg-gray-300 my-2 p-4 border border-1 border-black"}>
              {/*<Comment commentId={comment.id} />*/}
              <Link href={Routes.ShowCommentPage({ commentId: comment.id })}>
                <a className={"text-sm lg:text-lg"}>{comment.content}</a>
              </Link>
              <p>Post Id: {comment.postId}</p>
              <p>Commenter Id: {comment.authorId}</p>

              <p>Commenter Id: {comment.authorId}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="w-6/12 flex justify-center flex-col md:flex-row my-4 mx-auto md:space-x-[1cm]">
        <button
          disabled={page === 0}
          onClick={goToPreviousPage}
          className="bg-green-100 p-2 my-2 disabled:bg-gray-400 hover:shadow-md disabled:shadow-none active:bg-white focus:bg-black-400 active:outline-none rounded"
        >
          Latest Comments
        </button>
        <button
          disabled={!hasMore}
          onClick={goToNextPage}
          className="bg-pink-100 p-2 my-2 disabled:bg-gray-400 focus:bg-white active:bg-white hover:shadow-md disabled:shadow-none active:outline-none rounded"
        >
          Older Comments
        </button>
      </div>
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
