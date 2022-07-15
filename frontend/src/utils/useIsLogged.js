import React, { useEffect, useState } from 'react';
import axios from 'axios';
const useIsLogged = (url) => {
  const [data, setData] = useState({});
  const [err, setErr] = useState({});
  useEffect(() => {
    axios
      .get(url)

      .then((data) => {
        setData(data.data);
      })
      .catch((err) => {
        setErr(err);
      });
  }, []);
  return { data, err };
};

export default useIsLogged;
