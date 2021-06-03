import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ErrorPage = () => {
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState();
  const status = location.state && location.state.status ? location.state.status : 404;

  useEffect(() => {
    switch (status) {
      case 404:
        setErrorMessage('Oops, The Page you are looking for cant be found!');
        break;
      case 403:
        setErrorMessage('You don\'t have permission to access page');
        break;
      default:
        setErrorMessage('');
        break;
    }
  }, [status]);
  return (
    <div>
      <h1>Error status: {status}</h1>
      <h2>Message: {errorMessage}</h2>
      <Link to="/">Return HomePage</Link>
    </div>
  );
};

export default ErrorPage;
