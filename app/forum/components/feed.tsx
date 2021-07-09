// import { useFeed } from "app/forum/hooks/useFeed"
// import Link from "next/link"

import humanReadableDateTime from "app/core/parsers/dates"
import { Routes, Link, useQuery } from "blitz"
import PostDetailPage from "../../pages/forum/[postId]"
import getUser from "../../users/queries/getUser"
import getUsers from "../../users/queries/getUsers"
import { map } from "zod"

// async function findAllPosts(): Post[]  {
//   try {
//     const response = await fetch("/api/forum/posts", {
//       method: "GET",
//       body: JSON.stringify(posts)
//     });
//     if (!response.ok) {
//       throw new Error(response.statusText)
//     }
//     return await response;
//   } catch(error) {
//     return res.status(500).json({message: "Could not fetch any data"})

//   }
// }

export function PostListDetail(props) {
  // const userId = props.poster;
  const [author] = useQuery(getUser, { where: { id: props.poster }, select: { name: true } })
  // const author = useQuery(getUser, { id: props.poster })
  console.log(author)
  return (
    <div className="flex">
      <div className="flex flex-col text-left">
        <p>
          Originally posted by: <strong>{author.name}</strong>
        </p>
      </div>
    </div>
  )
}
export default function Feed(props) {
  // const {feed} = props;
  // const { feed } = useFeed()
  const feed = props.items
  // const [author] = useQuery(getUsers, {id: feed.authorId}  )
  // console.log(author)

  return feed ? (
    <div className={"bg-gray-600 p-4 border border-1 border-black w-100 mx-auto"}>
      {/*<li key={comment.id} className={"my-2 md:w-11/12 mx-auto"}>*/}
      {/*<div className={"bg-gray-300 my-2 p-4 border border-1 border-black"}>*/}
      {/*  <Link href={Routes.ShowCommentPage({ commentId: comment.id })}>*/}
      {/*    <a className={"text-sm lg:text-lg"}>{comment.content}</a>*/}
      {feed.map((post) => (
        <li
          className="flex flex-col leading-10 text-left px-2 md:px-6 my-2 md:w-11/12 mx-auto"
          key={post.id}
        >
          <div className="bg-gray-300 my-2 p-4 border border-1 border-black">
            <div>
              <Link href={Routes.PostDetailPage({ postId: post.id, page: 0 })}>
                <a className="text-blue-800 leading-10 mt-2 md:text-xl hover:underline text-md lg:py-2">
                  {post.title}
                </a>
              </Link>
            </div>
            <p>
              <time>Last updated: {humanReadableDateTime(post.updatedAt)}</time>
            </p>
            <p>
              <time>Created at: {humanReadableDateTime(post.createdAt)}</time>
            </p>
            <PostListDetail poster={post.authorId} />

            <p>Last commented on by: {post.comments}</p>
          </div>
        </li>
      ))}
    </div>
  ) : null
}
