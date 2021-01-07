import React from 'react';

import buildClient from '../api/buildClient';

const Home = ({ currentUser }) => {
  return currentUser ? <h1>Session Active</h1> : <h1>Session Inactive</h1>;
};

Home.getInitialProps = async context => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default Home;
