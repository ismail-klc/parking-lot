import Head from "next/head"
import DashboardCart from "../components/dashboard-cart"
import ContentHeader from "../components/content-header"
import withAuth from "../hocs/withAuth"
import buildClient from '../helpers/build-client'

function Home({ data }) {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <ContentHeader title="Dashboard"/>
      <DashboardCart data={data}/>
    </div>
  )
}

export async function getServerSideProps(context) {
  const client = buildClient(context);

  try {
      const { data } = await client.get('/api/parking/statistics');
      return { props: { data } };

  } catch (error) {
      return { props: {} };
  }
}

export default withAuth(Home)