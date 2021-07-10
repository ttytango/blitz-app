import { UserInfo } from "app/auth/pages/login"
import { Link, BlitzPage, useMutation, Routes, Ctx, useSession } from "blitz"
import Layout from "app/core/layouts/Layout"
// import {useUsers} from "app/users/hooks/useUsers"
import Feed from "app/forum/components/feed"
// import useSWR from "swr";
import db from "db"
// import { PrismaClient } from "@prisma/client"

// type props {
//   postList
// }

const ForumHome: BlitzPage = (props) => {
  const posts = props.postList
  const session = useSession()
  console.log(session.userId)
  console.log(session.isLoading)
  if (session.userId === null) {
    return (
      <div>
        <h2 className={"font-semibold"}>
          Please{" "}
          <a href={"/login"} className="no-underline hover:underline text-blue-800">
            log in
          </a>{" "}
          to continue
        </h2>
      </div>
    )
  }

  return (
    <div>
      <div>
        <Link href={"/forum/new-post"}>
          <button className="no-underline hover:underline text-blue-800">Create a Post</button>
        </Link>
      </div>
      <UserInfo />
      <div className={"bg-blue-200"}>
        <h3 className={"py-6 text-lg"}>Recent Posts</h3>

        <Feed items={posts} />
      </div>
    </div>
  )
}

ForumHome.suppressFirstRenderFlicker = true
ForumHome.getLayout = (page) => <Layout title="Home">{page}</Layout>

export async function getServerSideProps() {
  // const prisma = new PrismaClient()
  // const res = await prisma.post.findMany()
  // @ts-ignore

  let feed = await db.post.findMany({
    take: 10,
    orderBy: {
      updatedAt: "desc",
    },
  })

  const stringifiedFeed = await JSON.stringify(feed)
  const parsedFeed = await JSON.parse(stringifiedFeed)
  console.log(parsedFeed)

  return {
    props: {
      postList: parsedFeed,
    },
  }
}

export default ForumHome
