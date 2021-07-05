import { useFeed } from "app/forum/hooks/useFeed"
import Link from "next/link"
import humanReadableDateTime from "app/core/parsers/dates"

export default function Feed() {
  const { feed } = useFeed()

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
