import { useState } from 'react';
import axios from 'axios';

// Custom hook that will return an JSX element containing errors should a request return errors
const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      // Reset errors for second request
      setErrors(null);

      const res = await axios[method](url, body);

      // Only execute callback function if try block did not throw an error
      if (onSuccess) {
        onSuccess(res.data);
      }
    } catch (err) {
      setErrors(
        <div className='alert alert-danger'>
          <h4>Oops..</h4>
          <ul>
            {err.response.data.errors.map(error => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
