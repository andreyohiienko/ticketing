import axios from 'axios'

const LandingPage = ({ currentUser }) => {
  return <h1>Landing page</h1>
}

LandingPage.getInitialProps = async () => {
  // const response = await axios.get('/api/users/currentuser')

  // return response.data
  console.log('I was executed')
  return {}
}

export default LandingPage
