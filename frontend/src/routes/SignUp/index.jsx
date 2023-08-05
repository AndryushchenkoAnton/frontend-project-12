import React, {useState} from 'react';
import './index.scss';
import {Formik, Form, Field} from 'formik';
import axios from "axios";
import * as yup from 'yup';
import cn from 'classnames'
import {useNavigate} from "react-router-dom";
import useAuth from "../../Hooks/index.js";

const signUpSchema = yup.object().shape({
    username: yup.string()
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .required('Обязательное поле'),
    password: yup.string()
        .min(6, 'Не менее 6 символов')
        .required('Обязательное поле'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
        .required('Обязательное поле'),
});

const logoutHandler = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('userName');
};

const SignUp = () => {

    const navigate = useNavigate()
    const [uniq, setUniq] = useState(true);
    const {logStatus ,logIn, logOut } = useAuth();

    return (

        <div className='h-100'>
            <div className='h-100' id='chat'>
                <div className='d-flex flex-column h-100'>
                    <nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
                        <div className='container'>
                            <a className='navbar-brand' href={logStatus ? '/' : '/login'}>SlackLike Chat</a>
                            {logStatus ? <button type='button' className='btn btn-primary' onClick={() => logOut()}>Выйти</button> : null}
                        </div>
                    </nav>
                    <div className='container-fluid h-100'>
                        <div className='row justify-content-center align-content-center h-100'>
                            <div className='col-12 col-md-8 col-xxl-6'>
                                <div className='card shadow-sm'>
                                    <div
                                        className='card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5'>
                                        <div>
                                            <img src='../../Img/imgSignUp.jpg' className='rounded-circle' alt='Регистрация' />
                                        </div>
                                        <Formik
                                            initialValues={{username: '', password: '', confirmPassword: ''}}
                                            validationSchema={signUpSchema}
                                            validateOnChange={false}
                                            validateOnBlur={false}
                                            onSubmit={async (values) => {
                                                const {username, password} =values
                                                try {
                                                    const response = await axios.post('/api/v1/signup', { username: username, password: password });
                                                    const { token } = response.data;
                                                    localStorage.setItem('Token', token);
                                                     localStorage.setItem('userName', username);
                                                    setUniq(true);
                                                    logIn();
                                                    navigate('/');
                                                }catch (e){
                                                    setUniq(false);
                                                }
                                            }
                                        }
                                        >
                                            {({values, handleChange, errors}) => (
                                                <Form className='w-50'>
                                                    <h1 className='text-center mb-4'>Регистрация</h1>
                                                    <div className='form-floating mb-3'>
                                                        <Field
                                                            placeholder='От 3 до 20 символов'
                                                            name='username'
                                                            autoComplete='username'
                                                            required
                                                            id='username'
                                                            className={cn('form-control', {'is-invalid': errors.username || !uniq})}
                                                            value={values.username}
                                                            onChange={handleChange}
                                                        />
                                                        <label className='form-label' htmlFor='username'>Имя пользователя</label>
                                                        <div placement='right' className='invalid-tooltip'>{errors.username}</div>
                                                    </div>
                                                    <div className='form-floating mb-3'>
                                                        <Field
                                                            name='password'
                                                            placeholder='Не менее 6 символов'
                                                            aria-describedby='passwordHelpBlock'
                                                            required
                                                            autoComplete='new-password'
                                                            type='password'
                                                            id='password'
                                                            className={cn('form-control', {'is-invalid': errors.password || !uniq})}
                                                            value={values.password}
                                                            onChange={handleChange}
                                                        />
                                                        <div className='invalid-tooltip'>{errors.password}</div>
                                                        <label className='form-label' htmlFor='password'>Пароль</label>
                                                    </div>
                                                    <div className='form-floating mb-4'>
                                                        <Field
                                                            placeholder='Пароли должны совпадать'
                                                            name='confirmPassword'
                                                            required
                                                            autoComplete='new-password'
                                                            type='password'
                                                            id='confirmPassword'
                                                            className={cn('form-control', {'is-invalid': errors.confirmPassword || !uniq})}
                                                            value={values.confirmPassword}
                                                            onChange={handleChange}
                                                        />
                                                        <div className='invalid-tooltip'>{!uniq ? 'Такой пользователь уже существует' : errors.confirmPassword}</div>
                                                        <label className='form-label' htmlFor='confirmPassword'>Подтвердите пароль</label>
                                                    </div>
                                                    <button type='submit' className='w-100 btn btn-outline-primary'>Зарегистрироваться</button>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='Toastify'></div>
            </div>
        </div>

    );
};

/*
<form className='w-50'>
    <h1 className='text-center mb-4'>Регистрация</h1>
    <div className='form-floating mb-3'>
        <input placeholder='От 3 до 20 символов' name='username'
               autoComplete='username' required='' id='username'
               className='form-control is-invalid' value=''/>
        <label className='form-label' htmlFor='username'>Имя
            пользователя</label>
        <div placement='right' className='invalid-tooltip'>Обязательное поле
        </div>
    </div>
    <div className='form-floating mb-3'>
        <input placeholder='Не менее 6 символов' name='password'
               aria-describedby='passwordHelpBlock' required=''
               autoComplete='new-password' type='password' id='password'
               className='form-control' value=''/>
        <div className='invalid-tooltip'>Обязательное поле</div>
        <label className='form-label' htmlFor='password'>Пароль</label>
    </div>
    <div className='form-floating mb-4'>
        <input placeholder='Пароли должны совпадать' name='confirmPassword'
               required='' autoComplete='new-password' type='password'
               id='confirmPassword' className='form-control' value=''/>
        <div className='invalid-tooltip'></div>
        <label className='form-label' htmlFor='confirmPassword'>Подтвердите
            пароль</label>
    </div>
    <button type='submit'
            className='w-100 btn btn-outline-primary'>Зарегистрироваться
    </button>
</form>
*/

export default SignUp;