import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InputBox from './components/InputBox';

const Register = () => {
  const [value, setValue] = useState({});
  const [username, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {}, []);

  const handleChange = (e) => {
    e.preventDefault();
    const temp = {
      username,
      email,
      password,
    };
    setValue(temp);
    console.log(value);
    axios
      .post('http://localhost:4000/api/register', value, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <form onSubmit={(e) => handleChange(e)}>
        <InputBox
          label="username"
          type="text"
          handleClick={(e) => setUser(e.target.value)}
        />
        <InputBox
          label="email"
          type="text"
          handleClick={(e) => setEmail(e.target.value)}
        />
        <InputBox
          label="password"
          type="password"
          handleClick={(e) => setPassword(e.target.value)}
        />

        <InputBox value="input" type="submit" />
      </form>
    </div>
  );
};

export default Register;
