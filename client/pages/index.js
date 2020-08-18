import axios from 'axios'

const LandingPage = ({ currentUser }) => {
  return <h1>Landing page</h1>
}

LandingPage.getInitialProps = async () => {
  // const response = await axios.get('/api/users/currentuser')

  // return response.data
  if (typeof window === 'undefined') {
    // we are on the server
    // request should be made to http://ingress-nginx.ingress-nginx-controller...asasghgjl
  } else {
    // we are on the browser!
    // requests can be made with abaswe url of ''
  }
  console.log('I was executed')
  return {}
}

export default LandingPage
