import axios from 'axios';
import React, { useContext } from 'react';
import '../css/popop.css';
import { UserContext } from '../utils/userContext';
const Popup = ({ contents, handleClose, text }) => {
  const { user } = useContext(UserContext);
  axios.defaults.withCredentials = true;
  const makePost = (e, obj) => {
    e.preventDefault();
    const temp = { post: text, name: obj, username: user.username };

    axios
      .post('http://localhost:4000/api/posts', temp, {
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
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClose}>
          x
        </span>
        {contents.map((obj) => (
          <button onClick={(e) => makePost(e, obj)}>{obj}</button>
        ))}
      </div>
    </div>
  );
};

export default Popup;
