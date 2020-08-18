import axios from 'axios'

const LandingPage = ({ currentUser }) => {
  console.log('currentUser', currentUser)
  return <h1>Landing page</h1>
}

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === 'undefined') {
    // we are on the server
    // request should be made to http://ingress-nginx.ingress-nginx-controller...asasghgjl
    // http://SERVICENAME.NAMESPACE.svc.cluster.local
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: req.headers,
      },
    )
    return data
  } else {
    // we are on the browser!
    // requests can be made with abaswe url of ''
    const { data } = await axios.get('/api/users/currentuser')

    return data
  }
  console.log('I was executed')
  return {}
}

export default LandingPage
