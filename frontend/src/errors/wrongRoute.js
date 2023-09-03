import { useRouteError } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const WrongRoute = () => {
  const error = useRouteError();
  const { t } = useTranslation();

  return (
    <div id="error-page">
      <h1>404!</h1>
      <p>{t('notFoundError')}</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default WrongRoute;
