import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateBlogPost = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateBlogPost), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const blogPost = await db.blogPost.create({ data: input })

  return blogPost
})
