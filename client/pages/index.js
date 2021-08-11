import Head from "next/head"
import withAuth from "../hocs/withAuth"

function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      Home
    </div>
  )
}

export default withAuth(Home)