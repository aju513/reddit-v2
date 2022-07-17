import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../utils/userContext';
import '../css/form.css';
const Login = () => {
  axios.defaults.withCredentials = true;
  ///
  const [value, setValue] = useState({});
  const [serverError, setServerError] = useState('');
  const [status, setStatus] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  ////

  useEffect(() => {
    callAxios();
    const goToHomePage = () => navigate('/');
    if (status) {
      goToHomePage();
    }
    setStatus(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, status]);

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
        setUser(response.data.user);
        setServerError('');

        if (response.status === 200) {
          setStatus(true);
        }
      })
      .catch(function (error) {
        if (error.response.data.errorType === 'email') {
          setServerError(error.response.data.error);
        }
      });
  };

  return (
    <div className="App center">
      <form
        className="from_login"
        onSubmit={handleSubmit((data, e) => {
          setValue(data);
        })}
      >
        {serverError && <p>{serverError}</p>}
        <input
          {...register('email', { required: 'Email should not be empty' })}
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

        <input value="Submit" type="submit" />
      </form>
    </div>
  );
};

export default Login;
