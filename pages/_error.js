import React from 'react';
import NotFoundWrapper from '../components/Wrappers/NotFound/NotFound';

const Error = ({ statusCode }) => (
  <p>
    {statusCode && <NotFoundWrapper />}
  </p>
);

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
