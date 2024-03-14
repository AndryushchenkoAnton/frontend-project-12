import React from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../../hooks';
import signUpImg from '../../images/signUp.jpg';
import paths from '../../paths';
import LocaleDropDown from '../../Components/Dropdown/LocaleDropDown';

const signUpSchema = yup.object().shape({
  username: yup.string()
    .min(3, 'usernameLength')
    .max(20, 'usernameLength')
    .required('reqField'),
  password: yup.string()
    .min(6, 'passwordLength')
    .required('reqField'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'confirmPassword')
    .required('reqField'),
});

const SignUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    logStatus, logIn, logOut,
  } = useAuth();

  return (

    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href={paths.defaultPath}>{t('hexletLogo')}</a>
              <LocaleDropDown />
              {logStatus ? <button type="button" className="btn btn-primary" onClick={() => logOut()}>{t('logOut')}</button> : null}
            </div>
          </nav>
          <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
              <div className="col-12 col-md-8 col-xxl-6">
                <div className="card shadow-sm">
                  <div
                    className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5"
                  >
                    <div>
                      <img src={signUpImg} className="rounded-circle" alt="Регистрация" />
                    </div>
                    <Formik
                      initialValues={{ username: '', password: '', confirmPassword: '' }}
                      validationSchema={signUpSchema}
                      validateOnChange={false}
                      validateOnBlur={false}
                      onSubmit={async (values) => {
                        const { username, password } = values;
                        try {
                          const response = await axios.post(
                            paths.signupDataPath,
                            { username, password },
                          );
                          const { token } = response.data;
                          logIn(username, token);
                          navigate(paths.defaultPath);
                        } catch (e) {
                          if (e.response.status === 409) {
                            toast.error(t('userAlreadyExh'));
                            return;
                          }
                          toast.error(t('networkError'));
                        }
                      }}
                    >
                      {({ values, handleChange, errors }) => (
                        <Form className="w-50">
                          <h1 className="text-center mb-4">{t('registration')}</h1>
                          <div className="form-floating mb-3">
                            <Field
                              placeholder="От 3 до 20 символов"
                              name="username"
                              autoComplete="username"
                              required
                              id="username"
                              className={cn('form-control', { 'is-invalid': errors.username })}
                              value={values.username}
                              onChange={handleChange}
                            />
                            <label className="form-label" htmlFor="username">{t('username')}</label>
                            <div
                              placement="right"
                              className="invalid-tooltip"
                            >
                              { t(errors.username) }
                            </div>
                          </div>
                          <div className="form-floating mb-3">
                            <Field
                              name="password"
                              placeholder="Не менее 6 символов"
                              aria-describedby="passwordHelpBlock"
                              required
                              autoComplete="new-password"
                              type="password"
                              id="password"
                              className={cn('form-control', { 'is-invalid': errors.password })}
                              value={values.password}
                              onChange={handleChange}
                            />
                            <div
                              className="invalid-tooltip"
                            >
                              {t(errors.password)}
                            </div>
                            <label className="form-label" htmlFor="password">{t('password')}</label>
                          </div>
                          <div className="form-floating mb-4">
                            <Field
                              placeholder="Пароли должны совпадать"
                              name="confirmPassword"
                              required
                              autoComplete="new-password"
                              type="password"
                              id="confirmPassword"
                              className={cn('form-control', { 'is-invalid': errors.confirmPassword })}
                              value={values.confirmPassword}
                              onChange={handleChange}
                            />
                            <div className="invalid-tooltip">{t(errors.confirmPassword)}</div>
                            <label className="form-label" htmlFor="confirmPassword">{t('confirmPasswordAction')}</label>
                          </div>
                          <button type="submit" className="w-100 btn btn-outline-primary">{t('register')}</button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>

  );
};

export default SignUp;
