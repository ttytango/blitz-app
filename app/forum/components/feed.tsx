// import { useFeed } from "app/forum/hooks/useFeed"
import Link from "next/link"

import humanReadableDateTime from "app/core/parsers/dates"

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

export default function Feed(props) {
  // const {feed} = props;
  // const { feed } = useFeed()
  const feed = props.items

  return feed ? (
    <>
      {feed.map((post) => (
        <li className="flex flex-col leading-10 text-left px-2 md:px-6" key={post.id} id={post.id}>
          <Link href={`/forum/${post.id}`}>
            <a className="text-blue-800 leading-10 mt-2 sm:text-2xl hover:underline text-lg py-2">
              {post.title}
            </a>
          </Link>
          <div className="flex flex-col mb-2">
            <time>Last updated: {humanReadableDateTime(post.updatedAt)}</time>
            <time>Created at: {humanReadableDateTime(post.createdAt)}</time>
            <p>Originally posted by: {post.authorId}</p>
            <p>Last commented on by: {post.comment}</p>
          </div>
          <hr />
        </li>
      ))}
    </>
  ) : null
}
