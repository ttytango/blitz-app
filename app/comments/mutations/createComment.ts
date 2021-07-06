import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateComment = z.object({
  content: z.string(),
})

export default resolver.pipe(resolver.zod(CreateComment), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  return await db.comment.create({ data: input })
})
