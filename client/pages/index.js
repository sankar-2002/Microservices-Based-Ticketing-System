import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => { //browser code
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

LandingPage.getInitialProps = async context => { //server code
 //   console.log('LANDING PAGE!');
// we'll need to pass the context to the buildClient function to do the request on Server side

  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  return data;
};

export default LandingPage;
