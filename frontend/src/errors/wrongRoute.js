import { useRouteError } from 'react-router-dom';

const WrongRoute = () => {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>404!</h1>
      <p>Not found !</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default WrongRoute;
