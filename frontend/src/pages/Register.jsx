import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
const Register = () => {
  const [value, setvalue] = useState({});
  const [errorFromServer, setErrorFromServer] = useState('');
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
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
    const goToHomePage = () => navigate('/');

    if (status) {
      goToHomePage();
    }
    setStatus(false);
    // eslint-disable-,statunext-line react-hooks/exhaustive-deps
  }, [value, status]);
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
        if (response.status === 200) {
          setStatus(true);
        }
        setErrorFromServer('');
      })
      .catch(function (error) {
        console.log(error.response);
        if (error.response.data.error) {
          setErrorFromServer(error.response.data.error);
        }
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
