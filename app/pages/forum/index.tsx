import { UserInfo } from "app/auth/pages/login"
import { Link, BlitzPage, useMutation, Routes, Ctx, useSession } from "blitz"
import Layout from "app/core/layouts/Layout"
// import {useUsers} from "app/users/hooks/useUsers"
import Feed from "app/forum/components/feed"
// import useSWR from "swr";
import db from "db"
import { PrismaClient } from "@prisma/client"

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
        <h2>
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
      <UserInfo />
      <Feed items={posts} />
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
    where: {
      published: false,
    },
  })

  // let feed = await db.post.findMany({
  // return transaction([something], [somethingElse])

  //   await db.post.findMany({
  //   // where: {published: false},
  //   orderBy: { updatedAt: "desc" },
  //
  // })
  // const feed = await transaction(something, somethingElse)

  const stringifiedFeed = await JSON.stringify(feed)
  const parsedFeed = await JSON.parse(stringifiedFeed)
  console.log(parsedFeed)
  //   const res = await db.post.findMany({
  //   where: {
  //     published: true,
  //   },
  // })
  // const {data, error} = useSWR("/api/forum/posts");
  // const loading = !data;
  //   if (loading) {
  //       return <div>Loading...</div>
  //   }

  //   if (error) {
  //      return <div>Error!</div>
  //   }
  return {
    props: {
      postList: parsedFeed,
    },
  }
}

export default ForumHome
