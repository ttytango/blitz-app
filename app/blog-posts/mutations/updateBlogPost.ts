import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateBlogPost = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateBlogPost),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const blogPost = await db.blogPost.update({ where: { id }, data })

    return blogPost
  }
)
