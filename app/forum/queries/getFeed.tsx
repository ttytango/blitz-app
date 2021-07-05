import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetUsersInput = Pick<
  Prisma.PostFindManyArgs,
  "where"
  // | "orderBy" | "skip" | "take"
>

export default async function getFeed({ where }: getFeedInput, { session }: Ctx) {
  if (!session.userId) return null

  //   ctx.session.$authorize()

  const users = await db.post.findMany({
    where,
  })
}
