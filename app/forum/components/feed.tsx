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
  const author = useQuery(getUser, { id: props.poster })
  console.log(author)
  return (
    <div className="flex w-8/12 mx-auto">
      <div className="flex flex-col mb-2 text-left">
        <p>Originally posted by: {author.id}</p>
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
    <>
      {feed.map((post) => (
        <li className="flex flex-col leading-10 text-left px-2 md:px-6" key={post.id}>
          <Link href={Routes.PostDetailPage({ postId: post.id, page: 0 })}>
            <a className="text-blue-800 leading-10 mt-2 sm:text-2xl hover:underline text-lg py-2">
              {post.title}
            </a>
          </Link>
          <time>Last updated: {humanReadableDateTime(post.updatedAt)}</time>
          <time>Created at: {humanReadableDateTime(post.createdAt)}</time>
          <PostListDetail poster={post.authorId} />

          <p>Last commented on by: {post.comments}</p>
          <hr />
        </li>
      ))}
    </>
  ) : null
}
