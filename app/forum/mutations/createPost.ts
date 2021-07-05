// app/projects/mutations/createProject.ts
import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

// This provides runtime validation + type safety
export const CreatePost = z
  .object({
    title: z.string(),
    content: z.string(),
  })
  .nonstrict()

// resolver.pipe is a functional pipe
export default resolver.pipe(
  // Validate the input data
  resolver.zod(CreatePost),
  // Ensure user is logged in
  resolver.authorize(),
  // Perform business logic
  async (input) => {
    const post = await db.post.create({ data: input })
    return post
  }
)
