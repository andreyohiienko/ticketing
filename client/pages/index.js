const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  )
}

LandingPage.getInitialProps = async (context) => {
  console.log('LANDING PAGE')

  const client = buildClient(appContext.ctx)

  const { data } = await client.get('/api/users/currentuser')
  return data
}

export default LandingPage
