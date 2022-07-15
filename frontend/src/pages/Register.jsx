import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
const Register = () => {
  const [value, setvalue] = useState({});
  const [errorFromServer, setErrorFromServer] = useState('');
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    if (Object.keys(value).length !== 0) {
      callAxios();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  console.log(errors);
  const callAxios = () => {
    console.log(errors);
    axios
      .post(
        'http://localhost:4000/api/register',

        value,
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      )
      .then(function (response) {
        console.log(response);
        setErrorFromServer('');
      })
      .catch(function (error) {
        console.log(error.response);
        if (error.response.data.error) {
          setErrorFromServer(error.response.data.error);
        }
        // if (error.response.data.error) {
        //   console.log(error.response.data.errorType);
        //   setError('usernameRegister', {
        //     type: 'custom',
        //     message: 'Username or Email already taken',
        //   });
        // }

        // if (error.response.data.errorType === 'emailregister') {
        //   console.log(error);
        //   setError('emailRegister', {
        //     type: string,
        //     message: error.response.data.error,
        //   });
        // }
      });
  };

  return (
    <div className="App">
      <form
        onSubmit={handleSubmit((data, e) => {
          e.preventDefault();

          setvalue(data);
        })}
        id="register"
      >
        {errorFromServer && <p>{errorFromServer}</p>}
        <input
          {...register('username', {
            required: 'username should not be empty',
          })}
          type="text"
        />
        <p>{errors.username && <>{errors.username.message}</>}</p>

        <input
          {...register('email', { required: 'Email should not be empty' })}
          type="text"
        />
        <p>{errors.email && <>{errors.email.message}</>}</p>

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
        <p>{errors.password && <>{errors.password.message}</>}</p>

        <input value="input" type="submit" form="register" />
      </form>
    </div>
  );
};

export default Register;
