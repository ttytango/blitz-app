import { resolver, Ctx, useParams } from "blitz"
import db from "db"
import { z } from "zod"
import { util } from "zod/lib/helpers/util"

export const CreateComment = z.object({
  content: z.string(),
  authorId: z.number(),
  postId: z.number(),
})

export default resolver.pipe(resolver.zod(CreateComment), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  return await db.comment.create({
    data: input,
  })
})
