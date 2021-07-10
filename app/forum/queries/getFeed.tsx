import { Ctx } from "blitz"
import db, { Prisma } from "db"

type getFeedInput = Pick<
  Prisma.PostFindManyArgs,
  "where" | "take"
  // | "orderBy" | "skip" | "take"
>

export default async function getFeed({ where, take }: getFeedInput, { session }: Ctx) {
  if (!session.userId) return null

  //   ctx.session.$authorize()

  const users = await db.post.findMany({
    where,
  })
}
