import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetBlogPostsInput
  extends Pick<Prisma.BlogPostFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetBlogPostsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: blogPosts,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.blogPost.count({ where }),
      query: (paginateArgs) => db.blogPost.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      blogPosts,
      nextPage,
      hasMore,
      count,
    }
  }
)
