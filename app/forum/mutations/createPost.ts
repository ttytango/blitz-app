import { Ctx, resolver } from "blitz"
import db from "db"
import * as z from "zod"

// This provides runtime validation + type safety
export const CreatePost = z.object({
  title: z.string(),
  content: z.string(),
})

// resolver.pipe is a functional pipe
export default resolver.pipe(
  // Validate the input data
  resolver.zod(CreatePost),
  // Ensure user is logged in
  resolver.authorize(),
  // Perform business logic

  async (input, { session }: Ctx) => {
    // const post = await db.post.create({
    // data: input})
    const userID = session.userId
    // Transaction -> Takes the session's ID compares it to User Id, then creates
    // a post and assigns the same ID to the post model's authorId field
    // They succeed or fail together

    return await db.$transaction([
      db.user.findFirst({
        where: {
          id: userID,
        },
        select: {
          name: true,
        },
      }),
      db.post.create({
        data: {
          ...input,
          authorId: userID,
        },
      }),
    ])
  }
)
