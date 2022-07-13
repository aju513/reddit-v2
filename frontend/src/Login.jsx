import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InputBox from './components/InputBox';
import { useForm } from 'react-hook-form';
const Login = () => {
  const [value, setValue] = useState({});

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    handleChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  console.log(errors);
  const handleChange = () => {
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
      })
      .catch(function (error) {
        console.log(error.response.data.errorType);
        if (error.response.data.errorType === 'email') {
          console.log(error);
          setError('emailServer', {
            type: 'server',
            message: error.response.data.error,
          });
        }
        if (error.response.data.errorType === 'password') {
          console.log(error);
          setError('passwordServer', {
            type: 'server',
            message: error.response.data.error,
          });
        }
      });
  };

  return (
    <div className="App">
      <form
        onSubmit={handleSubmit((data) => {
          setValue(data);
        })}
      >
        <input
          {...register('email', { required: 'Emai should not be empty' })}
          type="text"
        />
        <p>{errors.email && <p>{errors.email.message}</p>}</p>
        <p>{errors.emailServer && <p>{errors.emailServer.message}</p>}</p>
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
        <p>{errors.passwordServer && <p>{errors.passwordServer.message}</p>}</p>
        <input value="input" type="submit" />
      </form>
    </div>
  );
};

export default Login;
