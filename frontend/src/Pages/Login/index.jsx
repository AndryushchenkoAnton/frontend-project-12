import React, { useState } from 'react';
import './Login.scss';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { toast, ToastContainer } from 'react-toastify';
import { Form as ReactForm } from 'react-bootstrap';
import logInImg from '../../images/logIn.jpeg';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../../hooks/index.js';
import paths from '../../paths';

const logInSchema = yup.object().shape({
  username: yup.string()
    .required('reqField'),
  password: yup.string()
    .required('reqField'),
});

const LoginForm = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const {
    logStatus, logIn, logOut, setToken, setUsername,
  } = useAuth();
  const [uniqUser, setUniqUser] = useState(true);
  return (

    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href={paths.defaultPath}>{t('hexletLogo')}</a>
              {logStatus ? <button type="button" className="btn btn-primary" onClick={() => logOut()}>{t('logOut')}</button> : null}
            </div>
          </nav>
          <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
              <div className="col-12 col-md-8 col-xxl-6">
                <div className="card shadow-sm">
                  <div className="card-body row p-5">
                    <div
                      className="col-12 col-md-6 d-flex align-items-center justify-content-center"
                    >
                      <img
                        src={logInImg}
                        className="rounded-circle"
                        alt={t('imgAltEnter')}
                      />
                    </div>
                    <Formik
                      initialValues={{ username: '', password: '' }}
                      validationSchema={logInSchema}
                      validateOnChange={false}
                      validateOnBlur={false}
                      onSubmit={async ({ username, password }) => {
                        try {
                          const response = await axios.post('/api/v1/login', { username, password });
                          setToken(response.data.token);
                          setUsername(username);
                          logIn();
                          setUniqUser(true);
                          navigate('/');
                        } catch (e) {
                          logOut();
                          if (e.response.status === 401) {
                            setUniqUser(false);
                            return;
                          }
                          setUniqUser(false);
                          toast(t('networkError'));
                        }
                      }}
                    >
                      {({ values, handleChange, errors }) => (
                        <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                          <h1 className="text-center mb-4">Войти</h1>
                          <div className="form-floating mb-3">
                            <Field
                              autoFocus
                              name="username"
                              placeholder={t('yourNick')}
                              className={cn('form-control', { 'is-invalid': errors.username || !uniqUser })}
                              id="username"
                              autocomplete="username"
                              required
                              value={values.username}
                              onChange={handleChange}

                            />
                            <label htmlFor="username">{t('yourNick')}</label>
                          </div>
                          <div className="form-floating mb-4">
                            <Field
                              name="password"
                              autocomplete="current-password"
                              required
                              placeholder="Пароль"
                              type="password"
                              id="password"
                              className={cn('form-control', { 'is-invalid': errors.username || !uniqUser })}
                              value={values.password}
                              onChange={handleChange}
                            />
                            <label htmlFor="password" className="form-label">{t('password')}</label>
                            {uniqUser ? null : (
                              <ReactForm.Control.Feedback
                                type="invalid"
                              >
                                {t('wrongPasswordOrUsername')}
                              </ReactForm.Control.Feedback>
                            )}
                          </div>
                          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('logIn')}</button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                  <div className="card-footer p-4">
                    <div className="text-center">
                      <span>{t('noAccount')}</span>
                      {' '}
                      <a
                        href={paths.signUpPath}
                      >
                        {t('registration')}
                      </a>
                    </div>
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
export default LoginForm;

// <div className="invalid-tooltip">{t('wrongPasswordOrUsername')}</div>
