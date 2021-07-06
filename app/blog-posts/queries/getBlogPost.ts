import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetBlogPost = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetBlogPost), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const blogPost = await db.blogPost.findFirst({ where: { id } })

  if (!blogPost) throw new NotFoundError()

  return blogPost
})
