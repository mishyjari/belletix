import { useState } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/useRequest';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: { email, password },
    onSuccess: () => Router.push('/'),
  });

  const handleSubmit = async e => {
    e.preventDefault();

    await doRequest();
  };

  return (
    <form onSubmit={handleSubmit} className='container'>
      <h4>Sign In</h4>
      <div className='form-group'>
        <label>Email Address</label>
        <input
          className='form-control'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className='form-group'>
        <label>Password</label>
        <input
          className='form-control'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      {errors}
      <button className='btn btn-primary'>Sign In</button>
    </form>
  );
};

export default Signin;
