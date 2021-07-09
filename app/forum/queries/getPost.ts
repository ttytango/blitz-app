import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetPost = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetPost), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const post = await db.post.findFirst({ where: { id } })
  // const post = await db.user.findFirst({
  //   where: {
  //     post: {
  //       some: {
  //         id: id
  //       },
  //
  //     },
  //   },
  //   select: {
  //     name: true
  //   }
  // })
  // const authorIdentifier = await post.authorId;
  // const author = await db.user.findFirst({
  //   where: {
  //     id,
  //
  //   },
  //
  //       authorId: true
  //
  // })
  // const user = await db.user.findMany({
  //   where: {
  //       id: post.authorId,
  //     posts: {
  //         : {
  //           id: authorId
  //         }
  //     }
  //     },
  //
  // })
  // return {
  //   ...post,
  //   user
  // }

  if (!post) throw new NotFoundError()

  return post
})
