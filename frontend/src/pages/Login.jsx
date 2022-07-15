import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../utils/userContext';
const Login = () => {
  const [value, setValue] = useState({});
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const { isLoggedIn, setIsLoggedIn, setUserName } = useContext(UserContext);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    callAxios();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const callAxios = () => {
    console.log(value);
    axios
      .post(
        'http://localhost:4000/api/login',

        value,
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      )
      .then(function (response) {
        console.log(response);
        setUserName(response.data.username);
        setServerError('');
        console.log('login', response.data.isLoggedIn);
        setIsLoggedIn(response.data.isLoggedIn);
        console.log(isLoggedIn);
      })
      .catch(function (error) {
        console.log(error.response.data.errorType);
        if (error.response.data.errorType === 'email') {
          setServerError(error.response.data.error);
        }
      });
  };

  return (
    <div className="App">
      <form
        onSubmit={handleSubmit((data, e) => {
          setValue(data);
        })}
      >
        {serverError && <p>{serverError}</p>}
        <input
          {...register('email', { required: 'Emai should not be empty' })}
          type="text"
          onChange={() => {
            setServerError('');
          }}
        />
        <p>{errors.email && <p>{errors.email.message}</p>}</p>

        <input
          {...register('password', {
            required: 'Password Should Not Be Empyty',
            minLength: {
              value: 8,
              message: 'The length of password should be more than 8',
            },
          })}
          type="password"
        />
        <p>{errors.password && <p>{errors.password.message}</p>}</p>

        <input value="input" type="submit" />
      </form>
    </div>
  );
};

export default Login;
