import Layout from "app/core/layouts/Layout"
import { BlitzPage } from "blitz"
import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient()
const About: BlitzPage = () => {
  // console.log(props);

  // console.log(data())
  // console.log(posts)

  // ids)
  return (
    <div>
      {/*<pre>{posts}</pre>*/}
      <h1 className="text-2xl">About Page</h1>
    </div>
  )
}

// const searchIDsByTitleOrContent = async(field: string) => {
//   // let postsList = [];
//   let arr = [];
//   let postCasesArray = [];
//   const data = async() => {
//
//     const posts = await prisma.post.findMany();
//     const stringified = JSON.stringify(posts)
//     const postsList = JSON.parse(stringified)
//     return postsList
//   }
//
//     const postsList = await data();
//
//   // } catch (e) {
//   //   console.log("no data")
//   //   return e;
//   // }
//   // if (postsList.length === 0) {
//   //   return;
//   // }
//
//   // try {
//     for (let i = 0; i < postsList.length; i++) {
//       /*postCasesArray = */
//       postCasesArray = postsList.map((post) => [post.content.toLowerCase(), post.id])
//     }
//   // } catch (e) {
//   //   console.log("failed to map data")
//   //   return e;
//   // }
//   // try {
//     for (let i = 0; i < postCasesArray.length; i++) {
//       if (postCasesArray[i][0].includes(field)) {
//         arr.push(postCasesArray[i][1])
//       }
//     }
//     return arr;
//   // } catch (e) {
//   //   return e;
//   // }
//   // JSON.stringify(arr).then((data) => console.log("something " + data))
// }
// export async function getServerSideProps(context) {
//   // const prisma = new PrismaClient();
//   // const pasts = await prisma.post.findMany()
//   // console.log(pasts)
//   // import db from "db";
// // const db = require("db")
// // import { any } from "zod"
//
//   //
//   // const parser = async (posts) => {
//   //   await JSON.stringify(posts)
//   //   // return await JSON.parse(stringifiedRes)
//   // }
//   // const posts = searchIDsByTitleOrContent("test").then((data) => console.log("something " + data))
//   // const parsedData = parser(posts)
//   // posts.
//   //
//   // console.log(posts)
//   const postsIds =  await searchIDsByTitleOrContent("test")
//   // console.log(posts)
//   const postSearchResults = async(array) => {
//     for (let i=0;array.length; i++) {
//
//
//     const results = await prisma.post.findUnique({
//       where: {
//         id: array[i]
//       }
//     })
//       const strings = await JSON.stringify(results)
//       const res = await JSON.parse(strings)
//       return res;
//     }
//   }
//   const results = postSearchResults(postsIds)
//   return {
//
//     props: {
//       posts: results
//     }
//   }
//
//
// }
About.suppressFirstRenderFlicker = true
About.getLayout = (page) => <Layout title="AIVuk | About AIVuk">{page}</Layout>
export default About
