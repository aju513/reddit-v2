import axios from 'axios';
import React, { useContext, useState } from 'react';
import '../../css/popop.css';
import { UserContext } from '../../utils/userContext';
import UseDropDownWithPopup from '../Dropdown/UseDropdownWithPopup';
const Popup = ({ contents, handleClose }) => {
  const { user, subreddit } = useContext(UserContext);
  axios.defaults.withCredentials = true;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const makePost = (e, obj) => {
    const temp = {
      post: { title: title, content: content },
      name: obj,
      username: user.username,
    };

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
        <h2>Create Post</h2>
        <form
          onSubmit={(e) => {
            makePost(e, content);
          }}
        >
          <input
            className="textbox"
            type="text"
            placeholder="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            className="textbox"
            type="text"
            placeholder="text"
            onChange={(e) => setContent(e.target.value)}
          />
          <UseDropDownWithPopup
            main={'Select Subreddit'}
            properties={subreddit}
            setContent={setContent}
          />

          <input type="submit" value="create" />
        </form>
      </div>
    </div>
  );
};

export default Popup;
