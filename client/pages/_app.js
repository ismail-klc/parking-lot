import '../styles/globals.css'
import '../styles/adminlte.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import buildClient from '../helpers/build-client'
import Script from 'next/script'
import LayoutAuth from '../components/layout-auth';


function MyApp({ Component, pageProps, user }) {
  return (
    <>
      {
        <LayoutAuth user={user}>
          <Component user={user} {...pageProps} />
        </LayoutAuth>
      }
      <Script key="1" strategy="beforeInteractive" src="/js/jquery.min.js" />
      <Script key="2" strategy="beforeInteractive" src="/js/adminlte.min.js" />
    </>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  let user;

  try {
    const { data } = await client.get('/api/auth/me');
    user = data;
  } catch (error) { }

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
    );
  }

  return {
    pageProps,
    user
  };
}

export default MyApp
