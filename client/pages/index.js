import withAuth from "../hocs/withAuth"

function Home() {
  return (
    <div>
      Home
    </div>
  )
}

export default withAuth(Home)