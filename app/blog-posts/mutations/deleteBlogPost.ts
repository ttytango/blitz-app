import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteBlogPost = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteBlogPost), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const blogPost = await db.blogPost.deleteMany({ where: { id } })

  return blogPost
})
