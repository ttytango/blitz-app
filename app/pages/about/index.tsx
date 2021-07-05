import Layout from "app/core/layouts/Layout"
import { BlitzPage } from "blitz"

const About: BlitzPage = () => {
  return (
    <div>
      <h1 className="text-2xl">About Page</h1>
    </div>
  )
}

About.suppressFirstRenderFlicker = true
About.getLayout = (page) => <Layout title="AIVuk | About AIVuk">{page}</Layout>
export default About
