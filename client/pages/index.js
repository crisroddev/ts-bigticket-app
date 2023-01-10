import axios from 'axios';

const LandingPage = ( { color, currentUser } ) => {
  console.log(color)
  console.log(currentUser);
  return <h1>Landing</h1>
};


// Server side rendering process
LandingPage.getInitialProps = async () => {
  //console.log('Server....');
  //return { color: 'red'};
  const response = await axios.get('/api/users/currentUser');

  return response.data;
};

export default LandingPage;