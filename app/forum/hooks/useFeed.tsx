import { useQuery } from "blitz"
import db, { Prisma } from "db"

export const useFeed = async () => {
  const res = await db.post.findMany({
    where: {
      published: true,
    },
  })
  const [feed] = await res
  return feed
}
